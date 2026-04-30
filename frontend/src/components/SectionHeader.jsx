const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-semibold text-white md:text-3xl">{title}</h2>
      <p className="max-w-2xl text-sm text-slate-400 md:text-base">{subtitle}</p>
    </div>
  );
};

export default SectionHeader;
