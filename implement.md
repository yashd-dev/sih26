Implementation Plan
I won’t create/edit files while plan mode is active. Based on the current codebase, I’d add a planning doc set first, then implement the 9 core demo screens using the existing Pivot/UIDAI visual language.
Current Findings

- App uses Next 16.3.5, React 19.2.8, Tailwind v4.
- Landing page is app/page.tsx.
- Existing style is custom Tailwind, not UX4G package-based.
- Main visual language: fixed UIDAI-style header, large PRISM/Pivot logo, pastel panels, rounded cards, purple/navy primary, mint/peach accents, dashboard metric bands.
- Existing reusable pieces are in components/sites/uidai-gov-in-7db8752c/en-7a4ba3ba/.
  Docs I’d Create
  Folder:
  docs/pivot-screens/
  Files:
  00-product-ui-direction.md
  01-landing-page.md
  02-role-selection-login.md
  03-department-dashboard.md
  04-create-challenge-flow.md
  05-challenge-detail-page.md
  06-startup-discovery-matching.md
  07-startup-portal.md
  08-application-proposal-page.md
  09-expert-evaluation-workspace.md
  10-pilot-protocol-builder.md
  11-pilot-execution-dashboard.md
  12-independent-validation-screen.md
  13-evidence-profile-page.md
  14-procurement-decision-page.md
  15-admin-configuration-console.md
  99-demo-flow-priority.md
  Each page doc will include:
  Purpose
  Primary users
  Route
  Demo story role
  Required content
  Layout structure
  Visual treatment
  Components needed
  Mock data
  Interactions
  Responsive behavior
  Accessibility notes
  Implementation notes
  Acceptance checklist
  Shared App Plan
  I’d implement the authenticated area with shared components so every screen feels like one product, not disconnected mockups.
  Routes:
  / Landing page
  /login Role selection / mock login
  /dashboard Department dashboard
  /challenges/new Create challenge flow
  /challenges/urban-queue Challenge detail page
  /matching Startup discovery / matching
  /startup Startup portal
  /applications/queue-ai Application / proposal page
  /evaluation Expert evaluation workspace
  /pilots/protocol Pilot protocol builder
  /pilots/live Pilot execution dashboard
  /validation Independent validation screen
  /evidence/queue-ai Evidence profile page
  /procurement/decision Scale-up / procurement decision page
  /admin Admin configuration console
  Shared components:
  PlatformShell
  TopAccessBar
  AuthenticatedHeader
  SidebarRail
  PageHeroBand
  MetricCard
  EvidenceCard
  StatusBadge
  WorkflowStepper
  DecisionPanel
  KpiComparisonCard
  RiskFlag
  TimelinePanel
  Phase 1 Demo Screens
  Build these first because they tell the complete hackathon story:

1.  Landing page
2.  Role selection / login
3.  Department dashboard
4.  Create challenge flow
5.  Challenge detail page
6.  Startup matching screen
7.  Expert evaluation workspace
8.  Pilot execution dashboard
9.  Evidence profile
10. Procurement decision page
    I’d include login because it makes the demo feel like a real platform entry point, even though your recommended flow starts at dashboard.
    Page Plans
11. Landing Page

- Keep current page and improve only where needed.
- Add CTAs linking to /login, /dashboard, and /challenges/new.
- Preserve full-width hero, pastel service modules, evidence dashboard band, FAQ, footer.
- Make nav links real routes instead of #.

2. Role Selection / Login

- Route: /login
- Visual: centered government access panel with role cards.
- Roles: Department Officer, Startup, Expert, Validator, Procurement Officer, Admin.
- Interaction: mock “Continue as Department Officer” style links.
- UI: pastel role cards, security note, “Demo environment” badge, quick access buttons.

3. Department Dashboard

- Route: /dashboard
- Sections:
- Active challenges
- Draft challenges
- Pilots in progress
- Evidence awaiting review
- Procurement decisions pending
- Visual: authenticated shell, large welcome band, KPI cards, workflow queue, right-side activity rail.
- Primary CTA: “Create Challenge”.

4. Create Challenge Flow

- Route: /challenges/new
- Sections:
- Natural-language problem input
- AI-structured output preview
- Outcome/KPI editor
- Constraints/geography/budget/timeline
- Publish challenge
- Visual: two-column “officer input” and “AI challenge brief” layout.
- Use a stepper: Problem → Structure → KPIs → Constraints → Publish.
- Demo content: municipal queue reduction challenge.

