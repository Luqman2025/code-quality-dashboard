import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { fetchDashboard } from "../services/api";
import MetricCard from "../components/MetricCard";
import SectionHeader from "../components/SectionHeader";
import ChartCard from "../components/ChartCard";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import ProjectTable from "../components/ProjectTable";

const COLORS = ["#0ea5a4", "#f59e0b", "#f97316"];

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetchDashboard();
        setData(response);
      } catch (err) {
        setError(err.message || "Unable to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <Loading message="Loading SonarQube insights..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  const issueData = [
    { name: "Bugs", value: data.issueDistribution.bugs },
    { name: "Vulnerabilities", value: data.issueDistribution.vulnerabilities },
    { name: "Code Smells", value: data.issueDistribution.codeSmells }
  ];

  return (
    <div className="space-y-10 animate-rise">
      <SectionHeader
        title="Multi-Project Overview"
        subtitle="Unified snapshot of code health across all SonarQube projects."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total Bugs" value={data.totals.totalBugs} tone="coral" />
        <MetricCard label="Total Vulnerabilities" value={data.totals.totalVulnerabilities} tone="amber" />
        <MetricCard label="Total Code Smells" value={data.totals.totalCodeSmells} tone="lagoon" />
        <MetricCard label="Average Coverage" value={`${data.totals.averageCoverage}%`} tone="teal" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Bugs Per Project" description="Spot the riskiest modules fast.">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.projects} margin={{ left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="name" tick={{ fill: "#cbd5f5", fontSize: 12 }} />
              <YAxis tick={{ fill: "#cbd5f5" }} />
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #334155" }} />
              <Bar dataKey="metrics.bugs" fill="#f97316" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Issue Distribution" description="Breakdown of defect types.">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={issueData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90}>
                {issueData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #334155" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Quality Trend" description="Week-over-week signals for leadership updates.">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data.trend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="label" tick={{ fill: "#cbd5f5", fontSize: 12 }} />
            <YAxis tick={{ fill: "#cbd5f5" }} />
            <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #334155" }} />
            <Line type="monotone" dataKey="bugs" stroke="#f97316" strokeWidth={2} />
            <Line type="monotone" dataKey="vulnerabilities" stroke="#f59e0b" strokeWidth={2} />
            <Line type="monotone" dataKey="code_smells" stroke="#0ea5a4" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ProjectTable projects={data.projects} />
    </div>
  );
};

export default Dashboard;
