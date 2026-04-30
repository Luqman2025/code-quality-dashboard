const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

const request = async (path) => {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

export const fetchDashboard = () => request("/sonar/dashboard");
export const fetchDeveloperScores = () => request("/developers/scores");
