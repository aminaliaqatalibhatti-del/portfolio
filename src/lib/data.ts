export const personal = {
  name:     "Amina Liaqat",
  title:    "AI Engineer · Web Developer · App Developer",
  tagline:  "From Concept to Deployment — AI Systems, Web & Mobile Apps, Built with Purpose",
  bio:      "I'm an AI Engineer and Computer Science undergraduate who turns ideas into deployed, working applications. From a live AI travel platform serving 50+ destinations to a full-stack healthcare system built and submitted at a Google hackathon — I build real things that solve real problems.",
  bio2:     "My focus spans Generative AI, Natural Language Processing, applied Machine Learning, and full-stack development. I'm currently deepening my expertise in Unreal Engine 5 and UI/UX design — combining intelligent systems with immersive, user-first experiences.",
  email:    "aminaliaqatalibhatti@gmail.com",
  phone:    "+92 325 4414607",
  location: "Lahore, Pakistan",
  linkedin: "https://www.linkedin.com/in/amina-liaqat",
  github:   "https://github.com/aminaliaqatalibhatti-del",
  twitter:  "",
  resume:   "/resume.pdf",
  avatar:   "/avatar.jpg",
};

/* ─── Hero stats ────────────────────────────── */
export const stats = [
  { value: "5+",  label: "Projects Shipped"    },
  { value: "8",   label: "Public Repositories" },
  { value: "3",   label: "Certifications"      },
  { value: "3.37",label: "University GPA"      },
];

