import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

// Error Boundary Component
class ChartErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Chart rendering error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <p className="text-red-500 text-center">
          Error rendering chart. Please try again.
        </p>
      );
    }
    return this.props.children;
  }
}

function Performance() {
  // State for chart data and metrics
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mae, setMae] = useState(null);
  const [rmse, setRmse] = useState(null);

  // Sample inputs for 10 predictions, matching the model's required features
  const sampleInputs = Array.from({ length: 10 }, (_, i) => ({
    Temperature: 20 + i * 1, // 20 to 29 (°C)
    Humidity: 50 + i * 2, // 50 to 68 (%)
    Pressure: 1008 + i * 1, // 1008 to 1017 (hPa)
    Wind_Speed_kmh: 5 + i * 1, // 5 to 14 (km/h)
    Visibility: 8 + i * 0.5, // 8 to 12.5 (km)
    Rainfall: 0 + i * 0.2, // 0 to 1.8 (mm)
    so2: 5 + i * 1, // 5 to 14 (ppb)
    no2: 15 + i * 2, // 15 to 33 (ppb)
    PM10: 20 + i * 3, // 20 to 47 (µg/m³)
    AQI: 40 + i * 5, // 40 to 85
  }));

  // Simulated actual PM2.5 values for MAE and RMSE calculations
  const simulatedActualPM25 = Array.from({ length: 10 }, (_, i) => 10 + i * 2); // 10 to 28 (µg/m³)

  // Metrics array, dynamically updated
  const metrics = [
    {
      title: "Mean Absolute Error (MAE)",
      value: mae !== null ? mae : "N/A",
      unit: "µg/m³",
      description: "Measures average prediction error magnitude.",
    },
    {
      title: "Root Mean Squared Error (RMSE)",
      value: rmse !== null ? rmse : "N/A",
      unit: "µg/m³",
      description: "Emphasizes larger prediction errors.",
    },
  ];

  // Functions to calculate MAE and RMSE
  const calculateMAE = (actual, predicted) => {
    if (actual.length !== predicted.length) return null;
    const sum = actual.reduce(
      (acc, val, i) => acc + Math.abs(val - predicted[i]),
      0
    );
    return (sum / actual.length).toFixed(2);
  };

  const calculateRMSE = (actual, predicted) => {
    if (actual.length !== predicted.length) return null;
    const sum = actual.reduce(
      (acc, val, i) => acc + Math.pow(val - predicted[i], 2),
      0
    );
    return Math.sqrt(sum / actual.length).toFixed(2);
  };

  useEffect(() => {
    const fetchPredictions = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching predictions with inputs:", sampleInputs);
        const predictions = await Promise.all(
          sampleInputs.map(async (input, index) => {
            try {
              console.log(`Sending input ${index + 1}:`, input);
              const response = await axios.post(
                "http://localhost:8000/api/v1/predict",
                input
              );
              console.log(`Prediction ${index + 1}:`, response.data);
              return response.data.predicted_pm25;
            } catch (err) {
              console.error(`Error in prediction ${index + 1}:`, err);
              return null; // Handle individual prediction failure
            }
          })
        );

        // Filter out failed predictions and corresponding actual values
        const validIndices = predictions
          .map((pred, i) => (pred !== null ? i : -1))
          .filter((i) => i !== -1);
        const validPredictions = validIndices.map((i) => predictions[i]);
        const validActualValues = validIndices.map(
          (i) => simulatedActualPM25[i]
        );

        if (validPredictions.length === 0) {
          throw new Error("No valid predictions received.");
        }

        // Prepare chart data
        const newChartData = {
          labels: validIndices.map((i) => `Sample ${i + 1}`),
          datasets: [
            {
              label: "Actual PM2.5",
              data: validActualValues,
              borderColor: "blue",
              fill: false,
              tension: 0.1,
            },
            {
              label: "Predicted PM2.5",
              data: validPredictions,
              borderColor: "red",
              fill: false,
              tension: 0.1,
            },
          ],
        };
        console.log("Chart data prepared:", newChartData);
        setChartData(newChartData);

        // Calculate metrics
        const maeValue = calculateMAE(validActualValues, validPredictions);
        const rmseValue = calculateRMSE(validActualValues, validPredictions);
        setMae(maeValue);
        setRmse(rmseValue);
      } catch (err) {
        const errorMessage =
          err.response?.data?.detail ||
          err.message ||
          "Error fetching predictions";
        console.error("Fetch predictions error:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchPredictions();

    // Cleanup on unmount
    return () => {
      setChartData(null);
      setMae(null);
      setRmse(null);
    };
  }, []);

  console.log("Rendering Performance component", {
    chartData,
    loading,
    error,
    mae,
    rmse,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20">
      <div className="container mx-auto px-6 py-16">
        {/* Header Section */}
        <section className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
            Model Performance
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Evaluate the accuracy of our air quality prediction model using key
            metrics and visualizations.
          </p>
        </section>

        {/* Data Source Section */}
        <section className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Source</h2>
          <p className="text-gray-600">
            The predictions are generated using an XGBoost model trained on the
            <code className="bg-gray-100 px-1 rounded">orginal.csv</code>{" "}
            dataset, which includes air quality metrics such as Temperature,
            Humidity, Wind Speed, Visibility, Pressure, SO2, NO2, Rainfall,
            PM10, and AQI. For this performance evaluation, actual PM2.5 values
            are simulated for demonstration purposes, and the model predicts
            PM2.5 based on the provided input features.
          </p>
        </section>

        {/* Metrics Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <h3 className="text-xl md:text-2xl font-semibold text-blue-600 mb-2">
                {metric.title}
              </h3>
              <p className="text-3xl font-bold text-gray-800 mb-2">
                {metric.value}{" "}
                <span className="text-sm font-normal">{metric.unit}</span>
              </p>
              <p className="text-gray-600 text-sm md:text-base">
                {metric.description}
              </p>
            </div>
          ))}
        </section>

        {/* Chart Section */}
        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            Actual vs. Predicted PM2.5
          </h2>
          {loading && <p className="text-gray-600 mb-6">Loading chart...</p>}
          {error && <p className="text-red-500 mb-6">Error: {error}</p>}
          {!loading && !error && chartData ? (
            <ChartErrorBoundary>
              <div className="bg-white rounded-xl p-8 max-w-4xl mx-auto shadow-md">
                <Line
                  key={JSON.stringify(chartData)}
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                      title: {
                        display: true,
                        text: "Actual vs Predicted PM2.5 (µg/m³)",
                      },
                    },
                    scales: {
                      x: {
                        type: "category",
                        title: {
                          display: true,
                          text: "Sample Number",
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "PM2.5 (µg/m³)",
                        },
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </ChartErrorBoundary>
          ) : (
            !loading &&
            !error && (
              <p className="text-gray-600 mb-6">No chart data available yet.</p>
            )
          )}
        </section>
      </div>
    </div>
  );
}

export default Performance;
