const toneMap = {
  teal: "bg-teal/20 text-teal",
  amber: "bg-amber/20 text-amber",
  coral: "bg-coral/20 text-coral",
  lagoon: "bg-lagoon/20 text-lagoon"
};

const StatPill = ({ label, tone }) => {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${toneMap[tone]}`}>
      {label}
    </span>
  );
};

export default StatPill;
