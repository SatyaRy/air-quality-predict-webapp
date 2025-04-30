import React, { useState } from "react";
import axios from "axios";
import AQICard from "../components/AQICard";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaRadiation,
  FaSkullCrossbones,
  FaBiohazard,
} from "react-icons/fa";

const getAdvice = (pm25) => {
  if (pm25 <= 12.0) {
    return {
      text: "Breathe easy! The air is fresh and healthy. A perfect day for outdoor activities.",
      icon: <FaCheckCircle className="inline-block mr-2" size={20} />,
      color: "text-green-600",
    };
  } else if (pm25 <= 35.4) {
    return {
      text: "Air quality is acceptable, but a few sensitive individuals may feel mild effects. Keep enjoying your day!",
      icon: <FaExclamationCircle className="inline-block mr-2" size={20} />,
      color: "text-yellow-600",
    };
  } else if (pm25 <= 55.4) {
    return {
      text: "If you have respiratory conditions, consider limiting outdoor exertion. Others can still enjoy normal activities.",
      icon: <FaExclamationTriangle className="inline-block mr-2" size={20} />,
      color: "text-orange-600",
    };
  } else if (pm25 <= 150.4) {
    return {
      text: "Everyone may start to feel health effects. It's a good idea to reduce prolonged outdoor activities.",
      icon: <FaRadiation className="inline-block mr-2" size={20} />,
      color: "text-red-600",
    };
  } else if (pm25 <= 250.4) {
    return {
      text: "Serious health effects possible for everyone. Stay indoors as much as possible and wear a mask if outside.",
      icon: <FaSkullCrossbones className="inline-block mr-2" size={20} />,
      color: "text-purple-600",
    };
  } else {
    return {
      text: "Dangerous air quality! Avoid going outside. Protect your health by staying indoors with filtered air.",
      icon: <FaBiohazard className="inline-block mr-2" size={20} />,
      color: "text-gray-900",
    };
  }
};

const AirQualityAdvice = ({ pm25 }) => {
  if (!pm25) return null;
  const advice = getAdvice(pm25);
  return (
    <section className="mt-8 max-w-md mx-auto">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Air Quality Advice
        </h2>
        <p className={`flex items-center justify-center ${advice.color}`}>
          {advice.icon}
          {advice.text}
        </p>
      </div>
    </section>
  );
};

function Dashboard() {
  const [formData, setFormData] = useState({
    Temperature: 25,
    Humidity: 60,
    Pressure: 1013,
    Wind_Speed_kmh: 7.2,
    Visibility: 10,
    Rainfall: 0,
    so2: 10,
    no2: 20,
    PM10: 30,
    AQI: 50,
  });

  const [pm25, setPm25] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value ? parseFloat(value) : "",
    }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] === "" || formData[key] == null) {
        errors[key] = `${formatLabel(key)} is required`;
      }
    });
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
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

  const formatLabel = (key) => {
    let label = key.replace(/_/g, " ");
    // label = label.replace("kmh", "km/h");
    label = label.replace("so2", "SO2");
    label = label.replace("no2", "NO2");
    label = label.replace("Temperature", "Temperature (°C)");
    label = label.replace("Humidity", "Humidity (%)");
    label = label.replace("Pressure", "Pressure (hPa)");
    label = label.replace("Wind Speed", "Wind Speed (km/h)");
    label = label.replace("Visibility", "Visibility (km)");
    label = label.replace("Rainfall", "Rainfall (mm)");
    label = label.replace("PM10", "PM10 (µg/m³)");
    label = label.replace("SO2", "SO2 (ppb)");
    label = label.replace("NO2", "NO2 (ppb)");
    return label;
  };

  const data = [
    {
      title: "PM2.5",
      value: pm25 !== null ? pm25.toFixed(2) : "N/A",
      unit: "µg/m³",
      status:
        pm25 !== null
          ? pm25 <= 12.0
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
        <section className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-4">
            Air Quality Dashboard
          </h1>
          <p className="text-lg text-gray-700">
            Predict PM2.5 based on air quality metrics
          </p>
        </section>

        <section className="mb-12 max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl suprang-bold text-gray-800 mb-6 text-center">
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
                      className={`w-full p-3 bg-gray-50 border ${
                        formErrors[key] ? "border-red-500" : "border-gray-300"
                      } rounded-lg`}
                      placeholder={`Enter ${formatLabel(key)}`}
                    />
                    {formErrors[key] && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors[key]}
                      </p>
                    )}
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

        {error && (
          <div className="text-center mb-8">
            <p className="text-red-500 bg-red-100 p-4 rounded-lg inline-block">
              Error: {error}
            </p>
          </div>
        )}

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

        <AirQualityAdvice pm25={pm25} />
      </div>
    </div>
  );
}

export default Dashboard;
