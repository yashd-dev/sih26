import { describe, it, expect } from "vitest";

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

let authToken: string | null = null;

async function request(path: string, init?: RequestInit) {
  const headers: Record<string, string> = { "Content-Type": "application/json", ...init?.headers as Record<string, string> };
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

async function getToken() {
  const email = `test-auth-${Date.now()}@example.com`;
  const res = await request("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name: "Test User", email, role: "officer", department: "Testing", password: "testpass123" }),
  });
  return res.token;
}

describe("Innovator registration", () => {
  it("POST /api/innovators/register registers an innovator", async () => {
    const data = await request("/api/innovators/register", {
      method: "POST",
      body: JSON.stringify({
        name: "Test Innovator",
        email: `test-${Date.now()}@example.com`,
        organization: "Test Corp",
      }),
    });
    expect(data).toHaveProperty("innovator");
    expect(data.innovator.name).toBe("Test Innovator");
  });
});

describe("Solution submission", () => {
  it("POST /api/solutions/submit submits a solution", async () => {
    authToken = await getToken();
    const challenges = await request("/api/challenges");
    const innovators = await request("/api/admin/innovators");
    if (challenges.challenges.length === 0 || innovators.innovators.length === 0) return;
    const data = await request("/api/solutions/submit", {
      method: "POST",
      body: JSON.stringify({
        challenge_id: challenges.challenges[0].id,
        innovator_id: innovators.innovators[0].id,
        title: "QueueSense Pro",
        description: "AI queue management",
        approach: "Real-time optimization",
      }),
    });
    expect(data).toHaveProperty("solution");
    expect(data.solution.title).toBe("QueueSense Pro");
  });
});

describe("Pilot creation", () => {
  it("POST /api/pilots creates a pilot", async () => {
    authToken = await getToken();
    const challenges = await request("/api/challenges");
    if (challenges.challenges.length === 0) return;
    const data = await request("/api/pilots", {
      method: "POST",
      body: JSON.stringify({
        challenge_id: challenges.challenges[0].id,
        title: "Queue Management Pilot - Test",
        description: "Testing AI queue management in 6 centers",
        methodology: "RCT",
        treatment_sites: "6",
        control_sites: "6",
        duration: "6 months",
        kpis: [{ name: "Wait time", baseline: "42 min", target: "25 min", current: "—" }],
      }),
    });
    expect(data).toHaveProperty("pilot");
    expect(data.pilot.title).toBe("Queue Management Pilot - Test");
  });
});

describe("Citizen issues flow", () => {
  it("creates issue and upvotes it", async () => {
    const created = await request("/api/issues", {
      method: "POST",
      body: JSON.stringify({
        title: "Broken streetlights on MG Road",
        description: "Street lights have been non-functional for 2 weeks in the area",
        location: "Mumbai, MG Road",
      }),
    });
    const issueId = created.issue.id;
    expect(created.issue.upvotes).toBe("0");

    const upvoted = await request(`/api/issues/${issueId}/upvote`, { method: "POST" });
    expect(Number(upvoted.upvotes)).toBe(1);
  });
});

describe("Prototype CRUD", () => {
  it("creates and lists prototypes", async () => {
    authToken = await getToken();
    const challenges = await request("/api/challenges");
    if (challenges.challenges.length === 0) return;
    const created = await request("/api/prototypes", {
      method: "POST",
      body: JSON.stringify({
        challenge_id: challenges.challenges[0].id,
        innovator_id: "00000000-0000-0000-0000-000000000001",
        title: "Test Prototype",
        description: "A test prototype",
        tech_stack: ["React", "Node.js"],
      }),
    });
    expect(created).toHaveProperty("prototype");
    expect(created.prototype.title).toBe("Test Prototype");

    const list = await request("/api/prototypes");
    expect(list.prototypes.some((p: any) => p.id === created.prototype.id)).toBe(true);
  });
});

describe("Attachment upload", () => {
  it("lists attachments", async () => {
    const data = await request("/api/attachments");
    expect(data).toHaveProperty("attachments");
    expect(Array.isArray(data.attachments)).toBe(true);
  });
});
