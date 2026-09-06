export type Project = {
  number: string;
  category: string;
  title: string;
  summary: string;
  role: string[];
  areas: string[];
};

export const projects: Project[] = [
  {
    number: "01",
    category: "Healthcare · Web · Digital Identity",
    title: "Healthcare Digital Identity Platform",
    summary: "A secure web-based healthcare ecosystem centered around a digital identity card and connected services.",
    role: ["Project Management", "QA & Testing", "Client Communication", "Technical Coordination"],
    areas: ["Healthcare", "Digital Identity", "API Integration", "Security"]
  },
  {
    number: "02",
    category: "AgriTech · MIS · Field Operations",
    title: "Livestock Management & Rearing MIS",
    summary: "A management information system supporting livestock rearing, monitoring, advisory services and field operations.",
    role: ["Requirement Analysis", "Project Planning", "QA Strategy", "Stakeholder Coordination"],
    areas: ["MIS", "Livestock", "AgriTech", "Data Management"]
  },
  {
    number: "03",
    category: "AgriTech · ERP · Operations",
    title: "Plantation & Farming Management ERP",
    summary: "An operational platform providing visibility across plantation and farming activities, resources and workflows.",
    role: ["Business Analysis", "Workflow Definition", "Project Planning", "QA & Validation"],
    areas: ["ERP", "Agriculture", "Operations", "Reporting"]
  },
  {
    number: "04",
    category: "Enterprise · Workflow · Project Management",
    title: "Enterprise Project Management System",
    summary: "An enterprise platform for planning and tracking projects, tasks, dependencies, teams and delivery activities.",
    role: ["Product Requirements", "Prioritization", "Sprint Management", "Delivery Management"],
    areas: ["Gantt", "Dependencies", "Critical Path", "Workflow"]
  },
  {
    number: "05",
    category: "AI · Healthcare · Intelligent Workflows",
    title: "Agentic AI Healthcare Platform",
    summary: "An AI-driven healthcare solution exploring agentic workflows for intelligent information processing and operations.",
    role: ["Requirement Analysis", "AI Workflow Coordination", "QA & Validation", "Client Communication"],
    areas: ["AI", "Agentic AI", "Healthcare", "Intelligent Workflows"]
  },
  {
    number: "06",
    category: "Media · Collaboration · Digital Assets",
    title: "Media-Based Project Management Platform",
    summary: "A project management environment designed around media-rich workflows, collaboration and digital asset handling.",
    role: ["Requirement Gathering", "Workflow Analysis", "QA Coordination", "Release Management"],
    areas: ["Project Management", "Media", "Digital Assets", "Collaboration"]
  }
];