/* ─── Experience / Leadership ───────────────── */
export const experience = [
  {
    role:        "Team Leader — Google Anti Gravity Hackathon",
    company:     "Google for Developers × AISECO",
    type:        "Hackathon",
    period:      "2026",
    location:    "Lahore, Pakistan",
    description:
      "Selected as Team Leader at the Google Anti Gravity Hackathon (AISECO), one of Pakistan's most competitive national-level AI hackathons co-organised by Google for Developers and the Ministry of IT & Telecom. Led the team through the full product lifecycle — ideation, architecture, development, and final submission — delivering PANIR AI, a fully implemented healthcare platform, within the competition timeline.",
    highlights: [
      "Led a cross-functional team through ideation, planning, full-stack development, and live demo presentation",
      "Architected PANIR AI — a role-based healthcare platform with Patient, Doctor, and Administrator dashboards",
      "Built with React, React Native, Node.js, and Python; included OTP & biometric auth, AI symptom triage, and real-time notifications",
      "Coordinated team roles, resolved technical blockers, and maintained delivery momentum under competitive time pressure",
      "Earned Google Anti Gravity Hackathon Certificate of Achievement issued by Google for Developers & Ministry of IT and Telecom",
    ],
    tech: ["React", "React Native", "Node.js", "Python", "REST APIs", "AI Integration"],
    color:       "cyan",
    icon:        "🚀",
    accentColor: "#06B6D4",
    category:    "Leadership",
  },
  {
    role:        "Participant — Ship with Kiro Challenge",
    company:     "AWS Student Builder Group × UET New Campus",
    type:        "Hackathon / Workshop",
    period:      "2026",
    location:    "UET New Campus, Lahore, Pakistan",
    description:
      "Participated in the Ship with Kiro Challenge — an AWS Student Builder Group (SBG) event at UET New Campus, Lahore, centred around AWS's agentic AI IDE, Kiro. The challenge focused on spec-driven development: converting natural-language prompts into structured requirements, architectural designs, and sequenced implementation tasks. Built and deployed TripPilot AI — a full-stack, AI-powered travel planning platform — as the official project submission, demonstrating end-to-end product delivery using Kiro IDE.",
    highlights: [
      "Built TripPilot AI — a production-deployed, full-stack travel platform covering 50+ destinations — as the hackathon project submission using Kiro IDE's spec-driven development workflow",
      "Applied Kiro's agentic capabilities to auto-generate project specs, decompose features into sequenced tasks, and accelerate implementation across frontend, backend, and AI recommendation layers",
      "Engineered a custom AI recommendation engine scoring destinations across 5 weighted dimensions (interests, budget, travel style, season, group size) with real-time recalculation",
      "Integrated Google Maps API for embedded route planning, live weather forecasts into itinerary views, and a conversational AI advisor for real-time trip guidance",
      "Deployed the application to production on PythonAnywhere (csaminaliaqat.pythonanywhere.com), demonstrating full-cycle delivery from idea to live product",
      "Earned the Ship with Kiro Certificate of Achievement — awarded by AWS Student Builder Group, UET New Campus (2026)",
    ],
    tech: ["Kiro IDE", "Python", "Flask", "JavaScript (ES6+)", "HTML/CSS", "Google Maps API", "Weather API", "REST APIs", "PythonAnywhere", "AWS"],
    color:       "blue",
    icon:        "☁️",
    accentColor: "#F59E0B",
    category:    "Hackathon",
    github:      "https://github.com/aminaliaqatalibhatti-del/.kiro",
    live:        "https://csaminaliaqat.pythonanywhere.com/",
  },
  {
    role:        "Social Volunteer Management Intern",
    company:     "Alkhidmat Foundation Pakistan",
    type:        "Internship",
    period:      "2026 – Present",
    location:    "Hybrid — Lahore, Pakistan",
    description:
      "Contributing as a Social Volunteer Management Intern at Alkhidmat Foundation Pakistan — one of the country's leading humanitarian and social welfare organisations. Supporting the coordination, documentation, and operational delivery of community-facing programmes across volunteer recruitment, event management, and stakeholder communication.",
    highlights: [
      "Coordinating volunteer recruitment, onboarding, and scheduling across multiple active welfare programmes and community drives",
      "Supporting the planning and on-ground execution of social welfare events, relief distributions, and community engagement initiatives",
      "Maintaining accurate volunteer records, attendance logs, and programme documentation to ensure organisational transparency and reporting quality",
      "Facilitating clear communication between volunteers, team leads, and programme managers to align tasks and resolve operational queries efficiently",
      "Contributing to community outreach efforts — including awareness campaigns and mobilisation activities — to expand volunteer participation and programme reach",
      "Collaborating within a cross-functional team environment, demonstrating adaptability, teamwork, and a commitment to social impact",
    ],
    tech: ["Volunteer Coordination", "Event Management", "Community Outreach", "Documentation", "Communication", "Team Collaboration", "Organisational Support"],
    color:       "purple",
    icon:        "🤝",
    accentColor: "#8B5CF6",
    category:    "Social Impact",
  },
  {
    role:        "Independent Software Developer",
    company:     "Self-Directed Projects",
    type:        "Freelance",
    period:      "2024 – Present",
    location:    "Remote",
    description:
      "Independently designed, built, and deployed multiple software projects spanning AI applications, web development, and systems programming. Maintaining 8 public GitHub repositories covering AI, C++, and full-stack web development with consistent contribution activity.",
    highlights: [
      "Designed and deployed TripPilot AI — a live, full-stack AI travel platform covering 50+ destinations with AI itinerary generation, budget tracking, and Google Maps integration",
      "Built an AI-powered Emotion-Based Music Recommendation System, deployed live on Vercel",
      "Developed a C++ OOP-based calculator engine supporting core and advanced mathematical operations (encapsulation, modularity, reusability)",
      "Created a Fictional Travel Agency web application (Python, HTML) demonstrating full-stack web fundamentals",
      "Maintained 8 public repositories with active commits demonstrating consistent self-directed learning and initiative",
    ],
    tech: ["Python", "Flask", "JavaScript", "HTML/CSS", "C++", "OOP", "REST APIs", "Vercel", "PythonAnywhere"],
    color:       "blue",
    icon:        "💻",
    accentColor: "#3B82F6",
    category:    "Software Development",
  },
  {
    role:        "Competition Participant",
    company:     "ICAP National Student Competition",
    type:        "Academic Competition",
    period:      "2024 – 2025",
    location:    "Lahore, Pakistan",
    description:
      "Represented Govt. Graduate College for Women, Model Town, Lahore at the Institute of Chartered Accountants of Pakistan (ICAP) National Student Competition during ICS studies. Demonstrated strong analytical reasoning and problem-solving aptitude at a national academic level.",
    highlights: [
      "Represented institution at a national-level competition hosted by ICAP",
      "Demonstrated analytical aptitude and problem-solving skills in a competitive academic environment",
      "Completed ICS with Grade A+ alongside active competition participation",
    ],
    tech: ["Analytical Reasoning", "Problem Solving", "Research"],
    color:       "purple",
    icon:        "🏆",
    accentColor: "#8B5CF6",
    category:    "Academic",
  },
];

