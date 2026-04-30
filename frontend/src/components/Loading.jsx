const Loading = ({ message }) => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-center text-slate-300">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Loading</p>
      <p className="mt-3 text-lg text-white">{message}</p>
    </div>
  );
};

export default Loading;
