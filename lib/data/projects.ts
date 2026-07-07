export type ProjectStat = { label: string; value: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
  client: string;
  location: string;
  year: string;
  area: string;
  /** Card summary */
  summary: string;
  /** Hero overview paragraphs */
  overview: string[];
  objectives: string[];
  challenges: { title: string; description: string }[];
  solutions: { title: string; description: string }[];
  engineering: string[];
  /** Key figures shown in the project statistics grid */
  keyStats: ProjectStat[];
  timeline: { phase: string; period: string; description: string }[];
  outcome: string[];
  galleryLabels: string[];
  /** Feature size for the masonry grid on listing pages */
  span: "sm" | "md" | "lg";
};

export const projects: Project[] = [
  {
    slug: "central-metropolitan-park",
    title: "Central Metropolitan Park",
    category: "City Park",
    client: "Metropolitan Municipality",
    location: "Astana, Kazakhstan",
    year: "2023",
    area: "42 ha",
    span: "lg",
    summary:
      "A 42-hectare central park transforming a former rail yard into the city's ecological and civic heart.",
    overview: [
      "Central Metropolitan Park reclaims 42 hectares of derelict rail land as a new civic centre for the capital — a continuous landscape of woodland, wetland, plaza and play knitted into the surrounding districts.",
      "GreenSphere delivered the scheme end to end: remediation, terrain, water systems, 14 kilometres of path, and more than 90,000 trees and shrubs established to read as mature from opening day.",
    ],
    objectives: [
      "Convert contaminated brownfield into safe, accessible public parkland.",
      "Create a blue-green network that manages stormwater for the district.",
      "Deliver instant canopy through semi-mature planting.",
      "Connect four neighbourhoods severed by the former rail corridor.",
    ],
    challenges: [
      { title: "Contaminated Ground", description: "Decades of rail use left hydrocarbon and heavy-metal contamination across the site." },
      { title: "Severed Districts", description: "The corridor divided four neighbourhoods with no safe crossing." },
      { title: "Stormwater Load", description: "The catchment overwhelmed the city drainage during peak storms." },
    ],
    solutions: [
      { title: "In-Situ Remediation", description: "Soil washing and capping created a safe substrate without mass off-haul." },
      { title: "Land Bridges", description: "Three landscaped bridges reconnected the districts across the park." },
      { title: "Retention Wetlands", description: "A wetland chain stores and cleans stormwater before release." },
    ],
    engineering: [
      "Balanced cut-and-fill across 42 ha to eliminate imported fill.",
      "Blue-green stormwater network sized for a 1-in-100-year storm.",
      "Structural soil beneath all plazas for long-term tree health.",
      "Central smart-irrigation control across 40 zones.",
    ],
    keyStats: [
      { label: "Total Area", value: "42 ha" },
      { label: "Trees Planted", value: "24,800" },
      { label: "Shrubs", value: "68,500" },
      { label: "Flowers", value: "310,000" },
      { label: "Lawn Area", value: "9.4 ha" },
      { label: "Pathways", value: "14 km" },
      { label: "Duration", value: "34 months" },
      { label: "Stormwater", value: "1.8M m³/yr" },
    ],
    timeline: [
      { phase: "Remediation", period: "2020", description: "Contamination treatment and ground preparation." },
      { phase: "Terrain & Water", period: "2021", description: "Earthworks, wetlands and drainage network." },
      { phase: "Construction", period: "2022", description: "Paths, bridges, plazas and lighting." },
      { phase: "Planting & Opening", period: "2023", description: "Semi-mature planting and public opening." },
    ],
    outcome: [
      "The park now draws over four million visits a year and has lifted surrounding land values while cutting district flood risk.",
      "Post-opening monitoring records a 34% biodiversity net gain and summer temperatures up to 4°C lower than adjacent streets.",
    ],
    galleryLabels: [
      "Aerial Masterplan", "Remediation Phase", "Wetland Chain", "Land Bridge",
      "Central Plaza", "Woodland Walk", "Play Landscape", "Boardwalk",
      "Night Lighting", "Semi-Mature Grove", "Event Lawn", "Opening Day",
    ],
  },
  {
    slug: "capital-riverside-boulevard",
    title: "Capital Riverside Boulevard",
    category: "Boulevard",
    client: "Capital Development Agency",
    location: "Nur-Sultan, Kazakhstan",
    year: "2022",
    area: "6.5 km",
    span: "md",
    summary:
      "A 6.5-kilometre riverside boulevard turning a traffic artery into a cool, walkable green spine.",
    overview: [
      "The Riverside Boulevard reimagines 6.5 kilometres of car-dominated waterfront as a continuous green promenade, with a double avenue of trees, cycle network and restored riverbank.",
      "GreenSphere engineered the below-ground systems that let street trees thrive — structural soil, sub-surface irrigation and drainage — beneath a fully rebuilt public realm.",
    ],
    objectives: [
      "Cool the corridor and cut urban heat-island effect.",
      "Establish a healthy, long-lived double tree avenue.",
      "Reconnect the city to its river edge.",
      "Integrate active travel along the whole length.",
    ],
    challenges: [
      { title: "Hostile Root Zone", description: "Compacted, utility-laden ground gave street trees almost no rooting volume." },
      { title: "Live Traffic", description: "The route had to stay open throughout construction." },
      { title: "Flood Exposure", description: "The riverbank flooded seasonally, threatening new planting." },
    ],
    solutions: [
      { title: "Structural Soil Cells", description: "Load-bearing cells gave every tree engineered rooting volume." },
      { title: "Lane-by-Lane Delivery", description: "Phased traffic management kept the corridor open." },
      { title: "Bioengineered Bank", description: "A living riverbank absorbs flood energy and adds habitat." },
    ],
    engineering: [
      "3,200 structural soil cells beneath the paving.",
      "Sub-surface drip irrigation to every tree pit.",
      "Bioengineered bank stabilisation over 6.5 km.",
      "Permeable paving to reduce runoff.",
    ],
    keyStats: [
      { label: "Length", value: "6.5 km" },
      { label: "Trees Planted", value: "3,400" },
      { label: "Shrubs", value: "41,000" },
      { label: "Flowers", value: "120,000" },
      { label: "Lawn Area", value: "3.1 ha" },
      { label: "Cycle Path", value: "6.5 km" },
      { label: "Duration", value: "22 months" },
      { label: "Street Cooling", value: "−4.2°C" },
    ],
    timeline: [
      { phase: "Survey & Design", period: "2020", description: "Utility mapping and below-ground engineering." },
      { phase: "Bank Works", period: "2021", description: "Riverbank stabilisation and drainage." },
      { phase: "Boulevard Build", period: "2021–22", description: "Soil cells, paving and avenue planting." },
      { phase: "Completion", period: "2022", description: "Cycle network, lighting and handover." },
    ],
    outcome: [
      "The boulevard has become the city's most-used public space, with measured peak-street cooling of over 4°C.",
      "Independent monitoring projects a 92% ten-year tree survival rate — far above regional street-tree norms.",
    ],
    galleryLabels: [
      "Corridor Aerial", "Utility Survey", "Soil Cell Install", "Bank Bioengineering",
      "Avenue Planting", "Cycle Promenade", "River Edge", "Median Detail",
      "Evening View", "Permeable Paving", "Seating Node", "Completed Boulevard",
    ],
  },
  {
    slug: "international-airport-green-zone",
    title: "International Airport Green Zone",
    category: "Transportation",
    client: "National Airports Authority",
    location: "Almaty, Kazakhstan",
    year: "2024",
    area: "58 ha",
    span: "md",
    summary:
      "A 58-hectare arrival landscape and biodiversity buffer engineered around strict aviation constraints.",
    overview: [
      "The Airport Green Zone frames the arrival experience of a major international gateway while meeting exacting aviation safety rules on wildlife, height and sightlines.",
      "GreenSphere delivered a low-wildlife-attractant landscape, stormwater management for vast impermeable aprons, and a signature arrival forecourt — all inside a live, secure airfield.",
    ],
    objectives: [
      "Create a world-class arrival landscape and forecourt.",
      "Meet aviation wildlife-hazard and obstacle-limitation rules.",
      "Manage runoff from extensive impermeable surfaces.",
      "Deliver within a secure, operational airfield.",
    ],
    challenges: [
      { title: "Wildlife Restrictions", description: "Planting could not attract birds that endanger aircraft." },
      { title: "Security & Access", description: "All works ran inside a live, restricted-access airfield." },
      { title: "Vast Runoff", description: "Aprons and taxiways generated enormous stormwater volumes." },
    ],
    solutions: [
      { title: "Low-Attractant Palette", description: "Species selected to avoid attracting hazardous bird species." },
      { title: "Escorted Delivery", description: "Vetted crews and staged logistics under airport security." },
      { title: "Engineered Detention", description: "Detention basins and swales buffer apron runoff." },
    ],
    engineering: [
      "Obstacle-limitation-compliant planting heights.",
      "Wildlife-hazard-assessed species palette.",
      "12,000 m³ stormwater detention capacity.",
      "Drought-tolerant, low-maintenance groundcover.",
    ],
    keyStats: [
      { label: "Total Area", value: "58 ha" },
      { label: "Trees Planted", value: "6,100" },
      { label: "Shrubs", value: "88,000" },
      { label: "Flowers", value: "95,000" },
      { label: "Lawn Area", value: "11 ha" },
      { label: "Detention", value: "12,000 m³" },
      { label: "Duration", value: "26 months" },
      { label: "Bird Strikes", value: "−0 incidents" },
    ],
    timeline: [
      { phase: "Compliance Design", period: "2022", description: "Aviation and ecological approvals." },
      { phase: "Earth & Water", period: "2022–23", description: "Detention basins and grading." },
      { phase: "Landscape Build", period: "2023", description: "Forecourt, planting and irrigation." },
      { phase: "Handover", period: "2024", description: "Establishment and operations handover." },
    ],
    outcome: [
      "The gateway now opens with a landmark arrival landscape while maintaining a flawless wildlife-safety record.",
      "Stormwater from the aprons is fully buffered on site, removing a long-standing flood risk to airport operations.",
    ],
    galleryLabels: [
      "Airfield Aerial", "Compliance Model", "Detention Basin", "Forecourt Build",
      "Arrival Avenue", "Drought Planting", "Swale Network", "Signage Garden",
      "Night Arrival", "Groundcover Detail", "Secure Logistics", "Completed Gateway",
    ],
  },
  {
    slug: "government-administrative-square",
    title: "Government Administrative Square",
    category: "Government",
    client: "Office of Public Works",
    location: "Astana, Kazakhstan",
    year: "2021",
    area: "8 ha",
    span: "sm",
    summary:
      "A ceremonial civic square balancing security, symbolism and a genuinely green public realm.",
    overview: [
      "The Administrative Square provides a dignified civic forecourt for the seat of government — a space for ceremony and daily public life that reads as green rather than fortified.",
      "GreenSphere integrated discreet security infrastructure into an elegant landscape of formal avenues, reflecting water and resilient planting built to withstand major events.",
    ],
    objectives: [
      "Deliver a ceremonial space of national significance.",
      "Integrate security discreetly within the landscape.",
      "Withstand high-intensity event loading.",
      "Provide year-round greenery in a harsh climate.",
    ],
    challenges: [
      { title: "Security Integration", description: "Protective measures had to disappear into the design." },
      { title: "Event Loading", description: "Surfaces and planting had to survive crowds and vehicles." },
      { title: "Climate Extremes", description: "Severe winters demanded highly resilient species." },
    ],
    solutions: [
      { title: "Landscape-as-Security", description: "Level changes and planters double as protective barriers." },
      { title: "Reinforced Ground", description: "Engineered surfaces carry event and vehicle loads." },
      { title: "Cold-Hardy Palette", description: "Species proven through extreme continental winters." },
    ],
    engineering: [
      "Hostile-vehicle-mitigation integrated as landform.",
      "Reinforced structural lawns for event loading.",
      "Snow-melt drainage across all hard surfaces.",
      "Formal water feature with winter shutdown design.",
    ],
    keyStats: [
      { label: "Total Area", value: "8 ha" },
      { label: "Trees Planted", value: "1,200" },
      { label: "Shrubs", value: "22,000" },
      { label: "Flowers", value: "180,000" },
      { label: "Lawn Area", value: "2.4 ha" },
      { label: "Water Feature", value: "3,000 m²" },
      { label: "Duration", value: "18 months" },
      { label: "Event Capacity", value: "40,000" },
    ],
    timeline: [
      { phase: "Design & Security", period: "2019", description: "Ceremonial and security-integrated design." },
      { phase: "Infrastructure", period: "2020", description: "Ground reinforcement and drainage." },
      { phase: "Landscape", period: "2020–21", description: "Avenues, water feature and planting." },
      { phase: "Commissioning", period: "2021", description: "Testing and ceremonial handover." },
    ],
    outcome: [
      "The square now hosts national ceremonies and everyday public life, with security that visitors never perceive.",
      "Its planting has survived multiple extreme winters intact, validating the cold-hardy design strategy.",
    ],
    galleryLabels: [
      "Square Aerial", "Security Model", "Ground Reinforcement", "Formal Avenue",
      "Reflecting Pool", "Ceremonial Lawn", "Planter Detail", "Winter View",
      "Night Illumination", "Paving Pattern", "Event Setup", "Completed Square",
    ],
  },
  {
    slug: "innovation-tech-campus",
    title: "Innovation Tech Campus",
    category: "Education",
    client: "National Innovation University",
    location: "Almaty, Kazakhstan",
    year: "2023",
    area: "31 ha",
    span: "md",
    summary:
      "A 31-hectare university campus landscape designed as an outdoor laboratory for learning and research.",
    overview: [
      "The Innovation Tech Campus landscape turns 31 hectares of university grounds into a living laboratory — courtyards, roof gardens and a central green that support study, research and community life.",
      "GreenSphere delivered a low-carbon, sensor-instrumented landscape where the environment itself becomes teaching material, with real-time data on water, growth and microclimate.",
    ],
    objectives: [
      "Create flexible outdoor spaces for study and events.",
      "Instrument the landscape as a research asset.",
      "Achieve a low-carbon, water-wise campus.",
      "Green rooftops and courtyards across the estate.",
    ],
    challenges: [
      { title: "Live Campus", description: "Works ran around a fully operational university term." },
      { title: "Rooftop Structures", description: "Roof gardens needed strict load and waterproofing control." },
      { title: "Research Integration", description: "Sensors had to weave through the whole landscape." },
    ],
    solutions: [
      { title: "Term-Sensitive Phasing", description: "Works scheduled around teaching and exam periods." },
      { title: "Lightweight Roof Systems", description: "Engineered substrates kept roof loads within limits." },
      { title: "Instrumented Landscape", description: "A sensor network feeds live data to research teams." },
    ],
    engineering: [
      "Six intensive and extensive green roofs.",
      "Campus-wide soil-moisture and microclimate sensing.",
      "Rainwater harvesting for irrigation reuse.",
      "Low-carbon materials and recycled aggregates.",
    ],
    keyStats: [
      { label: "Total Area", value: "31 ha" },
      { label: "Trees Planted", value: "4,700" },
      { label: "Shrubs", value: "52,000" },
      { label: "Flowers", value: "140,000" },
      { label: "Lawn Area", value: "6.2 ha" },
      { label: "Green Roofs", value: "6" },
      { label: "Duration", value: "24 months" },
      { label: "Water Reuse", value: "38%" },
    ],
    timeline: [
      { phase: "Design & Sensors", period: "2021", description: "Landscape and research instrumentation design." },
      { phase: "Courtyards", period: "2022", description: "Courtyard and roof-garden construction." },
      { phase: "Central Green", period: "2022–23", description: "Main green, planting and harvesting system." },
      { phase: "Handover", period: "2023", description: "Sensor commissioning and academic handover." },
    ],
    outcome: [
      "The campus now doubles as a research dataset, with faculties publishing from its live environmental sensors.",
      "Rainwater reuse meets 38% of irrigation demand, sharply cutting the campus water footprint.",
    ],
    galleryLabels: [
      "Campus Aerial", "Sensor Plan", "Courtyard Build", "Green Roof",
      "Central Green", "Study Terrace", "Rain Garden", "Harvesting Tank",
      "Evening Campus", "Planting Detail", "Research Node", "Completed Campus",
    ],
  },
  {
    slug: "emerald-residential-district",
    title: "Emerald Residential District",
    category: "Residential",
    client: "Emerald Developments",
    location: "Shymkent, Kazakhstan",
    year: "2024",
    area: "27 ha",
    span: "sm",
    summary:
      "A 27-hectare residential district where landscape leads the masterplan, not the leftover space.",
    overview: [
      "Emerald District puts landscape at the centre of a new residential community — a connected network of courtyards, pocket parks and a green spine that gives 6,000 homes a genuine sense of place.",
      "GreenSphere delivered the public realm across multiple construction phases, coordinating with vertical developers to keep the landscape coherent as the district grew.",
    ],
    objectives: [
      "Make landscape the organising idea of the masterplan.",
      "Give every home access to quality green space.",
      "Manage stormwater sustainably across the district.",
      "Maintain coherence across phased development.",
    ],
    challenges: [
      { title: "Phased Construction", description: "The district was built in phases over several years." },
      { title: "Developer Coordination", description: "Multiple builders worked across shared public realm." },
      { title: "Water Scarcity", description: "The regional climate demanded a water-wise approach." },
    ],
    solutions: [
      { title: "Landscape-First Plan", description: "The green network was set out and protected first." },
      { title: "Shared Realm Protocol", description: "Coordinated standards kept quality consistent." },
      { title: "Xeriscape Strategy", description: "Drought-tolerant planting and smart irrigation." },
    ],
    engineering: [
      "District-wide green spine with pocket parks.",
      "Xeriscape planting and central smart irrigation.",
      "Bioswale network for stormwater management.",
      "Standardised detailing across development phases.",
    ],
    keyStats: [
      { label: "Total Area", value: "27 ha" },
      { label: "Trees Planted", value: "5,300" },
      { label: "Shrubs", value: "61,000" },
      { label: "Flowers", value: "150,000" },
      { label: "Lawn Area", value: "4.8 ha" },
      { label: "Pocket Parks", value: "9" },
      { label: "Duration", value: "40 months" },
      { label: "Homes Served", value: "6,000" },
    ],
    timeline: [
      { phase: "Masterplan", period: "2020", description: "Landscape-led framework and standards." },
      { phase: "Phase 1", period: "2021–22", description: "Green spine and first courtyards." },
      { phase: "Phase 2", period: "2022–23", description: "Pocket parks and secondary streets." },
      { phase: "Completion", period: "2024", description: "Final phase and district handover." },
    ],
    outcome: [
      "Homes fronting the green network command a measurable price premium, validating the landscape-first strategy.",
      "The xeriscape and irrigation approach keeps the district lush on a fraction of conventional water demand.",
    ],
    galleryLabels: [
      "District Aerial", "Masterplan Model", "Green Spine", "Pocket Park",
      "Courtyard Garden", "Bioswale", "Play Space", "Street Planting",
      "Evening District", "Xeriscape Detail", "Community Lawn", "Completed District",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(slug: string, count = 3): Project[] {
  const others = projects.filter((p) => p.slug !== slug);
  return others.slice(0, count);
}
