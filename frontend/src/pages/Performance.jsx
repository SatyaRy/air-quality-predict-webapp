// src/pages/Performance.js
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

  // Sample inputs for 10 predictions, matching PM25Input schema
  const sampleInputs = Array.from({ length: 10 }, (_, i) => ({
    AQI: 40 + i * 5, // 40 to 85
    PM10_μgm3: 20 + i * 3, // 20 to 47
    NO2_ppb: 15 + i * 2, // 15 to 33
    SO2_ppb: 5 + i * 1, // 5 to 14
    CO_ppm: 0.2 + i * 0.1, // 0.2 to 1.1
    O3_ppb: 10 + i * 2, // 10 to 28
    Temperature_C: 20 + i * 1, // 20 to 29
    Humidity_: 50 + i * 2, // 50 to 68
    Wind_Speed_ms: 1 + i * 0.5, // 1 to 5.5
    PM25_1hr_ago: 15 + i * 1, // 15 to 24
    PM25_2hr_ago: 14 + i * 1, // 14 to 23
    pm25_rolling_mean3: 14.5 + i * 1, // 14.5 to 23.5
    PM25_μgm3: 16 + i * 2, // 16 to 34 (used as actual PM2.5)
  }));

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
        const actualValues = sampleInputs.map((input) => input.PM25_μgm3);
        const validIndices = predictions
          .map((pred, i) => (pred !== null ? i : -1))
          .filter((i) => i !== -1);
        const validPredictions = validIndices.map((i) => predictions[i]);
        const validActualValues = validIndices.map((i) => actualValues[i]);

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

        {/* Metrics Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
        <section className="mt-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            Actual vs. Predicted PM2.5
          </h2>
          <p className="text-gray-600 mb-6">
            Note: Actual PM2.5 values are simulated for demonstration purposes.
          </p>
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
