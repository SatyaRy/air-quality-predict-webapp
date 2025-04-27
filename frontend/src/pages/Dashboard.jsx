import AQICard from "../components/AQICard";

function Dashboard() {
  // Dummy Data (you will replace with real prediction later)
  const data = [
    { title: "PM2.5", value: 55, unit: "µg/m³", status: "Moderate" },
    { title: "Temperature", value: 30, unit: "°C", status: "Good" },
    { title: "Humidity", value: 65, unit: "%", status: "Good" },
    { title: "Wind Speed", value: 15, unit: "km/h", status: "Good" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20">
      <div className="container mx-auto px-6 py-16">
        {/* Header Section */}
        <section className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
            Air Quality Dashboard
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Monitor real-time air quality metrics and environmental conditions
            to stay informed and take action.
          </p>
        </section>

        {/* Metrics Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="transform transition-all duration-300 hover:-translate-y-2"
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
