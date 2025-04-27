import pandas as pd
from sklearn.model_selection import train_test_split
from xgboost import XGBRegressor
import joblib

# Step 1: Load your CSV file
file_name = '../model/global_air_quality_dataset.csv' 
df = pd.read_csv(file_name)

# Step 2: Clean column names
df.columns = df.columns.str.replace(' ', '_').str.replace(r'[^\w]', '', regex=True)

# Step 3: Check and clean target column
if 'PM25_µgm³' not in df.columns:
    raise ValueError("PM2.5 column not found after renaming.")
df = df.dropna(subset=['PM25_µgm³'])
# Step 4: Date handling
df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
df = df.dropna(subset=['Date']).sort_values('Date')

# Step 5: Time features
df['hour'] = df['Date'].dt.hour
df['month'] = df['Date'].dt.month
df['day'] = df['Date'].dt.day
df['dayofweek'] = df['Date'].dt.dayofweek
df['is_weekend'] = df['dayofweek'].isin([5, 6]).astype(int)

# Step 6: Lag features
df['PM25_1hr_ago'] = df['PM25_µgm³'].shift(1)
df['PM25_2hr_ago'] = df['PM25_µgm³'].shift(2)
df['pm25_rolling_mean3'] = df['PM25_µgm³'].rolling(window=3).mean()

# Step 7: Select features
features = [
    'AQI', 'PM10_µgm³', 'NO2_ppb', 'SO2_ppb', 'CO_ppm', 'O3_ppb',
    'Temperature', 'Humidity', 'Wind_Speed_ms',
    'hour', 'month', 'day', 'dayofweek', 'is_weekend',
    'PM25_1hr_ago', 'PM25_2hr_ago', 'pm25_rolling_mean3'
]
target = 'PM25_µgm³'

# Step 8: Drop rows with missing values
df = df.dropna(subset=features + [target])

# Step 9: Create X and y
X = df[features]
y = df[target]

# Step 10: Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)

# Step 11: Train the Model
model = XGBRegressor(
    n_estimators=300,
    learning_rate=0.05,
    max_depth=6,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)
model.fit(X_train, y_train)

# Step 12: Save the trained model to a .pkl file
joblib.dump(model, 'xgboost_pm25_model.pkl')
print("Model saved as 'xgboost_pm25_model.pkl'")