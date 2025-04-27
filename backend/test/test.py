import pandas as pd


df = pd.read_csv("../src/model/global_air_quality_dataset.csv")
print("Raw column names:", df.columns.tolist())