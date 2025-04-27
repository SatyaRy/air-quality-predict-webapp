function AQICard({ title, value, unit, status }) {
  const bgColor =
    status === "Good"
      ? "bg-green-400"
      : status === "Moderate"
      ? "bg-yellow-400"
      : "bg-red-500";

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
