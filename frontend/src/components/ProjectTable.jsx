const ProjectTable = ({ projects }) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-card">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-900/80 text-slate-300">
          <tr>
            <th className="px-6 py-4">Project</th>
            <th className="px-6 py-4">Bugs</th>
            <th className="px-6 py-4">Vulnerabilities</th>
            <th className="px-6 py-4">Code Smells</th>
            <th className="px-6 py-4">Coverage</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {projects.map((project) => (
            <tr key={project.key} className="text-slate-200">
              <td className="px-6 py-4 font-semibold text-white">{project.name}</td>
              <td className="px-6 py-4">{project.metrics.bugs}</td>
              <td className="px-6 py-4">{project.metrics.vulnerabilities}</td>
              <td className="px-6 py-4">{project.metrics.code_smells}</td>
              <td className="px-6 py-4">{project.metrics.coverage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
