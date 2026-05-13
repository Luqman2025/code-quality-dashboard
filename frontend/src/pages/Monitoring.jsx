const Monitoring = () => {
  const grafanaUrl = import.meta.env.VITE_GRAFANA_URL || "http://localhost:3001/d/backend-metrics";
  const prometheusUrl = import.meta.env.VITE_PROMETHEUS_URL || "http://localhost:9090/graph";

  return (
    <div className="space-y-8 animate-rise">
      <h2 className="text-2xl font-semibold text-white">Monitoring</h2>
      <p className="text-sm text-slate-400">Grafana and Prometheus embedded for quick inspection.</p>
      <div className="grid gap-4 md:grid-cols-2">
        <a
          className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-200 transition hover:border-slate-600"
          href={grafanaUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open Grafana dashboard
        </a>
        <a
          className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-200 transition hover:border-slate-600"
          href={prometheusUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open Prometheus console
        </a>
      </div>
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4">
          <iframe
            src={grafanaUrl}
            title="Grafana Dashboard"
            style={{ width: "100%", height: "70vh", border: "0" }}
          />
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4">
          <iframe
            src={prometheusUrl}
            title="Prometheus Console"
            style={{ width: "100%", height: "70vh", border: "0" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
