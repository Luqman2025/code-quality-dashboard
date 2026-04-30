const toneMap = {
  teal: "text-teal",
  amber: "text-amber",
  coral: "text-coral",
  lagoon: "text-lagoon"
};

const MetricCard = ({ label, value, tone }) => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-card">
      <p className="text-sm text-slate-400">{label}</p>
      <p className={`mt-3 text-3xl font-semibold ${toneMap[tone]}`}>{value}</p>
    </div>
  );
};

export default MetricCard;
