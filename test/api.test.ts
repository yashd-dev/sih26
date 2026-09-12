import { describe, it, expect } from "vitest";

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function request(path: string, init?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

describe("Backend API", () => {
  it("GET /api/challenges returns challenges array", async () => {
    const data = await request("/api/challenges");
    expect(data).toHaveProperty("challenges");
    expect(Array.isArray(data.challenges)).toBe(true);
  });

  it("GET /api/admin/stats returns stats object", async () => {
    const data = await request("/api/admin/stats");
    expect(data).toHaveProperty("stats");
    expect(data.stats).toHaveProperty("challenges");
    expect(data.stats).toHaveProperty("solutions");
    expect(data.stats).toHaveProperty("pilots");
  });

  it("GET /api/charts returns chart data", async () => {
    const data = await request("/api/charts");
    expect(data).toHaveProperty("charts");
    expect(data.charts).toHaveProperty("challengesByStatus");
    expect(Array.isArray(data.charts.challengesByStatus)).toBe(true);
  });

  it("GET /api/pilots returns pilots array", async () => {
    const data = await request("/api/pilots");
    expect(data).toHaveProperty("pilots");
    expect(Array.isArray(data.pilots)).toBe(true);
  });

  it("GET /api/issues returns issues array", async () => {
    const data = await request("/api/issues");
    expect(data).toHaveProperty("issues");
    expect(Array.isArray(data.issues)).toBe(true);
  });

  it("GET /api/procurement returns decisions array", async () => {
    const data = await request("/api/procurement");
    expect(data).toHaveProperty("decisions");
  });

  it("GET /api/validations returns validations array", async () => {
    const data = await request("/api/validations");
    expect(data).toHaveProperty("validations");
  });

  it("GET /api/admin/officers returns officers array", async () => {
    const data = await request("/api/admin/officers");
    expect(data).toHaveProperty("officers");
    expect(Array.isArray(data.officers)).toBe(true);
  });

  it("GET /api/admin/innovators returns innovators array", async () => {
    const data = await request("/api/admin/innovators");
    expect(data).toHaveProperty("innovators");
    expect(Array.isArray(data.innovators)).toBe(true);
  });

  it("GET /api/prototypes returns prototypes array", async () => {
    const data = await request("/api/prototypes");
    expect(data).toHaveProperty("prototypes");
    expect(Array.isArray(data.prototypes)).toBe(true);
  });

  it("POST /api/issues creates a new issue", async () => {
    const data = await request("/api/issues", {
      method: "POST",
      body: JSON.stringify({
        title: "Test issue from vitest",
        description: "This is a test issue created during automated testing for the PRISM platform",
        location: "Mumbai",
      }),
    });
    expect(data).toHaveProperty("issue");
    expect(data.issue.title).toBe("Test issue from vitest");
    expect(data.issue.status).toBe("open");
  });
});