5. Challenge Detail Page

- Route: /challenges/urban-queue
- Public-facing startup page.
- Sections:
- Problem summary
- Outcomes
- KPIs
- Constraints
- Eligibility
- Documents
- Timeline
- Apply CTA
- Visual: public challenge brief with pastel evidence cards and timeline.

6. Startup Discovery / Matching

- Route: /matching
- Sections:
- Ranked startup matches
- Match percentage
- Capabilities
- Prior deployments
- Evidence count
- Risk flags
- Filters
- Visual: left filter sidebar, right ranked cards.
- Demo matches:
- QueueSense AI, 91%
- CivicFlow Labs, 86%
- NudgeOps, 78%

7. Startup Portal

- Route: /startup
- Sections:
- Company profile
- Capability profile
- Previous deployments
- Certifications/security posture
- Evidence from pilots
- Applications submitted
- Visual: startup profile dashboard with completion score and evidence timeline.

8. Application / Proposal Page

- Route: /applications/queue-ai
- Sections:
- Technical proposal
- Commercial proposal
- Deployment needs
- Evidence attachments
- Eligibility check result
- Visual: form-like proposal workspace, eligibility panel on the right, attachment cards.

9. Expert Evaluation Workspace

- Route: /evaluation
- Sections:
- Blind review mode
- “Solution #17” cards
- Score criteria
- Comments
- Conflict-of-interest prompt
- Criteria:
- Feasibility
- Outcome fit
- Evidence quality
- Scalability
- Cost
- Security
- Visual: serious review desk, scoring sliders/cards, anonymized solution details.

10. Pilot Protocol Builder

- Route: /pilots/protocol
- Sections:
- Objective
- Baseline
- Treatment/control
- Sample size
- Duration
- KPIs
- Stop conditions
- Data/security requirements
- Payment milestones
- Visual: protocol compiler with generated cards and editable fields.

11. Pilot Execution Dashboard

- Route: /pilots/live
- Sections:
- Live KPI tracking
- Milestones
- Baseline vs current vs target
- Data collection status
- Risk/issue log
- Visual: operational dashboard with green metric band, KPI cards, timeline, issue log.

12. Independent Validation Screen

- Route: /validation
- Sections:
- Methodology review
- Dataset checks
- KPI definitions
- Causal analysis output
- Confidence interval
- Threshold
- Pass/fail/needs review
- Visual: validator workspace with statistical summary and audit checklist.

13. Evidence Profile Page

- Route: /evidence/queue-ai
- Most important screen for the idea.
- Sections:
- Domain
- Problem
- Pilot sample
- Effect
- Confidence
- Cost
- Adoption
- Limitations
- Reuse recommendation
- Visual: reusable evidence record, like a “credit report” for a solution’s real-world impact.

14. Scale-up / Procurement Decision Page

- Route: /procurement/decision
- Sections:
- Decision engine output
- Evidence package summary
- Risk
- Cost
- Scalability
- Vendor continuity
- Procurement pathway recommendation
- Decision states:
- Terminate
- Iterate
- Extend
- Scale
- Procure
- Visual: final decision room, large recommendation panel, supporting evidence cards.

15. Admin / Configuration Console

- Route: /admin
- Sections:
- Departments
- Users
- Roles
- Evaluation templates
- Pilot templates
- Workflow rules
- Integrations
- Visual: configuration console, dense but polished, with admin cards and tables.
  Design Direction
  Use the existing style unless you want strict UX4G adoption:
  Primary: #2f2b69 / #1c1b3a
  Surface lavender: #f0eefb / #f4f2ff
  Mint: #eafff6
  Peach: #fff0ea
  Success green: #2f8d55
  Accent orange: #ff5a35
  Cards: white, rounded-xl/2xl, subtle shadow
  Typography: Roboto body, Playfair headings
  Need Your Confirmation
  Before implementation, choose one:

1. Continue with the current Pivot/UIDAI custom style. Recommended for fastest polished hackathon demo.
2. Add and use ux4g-web-components with the default UX4G theme.
3. Add UX4G but override it with custom Pivot colors. If this, send primary and secondary colors, or approve the colors above.
