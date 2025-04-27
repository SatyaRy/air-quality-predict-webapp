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
  CategoryScale, // Ensure this is imported
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale, // Ensure this is registered
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
  // Static performance metrics (no backend endpoint yet)
  const metrics = [
    {
      title: "Mean Absolute Error (MAE)",
      value: "3.45",
      unit: "µg/m³",
      description: "Measures average prediction error magnitude.",
    },
    {
      title: "Root Mean Squared Error (RMSE)",
      value: "4.12",
      unit: "µg/m³",
      description: "Emphasizes larger prediction errors.",
    },
  ];

  // State for chart data
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sample inputs for 10 predictions (simulating different conditions)
  const sampleInputs = Array.from({ length: 10 }, (_, i) => ({
    AQI: 40 + i * 5, // Vary AQI from 40 to 85
    PM10_μgm3: 20 + i * 3, // Vary PM10 from 20 to 47
    NO2_ppb: 15 + i * 2, // Vary NO2 from 15 to 33
    Temperature_C: 20 + i * 1, // Vary temperature from 20 to 29
    Humidity_: 50 + i * 2, // Vary humidity from 50 to 68
    Wind_Speed_ms: 1 + i * 0.5, // Vary wind speed from 1 to 5.5
  }));

  // Simulate actual PM2.5 values (for demo purposes)
  const actualValues = sampleInputs.map(
    (input, i) => input.PM10_μgm3 * 0.5 + i * 2
  ); // Simplified simulation

  useEffect(() => {
    const fetchPredictions = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching predictions with inputs:", sampleInputs);
        const predictions = await Promise.all(
          sampleInputs.map(async (input, index) => {
            try {
              const response = await axios.post(
                "http://localhost:8000/api/v1/predict",
                input
              );
              console.log(`Prediction ${index + 1}:`, response.data);
              return response.data.predicted_pm25;
            } catch (err) {
              console.error(`Error in prediction ${index + 1}:`, err);
              throw err;
            }
          })
        );

        // Prepare chart data
        const newChartData = {
          labels: Array.from({ length: 10 }, (_, i) => `Sample ${i + 1}`),
          datasets: [
            {
              label: "Actual PM2.5",
              data: actualValues,
              borderColor: "blue",
              fill: false,
              tension: 0.1,
            },
            {
              label: "Predicted PM2.5",
              data: predictions,
              borderColor: "red",
              fill: false,
              tension: 0.1,
            },
          ],
        };
        console.log("Chart data prepared:", newChartData);
        setChartData(newChartData);
      } catch (err) {
        const errorMessage =
          err.response?.data?.detail || "Error fetching predictions";
        console.error("Fetch predictions error:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchPredictions();

    // Cleanup on unmount to prevent memory leaks
    return () => {
      setChartData(null); // Reset chart data
    };
  }, []);

  console.log("Rendering Performance component", { chartData, loading, error });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20">
      <div className="container mx-auto px-6 py-16">
        {/* Header Section */}
        <section className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
            Model Performance
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Evaluate the accuracy of our air quality prediction models using key
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
          {loading && <p className="text-gray-600 mb-6">Loading chart...</p>}
          {error && <p className="text-red-500 mb-6">Error: {error}</p>}
          {!loading && !error && chartData ? (
            <ChartErrorBoundary>
              <div className="bg-white rounded-xl p-8 max-w-4xl mx-auto shadow-md">
                <Line
                  key={JSON.stringify(chartData)} // Force re-render on data change
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
                        type: "category", // Explicitly set scale type
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
