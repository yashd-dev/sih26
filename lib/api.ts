const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("prism_token");
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}${path}`, {
    headers,
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error || `Request failed: ${res.status}`);
  }
  return res.json();
}

// ── Officers ──

export type Officer = {
  id: string;
  name: string;
  department: string;
  rank: string | null;
  email: string;
  createdAt: string;
};

export async function registerOfficer(data: {
  name: string;
  department: string;
  rank?: string;
  email: string;
}): Promise<{ officer: Officer; message?: string }> {
  return request("/api/officers/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ── Challenges ──

export type Challenge = {
  id: string;
  problemStatement: string;
  desiredOutcome: string;
  baseline: string | null;
  target: string | null;
  constraints: string[];
  geography: string | null;
  kpis: string[];
  status: "draft" | "approved" | "rejected";
  createdAt: string;
  officerName: string;
  officerDepartment: string;
};

export type ChallengeDetail = Challenge & {
  comments: Comment[];
  solution_count: number;
};

export async function listChallenges(): Promise<{ challenges: Challenge[] }> {
  return request("/api/challenges");
}

export async function getChallenge(id: string): Promise<ChallengeDetail> {
  return request(`/api/challenges/${id}`);
}

export type StructuredChallenge = {
  officer_id: string;
  raw_description: string;
  problem_statement: string;
  desired_outcome: string;
  baseline: string | null;
  target: string | null;
  constraints: string[];
  geography: string | null;
  kpis: string[];
  premature_technology: string | null;
};

export async function createChallenge(data: {
  officer_id: string;
  description: string;
}): Promise<StructuredChallenge> {
  return request("/api/challenges/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function approveChallenge(data: {
  officer_id: string;
  raw_description: string;
  problem_statement: string;
  desired_outcome: string;
  baseline?: string;
  target?: string;
  constraints?: string[];
  geography?: string;
  kpis?: string[];
}): Promise<{ challenge: Challenge }> {
  return request("/api/challenges/approve", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function chatChallenge(data: {
  officer_id: string;
  challenge: Partial<StructuredChallenge>;
  message: string;
  exchange_count?: number;
}): Promise<{
  ai_message: string;
  updated_challenge: Partial<StructuredChallenge>;
  chat_enabled: boolean;
  exchange_count: number;
}> {
  return request("/api/challenges/chat", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ── Innovators ──

export type Innovator = {
  id: string;
  name: string;
  email: string;
  organization: string | null;
  bio: string | null;
  createdAt: string;
};

export async function registerInnovator(data: {
  name: string;
  email: string;
  organization?: string;
  bio?: string;
}): Promise<{ innovator: Innovator; message?: string }> {
  return request("/api/innovators/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ── Solutions ──

export type Solution = {
  id: string;
  title: string;
  description: string;
  approach: string;
  techStack: string[];
  estimatedCost: string | null;
  timeline: string | null;
  status: "submitted" | "under_review" | "shortlisted" | "rejected";
  createdAt: string;
  innovatorName: string;
  innovatorOrganization: string | null;
};

export async function listSolutions(challengeId: string): Promise<{ solutions: Solution[] }> {
  return request(`/api/challenges/${challengeId}/solutions`);
}

export async function submitSolution(data: {
  challenge_id: string;
  innovator_id: string;
  title: string;
  description: string;
  approach: string;
  tech_stack?: string[];
  estimated_cost?: string;
  timeline?: string;
}): Promise<{ solution: Solution }> {
  return request("/api/solutions/submit", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ── Comments ──

export type Comment = {
  id: string;
  challengeId: string;
  authorType: "officer" | "innovator" | "expert";
  authorId: string;
  content: string;
  createdAt: string;
};

export async function listComments(challengeId: string): Promise<{ comments: Comment[] }> {
  return request(`/api/challenges/${challengeId}/comments`);
}

export async function addComment(
  challengeId: string,
  data: { author_type: string; author_id: string; content: string }
): Promise<{ comment: Comment }> {
  return request(`/api/challenges/${challengeId}/comments`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ── Issues ──

export type Issue = {
  id: string;
  title: string;
  description: string;
  location: string | null;
  upvotes: string;
  status: "open" | "promoted" | "resolved";
  createdAt: string;
};

export async function listIssues(): Promise<{ issues: Issue[] }> {
  return request("/api/issues");
}

export async function postIssue(data: {
  title: string;
  description: string;
  location?: string;
}): Promise<{ issue: Issue }> {
  return request("/api/issues", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function upvoteIssue(id: string): Promise<{ issue_id: string; upvotes: string }> {
  return request(`/api/issues/${id}/upvote`, { method: "POST" });
}

export async function promoteIssue(
  id: string,
  officer_id: string
): Promise<{ promoted: boolean; raw_description: string; message: string }> {
  return request(`/api/issues/${id}/promote`, {
    method: "POST",
    body: JSON.stringify({ officer_id }),
  });
}

// ── Matching ──

export type MatchResult = {
  id: string;
  problemStatement: string;
  desiredOutcome: string;
  geography: string | null;
  similarity: number;
};

export async function matchChallenge(challenge_id: string): Promise<{ similar_challenges: MatchResult[] }> {
  return request("/api/match/challenge", {
    method: "POST",
    body: JSON.stringify({ challenge_id }),
  });
}

export async function matchSolution(solution_id: string): Promise<{ applicable_challenges: MatchResult[] }> {
  return request("/api/match/solution", {
    method: "POST",
    body: JSON.stringify({ solution_id }),
  });
}

export async function matchIssue(issue_id: string): Promise<{ similar_issues: Array<Issue & { similarity: number }> }> {
  return request("/api/match/issue", {
    method: "POST",
    body: JSON.stringify({ issue_id }),
  });
}

// ── Evaluations ──

export type Evaluation = {
  id: string;
  solutionId: string;
  expertId: string;
  scores: Record<string, number>;
  overallScore: string | null;
  comments: string | null;
  conflictDeclared: boolean;
  status: "pending" | "in_review" | "completed";
  createdAt: string;
};

export async function submitEvaluation(data: {
  solution_id: string;
  expert_id: string;
  scores: Record<string, number>;
  comments?: string;
  conflict_declared?: boolean;
}): Promise<{ evaluation: Evaluation }> {
  return request("/api/evaluations", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function listEvaluations(solutionId: string): Promise<{ evaluations: Evaluation[] }> {
  return request(`/api/evaluations/${solutionId}`);
}

export async function getEvaluationStats(challengeId: string): Promise<{
  stats: { total: number; evaluated: number; avgScore: number };
}> {
  return request(`/api/evaluations/stats/${challengeId}`);
}

// ── Pilots ──

export type Pilot = {
  id: string;
  title: string;
  description: string | null;
  status: "planning" | "active" | "paused" | "completed" | "terminated";
  duration: string | null;
  startDate: string | null;
  challengeId: string;
  createdAt: string;
  challengeTitle: string;
};

export type PilotDetail = Pilot & {
  methodology: string | null;
  treatmentSites: string | null;
  controlSites: string | null;
  endDate: string | null;
  kpis: Array<{ name: string; baseline: string; target: string; current: string }>;
  milestones: Array<{ title: string; description: string; date: string; status: string }>;
  issues: Array<{ title: string; severity: string; date: string }>;
};

export async function createPilot(data: {
  challenge_id: string;
  solution_id?: string;
  title: string;
  description?: string;
  methodology?: string;
  treatment_sites?: string;
  control_sites?: string;
  duration?: string;
  start_date?: string;
  kpis?: Array<{ name: string; baseline: string; target: string; current: string }>;
}): Promise<{ pilot: Pilot }> {
  return request("/api/pilots", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function listPilots(): Promise<{ pilots: Pilot[] }> {
  return request("/api/pilots");
}

export async function getPilot(id: string): Promise<{ pilot: PilotDetail }> {
  return request(`/api/pilots/${id}`);
}

export async function updatePilotKPIs(
  pilotId: string,
  kpis: Array<{ name: string; baseline: string; target: string; current: string }>
): Promise<{ updated: boolean }> {
  return request(`/api/pilots/${pilotId}/kpis`, {
    method: "POST",
    body: JSON.stringify({ kpis }),
  });
}

export async function addPilotMilestone(
  pilotId: string,
  milestone: { title: string; description: string; date: string; status: string }
): Promise<{ updated: boolean; milestones: PilotDetail["milestones"] }> {
  return request(`/api/pilots/${pilotId}/milestones`, {
    method: "POST",
    body: JSON.stringify(milestone),
  });
}

export async function addPilotIssue(
  pilotId: string,
  issue: { title: string; severity: string; date: string }
): Promise<{ updated: boolean; issues: PilotDetail["issues"] }> {
  return request(`/api/pilots/${pilotId}/issues`, {
    method: "POST",
    body: JSON.stringify(issue),
  });
}

// ── Procurement ──

export type ProcurementDecision = {
  id: string;
  decision: string | null;
  evidenceScore: string | null;
  riskAssessment: string | null;
  status: "pending" | "approved" | "rejected" | "in_progress";
  createdAt: string;
  challengeTitle: string;
  pilotTitle: string;
};

export type ProcurementDecisionDetail = ProcurementDecision & {
  pilotId: string;
  challengeId: string;
  costAnalysis: string | null;
  scalability: string | null;
  vendorContinuity: string | null;
  recommendation: string | null;
};

export async function createProcurementDecision(data: {
  pilot_id: string;
  challenge_id: string;
  decision?: string;
  evidence_score?: string;
  risk_assessment?: string;
  cost_analysis?: string;
  scalability?: string;
  vendor_continuity?: string;
  recommendation?: string;
}): Promise<{ decision: ProcurementDecision }> {
  return request("/api/procurement", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function listProcurementDecisions(): Promise<{ decisions: ProcurementDecision[] }> {
  return request("/api/procurement");
}

export async function getProcurementDecision(id: string): Promise<{ decision: ProcurementDecisionDetail }> {
  return request(`/api/procurement/${id}`);
}

export async function updateProcurementDecision(
  id: string,
  data: { decision: string; status?: string }
): Promise<{ updated: boolean }> {
  return request(`/api/procurement/${id}/decision`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ── Validations ──

export type Validation = {
  id: string;
  pilotId: string;
  expertId: string;
  methodologyType: string | null;
  datasetRecords: string | null;
  completeness: string | null;
  outliers: string | null;
  kpiResults: Array<{ name: string; baseline: string; result: string; pValue: string; ci: string; significant: boolean }>;
  causalEffect: string | null;
  confidence: string | null;
  confounders: string[];
  checklist: Array<{ item: string; checked: boolean }>;
  decision: string | null;
  status: "pending" | "in_review" | "passed" | "failed";
  createdAt: string;
};

export async function submitValidation(data: {
  pilot_id: string;
  expert_id: string;
  methodology_type?: string;
  dataset_records?: string;
  completeness?: string;
  outliers?: string;
  kpi_results?: Validation["kpiResults"];
  causal_effect?: string;
  confidence?: string;
  confounders?: string[];
  checklist?: Validation["checklist"];
  decision?: string;
}): Promise<{ validation: Validation }> {
  return request("/api/validations", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getValidation(pilotId: string): Promise<{ validation: Validation }> {
  return request(`/api/validations/${pilotId}`);
}

export async function listValidations(): Promise<{ validations: Array<Validation & { pilotTitle: string }> }> {
  return request("/api/validations");
}

// ── Admin: Officers CRUD ──

export type AdminOfficer = {
  id: string;
  name: string;
  department: string;
  rank: string | null;
  email: string;
  createdAt: string;
};

export async function listOfficers(): Promise<{ officers: AdminOfficer[] }> {
  return request("/api/admin/officers");
}

export async function getOfficer(id: string): Promise<{ officer: AdminOfficer }> {
  return request(`/api/admin/officers/${id}`);
}

export async function updateOfficer(id: string, data: { name?: string; department?: string; rank?: string }): Promise<{ officer: AdminOfficer }> {
  return request(`/api/admin/officers/${id}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteOfficer(id: string): Promise<{ deleted: boolean }> {
  return request(`/api/admin/officers/${id}`, { method: "DELETE" });
}

