const ChartCard = ({ title, description, children }) => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default ChartCard;
