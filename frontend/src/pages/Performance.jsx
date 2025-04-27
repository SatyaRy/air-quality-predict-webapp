function Performance() {
  // Sample performance metrics (replace with real data later)
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
            metrics like MAE and RMSE.
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

        {/* Placeholder for Charts */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            Visual Performance Insights
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Detailed charts and visualizations of model performance will be
            added soon to provide deeper insights into prediction accuracy.
          </p>
          <div className="bg-gray-100 rounded-xl p-8 max-w-4xl mx-auto">
            <p className="text-gray-500 italic">
              Chart components coming soon...
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Performance;
