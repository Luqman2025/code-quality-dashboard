import { useEffect, useState } from "react";
import { fetchDeveloperScores } from "../services/api";
import SectionHeader from "../components/SectionHeader";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import StatPill from "../components/StatPill";

const Developers = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetchDeveloperScores();
        setData(response);
      } catch (err) {
        setError(err.message || "Unable to load developers");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <Loading message="Calculating developer scores..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="space-y-10 animate-rise">
      <SectionHeader
        title="Developer Productivity"
        subtitle="Scoreboard that blends commit velocity and code health impact."
      />

      <div className="grid gap-6">
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/80 text-slate-300">
              <tr>
                <th className="px-6 py-4">Rank</th>
                <th className="px-6 py-4">Developer</th>
                <th className="px-6 py-4">Commits</th>
                <th className="px-6 py-4">Bugs</th>
                <th className="px-6 py-4">Code Smells</th>
                <th className="px-6 py-4">Coverage</th>
                <th className="px-6 py-4">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {data.developers.map((developer) => (
                <tr key={developer.name} className="text-slate-200">
                  <td className="px-6 py-4 font-semibold">#{developer.rank}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/20 text-teal">
                        {developer.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{developer.name}</p>
                        <p className="text-xs text-slate-400">{developer.label}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatPill label={developer.commits} tone="teal" />
                  </td>
                  <td className="px-6 py-4">
                    <StatPill label={developer.bugs} tone="coral" />
                  </td>
                  <td className="px-6 py-4">
                    <StatPill label={developer.codeSmells} tone="amber" />
                  </td>
                  <td className="px-6 py-4">
                    <StatPill label={`${developer.coverage}%`} tone="lagoon" />
                  </td>
                  <td className="px-6 py-4">
                    <StatPill label={developer.score} tone="teal" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Developers;