/* ─── Education ─────────────────────────────── */
export const education = [
  {
    degree:    "BS Computer Science (In Progress)",
    school:    "Lahore College for Women University",
    period:    "2026 – 2029",
    location:  "Lahore, Pakistan",
    gpa:       "3.37 / 4.0",
    highlights: [
      "Programming Fundamentals — Grade A+ (top course result)",
      "Object-Oriented Programming — currently enrolled",
      "Active participant in campus AI and tech initiatives",
    ],
    icon: "🎓",
  },
  {
    degree:    "Intermediate in Computer Science (ICS)",
    school:    "Govt. Graduate College for Women, Model Town",
    period:    "2024 – 2025",
    location:  "Lahore, Pakistan",
    gpa:       "A+",
    highlights: [
      "Graduated with Grade A+ across all computer science subjects",
      "Completed SDLC project demonstrating full software development lifecycle understanding",
      "Represented college at ICAP National Student Competition",
    ],
    icon: "🏛️",
  },
  {
    degree:    "Matriculation — Computer Science",
    school:    "Secondary School, Lahore",
    period:    "2022 – 2023",
    location:  "Lahore, Pakistan",
    gpa:       "A+",
    highlights: [
      "Grade A+ — strong foundation in computer science and mathematics",
    ],
    icon: "📚",
  },
];

/* ─── Skills ────────────────────────────────── */
export const skills = {
  "AI & Machine Learning": [
    { name: "Machine Learning",           level: 78 },
    { name: "Deep Learning & Neural Nets", level: 72 },
    { name: "Natural Language Processing", level: 75 },
    { name: "Generative AI & LLMs",       level: 76 },
    { name: "Computer Vision",            level: 68 },
    { name: "Prompt Engineering",         level: 80 },
  ],
  "Programming & Frameworks": [
    { name: "Python",                     level: 85 },
    { name: "C++ & OOP",                  level: 78 },
    { name: "JavaScript (ES6+)",          level: 74 },
    { name: "SQL",                        level: 68 },
    { name: "TensorFlow / PyTorch",       level: 68 },
    { name: "Scikit-learn / Pandas / NumPy", level: 75 },
  ],
  "Web & App Development": [
    { name: "React & React Native",       level: 76 },
    { name: "Node.js",                    level: 70 },
    { name: "Flask",                      level: 78 },
    { name: "HTML / CSS",                 level: 82 },
    { name: "REST APIs",                  level: 75 },
    { name: "UI/UX Design (In Progress)", level: 55 },
  ],
  "Tools & Practices": [
    { name: "Git & GitHub",               level: 80 },
    { name: "Jupyter / Google Colab",     level: 82 },
    { name: "VS Code / Visual Studio",    level: 85 },
    { name: "Agile / SDLC",              level: 72 },
    { name: "Unreal Engine 5 (In Progress)", level: 45 },
    { name: "Linux / Windows",            level: 75 },
  ],
};

