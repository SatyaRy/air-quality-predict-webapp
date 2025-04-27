// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import AQICard from "../components/AQICard";
import { Link } from "react-router-dom";

// Mock data to simulate dynamic metrics (replace with real API calls later)
const mockCityData = {
  "New York": { temperature: 22, humidity: 55, wind_speed: 8 },
  "Los Angeles": { temperature: 28, humidity: 40, wind_speed: 5 },
  London: { temperature: 18, humidity: 70, wind_speed: 12 },
  Beijing: { temperature: 26, humidity: 60, wind_speed: 7 },
  Delhi: { temperature: 35, humidity: 45, wind_speed: 10 },
  Paris: { temperature: 20, humidity: 65, wind_speed: 9 },
  Tokyo: { temperature: 25, humidity: 50, wind_speed: 6 },
  Sydney: { temperature: 24, humidity: 55, wind_speed: 11 },
  "São Paulo": { temperature: 27, humidity: 60, wind_speed: 8 },
  Cairo: { temperature: 30, humidity: 35, wind_speed: 14 },
};

function Dashboard() {
  const cities = [
    "New York",
    "Los Angeles",
    "London",
    "Beijing",
    "Delhi",
    "Paris",
    "Tokyo",
    "Sydney",
    "São Paulo",
    "Cairo",
  ];

  // State for city selection
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  // State for form inputs
  const [formData, setFormData] = useState({
    AQI: 50,
    PM10_μgm3: 30,
    NO2_ppb: 20,
    Temperature_C: 25,
    Humidity_: 60,
    Wind_Speed_ms: 2,
  });

  // State for prediction result (PM2.5)
  const [pm25, setPm25] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for dynamic metrics (temperature, humidity, wind speed)
  const [dynamicData, setDynamicData] = useState({
    temperature: null,
    humidity: null,
    wind_speed: null,
  });

  // Fetch dynamic data when the selected city changes
  useEffect(() => {
    const fetchDynamicData = () => {
      // Simulate fetching data for the selected city
      const cityData = mockCityData[selectedCity];
      setDynamicData({
        temperature: cityData.temperature,
        humidity: cityData.humidity,
        wind_speed: cityData.wind_speed,
      });
    };
    fetchDynamicData();
  }, [selectedCity]);

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
      console.log("Submitting prediction with input:", formData);
      const response = await axios.post(
        "http://localhost:8000/api/v1/predict",
        {
          AQI: formData.AQI,
          PM10_μgm3: formData.PM10_μgm3,
          NO2_ppb: formData.NO2_ppb,
          Temperature_C: formData.Temperature_C,
          Humidity_: formData.Humidity_,
          Wind_Speed_ms: formData.Wind_Speed_ms,
        }
      );
      console.log("Prediction response:", response.data);
      setPm25(response.data.predicted_pm25);
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail || "Error fetching prediction";
      console.error("Fetch prediction error:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Prepare data for rendering
  const data = [
    {
      title: "PM2.5",
      value: pm25 !== null ? pm25.toFixed(2) : "N/A",
      unit: "µg/m³",
    },
    {
      title: "Temperature",
      value: dynamicData.temperature || "N/A",
      unit: "°C",
      status: "Good",
    },
    {
      title: "Humidity",
      value: dynamicData.humidity || "N/A",
      unit: "%",
      status: "Good",
    },
    {
      title: "Wind Speed",
      value: dynamicData.wind_speed || "N/A",
      unit: "km/h",
      status: "Good",
    },
  ];

  console.log("Rendering Dashboard component", {
    pm25,
    loading,
    error,
    selectedCity,
    dynamicData,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-100 to-green-100 pt-20">
      <div className="container mx-auto px-6 py-16">
        {/* Header Section */}
        <section className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 drop-shadow-md">
            Air Quality Dashboard
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Monitor air quality metrics for{" "}
            <span className="font-semibold text-blue-600">{selectedCity}</span>.
          </p>
          <div className="mt-4">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Prediction Form */}
        <section className="mb-12 max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Predict PM2.5 for {selectedCity}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Object.keys(formData).map((key) => (
                  <div key={key} className="relative">
                    <label
                      htmlFor={key}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {key.replace("_", " ").replace("μgm3", "µg/m³")}
                    </label>
                    <input
                      type="number"
                      id={key}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      step="0.1"
                      required
                      className="w-full p-3 bg-gray-50 pt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400"
                      placeholder={`Enter ${key}`}
                    />
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105 ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
                  }`}
                >
                  {loading ? "Predicting..." : "Get PM2.5 Prediction"}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Error and Loading States */}
        {error && (
          <div className="text-center mb-8 animate-pulse">
            <p className="text-red-500 bg-red-100 p-4 rounded-lg inline-block">
              Error: {error}
            </p>
          </div>
        )}

        {/* Metrics Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {data.map((item, index) => (
            <div
              key={index}
              className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
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
