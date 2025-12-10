const StatCard = ({ icon: Icon, label, value, trend, color = "indigo" }) => {
  const colorClasses = {
    indigo: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    green: "bg-green-500/10 text-green-500 border-green-500/20",
    red: "bg-red-500/10 text-red-500 border-red-500/20",
    blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  };

  return (
    <div className={`p-6 rounded-lg border ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium opacity-75">{label}</p>
        {Icon && <Icon className="w-5 h-5" />}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      {trend && (
        <p className="text-xs mt-2 opacity-60">
          {trend.direction === "up" ? "↑" : "↓"} {trend.text}
        </p>
      )}
    </div>
  );
};

export default StatCard;
