const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

const getAuthHeaders = () => {
  const sonarUrl = localStorage.getItem("sonarqubeUrl");
  const sonarToken = localStorage.getItem("sonarqubeToken");
  const githubToken = localStorage.getItem("githubToken");
  const githubRepo = localStorage.getItem("githubRepo");

  return {
    "x-sonarqube-url": sonarUrl || "",
    "x-sonarqube-token": sonarToken || "",
    "x-github-token": githubToken || "",
    "x-github-repo": githubRepo || ""
  };
};

const request = async (path) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

export const fetchDashboard = () => request("/sonar/dashboard");
export const fetchDeveloperScores = () => request("/developers/scores");
