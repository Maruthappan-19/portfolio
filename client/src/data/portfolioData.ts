export interface Project {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  role: string;
  context: string;
  status: string;
  summary: string;
  problemStatement: string;
  solution: string;
  contribution: string;
  keyFeatures: string[];
  techStack: string[];
  architecture: string;
  challenges: string;
  verifiedDetails: string;
  heroImage: string;
  gallery: { src: string; caption: string }[];
  githubUrl?: string;
  liveDemoUrl?: string;
}

export interface Internship {
  company: string;
  role: string;
  period: string;
  credentialId?: string;
  description: string[];
  certificateImage?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  distinction?: string;
  credentialId?: string;
  image: string;
  category: 'academic' | 'hackathon' | 'industry' | 'internship';
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    headline: string;
    location: string;
    email: string;
    phone: string;
    whatsapp: string;
    whatsappUrl: string;
    github: string;
    linkedin: string;
    resumePdf: string;
    profilePic: string;
    profilePicWeb: string;
    web3formsAccessKey?: string;
    objective: string;
    aboutBio: string[];
  };
  education: {
    degree: string;
    institution: string;
    period: string;
    score: string;
    details: string;
  }[];
  skills: {
    programming: string[];
    backend: string[];
    databases: string[];
    aiAndApplied: string[];
    toolsAndCore: string[];
  };
  problemSolving: {
    leetcodeCount: string;
    topics: string[];
    focus: string;
  };
  internships: Internship[];
  projects: Project[];
  certificates: Certificate[];
  coreValues: { title: string; description: string }[];
  hobbies: { name: string; category: string; description: string }[];
  languages: { name: string; rating: number; proficiency: string }[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  personal: {
    name: "Maruthappan M",
    title: "Aspiring Software Engineer",
    headline: "Final-year B.Tech Information Technology student focused on software development, backend engineering, AI-powered applications, and problem-solving.",
    location: "Tiruchirappalli, Tamil Nadu, India",
    email: "maruthappanm2006@gmail.com",
    phone: "+91 9360596629",
    whatsapp: "+91 9360596629",
    whatsappUrl: "https://wa.me/919360596629?text=Hi%20Maruthappan%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect!",
    github: "https://github.com/Maruthappan-19",
    linkedin: "https://www.linkedin.com/in/maruthappan-murugappan",
    resumePdf: "/assets/resume/MaruthappanM_Resume.pdf",
    profilePic: "/assets/profile/maruthappan.jpg",
    profilePicWeb: "/assets/profile/maruthappan_web.jpg",
    web3formsAccessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "501bd9ba-3ee9-471e-ab05-b4055d2966e9",
    objective: "To begin my career as a software engineer, contribute to real-world applications, strengthen my development and problem-solving skills, and grow through hands-on engineering experience.",
    aboutBio: [
      "I'm a final-year B.Tech Information Technology student with a strong interest in software engineering, backend development, and building practical technology solutions.",
      "My experience spans Java, Python, C++, web development, databases, and AI-powered applications. Through projects such as NexusGuard, MeshWave, and SnapSense AI, I've explored fraud detection, offline emergency communication, and multilingual information retrieval.",
      "I've also gained exposure to Python development, full-stack development, and Generative AI through internships. I enjoy solving technical problems, learning new technologies, and turning ideas into working prototypes.",
      "I'm looking for an entry-level software engineering opportunity where I can contribute to real-world projects, learn from experienced developers, and grow as an engineer."
    ]
  },

  education: [
    {
      degree: "B.Tech in Information Technology",
      institution: "Saranathan College of Engineering, Tiruchirappalli",
      period: "2023 — 2027",
      score: "CGPA: 8.3 / 10",
      details: "Comprehensive coursework in Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks, and Operating Systems."
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Chidhambaram Matriculation Higher Secondary School",
      period: "2022 — 2023",
      score: "91%",
      details: "Mathematics, Physics, Chemistry, and Computer Science foundation."
    }
  ],

  skills: {
    programming: ["Java", "Python", "C++", "C", "JavaScript"],
    backend: ["Spring Boot", "RESTful APIs", "FastAPI", "Node.js", "Express.js", "CRUD Operations"],
    databases: ["PostgreSQL", "SQLite", "MongoDB", "SQL Fundamentals"],
    aiAndApplied: ["Gemini API", "Groq API", "Agent-based Workflows", "OCR (Tesseract / Tess4J)", "Text Embeddings", "Anomaly Detection"],
    toolsAndCore: ["Git & GitHub", "Linux Basics", "Android Studio", "VS Code", "Data Structures & Algorithms", "Computer Networks", "Operating Systems"]
  },

  problemSolving: {
    leetcodeCount: "50+",
    topics: ["Arrays & HashMaps", "Strings & Two Pointers", "Trees & Graphs", "Dynamic Programming Basics", "Binary Search"],
    focus: "Writing clean, optimal code with attention to time and space complexity, edge-case handling, and modular structure."
  },

  internships: [
    {
      company: "Cognifyz Technologies",
      role: "Python Development Intern",
      period: "July 2025 — August 2025",
      credentialId: "CTI/A1/C188846",
      certificateImage: "/assets/certificates/internship_cognifyz_technologies.jpeg",
      description: [
        "Wrote Python code for automation, structured data processing, and software development tasks.",
        "Conducted hands-on debugging, testing, and issue resolution to ensure reliable code execution.",
        "Strengthened algorithmic programming logic and systematic problem-solving methods."
      ]
    },
    {
      company: "BigLearn",
      role: "Generative AI Intern",
      period: "15-06-2026 to 15-07-2026",
      certificateImage: "/assets/certificates/internship_biglearn.jpg",
      description: [
        "Worked on SnapSense AI, an AI-powered semantic screenshot search application responding to natural language queries.",
        "Explored OCR pipelines (Tesseract), multilingual text processing (English, Tamil, Tanglish), and text embedding integration.",
        "Applied problem-solving and rigorous debugging to develop and test the backend search workflow end-to-end."
      ]
    },
    {
      company: "Prodigy InfoTech",
      role: "Full-Stack Web Development Intern",
      period: "July 2025",
      credentialId: "PIT/JUL25/06047",
      certificateImage: "/assets/certificates/internship_prodigy_infotech.jpeg",
      description: [
        "Implemented full-stack web applications utilizing modern JavaScript, HTML/CSS, and backend services.",
        "Engineered RESTful API endpoints, handled user interaction states, and implemented database persistence.",
        "Tested component interactions and responsive viewport rendering across multiple client devices."
      ]
    }
  ],

  projects: [
    {
      id: "nexusguard",
      slug: "nexusguard",
      title: "NexusGuard — AI-Assisted Financial Fraud Detection & Investigation",
      shortTitle: "NexusGuard",
      category: "AI & Autonomous Fraud Investigation",
      role: "Full Stack & Agentic AI Developer",
      context: "AI-Powered AML Investigation Platform (NextGenMinds)",
      status: "Prototype Validated on Multi-Signal Benchmark Datasets",
      summary: "An autonomous Anti-Money Laundering (AML) platform correlating deterministic transaction scoring, graph topology, and agentic LLMs to turn suspicious transactions into explainable regulatory reports.",
      problemStatement: "Traditional rule-based fraud detection systems generate massive false-positive volumes, overwhelming compliance teams while failing to detect sophisticated multi-hop money laundering rings and synthetic identity networks.",
      solution: "NexusGuard introduces an autonomous multi-tier architecture combining deterministic multi-modal scoring with a trio of specialized AI agents (InvestigationAgent, FraudRingAgent, DecisionAgent) to synthesize evidence-grounded SAR (Suspicious Activity Report) narratives complying with FinCEN/FIU standards.",
      contribution: "Designed the multi-signal scoring console, integrated Gemini 3.6 and Groq APIs for autonomous agent orchestration, built graph clustering visualizations for account networks, and implemented explainable SAR narrative generation.",
      keyFeatures: [
        "Autonomous Agent Trio: InvestigationAgent, FraudRingAgent, and DecisionAgent orchestrating collaborative multi-step reasoning.",
        "Multi-Modal Deterministic Analysis: Instant authoritative risk scoring (BLOCK, REVIEW, APPROVE) across transaction batches.",
        "3D/2D Graph Topology: Network exploration uncovering hidden cyclic money flows, shell hubs, and community clusters.",
        "Evidence-Grounded SAR Drafts: Generation of regulatory-compliant Suspicious Activity Reports with verifiable audit trails.",
        "Deterministic Fusion & Forensics: Combined anomaly detection (Isolation Forest), JA4+ botnet signatures, and proxy detection."
      ],
      techStack: ["Python", "Gemini 3.6 API", "Groq API", "Graph Neural Networks (GNN)", "Isolation Forest", "FastAPI / React", "NetworkX", "Deterministic Risk Scoring"],
      architecture: "Batch Transaction Ingestion (CSV/JSON) → Deterministic Multi-Signal Scoring Engine → Graph Community & Cyclic Detection → Multi-Agent Orchestration (InvestigationAgent for account forensics, FraudRingAgent for cluster analysis, DecisionAgent for risk classification) → Regulatory SAR Narrative & Export Console.",
      challenges: "Eliminating hallucination in regulatory compliance reports: Solved by strictly grounded agent prompts on deterministic tool outputs, execution logs, and verifiable transaction records.",
      verifiedDetails: "Simulated benchmark datasets are used for testing transaction velocity and cyclic patterns. The countermeasure engine produces explainable audit records with verifiable tool calls (e.g. 3 tool calls executed in ~6200ms per investigation).",
      heroImage: "/assets/projects/nexusguard/nexusguard_thumbnail.png",
      githubUrl: "https://github.com/Maruthappan-19/NextGenMinds.git",
      gallery: [
        { src: "/assets/projects/nexusguard/nexusguard_thumbnail.png", caption: "NexusGuard Official Project Identity & Emblem" },
        { src: "/assets/projects/nexusguard/ng1.png", caption: "NexusGuard Hero & Overview — Autonomous AML Investigation Platform" },
        { src: "/assets/projects/nexusguard/ng3.png", caption: "Autonomous Scoring Results with Authoritative Risk Verdicts (BLOCK / REVIEW / APPROVE)" },
        { src: "/assets/projects/nexusguard/ng5.png", caption: "AI Investigation Copilot — Evidence-Grounded SAR FinCEN/FIU Standard Report Synthesis" },
        { src: "/assets/projects/nexusguard/ng2.png", caption: "Batch Transaction Ingestion & Multi-Signal Dataset Action Console" },
        { src: "/assets/projects/nexusguard/ng4.png", caption: "Forensic Analysis Breakdown — Anomaly Engine, Identity Forensics & Network Metrics" },
        { src: "/assets/projects/nexusguard/ng6.png", caption: "Interactive Account Network Visualization & Cluster Identification" },
        { src: "/assets/projects/nexusguard/ng0.png", caption: "Secure Access Console with Active Gemini 3.6 and Groq API Status" }
      ]
    },
    {
      id: "meshwave",
      slug: "meshwave",
      title: "MeshWave — Offline Emergency Communication System",
      shortTitle: "MeshWave",
      category: "IoT, BLE & LoRa Hardware Mesh",
      role: "Team Lead & Firmware Developer (4-Member Team)",
      context: "VIT Makeathon 2026 (School of Electrical Engineering, VIT Vellore)",
      status: "Tested Hardware & Mobile Prototype at VIT Makeathon",
      summary: "An emergency off-grid communication prototype utilizing ESP32 microcontrollers, LoRa radio transceivers, and Bluetooth Low Energy (BLE) to deliver distress beacons and peer-to-peer messages without cellular or internet connectivity.",
      problemStatement: "During catastrophic natural disasters (floods, earthquakes, cyclones), conventional cellular towers and fiber backbones collapse, leaving victims and rescue teams unable to coordinate critical medical and rescue assistance.",
      solution: "MeshWave bridges consumer smartphones to ESP32 LoRa radio nodes via Bluetooth Low Energy (BLE), transmitting packetized emergency messages (SOS, GPS coordinates, supply requests) across long distances using an ad-hoc store-and-forward mesh protocol.",
      contribution: "Led a four-member engineering team at the VIT Makeathon 2026, authored ESP32 Arduino C++ firmware, designed the duplicate packet suppression algorithm, and debugged the BLE mobile client connection.",
      keyFeatures: [
        "Off-Grid Communication: Operates completely independent of cellular networks, Wi-Fi, and internet access.",
        "BLE Smartphone Gateway: Allows any user with the Android app to connect to a nearby ESP32 node without specialized hardware.",
        "Store-and-Forward Routing: Intermediate nodes cache and forward messages to propagate packets past physical obstructions.",
        "Duplicate Packet Suppression: Sequence-based cache prevents broadcast storms and network congestion (`isDuplicate(msg)`).",
        "Hardware Diagnostics: Serial terminal telemetry and RSSI signal-strength tracking for field node deployment."
      ],
      techStack: ["ESP32 Dev Module", "LoRa Radio (433/868/915 MHz)", "Bluetooth Low Energy (BLE)", "Arduino C++", "Android Jetpack Compose", "Store-and-Forward Protocol"],
      architecture: "Android Smartphone (Jetpack Compose App) —[BLE]→ ESP32 Node 1 —[LoRa RF Broadcast]→ ESP32 Intermediate Mesh Node —[LoRa Store & Forward]→ Base Station Node —[Serial / Display]→ Incident Response Center.",
      challenges: "Memory constraints and buffer overflows on microcontroller mesh packets: Implemented compact payload serialization and a circular FIFO ring buffer for received message deduplication.",
      verifiedDetails: "Firmware verified via Arduino sketch `sketch_mar22a.ino` showing active LoRa RX parsing, duplicate filtering, and COM5 serial telemetry. Tested and presented by a 4-member team at VIT Makeathon 2026 (certified by VIT School of Electrical Engineering).",
      heroImage: "/assets/projects/meshwave/meshwave_thumbnail.png",
      githubUrl: "https://github.com/Maruthappan-19/MeshWave.git",
      gallery: [
        { src: "/assets/projects/meshwave/meshwave_thumbnail.png", caption: "MeshWave Official App Icon & Project Presentation Banner" },
        { src: "/assets/projects/meshwave/meshwave_icon.png", caption: "MeshWave App Icon & Brand Identity (VIT Makeathon Prototype)" },
        { src: "/assets/projects/meshwave/mw1.png", caption: "ESP32 LoRa Firmware Source (`sketch_mar22a.ino`) — LoRa RX Ingestion & Duplicate Suppression" },
        { src: "/assets/projects/meshwave/m23.jpeg", caption: "Android BLE Debug Interface — Client/Server Peer Discovery, RSSI Signal Metrics & Device ID" },
        { src: "/assets/projects/meshwave/mw2.png", caption: "Hardware Serial Telemetry Monitor — Real-time Store-and-Forward Packet Transmission on COM5" }
      ]
    },
    {
      id: "snapsense-ai",
      slug: "snapsense-ai",
      title: "SnapSense AI — Offline Multilingual Screenshot Search",
      shortTitle: "SnapSense AI",
      category: "Semantic Information Retrieval & OCR",
      role: "Backend & AI Developer",
      context: "Generative AI Project during BigLearn Internship",
      status: "Functional Application with Local Indexing & Embeddings",
      summary: "A desktop and web search engine enabling users to instantly search local screenshots using natural language queries in English, Tamil, and Tanglish through offline OCR and semantic text embeddings.",
      problemStatement: "Users store thousands of informative screenshots (notes, receipts, payment confirmations, code snippets) on their devices, but finding them via standard gallery apps is nearly impossible because image metadata lacks semantic context.",
      solution: "SnapSense AI extracts textual content via high-accuracy OCR (Tesseract / Tess4J), computes multilingual semantic embeddings, and indexes items into SQLite/PostgreSQL to enable fuzzy semantic search queries across English, Tamil, and Tanglish.",
      contribution: "Built the Java/Spring Boot ingestion and indexing service, integrated Tesseract OCR for text extraction, implemented multilingual query handling, and optimized parallel batch processing for fast local execution.",
      keyFeatures: [
        "Multilingual Natural Language Search: Search screenshots using colloquial Tamil ('Naalaiku interview'), Tanglish, or English ('Spring Security notes', 'payment').",
        "Dual Retrieval Mechanism: Combines exact keyword matching with semantic vector proximity for high recall.",
        "Zero-Cloud Privacy Mode: Local OCR and local database indexing ensures sensitive screenshot contents never leave the user's computer.",
        "Duplicate Detection & Parallel Queue: Fast concurrent screenshot processing supporting PNG, JPG, BMP, GIF, and WEBP formats.",
        "Performance & Statistics Dashboard: Detailed indexing metrics, search timing (<6.0s across local datasets), and library analytics."
      ],
      techStack: ["Java", "Spring Boot", "SQLite", "PostgreSQL", "Tesseract OCR / Tess4J", "FastAPI / Python", "Multilingual Embeddings", "Parallel Processing"],
      architecture: "Screenshot Ingestion Pipeline → OCR Text Extraction Engine → Multilingual Text Preprocessing & Tokenization → Vector Embedding Generation → Local SQLite/PostgreSQL Storage → Natural Language Query Parser → Ranked Semantic & Keyword Retrieval.",
      challenges: "Handling Tanglish (Tamil written in Latin script) alongside English: Addressed through specialized tokenization and multilingual semantic embeddings capable of bridging phonetic transliteration with conceptual meaning.",
      verifiedDetails: "Confirmed working on local test datasets with real search queries demonstrated (e.g. query 'payment' yielding exact timestamped transaction receipts in 6.00s). All offline services operate locally without mandatory internet dependencies.",
      heroImage: "/assets/projects/snapsense/snapsense_thumbnail.png",
      githubUrl: "https://github.com/Maruthappan-19/Snapsense.git",
      gallery: [
        { src: "/assets/projects/snapsense/snapsense_thumbnail.png", caption: "SnapSense AI Official Project Identity & Emblem" },
        { src: "/assets/projects/snapsense/ss3.png", caption: "Natural Language Screenshot Search in English, Tamil, and Tanglish with Live Results" },
        { src: "/assets/projects/snapsense/ss1.png", caption: "SnapSense AI Main Navigation & Local Offline Mode Configuration" },
        { src: "/assets/projects/snapsense/ss2.png", caption: "Library Path Management & Multi-Format Ingestion Settings (PNG, JPG, BMP, WEBP)" }
      ]
    }
  ],

  certificates: [
    {
      id: "internship_biglearn",
      title: "Generative AI Internship Completion",
      issuer: "BigLearn Training Services, Cantonment, Trichy",
      date: "15-06-2026 to 15-07-2026",
      distinction: "Completed 1-month intensive Generative AI Internship program on SnapSense AI",
      image: "/assets/certificates/internship_biglearn.jpg",
      category: "internship"
    },
    {
      id: "nptel_hci",
      title: "Human Computer Interaction — Elite Certificate (98%)",
      issuer: "NPTEL, MoE Govt. of India & IIIT Delhi",
      date: "Jan — Apr 2026",
      distinction: "Elite with 98% (Assignments: 25/25, Proctored Exam: 72.5/75)",
      image: "/assets/certificates/nptel_hci.jpeg",
      category: "academic"
    },
    {
      id: "naukri_campus",
      title: "Naukri Campus Young Turks 2026 — 94.91 Percentile",
      issuer: "Naukri Campus (Recognized by HCLTech & Perfios)",
      date: "2026",
      distinction: "Scored 94.91 percentile in India's largest skill contest",
      credentialId: "6acfacfd96ebe313e740fa68",
      image: "/assets/certificates/naukri_campus.jpeg",
      category: "industry"
    },
    {
      id: "makeathon_vit_2026",
      title: "Makeathon 2026 — VIT Vellore",
      issuer: "School of Electrical Engineering (SELECT), VIT Vellore",
      date: "26th & 27th March 2026",
      distinction: "Team Lead for MeshWave Offline Emergency Communication System",
      image: "/assets/certificates/makeathon_vit_2026.jpeg",
      category: "hackathon"
    },
    {
      id: "technoverse_hackathon_2026",
      title: "Cognizant Technoverse Hackathon 2026",
      issuer: "Cognizant India",
      date: "2026",
      distinction: "Certificate of Appreciation for Innovation & Technical Problem Solving",
      image: "/assets/certificates/technoverse_hackathon_2026.jpeg",
      category: "hackathon"
    },
    {
      id: "aiml",
      title: "Foundational Course on Applied Machine Learning & AI",
      issuer: "Confederation of Indian Industry (CII) & NCVET",
      date: "06-Jul-2026",
      distinction: "193.4 Hours Comprehensive Coursework & Cleared Assessment",
      credentialId: "23Cil-FJ26-19827",
      image: "/assets/certificates/aiml.jpeg",
      category: "academic"
    },
    {
      id: "cybersecurity_job_simulation",
      title: "Cybersecurity Analyst Job Simulation",
      issuer: "Forage",
      date: "January 22, 2026",
      distinction: "Identity and Access Management (IAM), Strategy Assessment & Platform Integration",
      image: "/assets/certificates/cybersecurity_job_simulation.jpeg",
      category: "industry"
    },
    {
      id: "go_for_gold_accenture",
      title: "Go for Gold Contest in iAspire — Gold Level",
      issuer: "Accenture Advanced Technology Centers in India",
      date: "December 26, 2025",
      distinction: "Successfully unlocked Gold Level in iAspire",
      image: "/assets/certificates/go_for_gold_accenture.jpeg",
      category: "industry"
    },
    {
      id: "internship_cognifyz",
      title: "Python Development Internship Completion",
      issuer: "Cognifyz Technologies",
      date: "July — August 2025",
      distinction: "Intern ID: CTI/A1/C188846 — Rated with exceptional coordination & attention to detail",
      credentialId: "CTI/A1/C188846",
      image: "/assets/certificates/internship_cognifyz_technologies.jpeg",
      category: "internship"
    },
    {
      id: "internship_prodigy",
      title: "Full-Stack Web Development Internship Completion",
      issuer: "Prodigy InfoTech",
      date: "1st — 31st July 2025",
      distinction: "Completed 1-month intensive program with outstanding remarks",
      credentialId: "PIT/JUL25/06047",
      image: "/assets/certificates/internship_prodigy_infotech.jpeg",
      category: "internship"
    },
    {
      id: "ip_addressing",
      title: "Complete IP Addressing and Subnetting",
      issuer: "GeeksforGeeks",
      date: "2025",
      distinction: "4-week course completed under Sandeep Jain, CEO",
      image: "/assets/certificates/ip_addressing_and_subnetting.jpeg",
      category: "academic"
    },
    {
      id: "cisco_networking",
      title: "Networking Basics",
      issuer: "Cisco Networking Academy",
      date: "2025",
      distinction: "Fundamental network architectures, protocols, routing & switching",
      image: "/assets/certificates/networking_basics_cisco.jpeg",
      category: "academic"
    }
  ],

  coreValues: [
    { title: "Curiosity", description: "Constant hunger to understand how systems operate under the hood and proactively explore emerging technologies." },
    { title: "Purposeful Innovation", description: "Building technology that addresses real-world challenges and creates tangible, practical impact." },
    { title: "Integrity", description: "Transparent communication, dependable code quality, and uncompromised engineering and ethical standards." },
    { title: "Ownership", description: "Taking end-to-end accountability from prototype architecture to testing, deployment, and ongoing reliability." },
    { title: "Resilience", description: "Tenacity when confronting complex bugs, rigorous systematic debugging, and adapting to evolving constraints." }
  ],

  hobbies: [
    { name: "Logic Puzzles & Sudoku", category: "Mental Agility", description: "Algorithmic deduction, pattern recognition, and analytical focus under structured rules." },
    { name: "Exploring Emerging Technologies", category: "Technical Exploration", description: "Hands-on experimentation with agentic AI, off-grid protocols (LoRa/BLE), and developer tooling." },
    { name: "Adventure Travel", category: "Mindset & Nature", description: "Exploring diverse terrains, discovering fresh cultural perspectives, and outdoor endurance." },
    { name: "Kabaddi & Volleyball", category: "Athletics & Teamwork", description: "High-intensity athletic sports fostering tactical awareness, rapid coordination, and team agility." }
  ],

  languages: [
    { name: "Tamil", rating: 4.5, proficiency: "Native / Bilingual Fluency" },
    { name: "English", rating: 4, proficiency: "Professional Working Proficiency" }
  ]
};


