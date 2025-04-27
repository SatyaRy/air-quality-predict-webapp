// src/components/AQICard.js
function AQICard({ title, value, unit, status: providedStatus }) {
  // Dynamically determine status for PM2.5 based on standard thresholds
  let status = providedStatus;
  if (title === "PM2.5" && !providedStatus) {
    if (value <= 12) status = "Good";
    else if (value <= 35.4) status = "Moderate";
    else if (value <= 55.4) status = "Unhealthy for Sensitive Groups";
    else if (value <= 150.4) status = "Unhealthy";
    else if (value <= 250.4) status = "Very Unhealthy";
    else status = "Hazardous";
  }

  const bgColor =
    status === "Good"
      ? "bg-green-400"
      : status === "Moderate"
      ? "bg-yellow-400"
      : status === "Unhealthy for Sensitive Groups"
      ? "bg-orange-400"
      : status === "Unhealthy"
      ? "bg-red-400"
      : status === "Very Unhealthy"
      ? "bg-purple-500"
      : "bg-red-600"; // Hazardous

  return (
    <div className={`rounded-xl p-6 shadow-md text-white ${bgColor}`}>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-2xl font-semibold">
        {value} {unit}
      </p>
      <p className="text-sm mt-2">Status: {status}</p>
    </div>
  );
}

export default AQICard;
