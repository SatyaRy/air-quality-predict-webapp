# Air Quality Prediction Webapp

A web application that predicts the Air Quality Index (AQI) based on climate and environmental inputs. Powered by a Random Forest Regressor, this app provides real-time AQI forecasts to help users plan outdoor activities and monitor air quality. Built with a FastAPI backend and React frontend.

## Features
- Input climate parameters (e.g., temperature, humidity, wind speed) to predict AQI.
- Real-time predictions using a pre-trained Random Forest model.
- Responsive and intuitive UI built with React.
- RESTful API for programmatic access to predictions.

## Table of Contents
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Model Training](#model-training)

## Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- pip and npm
- Git
### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/SatyaRy/air-quality-predict-webapp.git
   cd air-quality-predict-webapp
2. **Set Up the Backend**:
``` bash
cd backend
python -m venv .venv
source .venv/bin/activate  
# On Windows: venv\Scripts\activate
# On Mac: source .venv/bin/activate
pip install -r requirements.txt
```
3. **Usage**:
Start the backend server:
``` bash
cd backend
uvicorn main:app --reload
FastAPI runs on http://localhost:8000.
API docs available at http://localhost:8000/docs.
```

## Project Structure 

```bash
└── air-quality-predict-webapp/
    ├── src/
    │   ├── controller/
    │   │   └── air_quality.py
    │   ├── database/
    │   │   └── config.py
    │   ├── model/
    │   │   ├── global_air_quality.csv
    │   │   ├── xgboost_pm25_model.pkl
    │   │   └── train_model.py
    │   └── schemas/
    │       └── air_quality_schema.py
    ├── main.py
    ├── test/
    │   └── test.py
    ├── requirements.txt
    └── vercel.json
```
## Controller
### 1. GET /
# Purpose: 
A simple root endpoint to check if the API is running correctly.
# Response:
Returns `{ "message": "success" }` when accessed.

### 2. POST `/api/v1/predict`
   - Purpose:
     
  Accepts input air quality data and predicts the PM2.5 value
   - Steps:
     
1. Receive input:
   
   Expects a JSON payload matching the `PM25Input` schema.
2. Preprocess the input:
   
   - Converts input into a Pandas DataFrame.
     
   - Automatically adds current `hour`, `month`, `day`, `dayofweek`, and `is_weekend` values based on the system data and time.
     
   - Adjusts the column `PM10_μgm3` to `PM10_µgm³` for model compatibility.
3. Validate features:
   
   Checks that all required features are present for the model to predict properly.

4. Make prediction:

   Uses the loaded XGBoost model (`xgboost_pm25_model.pkl`) to predict the PM2.5 level.

5. Return the result:

   Sends back the predicted PM2.5 value and a success message.

- Error handling:

   If any error occurs during preprocessing or prediction, it returns a 400 HTTP error with a detailed message. 

# Other Components Used
- `joblib` to load the machine learning model.
- `pandas` to format the manipulate data.
- `datetime` to add real-time features.
- `air_quality_schema.py` defines the input schema (`PM25Input`) that ensures the incoming data is validated properly.

## Model
### Steps
1. **Imports**
   ``` bash
   import pandas as pd
   from sklearn.model_selection import train_test_split
   from xgboost import XGBRegressor
   import joblib
2. **Load CSV Data**
   ``` bash
   file_name = '../model/global_air_quality_dataset.csv'
   df = pd.read_csv(file_name)
3. **Clean Column Names**
   ```bash
   df.columns = df.columns.str.replace(' ', '_').str.replace(r'[^\w]', '', regex=True)
4. **Check Target Column**
   ``` bash
   if 'PM25_µgm³' not in df.columns:
    raise ValueError("PM2.5 column not found after renaming.")
   df = df.dropna(subset=['PM25_µgm³'])
5. **Handle Date Information**
  ``` bash
df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
df = df.dropna(subset=['Date']).sort_values('Date')
```
6. **Create Time Features**
   ``` bash
   df['hour'] = df['Date'].dt.hour
   df['month'] = df['Date'].dt.month
   df['day'] = df['Date'].dt.day
   df['dayofweek'] = df['Date'].dt.dayofweek
   df['is_weekend'] = df['dayofweek'].isin([5, 6]).astype(int)
7. **Create Lag Features**
   ``` bash
   df['PM25_1hr_ago'] = df['PM25_µgm³'].shift(1)
   df['PM25_2hr_ago'] = df['PM25_µgm³'].shift(2)
   df['pm25_rolling_mean3'] = df['PM25_µgm³'].rolling(window=3).mean()

8. **Select Features and Target**
   ``` bash
   features = [...] # list of feature names
   target = 'PM25_µgm³'
9. **Drop Missing Values**
    ``` bash
    df = df.dropna(subset=features + [target])
10. **Create X (inputs) and y (target)**
   ``` bash
 X = df[features]
y = df[target]
```
11. **Train-Test Split**
    ``` bash
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)
12. **Train the Model**
    ``` bash
    model = XGBRegressor(...)
    model.fit(X_train, y_train)
13. **Save the Trained Model**
    ``` bash
    joblib.dump(model, 'xgboost_pm25_model.pkl')
    print("Model saved as 'xgboost_pm25_model.pkl'")
    ```














