import pandas as pd
from sklearn.model_selection import train_test_split
from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error
import numpy as np
import joblib
# Step 1: Load your CSV file
file_name = '../model/orginal.csv'  # Update with your file path
df = pd.read_csv(file_name)
# Step 2: Clean column names
df.columns = df.columns.str.replace(' ', '_').str.replace(r'[^\w]', '', regex=True)

# Step 3: Identify PM2.5 column
possible_pm25_names = ['PM25', 'PM2.5', 'PM25_µgm³', 'PM25_ugm3']
target = None
for name in possible_pm25_names:
    if name in df.columns:
        target = name
        break

if target is None:
    print("Available columns:", df.columns.tolist())
    raise ValueError(
        "PM2.5 column not found. Expected one of: {}. "
        "Ensure PM2.5 data is included.".format(possible_pm25_names)
    )

print(f"Using PM2.5 column: {target}")
df = df.dropna(subset=[target])

# Step 4: Select features
features = [
    'Temperature', 'Humidity', 'WindSpeedkmh', 'Visibility', 'Pressure',
    'so2', 'no2', 'Rainfall', 'PM10', 'AQI'
]

# Step 5: Check for missing features
missing_features = [f for f in features if f not in df.columns]
if missing_features:
    print("Available columns:", df.columns.tolist())
    raise ValueError(f"Missing required features: {missing_features}")

# Step 6: Drop rows with missing values
df = df.dropna(subset=features + [target])

# Step 7: Create X and y
X = df[features]
y = df[target]

# Step 8: Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 9: Train the Model
model = XGBRegressor(
    n_estimators=300,
    learning_rate=0.05,
    max_depth=6,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)
model.fit(X_train, y_train)

# Step 10: Save the trained model to a .pkl file
joblib.dump(model, 'xgboost_pm25_model.pkl')
print("Model saved as 'xgboost_pm25_model.pkl'")

# Step 11: Evaluate the model
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)  # Compute RMSE manually
mae = mean_absolute_error(y_test, y_pred)
print("RMSE:", rmse)
print("MAE:", mae)