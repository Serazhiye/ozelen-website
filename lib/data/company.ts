import type { IconKey } from "./services";

/** Content shared across Home, About and Careers. */

export const whyGreenSphere: { title: string; description: string }[] = [
  { title: "Engineering Expertise", description: "Chartered engineers and landscape architects working as one integrated team." },
  { title: "Environmental Responsibility", description: "Measurable biodiversity, water and carbon outcomes on every project." },
  { title: "Certified Specialists", description: "Accredited arborists, ecologists and irrigation designers in-house." },
  { title: "Modern Equipment", description: "A GPS-guided fleet and precision plant owned and maintained by us." },
  { title: "Long-Term Maintenance", description: "Stewardship contracts that protect asset value for decades." },
  { title: "Government Compliance", description: "Full procurement, safety and environmental compliance as standard." },
];

export const processSteps: { number: string; title: string; description: string }[] = [
  { number: "01", title: "Site Analysis", description: "Survey, soil testing and ecological baseline." },
  { number: "02", title: "Planning", description: "Masterplanning aligned to budget and brief." },
  { number: "03", title: "Engineering", description: "Grading, drainage and systems design." },
  { number: "04", title: "Construction", description: "Self-delivered earthworks and hardscape." },
  { number: "05", title: "Planting", description: "Phased planting and establishment." },
  { number: "06", title: "Maintenance", description: "Long-term monitored stewardship." },
];

export const industries: { title: string; description: string; icon: IconKey }[] = [
  { title: "Government", description: "Ministries, civic squares and national landmarks.", icon: "infrastructure" },
  { title: "Commercial", description: "Corporate campuses, retail and mixed-use realms.", icon: "landscaping" },
  { title: "Residential", description: "Master-planned communities and developments.", icon: "park" },
  { title: "Education", description: "University and school campus landscapes.", icon: "tree" },
  { title: "Healthcare", description: "Therapeutic gardens and hospital grounds.", icon: "restoration" },
  { title: "Industrial", description: "Industrial parks and logistics estates.", icon: "maintenance" },
  { title: "Transportation", description: "Airports, rail and highway corridors.", icon: "boulevard" },
  { title: "Hospitality", description: "Resorts, hotels and destination landscapes.", icon: "irrigation" },
];

export const milestones: { year: string; title: string; description: string }[] = [
  { year: "2007", title: "Founded", description: "GreenSphere is established with a single landscaping crew and a civic ambition." },
  { year: "2011", title: "First City Park", description: "Delivery of our first major municipal park marks the shift to city-scale work." },
  { year: "2014", title: "Engineering Division", description: "In-house drainage, irrigation and grading engineering is formed." },
  { year: "2017", title: "1 Million Trees", description: "We pass one million trees planted across all programmes." },
  { year: "2020", title: "Restoration Practice", description: "A dedicated environmental restoration practice is launched." },
  { year: "2023", title: "Central Metropolitan Park", description: "Our largest single scheme to date opens to the public." },
  { year: "2026", title: "430+ Projects", description: "GreenSphere becomes the region's leading green infrastructure contractor." },
];

export const values: { title: string; description: string }[] = [
  { title: "Precision", description: "We hold landscape to the same engineering rigour as any critical infrastructure." },
  { title: "Stewardship", description: "We build for the generation that will use the landscape, not the ribbon-cutting." },
  { title: "Integrity", description: "Transparent reporting, honest budgets and compliance without shortcuts." },
  { title: "Ecology", description: "Every project is a chance to leave the environment measurably better." },
];

export const leadership: { name: string; role: string; bio: string }[] = [
  { name: "Elena Voss", role: "Chief Executive Officer", bio: "Two decades leading civic infrastructure delivery across three continents." },
  { name: "Timur Alikhan", role: "Chief Engineering Officer", bio: "Chartered civil engineer specialising in urban water and green systems." },
  { name: "Dr. Aliya Nurlanova", role: "Director of Landscape", bio: "Landscape architect and researcher in resilient urban planting." },
  { name: "Marcus Feldt", role: "Director of Sustainability", bio: "Ecologist leading biodiversity and restoration strategy." },
  { name: "Sofia Berg", role: "Chief Operating Officer", bio: "Programme leader for multi-site municipal frameworks." },
  { name: "Daniyar Orozov", role: "Director of Maintenance", bio: "Heads long-term stewardship and arboriculture operations." },
];

export const awards: { year: string; title: string; body: string }[] = [
  { year: "2026", title: "Green Infrastructure Contractor of the Year", body: "Regional Infrastructure Awards" },
  { year: "2025", title: "Excellence in Public Realm", body: "National Landscape Institute" },
  { year: "2024", title: "Sustainability Project of the Year", body: "Built Environment Council" },
  { year: "2023", title: "Best Large-Scale Park", body: "Urban Design Awards" },
  { year: "2022", title: "Engineering Innovation Award", body: "Civil Engineering Society" },
  { year: "2021", title: "Safety Leadership Commendation", body: "Occupational Safety Board" },
];

export const certifications: string[] = [
  "ISO 9001 Quality",
  "ISO 14001 Environmental",
  "ISO 45001 Safety",
  "Certified Arboriculture",
  "Irrigation Association",
  "Government Framework Approved",
];

export const careerBenefits: { title: string; description: string }[] = [
  { title: "Meaningful Work", description: "Build the parks and landscapes that define how cities feel for generations." },
  { title: "Growth & Training", description: "Funded certifications, mentorship and clear progression paths." },
  { title: "Modern Equipment", description: "Work with a best-in-class, well-maintained fleet and technology." },
  { title: "Health & Safety", description: "An industry-leading safety culture that puts people first." },
  { title: "Competitive Reward", description: "Market-leading pay, bonuses and comprehensive benefits." },
  { title: "Team Culture", description: "A collaborative, multidisciplinary team that respects craft." },
];

export const openPositions: {
  title: string;
  department: string;
  location: string;
  type: string;
}[] = [
  { title: "Senior Landscape Architect", department: "Design", location: "Astana", type: "Full-time" },
  { title: "Civil Engineer — Drainage", department: "Engineering", location: "Astana", type: "Full-time" },
  { title: "Irrigation Systems Designer", department: "Engineering", location: "Almaty", type: "Full-time" },
  { title: "Certified Arborist", department: "Maintenance", location: "Shymkent", type: "Full-time" },
  { title: "Site Manager — Parks", department: "Construction", location: "Astana", type: "Full-time" },
  { title: "Ecologist", department: "Sustainability", location: "Almaty", type: "Full-time" },
  { title: "Project Estimator", department: "Commercial", location: "Astana", type: "Full-time" },
  { title: "Heavy Plant Operator", department: "Construction", location: "Various", type: "Full-time" },
];

export const departments: { name: string; email: string; description: string }[] = [
  { name: "New Business & Tenders", email: "tenders@greensphere.com", description: "Bids, frameworks and project enquiries." },
  { name: "Careers & Recruitment", email: "careers@greensphere.com", description: "Job applications and talent enquiries." },
  { name: "Media & Press", email: "press@greensphere.com", description: "Press, interviews and media requests." },
  { name: "Supplier Relations", email: "suppliers@greensphere.com", description: "Procurement and partnership enquiries." },
];
