import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MetricCard from "../MetricCard.jsx";

describe("MetricCard", () => {
  it("renders label and value", () => {
    render(<MetricCard label="Total Bugs" value="12" tone="coral" />);
    expect(screen.getByText("Total Bugs")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
  });
});