/* ─── Projects ──────────────────────────────── */
export const projects = [
  {
    id:          "panir-ai",
    title:       "PANIR AI",
    subtitle:    "AI-Powered Patient Health Records & Care Coordination Platform",
    description:
      "A full-stack, role-based healthcare platform unifying patient records, care-team coordination, and an AI health assistant across three dashboards — Patient, Doctor, and Administrator. Built and submitted at the Google Anti Gravity Hackathon (AISECO) 2026.",
    longDescription:
      "Architected the entire platform as Team Leader. Includes OTP & biometric/PIN authentication, health record management, AI-assisted symptom triage, appointment scheduling, medication tracking, and real-time notifications. Delivered end-to-end within the hackathon timeline.",
    tech:        ["React", "React Native", "Node.js", "Python", "REST APIs", "AI Integration", "OTP Auth"],
    metrics:     ["3 role-based dashboards", "End-to-end within hackathon", "Cross-platform mobile + web"],
    github:      "https://github.com/aminaliaqatalibhatti-del",
    live:        "",
    caseStudy:   "",
    accent:      "#06B6D4",
    category:    "AI Applications",
    featured:    true,
    status:      "Hackathon",
    gradient:    "from-cyan-600/20 via-cyan-500/5 to-transparent",
    image:       "/projects/panir-ai.png",
    icon:        "🏥",
  },
  {
    id:          "trippilot-ai",
    title:       "TripPilot AI",
    subtitle:    "All-in-One AI Travel Planning Platform",
    description:
      "A unified, AI-driven travel platform that consolidates itinerary generation, budget intelligence, weather forecasting, accommodation recommendations, and Google Maps route planning into one seamless experience. Independently designed, built, and deployed to production.",
    longDescription:
      "AI recommendation engine scores destinations across 5 dimensions (interests, budget, travel style, season, group size) with a 350ms debounce for real-time personalisation. Covers 50+ curated destinations across 6 travel categories. Features conversational AI advisor, live budget dashboard, and session-based authentication.",
    tech:        ["Python", "Flask", "JavaScript (ES6+)", "HTML/CSS", "Google Maps API", "Weather API", "REST APIs"],
    metrics:     ["50+ destinations", "5-dimension AI scoring", "Live on PythonAnywhere"],
    github:      "https://github.com/aminaliaqatalibhatti-del/.kiro",
    live:        "https://csaminaliaqat.pythonanywhere.com/",
    caseStudy:   "",
    accent:      "#3B82F6",
    category:    "AI Applications",
    featured:    true,
    status:      "Live",
    gradient:    "from-blue-600/20 via-blue-500/5 to-transparent",
    image:       "/projects/trippilot.png",
    icon:        "✈️",
  },
  {
    id:          "emotion-music",
    title:       "Emotion-Based Music Recommender",
    subtitle:    "Mood-Aware Song Recommendation Web App",
    description:
      "An AI-powered emotion tracker that detects a user's current mood from a dropdown (6 emotion classes) and instantly recommends personalised songs across Bollywood, Hollywood, and Lollywood genres — with YouTube playback integration, mood history tracking, and browser-side data persistence.",
    longDescription:
      "Built entirely in Vanilla JS, HTML5, and CSS3 — no backend required. Uses LocalStorage API for offline mood history. Integrates with YouTube for direct song playback. Responsive, accessibility-first design with full keyboard navigation and ARIA support. Deployed live on Vercel.",
    tech:        ["JavaScript (ES6+)", "HTML5", "CSS3", "LocalStorage API", "YouTube API", "Vercel"],
    metrics:     ["6 emotion classes", "3 music genres per mood", "Live on Vercel"],
    github:      "https://github.com/aminaliaqatalibhatti-del/emotion-Based-Song-listening-app",
    live:        "https://emotion-based-song-listening-app.vercel.app/",
    caseStudy:   "",
    accent:      "#8B5CF6",
    category:    "AI Applications",
    featured:    true,
    status:      "Live",
    gradient:    "from-purple-600/20 via-purple-500/5 to-transparent",
    image:       "/projects/emotion-music.png",
    icon:        "🎵",
  },
  {
    id:          "unreal-assignment",
    title:       "Unreal Engine 5 — Assignment Project",
    subtitle:    "3D Scene & Gameplay Mechanics in UE5",
    description:
      "A hands-on Unreal Engine 5 project created as part of CEGA training at NASTP Lahore. Explores UE5 fundamentals including 3D scene composition, Blueprints visual scripting, actor placement, and basic gameplay mechanics — building practical skills in real-time game development.",
    longDescription:
      "Created during active UE5 training at NASTP Lahore (CEGA). Covers UE5 interface workflow, level design basics, Blueprint scripting, and scene lighting. Part of an ongoing learning path combining game development with AI-driven systems.",
    tech:        ["Unreal Engine 5", "Blueprints", "3D Scene Design", "Level Design"],
    metrics:     ["UE5 Blueprints", "3D scene composition", "NASTP CEGA training"],
    github:      "https://github.com/aminaliaqatalibhatti-del/assignmentunreal5",
    live:        "",
    caseStudy:   "",
    accent:      "#67E8F9",
    category:    "Unreal Engine",
    featured:    false,
    status:      "In Progress",
    gradient:    "from-sky-500/20 via-sky-400/5 to-transparent",
    image:       "/projects/unreal.png",
    icon:        "🎮",
  },
  {
    id:          "calculator-oop",
    title:       "OOP Calculator Engine",
    subtitle:    "C++ Object-Oriented Calculator with Advanced Operations",
    description:
      "A C++ calculator built from scratch using OOP principles — encapsulation, modularity, and reusability. Supports addition, subtraction, multiplication, division, exponentiation, and logarithm via a clean class-based architecture with switch-case dispatch.",
    longDescription:
      "Demonstrates core OOP concepts: class definition, member functions, encapsulation, and clean separation of concerns. User input drives a switch-based operation dispatcher. Designed for clarity, extensibility, and as a foundation for more advanced C++ projects.",
    tech:        ["C++", "OOP", "Encapsulation", "Modular Design"],
    metrics:     ["6 operation types", "Pure C++ OOP", "Extensible class design"],
    github:      "https://github.com/aminaliaqatalibhatti-del/calculator-using-oop",
    live:        "",
    caseStudy:   "",
    accent:      "#F59E0B",
    category:    "C++ / Systems",
    featured:    false,
    status:      "Open Source",
    gradient:    "from-amber-500/20 via-amber-400/5 to-transparent",
    image:       "/projects/calculator.png",
    icon:        "⚙️",
  },
  {
    id:          "cafeteria-web",
    title:       "Cafeteria Web App",
    subtitle:    "HTML/CSS Web Application",
    description:
      "A clean, responsive cafeteria web application built with HTML and CSS. Demonstrates front-end development fundamentals including semantic markup, CSS layout techniques, responsive design, and clean UI composition.",
    longDescription:
      "Part of ongoing independent web development practice. Demonstrates proficiency in semantic HTML5, CSS flexbox/grid, and UI design fundamentals. Actively maintained with recent commits in July 2026.",
    tech:        ["HTML5", "CSS3", "Responsive Design", "UI Design"],
    metrics:     ["Responsive layout", "Semantic HTML5", "Active development"],
    github:      "https://github.com/aminaliaqatalibhatti-del/cafeteria-",
    live:        "",
    caseStudy:   "",
    accent:      "#FB7185",
    category:    "Web Development",
    featured:    false,
    status:      "Open Source",
    gradient:    "from-rose-500/20 via-rose-400/5 to-transparent",
    image:       "/projects/cafeteria.png",
    icon:        "🌐",
  },
];

