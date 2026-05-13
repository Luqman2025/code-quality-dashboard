import { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader";

const Settings = () => {
  const [form, setForm] = useState({
    sonarqubeUrl: "",
    sonarqubeToken: "",
    githubRepo: "",
    githubToken: ""
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    setForm({
      sonarqubeUrl: localStorage.getItem("sonarqubeUrl") || "",
      sonarqubeToken: localStorage.getItem("sonarqubeToken") || "",
      githubRepo: localStorage.getItem("githubRepo") || "",
      githubToken: localStorage.getItem("githubToken") || ""
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const save = (event) => {
    event.preventDefault();
    localStorage.setItem("sonarqubeUrl", form.sonarqubeUrl.trim());
    localStorage.setItem("sonarqubeToken", form.sonarqubeToken.trim());
    localStorage.setItem("githubRepo", form.githubRepo.trim());
    localStorage.setItem("githubToken", form.githubToken.trim());
    setStatus("Saved. Refresh the dashboard to load real data.");
  };

  const clear = () => {
    ["sonarqubeUrl", "sonarqubeToken", "githubRepo", "githubToken"].forEach((key) => {
      localStorage.removeItem(key);
    });
    setForm({ sonarqubeUrl: "", sonarqubeToken: "", githubRepo: "", githubToken: "" });
    setStatus("Cleared. Dashboard will fall back to mock data.");
  };

  return (
    <div className="space-y-10 animate-rise">
      <SectionHeader
        title="Connections"
        subtitle="Paste your SonarQube and GitHub tokens. Values are stored locally in your browser."
      />

      <form
        onSubmit={save}
        className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-card"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm text-slate-300">SonarQube URL</label>
            <input
              name="sonarqubeUrl"
              value={form.sonarqubeUrl}
              onChange={handleChange}
              placeholder="http://localhost:9000"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-100"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">SonarQube Token</label>
            <input
              name="sonarqubeToken"
              value={form.sonarqubeToken}
              onChange={handleChange}
              placeholder="Paste token"
              type="password"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-100"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">GitHub Repo</label>
            <input
              name="githubRepo"
              value={form.githubRepo}
              onChange={handleChange}
              placeholder="owner/repo"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-100"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">GitHub Token</label>
            <input
              name="githubToken"
              value={form.githubToken}
              onChange={handleChange}
              placeholder="Paste token"
              type="password"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-100"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-slate-900"
          >
            Save Tokens
          </button>
          <button
            type="button"
            onClick={clear}
            className="rounded-full border border-slate-700 px-6 py-2 text-sm text-slate-200"
          >
            Clear
          </button>
          {status ? <p className="text-sm text-slate-400">{status}</p> : null}
        </div>
      </form>
    </div>
  );
};

export default Settings;
