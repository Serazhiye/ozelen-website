export type IconKey =
  | "landscaping"
  | "park"
  | "boulevard"
  | "tree"
  | "infrastructure"
  | "irrigation"
  | "restoration"
  | "maintenance";

export type ProcessStep = { title: string; description: string };
export type Faq = { question: string; answer: string };

export type Service = {
  slug: string;
  title: string;
  icon: IconKey;
  /** One-line summary used on cards */
  tagline: string;
  /** Short card description */
  excerpt: string;
  /** Longer hero/overview copy */
  overview: string[];
  benefits: { title: string; description: string }[];
  process: ProcessStep[];
  equipment: string[];
  stats: { value: string; label: string }[];
  faqs: Faq[];
  galleryLabels: string[];
};

export const services: Service[] = [
  {
    slug: "urban-landscaping",
    title: "Urban Landscaping",
    icon: "landscaping",
    tagline: "City-scale planting, grading and hardscape delivered as engineered systems.",
    excerpt:
      "Master-planned landscapes for districts, campuses and mixed-use developments — designed, engineered and built to civic standards.",
    overview: [
      "We plan and construct landscapes at the scale of neighbourhoods and districts, integrating planting, grading, drainage, lighting and hardscape into a single coordinated system.",
      "Every scheme is engineered against soil analysis, hydrology and long-term maintenance load, so what we hand over performs for decades — not a single growing season.",
    ],
    benefits: [
      { title: "Master-Plan Integration", description: "Landscape coordinated with civil, structural and MEP disciplines from day one." },
      { title: "Soil & Hydrology Science", description: "Substrate specifications derived from lab testing, not assumptions." },
      { title: "Whole-Life Costing", description: "Designs optimised for 25-year maintenance and water budgets." },
      { title: "Civic Durability", description: "Detailing rated for public footfall, vehicles and municipal standards." },
    ],
    process: [
      { title: "Site & Soil Analysis", description: "Topographic survey, geotechnical sampling and existing-vegetation audit." },
      { title: "Landscape Engineering", description: "Grading models, drainage design and planting substrate specification." },
      { title: "Construction", description: "Earthworks, hardscape and utilities delivered under a single works package." },
      { title: "Planting & Establishment", description: "Phased planting with a monitored establishment period." },
    ],
    equipment: ["Laser-guided graders", "GPS earthmoving fleet", "Hydroseeding rigs", "Mobile tree spades", "Substrate blending plant"],
    stats: [
      { value: "8.4M", label: "m² landscaped" },
      { value: "120+", label: "Public schemes" },
      { value: "25 yr", label: "Design life" },
    ],
    faqs: [
      { question: "Do you work from an existing landscape architect's design?", answer: "Yes. We routinely deliver third-party designs and can also provide full design-build under one contract." },
      { question: "Can you phase works around a live site?", answer: "Absolutely — most of our urban schemes are built in occupied environments with staged handovers and maintained access." },
      { question: "What warranty applies to planting?", answer: "Standard establishment care is 12–24 months with defined replacement thresholds; extended care packages are available." },
    ],
    galleryLabels: ["Master Plan Overlay", "Grading Model", "Hardscape Detail", "Completed Plaza", "Planting Palette", "Aerial View"],
  },
  {
    slug: "park-construction",
    title: "Park Construction",
    icon: "park",
    tagline: "Turnkey delivery of city parks — from earthworks to the day the gates open.",
    excerpt:
      "End-to-end construction of metropolitan and neighbourhood parks: terrain, water, planting, pathways, lighting and amenities.",
    overview: [
      "We build parks as complete civic assets — shaping terrain, managing water, constructing pathways and amenities, and establishing planting that reads as mature from opening day.",
      "Our teams self-deliver the disciplines that usually fragment a park programme, keeping quality, schedule and cost under a single line of accountability.",
    ],
    benefits: [
      { title: "Single Accountability", description: "One contractor for earthworks, water, planting and amenities." },
      { title: "Instant Maturity", description: "Semi-mature tree logistics for canopy on opening day." },
      { title: "Water Management", description: "Integrated SUDS, retention and irrigation across the whole site." },
      { title: "Amenity Engineering", description: "Play, sport and event infrastructure to safety standards." },
    ],
    process: [
      { title: "Terrain Modelling", description: "Cut-and-fill balancing to minimise imported material." },
      { title: "Water & Utilities", description: "Drainage, retention, power and irrigation mains." },
      { title: "Structures & Paths", description: "Pathways, bridges, shelters and lighting." },
      { title: "Planting & Handover", description: "Trees, shrubs and lawns with a managed establishment period." },
    ],
    equipment: ["Excavator fleet", "Semi-mature tree cranes", "Path-paving trains", "Rootball transplanters", "Bulk irrigation trenchers"],
    stats: [
      { value: "60+", label: "Parks delivered" },
      { value: "310 ha", label: "Public parkland" },
      { value: "0.4M", label: "Trees established" },
    ],
    faqs: [
      { question: "How large a park can you deliver?", answer: "We have delivered single parks exceeding 40 hectares and regularly run multi-park framework programmes." },
      { question: "Do you install play and sports facilities?", answer: "Yes — play, outdoor fitness, courts and event infrastructure are delivered to the relevant safety standards." },
      { question: "Can trees look mature at opening?", answer: "We plan semi-mature stock and rootball logistics so key avenues and groves read as established from day one." },
    ],
    galleryLabels: ["Terrain Model", "Earthworks Phase", "Pathway Network", "Water Feature", "Semi-Mature Planting", "Opening Day"],
  },
  {
    slug: "boulevard-greening",
    title: "Boulevard Greening",
    icon: "boulevard",
    tagline: "Green corridors that survive the harshest street environments.",
    excerpt:
      "Avenues, medians and streetscapes engineered for tree health, pedestrian comfort and decades of urban performance.",
    overview: [
      "Street trees fail when soil, water and structure are afterthoughts. We engineer the whole below-ground and above-ground system so boulevards thrive under traffic, salt and compaction.",
      "From structural soil cells to sub-surface irrigation, we build corridors that cool cities, calm traffic and lift property value for a generation.",
    ],
    benefits: [
      { title: "Structural Soil Cells", description: "Load-bearing rooting volume beneath paving." },
      { title: "Sub-Surface Irrigation", description: "Targeted water delivery invisible to the street." },
      { title: "Urban Heat Reduction", description: "Canopy planning modelled for shade and cooling." },
      { title: "Utility Coordination", description: "Root paths negotiated around live services." },
    ],
    process: [
      { title: "Corridor Survey", description: "Utility mapping, microclimate and traffic analysis." },
      { title: "Below-Ground Design", description: "Soil cells, drainage and irrigation routing." },
      { title: "Installation", description: "Staged lane works with maintained access." },
      { title: "Canopy Establishment", description: "Monitored watering through establishment years." },
    ],
    equipment: ["Vacuum excavators", "Soil-cell installation rigs", "Micro-trenchers", "Mobile elevating platforms", "Traffic-management fleet"],
    stats: [
      { value: "180 km", label: "Green corridors" },
      { value: "48k", label: "Street trees" },
      { value: "−4°C", label: "Peak street cooling" },
    ],
    faqs: [
      { question: "How do you keep street trees alive long term?", answer: "By engineering adequate rooting volume, drainage and irrigation below the paving — the factors that cause most street-tree failure." },
      { question: "Can you work without full road closures?", answer: "Yes, most corridors are delivered under lane-by-lane traffic management with maintained pedestrian access." },
      { question: "Do you handle utility conflicts?", answer: "We survey and negotiate root paths around live utilities and coordinate protection with asset owners." },
    ],
    galleryLabels: ["Corridor Survey", "Soil Cell Install", "Median Planting", "Avenue View", "Night Lighting", "Established Canopy"],
  },
  {
    slug: "tree-planting",
    title: "Tree Planting",
    icon: "tree",
    tagline: "Large-scale afforestation with survival rates that stand up to audit.",
    excerpt:
      "Programmatic tree planting — from single semi-mature specimens to million-tree afforestation with monitored establishment.",
    overview: [
      "We plant at every scale, from signature semi-mature specimens to landscape-scale afforestation, backed by nursery partnerships and cold-chain logistics.",
      "Survival is engineered, not hoped for: species matched to site, substrate corrected, and establishment monitored with data you can report to a board or a ministry.",
    ],
    benefits: [
      { title: "Provenance Control", description: "Species and genetics matched to climate and site." },
      { title: "Audited Survival", description: "Monitored establishment with reportable survival data." },
      { title: "Cold-Chain Logistics", description: "Stock handled to preserve root health in transit." },
      { title: "Carbon Reporting", description: "Sequestration estimates for ESG disclosure." },
    ],
    process: [
      { title: "Species Strategy", description: "Site-matched palette for resilience and biodiversity." },
      { title: "Ground Preparation", description: "Decompaction, substrate correction and mulch." },
      { title: "Planting", description: "Mechanised and hand planting at programme scale." },
      { title: "Establishment Care", description: "Irrigation, formative pruning and survival audits." },
    ],
    equipment: ["Tree spades", "Mechanical planters", "Water bowsers", "Mulch blowers", "Rootball cranes"],
    stats: [
      { value: "1.2M", label: "Trees planted" },
      { value: "96%", label: "Establishment rate" },
      { value: "240+", label: "Species deployed" },
    ],
    faqs: [
      { question: "What survival rate can you guarantee?", answer: "Our monitored establishment programmes routinely exceed 95% survival, with contractual thresholds agreed per project." },
      { question: "Can you supply semi-mature specimens?", answer: "Yes — we source and transplant large specimen trees with dedicated rootball and crane logistics." },
      { question: "Do you provide carbon reporting?", answer: "We can provide sequestration estimates and monitoring data suitable for ESG and sustainability reporting." },
    ],
    galleryLabels: ["Nursery Selection", "Ground Prep", "Mechanised Planting", "Specimen Craning", "Establishment Care", "Young Woodland"],
  },
  {
    slug: "green-infrastructure",
    title: "Green Infrastructure",
    icon: "infrastructure",
    tagline: "Nature-based systems that manage water, heat and biodiversity at city scale.",
    excerpt:
      "Bioswales, retention wetlands, green roofs and blue-green networks engineered as performing infrastructure.",
    overview: [
      "Green infrastructure is infrastructure. We design and build nature-based systems — swales, wetlands, permeable surfaces and green roofs — that carry measurable hydraulic and ecological load.",
      "Each system is modelled, monitored and documented so asset owners can prove performance against flood, heat and biodiversity targets.",
    ],
    benefits: [
      { title: "Hydraulic Modelling", description: "Systems sized against storm and flood scenarios." },
      { title: "Blue-Green Networks", description: "Connected water and habitat corridors." },
      { title: "Biodiversity Net Gain", description: "Habitat design measured to recognised metrics." },
      { title: "Performance Monitoring", description: "Sensors and reporting to prove function." },
    ],
    process: [
      { title: "Catchment Analysis", description: "Hydrology, flood risk and heat mapping." },
      { title: "Systems Design", description: "Swales, wetlands, permeable and green-roof design." },
      { title: "Construction", description: "Earthworks, membranes, media and planting." },
      { title: "Commissioning", description: "Flow testing, sensor installation and handover." },
    ],
    equipment: ["Geomembrane welders", "Media placement rigs", "Green-roof hoists", "Flow-monitoring sensors", "Wetland planting barges"],
    stats: [
      { value: "5.6M", label: "m³ stormwater managed" },
      { value: "42", label: "Blue-green schemes" },
      { value: "+31%", label: "Avg. biodiversity gain" },
    ],
    faqs: [
      { question: "Is green infrastructure reliable enough for flood duty?", answer: "When properly modelled and built, yes — our systems are sized against defined storm events and commissioned with flow testing." },
      { question: "Do you install green roofs?", answer: "Yes, from extensive sedum systems to intensive roof parks, including waterproofing coordination and irrigation." },
      { question: "Can you prove biodiversity gain?", answer: "We design to recognised biodiversity metrics and can provide baseline and post-completion assessments." },
    ],
    galleryLabels: ["Catchment Map", "Bioswale Build", "Wetland Planting", "Green Roof", "Sensor Array", "Established System"],
  },
  {
    slug: "automatic-irrigation",
    title: "Automatic Irrigation",
    icon: "irrigation",
    tagline: "Smart, sensor-driven water systems that cut consumption without cutting quality.",
    excerpt:
      "Central-control irrigation with weather, soil and flow sensing — engineered for water efficiency at estate and city scale.",
    overview: [
      "We design and install centrally controlled irrigation that waters precisely — driven by weather data, soil-moisture sensing and flow monitoring across the whole asset.",
      "The result is landscapes that stay lush while consumption, leaks and labour fall, with a dashboard that gives facilities teams full visibility.",
    ],
    benefits: [
      { title: "Central Control", description: "One dashboard for an entire estate or city zone." },
      { title: "Sensor-Driven", description: "Weather and soil-moisture inputs cut waste." },
      { title: "Leak Detection", description: "Flow monitoring flags failures automatically." },
      { title: "Water Savings", description: "Typical 30–50% reduction versus timed systems." },
    ],
    process: [
      { title: "Water Audit", description: "Source, pressure and demand analysis." },
      { title: "Hydraulic Design", description: "Zoning, mains sizing and control architecture." },
      { title: "Installation", description: "Mains, valves, heads and sensor network." },
      { title: "Commissioning", description: "Programming, calibration and staff training." },
    ],
    equipment: ["Directional drilling rigs", "Central control servers", "Soil-moisture sensor kits", "Flow-metering stations", "Pressure-boosting plant"],
    stats: [
      { value: "−42%", label: "Avg. water use" },
      { value: "900+", label: "Zones managed" },
      { value: "24/7", label: "Remote monitoring" },
    ],
    faqs: [
      { question: "How much water can smart irrigation save?", answer: "Typical savings range from 30–50% versus fixed-timer systems, driven by weather and soil-moisture control." },
      { question: "Can you retrofit an existing system?", answer: "Yes — we frequently upgrade legacy irrigation with central control, sensing and leak detection." },
      { question: "Who manages it after handover?", answer: "We train your facilities team and offer optional remote monitoring and service contracts." },
    ],
    galleryLabels: ["Water Audit", "Mains Trenching", "Control Cabinet", "Sensor Install", "Dashboard View", "Lush Result"],
  },
  {
    slug: "environmental-restoration",
    title: "Environmental Restoration",
    icon: "restoration",
    tagline: "Bringing degraded land, rivers and habitats back to ecological function.",
    excerpt:
      "Remediation and rewilding of brownfield, riverbank and degraded land — restoring ecology, stability and public value.",
    overview: [
      "We restore land that others write off — former industrial sites, eroded riverbanks and depleted habitats — combining remediation engineering with ecological design.",
      "Restoration is delivered against measurable targets for soil health, water quality and biodiversity, turning liabilities into public and ecological assets.",
    ],
    benefits: [
      { title: "Contaminant Remediation", description: "Soil and water treatment to regulatory standards." },
      { title: "Bank & Slope Stability", description: "Bioengineering that stabilises and greens." },
      { title: "Habitat Reconstruction", description: "Native ecosystems rebuilt from the soil up." },
      { title: "Measured Outcomes", description: "Ecological monitoring against clear targets." },
    ],
    process: [
      { title: "Site Assessment", description: "Contamination, hydrology and ecology surveys." },
      { title: "Remediation", description: "Soil treatment, regrading and water management." },
      { title: "Bio-Reconstruction", description: "Bioengineering, seeding and native planting." },
      { title: "Monitoring", description: "Multi-year ecological performance tracking." },
    ],
    equipment: ["Soil-washing plant", "Bioengineering crews", "Erosion-control rigs", "Hydroseeders", "Ecological survey kit"],
    stats: [
      { value: "1,900 ha", label: "Land restored" },
      { value: "36 km", label: "Rivers rehabilitated" },
      { value: "5 yr", label: "Monitoring programmes" },
    ],
    faqs: [
      { question: "Do you handle contaminated land?", answer: "Yes — we deliver soil and groundwater remediation to regulatory standards as part of integrated restoration schemes." },
      { question: "Can you stabilise eroding riverbanks?", answer: "We use soft and hybrid bioengineering to stabilise banks while restoring habitat and public access." },
      { question: "How is success measured?", answer: "Against agreed soil, water-quality and biodiversity indicators, tracked through multi-year monitoring." },
    ],
    galleryLabels: ["Baseline Survey", "Remediation Phase", "Bank Bioengineering", "Native Seeding", "Habitat Return", "Restored Landscape"],
  },
  {
    slug: "landscape-maintenance",
    title: "Landscape Maintenance",
    icon: "maintenance",
    tagline: "Long-term stewardship that protects the value of what we build.",
    excerpt:
      "Data-driven maintenance and arboriculture contracts that keep landscapes performing for decades.",
    overview: [
      "A landscape is a long-term asset, and we manage it like one — with planned horticulture, arboriculture and irrigation servicing under measurable KPIs.",
      "Our contracts pair skilled crews with asset tracking, so clients get consistent quality, transparent reporting and landscapes that mature rather than decline.",
    ],
    benefits: [
      { title: "Asset Tracking", description: "Every tree and zone logged and scheduled." },
      { title: "Arboriculture", description: "Certified tree care and risk management." },
      { title: "KPI Reporting", description: "Transparent performance dashboards." },
      { title: "Rapid Response", description: "Standby crews for storms and emergencies." },
    ],
    process: [
      { title: "Asset Audit", description: "Condition survey and digital inventory." },
      { title: "Care Planning", description: "Seasonal schedules and KPI framework." },
      { title: "Delivery", description: "Horticulture, arboriculture and irrigation service." },
      { title: "Reporting", description: "Dashboards, inspections and improvement plans." },
    ],
    equipment: ["Arborist teams", "Ride-on mowing fleet", "Aerial platforms", "Irrigation service vans", "Asset-management platform"],
    stats: [
      { value: "310+", label: "Sites maintained" },
      { value: "98%", label: "KPI compliance" },
      { value: "12 yr", label: "Longest contract" },
    ],
    faqs: [
      { question: "Do you maintain landscapes you didn't build?", answer: "Yes — we take on third-party assets after a condition audit and inventory build." },
      { question: "How do you report performance?", answer: "Through KPI dashboards, scheduled inspections and seasonal reports agreed with the client." },
      { question: "Can you respond to emergencies?", answer: "We operate standby crews for storm damage, failures and safety incidents under defined response times." },
    ],
    galleryLabels: ["Asset Inventory", "Seasonal Care", "Arboriculture", "Irrigation Service", "KPI Dashboard", "Mature Landscape"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(slug: string, count = 3): Service[] {
  const others = services.filter((s) => s.slug !== slug);
  return others.slice(0, count);
}
