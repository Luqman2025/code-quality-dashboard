const getMockDashboard = () => ({
  projects: [
    {
      key: "checkout-service",
      name: "Checkout Service",
      metrics: { bugs: 6, vulnerabilities: 2, code_smells: 18, coverage: 78.4 }
    },
    {
      key: "inventory-core",
      name: "Inventory Core",
      metrics: { bugs: 3, vulnerabilities: 1, code_smells: 11, coverage: 84.1 }
    },
    {
      key: "analytics-api",
      name: "Analytics API",
      metrics: { bugs: 4, vulnerabilities: 0, code_smells: 14, coverage: 71.6 }
    }
  ],
  totals: {
    totalBugs: 13,
    totalVulnerabilities: 3,
    totalCodeSmells: 43,
    averageCoverage: 78.03
  },
  issueDistribution: {
    bugs: 13,
    vulnerabilities: 3,
    codeSmells: 43
  },
  trend: [
    { label: "W-6", bugs: 18, vulnerabilities: 4, code_smells: 54, coverage: 75.2 },
    { label: "W-5", bugs: 16, vulnerabilities: 4, code_smells: 50, coverage: 76.1 },
    { label: "W-4", bugs: 14, vulnerabilities: 3, code_smells: 47, coverage: 77.2 },
    { label: "W-3", bugs: 13, vulnerabilities: 3, code_smells: 45, coverage: 77.6 },
    { label: "W-2", bugs: 13, vulnerabilities: 3, code_smells: 44, coverage: 78.0 },
    { label: "W-1", bugs: 13, vulnerabilities: 3, code_smells: 43, coverage: 78.03 }
  ]
});

const getMockDevelopers = () => [
  { name: "alex", commits: 42, bugs: 1, codeSmells: 6, coverageImpact: 6 },
  { name: "riley", commits: 35, bugs: 3, codeSmells: 9, coverageImpact: 2 },
  { name: "sam", commits: 28, bugs: 4, codeSmells: 14, coverageImpact: -4 },
  { name: "taylor", commits: 23, bugs: 2, codeSmells: 12, coverageImpact: 1 }
];

module.exports = { getMockDashboard, getMockDevelopers };
