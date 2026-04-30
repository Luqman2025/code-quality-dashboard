const ErrorState = ({ message }) => {
  return (
    <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-8 text-center text-rose-100">
      <p className="text-sm uppercase tracking-[0.2em] text-rose-300">Error</p>
      <p className="mt-3 text-lg">{message}</p>
    </div>
  );
};

export default ErrorState;
