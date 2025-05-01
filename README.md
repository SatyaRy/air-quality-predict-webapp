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
.
├── backend/
│   ├── api/
│   │   └── index.py
│   ├── src
│   ├── controller/
│   │   └── air_quality.py
│   ├── model/
│   │   ├── original.csv
│   │   ├── train_model.py
│   │   └── xgboost_pm25_model.pkl
│   ├── schemas/
│   │   └── air_quality_schema.py
│   └── test/
│       ├── test.py
│       ├── .gitignore
│       ├── main.py
│       ├── requirements.txt
│       └── vercel.json
└── frontend/
    └── src/
        ├── assets/
        │   └── react.svg
        ├── components/
        │   ├── AQICard.jsx
        │   ├── Footer.jsx
        │   └── Header.jsx
        └── pages/
            ├── About.jsx
            ├── Dashboard.jsx
            ├── Home.jsx
            └── Performance.jsx
```
## Model Training

### Objective 

To learn how accurately the machine shows the relationship between predicted value and actual value for features such as wind speed, humidity, temperature and other factors that influence the PM2.5 level. Furthermore, it shows which features are the most influential in the model by applying the feature importances. After training the model successfully, a past dataset of the global air quality can be used by the machine to predict the future air quality by hours for each country.


### Data Preprocessing Steps

1. **Cleaned the dataset**: formatted column names, removed rows with missing or corrupt PM2.5 values.
2. **Parsed time data**: converted to datetime and sorted chronologically.
3. **Feature engineering**:
   - Added time-based features (e.g., hour, day).
   - Created lag features (e.g., PM2.5 one hour ago).
4. **Split the data**: 8-% for training, 20% for testing using ```train_test_split``` from ```scikit-learn```


### Library Used

- ```Scikit-learn```: popular ML algorithms and tools
- ```Xgboost```: a gradient boosting framework for supervised learning
- ```Numpy ```: fundamental for numerical computation
- ```Scipy```: scientific computing, often used alongside NumPy in ML
- ```Pandas```: data manipulation and analysis, heavily used in ML workflows
- ```Joblib```: used to efficiently save/load models and parallel computing
- ```Threadpoolctl```: Controls thread usage in libraries like NumPy and scikit-learn
- ```Matplotlib```: Visualizing the result

### Visual Evaluation
``` bash
plt.figure(figsize=(12,6))
plt.plot(actual_values, label='Actual PM2.5', color='blue')
plt.plot(predicted_values, label='Predicted PM2.5', color='red')
plt.title("XGBoost: Actual vs Predicted PM2.5 (First 100 Samples)")
plt.xlabel("Sample")
plt.ylabel("PM2.5 Level (µg/m³)")
plt.legend()
plt.grid(True)
plt.tight_layout()
plt.show()
```

### Challenges Faced
- Difficulty in obtaining recent and clean datasets.
- High evaluation metrics with early models.
- Model selection issues:
  - **Linear Regression**: Poor performance.
  - **Random Forest**: Better but still inaccurate.
  - **XGBoost**: Provided the best balance between accuracy and interpretability.
 
### Model Limitations
- Model’s result depending on PM2.5 readings might miss some data that can degrade the performance.



