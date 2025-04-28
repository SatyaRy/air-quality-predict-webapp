import React, { useState } from "react";
import axios from "axios";
import AQICard from "../components/AQICard";

function Dashboard() {
  // State for form inputs matching PM25Input schema
  const [formData, setFormData] = useState({
    AQI: 50,
    PM10_μgm3: 30,
    NO2_ppb: 20,
    Temperature_C: 25,
    Humidity_: 60,
    SO2_ppb: 10,
    CO_ppm: 0.5,
    O3_ppb: 15,
    PM25_μgm3: 20,
    Wind_Speed_ms: 2,
    PM25_1hr_ago: 18,
    PM25_2hr_ago: 19,
    pm25_rolling_mean3: 19.5,
  });

  // State for prediction result and UI feedback
  const [pm25, setPm25] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value ? parseFloat(value) : "",
    }));
  };

  // Handle form submission to fetch PM2.5 prediction
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPm25(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/predict",
        formData
      );
      const predictedPm25 = response.data.predicted_pm25;
      if (predictedPm25 === undefined) {
        throw new Error("PM2.5 prediction not found in response");
      }
      setPm25(predictedPm25);
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail ||
        err.message ||
        "Error fetching prediction";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Format labels for input fields
  const formatLabel = (key) => {
    let label = key.replace(/_/g, " ");
    label = label.replace("μgm3", "µg/m³");
    label = label.replace("ppb", "ppb");
    label = label.replace("ppm", "ppm");
    label = label.replace("C", "°C");
    label = label.replace("ms", "m/s");
    label = label.replace("Humidity", "Humidity (%)");
    label = label.replace("Wind Speed", "Wind Speed (m/s)");
    label = label.replace("Temperature", "Temperature (°C)");
    return label;
  };

  // Data for displaying PM2.5 result
  const data = [
    {
      title: "PM2.5",
      value: pm25 !== null ? pm25.toFixed(2) : "N/A",
      unit: "µg/m³",
      status:
        pm25 !== null
          ? pm25 <= 12
            ? "Good"
            : pm25 <= 35.4
            ? "Moderate"
            : pm25 <= 55.4
            ? "Unhealthy for Sensitive Groups"
            : pm25 <= 150.4
            ? "Unhealthy"
            : pm25 <= 250.4
            ? "Very Unhealthy"
            : "Hazardous"
          : "Unknown",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-100 to-green-100 pt-20">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-4">
            Air Quality Dashboard
          </h1>
          <p className="text-lg text-gray-700">
            Predict PM2.5 based on air quality metrics
          </p>
        </section>

        {/* Prediction Form */}
        <section className="mb-12 max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Input Air Quality Data
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Object.keys(formData).map((key) => (
                  <div key={key} className="relative">
                    <label
                      htmlFor={key}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {formatLabel(key)}
                    </label>
                    <input
                      type="number"
                      id={key}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      step="0.1"
                      required
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                      placeholder={`Enter ${key}`}
                    />
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`px-6 py-3 rounded-lg text-white font-semibold ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Predicting..." : "Get PM2.5 Prediction"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Error Display */}
        {error && (
          <div className="text-center mb-8">
            <p className="text-red-500 bg-red-100 p-4 rounded-lg inline-block">
              Error: {error}
            </p>
          </div>
        )}

        {/* Result Display */}
        <section className="grid grid-cols-1 gap-6 max-w-xs mx-auto">
          {data.map((item, index) => (
            <div key={index}>
              <AQICard
                title={item.title}
                value={item.value}
                unit={item.unit}
                status={item.status}
              />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