// ── Admin: Innovators CRUD ──

export type AdminInnovator = Innovator;

export async function listInnovators(): Promise<{ innovators: AdminInnovator[] }> {
  return request("/api/admin/innovators");
}

export async function deleteInnovator(id: string): Promise<{ deleted: boolean }> {
  return request(`/api/admin/innovators/${id}`, { method: "DELETE" });
}

// ── Admin: Stats ──

export type AdminStats = {
  officers: number;
  innovators: number;
  challenges: number;
  solutions: number;
  pilots: number;
  evaluations: number;
  openIssues: number;
};

export async function getAdminStats(): Promise<{ stats: AdminStats }> {
  return request("/api/admin/stats");
}

// ── Auth ──

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "officer" | "startup" | "expert" | "validator" | "procurement" | "admin";
  department: string;
};

export type AuthResponse = { user?: AuthUser; token?: string; error?: string };

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const res = await request<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (res.token && typeof window !== "undefined") {
    localStorage.setItem("prism_token", res.token);
  }
  return res;
}

export async function registerUser(data: { name: string; email: string; role: string; department?: string; password: string }): Promise<AuthResponse> {
  const res = await request<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (res.token && typeof window !== "undefined") {
    localStorage.setItem("prism_token", res.token);
  }
  return res;
}