/* ─── Certifications ────────────────────────── */
export const certifications = [
  {
    name:         "Ship with Kiro — Certificate of Achievement",
    issuer:       "AWS Student Builder Group, UET New Campus",
    date:         "2026",
    credentialId: "KIRO-2026",
    icon:         "☁️",
    color:        "blue",
    url:          "",
  },
  {
    name:         "Google Anti Gravity Hackathon — Certificate of Achievement",
    issuer:       "Google for Developers × Ministry of IT and Telecom",
    date:         "2026",
    credentialId: "GOOGLE-AGH-2026",
    icon:         "🚀",
    color:        "cyan",
    url:          "",
  },
  {
    name:         "AI with Python",
    issuer:       "DigiSkills.pk — National Freelancing & IT Skills Training Program",
    date:         "In Progress",
    credentialId: "DIGI-AI-2026",
    icon:         "🧠",
    color:        "purple",
    url:          "",
  },
  {
    name:         "User Interface (UI/UX) Design",
    issuer:       "DigiSkills.pk — National Freelancing & IT Skills Training Program",
    date:         "In Progress",
    credentialId: "DIGI-UIUX-2026",
    icon:         "🎨",
    color:        "indigo",
    url:          "",
  },
  {
    name:         "Unreal Engine 5",
    issuer:       "NASTP Lahore — CEGA",
    date:         "In Progress",
    credentialId: "NASTP-UE5-2026",
    icon:         "🎮",
    color:        "blue",
    url:          "",
  },
  {
    name:         "Programming Fundamentals — Grade A+",
    issuer:       "Lahore College for Women University",
    date:         "2026",
    credentialId: "LCWU-PF-2026",
    icon:         "🏆",
    color:        "cyan",
    url:          "",
  },
];

/* ─── Leadership & Volunteering ─────────────── */
export const leadership = [
  {
    role:         "Team Leader",
    organization: "Google Anti Gravity Hackathon (AISECO)",
    period:       "2026",
    description:
      "Led a cross-functional team through the full product lifecycle at one of Pakistan's premier AI hackathons, co-organised by Google for Developers and the Ministry of IT & Telecom. Delivered PANIR AI — a complete, working healthcare platform — within the competition window.",
    icon:         "🚀",
    impact:       "Full product shipped in 48 hrs",
  },
  {
    role:         "Independent Open Source Developer",
    organization: "GitHub — aminaliaqatalibhatti-del",
    period:       "2024 – Present",
    description:
      "Maintaining 8 public repositories spanning AI applications, C++ systems programming, and web development. Consistent contribution activity with 58+ contributions in the last year, demonstrating initiative and self-directed learning.",
    icon:         "💻",
    impact:       "8 public repos · 58+ contributions",
  },
  {
    role:         "Competition Participant",
    organization: "ICAP National Student Competition",
    period:       "2024 – 2025",
    description:
      "Represented Govt. Graduate College for Women, Model Town, Lahore at the Institute of Chartered Accountants of Pakistan (ICAP) National Student Competition — demonstrating analytical aptitude and competitive academic performance at a national level.",
    icon:         "🏆",
    impact:       "National-level representation",
  },
  {
    role:         "AWS Student Builder Group Member",
    organization: "AWS Student Builder Group — UET New Campus",
    period:       "2026",
    description:
      "Participated in the AWS Student Builder Group event at UET New Campus, engaging with cloud and AI tooling. Received the Ship with Kiro Certificate of Achievement for hands-on technical contribution.",
    icon:         "☁️",
    impact:       "Certificate of Achievement",
  },
];
