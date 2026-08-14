export const workflowDiscoveryContent = {
  badge: "WORKFLOW DISCOVERY",
  crumb: "CONX ORBIT / WORKFLOW DISCOVERY",
  steps: [
    { id: "workflow", label: "Workflow" },
    { id: "friction", label: "Friction" },
    { id: "details", label: "Details" },
    { id: "connect", label: "Connect" },
  ],
  workflow: {
    title: "What part of your workflow would you like to improve?",
    subtitle: "Select the areas that create the most friction for your team.",
    options: [
      {
        id: "quotation",
        title: "Quotation & Estimation",
        body: "Preparing quotes, quantities and project costs.",
      },
      {
        id: "drawings",
        title: "Drawings & BOQ",
        body: "Reviewing drawings, revisions and quantities.",
      },
      {
        id: "documents",
        title: "Document Management",
        body: "Finding, extracting and organizing project information.",
      },
      {
        id: "inspection",
        title: "Site Inspection",
        body: "Capturing inspections, photos and field reports.",
      },
      {
        id: "fabrication",
        title: "Fabrication & Panel Tracking",
        body: "Tracking production, delivery and install status.",
      },
      {
        id: "pm",
        title: "Project Management",
        body: "Coordinating teams, timelines and handoffs.",
      },
    ],
  },
  friction: {
    title: "Where is the friction?",
    subtitle: "Tell us what makes this workflow difficult today.",
    options: [
      { id: "manual-entry", title: "Too much manual data entry" },
      { id: "spread-systems", title: "Information is spread across different systems" },
      { id: "repetitive-review", title: "Repetitive document or drawing review" },
      { id: "spreadsheets", title: "Spreadsheets are doing too much of the work" },
      { id: "track-progress", title: "Difficult to track project progress" },
      { id: "manual-reporting", title: "Manual reporting" },
      { id: "rework", title: "Frequent rework or duplicated effort" },
      { id: "hard-to-find", title: "Information is difficult to find" },
      { id: "other", title: "Other" },
    ],
    otherNoteLabel: "Anything else?",
    otherNotePlaceholder: "Briefly describe what happens today...",
  },
  details: {
    title: "Give us a little more context.",
    subtitle: "Even a few details help us understand the workflow.",
    processLabel: "How does your team handle this process today?",
    processPlaceholder:
      "Walk us through the current process, tools used, and who's involved...",
    idealLabel: "What would you ideally like to improve?",
    idealPlaceholder:
      "For example: reduce manual quotation work, compare drawing revisions faster, extract quantities automatically...",
  },
  connect: {
    intro: "Leave your details and we'll use what you've shared as a starting point for the conversation.",
    fields: {
      name: { label: "Full Name", placeholder: "Jordan Ellis", required: true },
      email: { label: "Work Email", placeholder: "jordan@company.com", required: true },
      company: { label: "Company", placeholder: "Company name", required: true },
      role: { label: "Role / Position", placeholder: "e.g. Project Manager", required: false },
      phone: {
        label: "Phone Number",
        placeholder: "+1 (___) ___ ____",
        required: false,
        optionalHint: "Optional",
      },
    },
  },
  success: {
    title: "Thanks — we have a starting point.",
    body: "We'll review the workflow you described and discuss where AI, automation, integration or custom technology could actually help.",
    primaryCta: { label: "Book a Discovery Call", href: "/book-discovery" },
    closeLabel: "Close",
    footnote: "No sales pitch. Just a conversation about the workflow.",
  },
  actions: {
    continue: "Continue",
    back: "Back",
    submit: "Submit My Workflow",
    submitting: "Sending…",
  },
  errors: {
    submit: "Something went wrong. Please try again or email us directly.",
  },
};
