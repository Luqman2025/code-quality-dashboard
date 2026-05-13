import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Settings from "../Settings.jsx";

describe("Settings", () => {
  it("saves tokens to localStorage", () => {
    render(<Settings />);

    fireEvent.change(screen.getByPlaceholderText("http://localhost:9000"), {
      target: { value: "http://sonarqube.local" }
    });
    fireEvent.change(screen.getAllByPlaceholderText("Paste token")[0], {
      target: { value: "sonar-token" }
    });
    fireEvent.change(screen.getByPlaceholderText("owner/repo"), {
      target: { value: "org/repo" }
    });
    fireEvent.change(screen.getAllByPlaceholderText("Paste token")[1], {
      target: { value: "github-token" }
    });

    fireEvent.click(screen.getByText("Save Tokens"));

    expect(localStorage.getItem("sonarqubeUrl")).toBe("http://sonarqube.local");
    expect(localStorage.getItem("sonarqubeToken")).toBe("sonar-token");
    expect(localStorage.getItem("githubRepo")).toBe("org/repo");
    expect(localStorage.getItem("githubToken")).toBe("github-token");
  });
});
