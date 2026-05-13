jest.mock("../src/services/githubService", () => ({
  getContributors: jest.fn().mockResolvedValue([
    { login: "alex", commits: 10 },
    { login: "riley", commits: 5 }
  ])
}));

const { getDeveloperScores } = require("../src/services/scoreService");

describe("scoreService", () => {
  it("calculates scores and ranks", async () => {
    const result = await getDeveloperScores();

    expect(result.developers).toHaveLength(2);
    expect(result.developers[0].rank).toBe(1);
    expect(result.developers[0]).toHaveProperty("score");
    expect(result.developers[0]).toHaveProperty("label");
  });
});