// ── Charts ──

export type ChartData = {
  challengesByStatus: Array<{ name: string; value: number }>;
  solutionsByStatus: Array<{ name: string; value: number }>;
  pilotsByStatus: Array<{ name: string; value: number }>;
  issuesByStatus: Array<{ name: string; value: number }>;
};

export async function getChartData(): Promise<{ charts: ChartData }> {
  return request("/api/charts");
}

// ── Prototypes ──

export type Prototype = {
  id: string;
  challengeId: string;
  innovatorId: string;
  title: string;
  description: string | null;
  approach: string | null;
  techStack: string[];
  repositoryUrl: string | null;
  demoUrl: string | null;
  status: string;
  version: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export async function listPrototypes(challengeId?: string): Promise<{ prototypes: Prototype[] }> {
  const params = challengeId ? `?challengeId=${challengeId}` : "";
  return request(`/api/prototypes${params}`);
}

export async function getPrototype(id: string): Promise<{ prototype: Prototype }> {
  return request(`/api/prototypes/${id}`);
}

export async function createPrototype(data: {
  challenge_id: string;
  innovator_id: string;
  title: string;
  description?: string;
  approach?: string;
  tech_stack?: string[];
  repository_url?: string;
  demo_url?: string;
  notes?: string;
}): Promise<{ prototype: Prototype }> {
  return request("/api/prototypes", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updatePrototype(id: string, data: {
  title?: string;
  description?: string;
  approach?: string;
  tech_stack?: string[];
  repository_url?: string;
  demo_url?: string;
  status?: string;
  version?: string;
  notes?: string;
}): Promise<{ prototype: Prototype }> {
  return request(`/api/prototypes/${id}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deletePrototype(id: string): Promise<{ deleted: boolean }> {
  return request(`/api/prototypes/${id}`, { method: "DELETE" });
}

// ── Attachments ──

export type Attachment = {
  id: string;
  pilotId: string | null;
  challengeId: string | null;
  uploadedBy: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  fileSize: string;
  category: string | null;
  description: string | null;
  createdAt: string;
};

export async function listAttachments(params?: { pilotId?: string; challengeId?: string }): Promise<{ attachments: Attachment[] }> {
  const searchParams = new URLSearchParams();
  if (params?.pilotId) searchParams.set("pilotId", params.pilotId);
  if (params?.challengeId) searchParams.set("challengeId", params.challengeId);
  const qs = searchParams.toString();
  return request(`/api/attachments${qs ? `?${qs}` : ""}`);
}

export async function uploadAttachment(file: File, meta: { pilot_id?: string; challenge_id?: string; uploaded_by: string; category?: string; description?: string }): Promise<{ attachment: Attachment }> {
  const formData = new FormData();
  formData.append("file", file);
  if (meta.pilot_id) formData.append("pilot_id", meta.pilot_id);
  if (meta.challenge_id) formData.append("challenge_id", meta.challenge_id);
  formData.append("uploaded_by", meta.uploaded_by);
  if (meta.category) formData.append("category", meta.category);
  if (meta.description) formData.append("description", meta.description);

  const res = await fetch(`${BASE_URL}/api/attachments/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}

export async function deleteAttachment(id: string): Promise<{ deleted: boolean }> {
  return request(`/api/attachments/${id}`, { method: "DELETE" });
}

export function getAttachmentDownloadUrl(id: string): string {
  return `${BASE_URL}/api/attachments/${id}/download`;
}
