const request = require("supertest");

jest.mock("../src/services/sonarService", () => ({
  getDashboardMetrics: jest.fn().mockResolvedValue({
    projects: [
      {
        key: "alpha",
        name: "Alpha",
        metrics: { bugs: 2, vulnerabilities: 1, code_smells: 5, coverage: 82 }
      }
    ],
    totals: {
      totalBugs: 2,
      totalVulnerabilities: 1,
      totalCodeSmells: 5,
      averageCoverage: 82
    },
    issueDistribution: { bugs: 2, vulnerabilities: 1, codeSmells: 5 },
    trend: []
  })
}));

const { app } = require("../src/app");

describe("API routes", () => {
  it("returns health", async () => {
    const response = await request(app).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  it("returns projects list", async () => {
    const response = await request(app).get("/api/projects");
    expect(response.status).toBe(200);
    expect(response.body.projects).toHaveLength(1);
    expect(response.body.projects[0].name).toBe("Alpha");
  });
});
