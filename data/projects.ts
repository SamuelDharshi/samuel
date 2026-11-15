// Add a project = add one entry here. Summaries are taken from each repo's own description/README.
export type Tag = "Agents" | "Web3" | "AI" | "Full Stack" | "Security" | "Mobile";

export type Project = {
  slug: string; // also the GitHub repo name
  title: string;
  summary: string;
  tags: Tag[];
  stack: string[];
  demo?: string;
  featured?: boolean;
  award?: string;
  role?: string;
  date?: string;
};

export const GITHUB_USER = "SamuelDharshi";
export const repoUrl = (p: Project) => `https://github.com/${GITHUB_USER}/${p.slug}`;

export const projects: Project[] = [
  {
    slug: "Tenor", title: "Tenor", featured: true,
    summary: "Deliverable USDC/EURC FX forwards on Arc: lock a EUR/USD rate today and settle both currencies in one transaction on your date. Live on Arc mainnet.",
    tags: ["Web3"], stack: ["Arc", "USDC", "EURC", "Circle USYC", "Arc Studio"],
    demo: "https://arc-studio-e5ec61eb5f7847d88423d315.vercel.app", award: "Arc Microgrant ($500)", date: "2026-11",
  },
  {
    slug: "ZeroGap", title: "ZeroGap",
    summary: "Independent, open-source proof-of-solvency monitor for Strike Finance. Reads its lockers on Ethereum, Solana and Cardano, counts what it owes traders and shows the gap live, with Telegram safety alerts.",
    tags: ["Web3", "Security"], stack: ["Ethereum", "Solana", "Cardano", "Telegram"],
    demo: "https://zerogap-strike.vercel.app", date: "2026-11",
  },
  {
    slug: "null402", title: "null402", featured: true,
    summary: "Your position is not hidden. It is null. The first x402-based agentic confidential lending protocol on fhEVM: confidentiality by design, solvency by math.",
    tags: ["Web3", "Agents", "Security"], stack: ["TypeScript", "fhEVM", "x402", "FHE"],
    demo: "https://null402.vercel.app", award: "2nd · PL_Genesis ($3,500)", date: "2026-03",
    role: "Built the x402 agentic confidential lending protocol for the PL_Genesis hackathon (Zama & Protocol Labs tracks).",
  },
  {
    slug: "onetimefilesharing", title: "TaskOps One-Time File Sharing", featured: true,
    summary: "Upload and share files with one-time access via QR code and a unique link. Once opened, the file self-destructs.",
    tags: ["Full Stack", "Security"], stack: ["Python", "Streamlit", "Flask", "MariaDB"],
    demo: "https://taskops-one-time-file-sharing.vercel.app/", award: "1st · PSG Tech Kriya 25", date: "2025-03",
    role: "Built the full stack: Streamlit frontend, Flask backend, MariaDB storage.",
  },
  {
    slug: "Starkproof", title: "Starkproof", featured: true,
    summary: "Prove solvency for exchanges without revealing balances. A privacy-preserving Proof of Reserves platform using zk-STARKs.",
    tags: ["Web3", "Security"], stack: ["TypeScript", "zk-STARKs", "Starknet"],
    demo: "https://starkproof.vercel.app", award: "Top 10 · Starknet (14,208 STRK)",
  },
  {
    slug: "Infosys_Springboard_PolicyNav_Public-_Policy_Navigation_Using_AI-", title: "Public PolicyNav", featured: true,
    summary: "Turns dense, jargon-heavy policy documents into simple, multilingual, actionable insights. JWT multi-role auth plus a readability dashboard.",
    tags: ["AI", "Full Stack", "Security"], stack: ["Python", "JWT", "Jupyter"],
    date: "2026-02", role: "Architected JWT multi-role authentication and the readability dashboard during the Infosys Springboard internship.",
  },
  {
    slug: "AgentFi", title: "AgentFi", featured: true,
    summary: "The trust layer for AI agent commerce. AI agents negotiate and execute OTC trades on Hedera with no human in the middle.",
    tags: ["Agents", "Web3"], stack: ["TypeScript", "Hedera"], demo: "https://agentfi-alpha.vercel.app",
  },
  {
    slug: "Asset402", title: "Asset402", featured: true,
    summary: "One photograph. Six AI agents. Real-time x402 streaming RWA dividends on the Casper Network.",
    tags: ["Agents", "Web3", "AI"], stack: ["TypeScript", "x402", "Casper"], demo: "https://asset402.vercel.app",
  },
  {
    slug: "Arena", title: "Arena",
    summary: "Agents settle in USDC on Arc and sign through Circle wallets. Decisions run on NVIDIA Nemotron, and attacks are remembered in a tiered memory.",
    tags: ["Agents", "Web3", "Security"], stack: ["TypeScript", "USDC", "Circle", "Nemotron"],
  },
  {
    slug: "Agent-Arena", title: "Agent Arena",
    summary: "Built for the Tameion Agents Hackathon (Canteen × Circle): policy wallets, risk-tiered limits and reputation from outcomes, settled in USDC on Arc.",
    tags: ["Agents", "Web3"], stack: ["TypeScript", "USDC", "Arc"], demo: "https://agent-arena-tameion.vercel.app",
  },
  {
    slug: "Readset", title: "Readset",
    summary: "A spend firewall and audit trail for autonomous wallets on Monad. It checks what an AI agent wants to spend before the money moves.",
    tags: ["Agents", "Web3", "Security"], stack: ["TypeScript", "Monad"],
  },
  {
    slug: "bonded", title: "Bonded",
    summary: "A guardrail for agents using a proof-checking mechanism. Payment facts such as vendor, payout address and amount are re-fetched and verified.",
    tags: ["Agents", "Security", "Web3"], stack: ["Solidity", "TypeScript"], demo: "https://bondedfi.vercel.app",
  },
  {
    slug: "Vigil", title: "Vigil",
    summary: "A live agent running on Mantle Sepolia with an on-chain ledger and proof transactions.",
    tags: ["Agents", "Web3"], stack: ["TypeScript", "Mantle"], demo: "https://vigil-portfolio.vercel.app/",
  },
  {
    slug: "Proofmark", title: "Proofmark",
    summary: "x402 payments and audit on Hedera, identity on ENSv2, uniqueness and spend authority from World.",
    tags: ["Web3", "Agents", "Security"], stack: ["TypeScript", "Hedera", "ENSv2", "World"], demo: "https://proofmark-web.vercel.app",
  },
  {
    slug: "Sentinal", title: "Sentinel",
    summary: "Grant a weekly USDC budget once. An agent workforce buys intelligence on the open web, synthesizes it privately on Venice AI and delivers insights to your dashboard.",
    tags: ["Agents", "AI", "Web3"], stack: ["TypeScript", "USDC", "Venice AI"],
  },
  {
    slug: "Companion", title: "Companion",
    summary: "Thunai (\"companion\" in Tamil): a family money agent for Indian parents with a child studying abroad.",
    tags: ["Agents", "AI", "Web3"], stack: ["TypeScript", "Monad"], demo: "https://companion-monad.vercel.app",
  },
  {
    slug: "Reclaim", title: "Reclaim",
    summary: "An autonomous, policy-bounded revenue recovery control tower for Razorpay merchants. It diagnoses payment failures, enforces NPCI guardrails and audits actions in a SHA-256 ledger.",
    tags: ["Agents", "AI", "Full Stack"], stack: ["TypeScript", "Razorpay"], demo: "https://reclaimrevenue.vercel.app/",
  },
  {
    slug: "Tradewhisper", title: "Tradewhisper",
    summary: "Just whisper your trade. The chain handles the rest.",
    tags: ["Agents", "Web3", "AI"], stack: ["TypeScript"], demo: "https://tradewhisper.vercel.app",
  },
  {
    slug: "Protocol402", title: "Protocol402",
    summary: "One embed script that turns any creator's site into an x402-priced content source.",
    tags: ["Web3", "Full Stack"], stack: ["TypeScript", "x402"],
  },
  {
    slug: "Alpha402", title: "Alpha402", summary: "An x402-powered project built on the 402 payments protocol.",
    tags: ["Web3"], stack: ["TypeScript", "x402"], demo: "https://alpha402.vercel.app",
  },
  {
    slug: "factor", title: "FACTOR",
    summary: "Turns a DAO-approved invoice into an NFT that is its own bank account on NEAR. Sell it at a discount for cash today; when the DAO pays, the holder gets paid.",
    tags: ["Web3", "Agents"], stack: ["Rust", "NEAR"], demo: "https://factor.luffyy.tech/",
  },
  {
    slug: "StellarSeal", title: "StellarSeal",
    summary: "Sealed-tally DAO governance on Stellar. Every vote is proven with Noir, committed with Poseidon2 and verified in Soroban, so nobody sees the running tally.",
    tags: ["Web3", "Security"], stack: ["TypeScript", "Noir", "Soroban"], demo: "https://stellarseal.vercel.app",
  },
  {
    slug: "FloodFirst", title: "FloodFirst",
    summary: "A flood-relief system that pays vulnerable households before a flood arrives. Runs on Base Sepolia.",
    tags: ["Web3", "Full Stack"], stack: ["TypeScript", "Base"], demo: "https://floodfirst.vercel.app",
  },
  {
    slug: "Accord", title: "Accord",
    summary: "Tackles high fees, payment delays and trust disputes in global freelancing, where work verification is subjective and manual.",
    tags: ["Web3", "Full Stack"], stack: ["TypeScript"], demo: "https://accord-eta-one.vercel.app/",
  },
  {
    slug: "rolezero-", title: "RoleZero",
    summary: "On-chain payroll as an alternative to the traditional model where companies hold the funds and employees trust they'll get paid.",
    tags: ["Web3", "Full Stack"], stack: ["TypeScript"], demo: "https://rolezero.vercel.app/",
  },
  {
    slug: "VisionVault", title: "VisionVault",
    summary: "An AI-powered, permissionless bounty platform on Bitcoin Cash. Complete real-world tasks, upload proof photos, get verified by AI and receive instant BCH rewards.",
    tags: ["AI", "Web3", "Full Stack"], stack: ["TypeScript", "Bitcoin Cash"], demo: "https://vision-vault-ashen.vercel.app",
  },
  {
    slug: "Fathom", title: "Fathom",
    summary: "An independent liquidity scorecard for Strike, built from its public L3 order feed and benchmarked against Binance and Hyperliquid.",
    tags: ["AI", "Full Stack"], stack: ["Python"],
  },
  {
    slug: "follow", title: "Follow",
    summary: "Ask a liquidity question and get an answer where every number traces to a recorded measurement, gaps in the data are named and confidence drops when data is thin.",
    tags: ["AI"], stack: ["Python"],
  },
  {
    slug: "Theervu-Kaanal", title: "Theervu-Kaanal",
    summary: "A citizen grievance portal for Tamil Nadu departments (Water, Electricity, RTO). It routes each complaint to the right official, tracks it publicly and escalates it if it stalls.",
    tags: ["Full Stack"], stack: ["JavaScript"], demo: "https://theervu-kaanal.vercel.app/",
  },
  {
    slug: "TimeCall", title: "TimeCall",
    summary: "A smartphone-dialer style app for placing live spoken calls to history's great minds, including Einstein, Marie Curie, Tesla, Cleopatra and da Vinci.",
    tags: ["AI", "Full Stack"], stack: ["TypeScript"], demo: "https://timecall-frontend.vercel.app",
  },
  {
    slug: "Reflectra", title: "Reflectra",
    summary: "An AI self-reflection tool that aligns decisions with your values and goals, using Claude Sonnet 4 with Google Gemini 2.0 Flash as fallback.",
    tags: ["AI", "Full Stack"], stack: ["TypeScript", "Claude", "Gemini"], demo: "http://reflectra-me.netlify.app",
  },
  {
    slug: "AI-Tripp", title: "AI DreamTrip",
    summary: "A Next.js landing page for an intelligent travel assistant that plans, books and guides trips with AI.",
    tags: ["AI", "Full Stack"], stack: ["Next.js", "TypeScript"],
  },
  {
    slug: "Echomind", title: "Echomind",
    summary: "Built for Creative Minds Jam #1: Hong Kong (DoraHacks × Minds by Animoca Brands), Content Repurposing Across Platforms track.",
    tags: ["AI"], stack: ["TypeScript"],
  },
  {
    slug: "truly-ai", title: "Truly AI",
    summary: "A social media content fact-checker using multi-modal analysis.",
    tags: ["AI", "Security"], stack: ["TypeScript"], demo: "https://truly-ai.vercel.app",
  },
  {
    slug: "embryo-viability-predictor", title: "Embryo Viability Predictor",
    summary: "An AI model that predicts early embryo developmental success from initial embryo images.",
    tags: ["AI"], stack: ["Python"],
  },
  {
    slug: "InfectionX", title: "InfectionX",
    summary: "Tactical bio-hazard survival game.",
    tags: ["Full Stack"], stack: ["TypeScript"],
  },
  {
    slug: "Fitnesstrackerapp", title: "FitCore AI",
    summary: "A modern Android fitness app for daily consistency: workout planning, nutrition tracking, reminders, analytics and an AI coach.",
    tags: ["Mobile", "AI"], stack: ["Kotlin"],
  },
  {
    slug: "Fitnessnutrition", title: "Fitness Nutrition",
    summary: "Track calories, proteins, carbs and fats.",
    tags: ["Full Stack"], stack: ["JavaScript"],
  },
  {
    slug: "waterconsumption", title: "Water Consumption",
    summary: "A smart water consumption tracker.",
    tags: ["Full Stack"], stack: ["TypeScript"], demo: "https://waterconsumption.vercel.app",
  },
  {
    slug: "TypeNinja", title: "TypeNinja", summary: "A typing practice site.", tags: ["Full Stack"], stack: ["Web"],
  },
  {
    slug: "rms-system-devops", title: "RMS System", summary: "RMS with a Java backend built with Maven, plus a deployed frontend.",
    tags: ["Full Stack"], stack: ["Java", "Maven", "TypeScript"], demo: "https://rms-system-frontend.vercel.app/",
  },
];

// Repos on GitHub with no public description yet; shown as a compact list.
export const moreRepos = [
  "MicroHedge", "ChainCapsule", "SealFI", "ShadeFi", "Backend-AI", "gamepayx", "attendance-system", "devops", "mini-project", "sih25", "Gen_Ai", "absl-kh", "Webifyy", "Bondedai",
];

export const allTags: Tag[] = ["Agents", "Web3", "AI", "Full Stack", "Security", "Mobile"];
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const urlSlug = (p: Project) => p.slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const getByUrlSlug = (s: string) => projects.find((p) => urlSlug(p) === s);
