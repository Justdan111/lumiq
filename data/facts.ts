import { CategoryId } from "../constants/categories";


export interface Fact {
  id: string;
  category: CategoryId;
  title: string;
  body: string;
  readTime: number;
}

export const FACTS: Fact[] = [
  // ── SCIENCE (10) 
  {
    id: "sci-001",
    category: "science",
    title: "The Golden Ratio in Nature",
    body: "From the spiral of a galaxy to the arrangement of petals on a flower, a mathematical pattern repeats across the universe. The golden ratio (1.618...) appears in nautilus shells, hurricanes, and even the human face — nature's favourite proportion.",
    readTime: 3,
  },
  {
    id: "sci-002",
    category: "science",
    title: "Bioluminescence in Deep Oceans",
    body: "Over 76% of deep-sea creatures produce their own light. This bioluminescence serves as camouflage, a lure for prey, or a means of communication. In the pitch-black abyss, light is the only language that matters.",
    readTime: 3,
  },
  {
    id: "sci-003",
    category: "science",
    title: "Trees Talk Underground",
    body: "Forests are social networks. Trees communicate through a fungal web called the mycorrhizal network — sharing nutrients, sending warning signals, and even feeding struggling neighbours. Scientists call it the 'Wood Wide Web'.",
    readTime: 4,
  },
  {
    id: "sci-004",
    category: "science",
    title: "Your Body Is Mostly Empty Space",
    body: "If you removed all the empty space from atoms in a human body, the remaining matter would fit in a sugar cube. Yet that cube would weigh around 5 billion tonnes — because mass isn't in the space, it's in the quantum fields.",
    readTime: 3,
  },
  {
    id: "sci-005",
    category: "science",
    title: "Sound Can't Travel in Space",
    body: "Space is a near-perfect vacuum. Without molecules to compress and expand, sound waves have nothing to travel through. The universe hums with plasma waves and infrasound — but human ears would hear absolutely nothing.",
    readTime: 3,
  },
  {
    id: "sci-006",
    category: "science",
    title: "The Quantum Collapse of Determinism",
    body: "At the quantum level, particles exist in superposition — all possible states simultaneously — until observed. This challenges every assumption that the universe is deterministic. At its smallest scale, reality appears fundamentally probabilistic.",
    readTime: 5,
  },
  {
    id: "sci-007",
    category: "science",
    title: "Stars Are Nuclear Reactors",
    body: "The Sun fuses 620 million tonnes of hydrogen into helium every second. This nuclear fusion releases energy via E=mc² — even tiny mass differences become enormous energy. You are being warmed by nuclear fire, 150 million kilometres away.",
    readTime: 3,
  },
  {
    id: "sci-008",
    category: "science",
    title: "Octopuses Have Three Hearts",
    body: "Two hearts pump blood to the gills; one pumps it to the body. When an octopus swims, the body heart stops — which is why they prefer crawling. Their blue, copper-based blood is optimised for cold, low-oxygen environments.",
    readTime: 3,
  },
  {
    id: "sci-009",
    category: "science",
    title: "Lightning Is Hotter Than the Sun",
    body: "Earth is struck by lightning roughly 100 times every second. Each bolt superheats the surrounding air to 30,000 K — five times hotter than the Sun's surface — creating the shockwave we hear as thunder.",
    readTime: 3,
  },
  {
    id: "sci-010",
    category: "science",
    title: "Honey Never Expires",
    body: "Archaeologists have found 3,000-year-old honey in Egyptian tombs — still perfectly edible. Honey's low water content, acidic pH, and hydrogen peroxide content create an environment where bacteria simply cannot survive.",
    readTime: 3,
  },

  // ── HISTORY (10) ────────────────────────────────────────────────────────
  {
    id: "his-001",
    category: "history",
    title: "Silk Roads and Shadow Empires",
    body: "The Silk Roads weren't just trade routes for silk — they carried spices, glass, diseases, religions, and ideas across continents for over 1,500 years. The forgotten empires that controlled them shaped the modern world more than any textbook admits.",
    readTime: 4,
  },
  {
    id: "his-002",
    category: "history",
    title: "Cleopatra Is Closer to Us Than the Pyramids",
    body: "Cleopatra VII died in 30 BC. The Great Pyramid was built around 2560 BC. The Moon landing was 1969 AD. Cleopatra was separated from the pyramids by 2,500 years — but from Neil Armstrong by only 2,000 years.",
    readTime: 3,
  },
  {
    id: "his-003",
    category: "history",
    title: "The Library of Alexandria Burned Multiple Times",
    body: "The destruction of Alexandria's library wasn't a single dramatic event. It declined gradually over centuries due to neglect, funding cuts, and multiple fires. The myth of one catastrophic loss serves a narrative, not history.",
    readTime: 4,
  },
  {
    id: "his-004",
    category: "history",
    title: "The Mongols Were Surprisingly Tolerant",
    body: "Despite their fearsome reputation, the Mongols under Genghis Khan were remarkably tolerant of religion, creating the world's first international postal system, a meritocratic military, and free trade zones across Eurasia.",
    readTime: 4,
  },
  {
    id: "his-005",
    category: "history",
    title: "Medieval People Knew the Earth Was Round",
    body: "Contrary to popular myth, educated people in medieval Europe knew the Earth was round — established by ancient Greek astronomers. Columbus wasn't proving the Earth was round; he was arguing (incorrectly) about its size.",
    readTime: 3,
  },
  {
    id: "his-006",
    category: "history",
    title: "The Roman Empire Never Really Fell",
    body: "The Eastern Roman (Byzantine) Empire continued for nearly 1,000 years after 476 AD, falling only in 1453. Meanwhile, Rome's legal system, Latin language, calendar, and Christianity shaped every European civilisation that followed.",
    readTime: 4,
  },
  {
    id: "his-007",
    category: "history",
    title: "Napoleon Was Not Short",
    body: "Napoleon was around 5'7\" — average height for his era. The myth arose from British propaganda and a confusion between French and English inches. His nickname 'le petit caporal' was affectionate, not a reference to his height.",
    readTime: 3,
  },
  {
    id: "his-008",
    category: "history",
    title: "The Black Death Freed the Serfs",
    body: "The 14th-century plague killed 30–60% of Europe's population. The labour shortage gave surviving peasants unprecedented bargaining power — accelerating the end of feudalism and laying groundwork for the Renaissance.",
    readTime: 4,
  },
  {
    id: "his-009",
    category: "history",
    title: "Ancient Rome Had Fast Food",
    body: "Archaeologists have found over 80 thermopolia in Pompeii — ancient fast food counters with built-in stone containers for warm food and drinks. Romans rarely cooked at home; eating out was the norm for most city dwellers.",
    readTime: 3,
  },
  {
    id: "his-010",
    category: "history",
    title: "The First Computer Programmer Was a Woman",
    body: "Ada Lovelace wrote the first algorithm intended for a machine in 1843 — for Charles Babbage's Analytical Engine, which was never built. She envisioned computers doing far more than mere calculation, nearly 100 years before they existed.",
    readTime: 3,
  },

  // ── PHILOSOPHY (10) ──────────────────────────────────────────────────────
  {
    id: "phi-001",
    category: "philosophy",
    title: "The Ethics of Radical Solitude",
    body: "Kierkegaard argued that the crowd is untruth — that authentic selfhood requires separating from the masses. In an age of algorithmic feeds designed to keep us scrolling, his warning about losing the self feels more urgent than ever.",
    readTime: 5,
  },
  {
    id: "phi-002",
    category: "philosophy",
    title: "Plato's Cave Is Still Happening",
    body: "Plato described prisoners in a cave, mistaking shadows for reality. Today, our social feeds are algorithmically curated shadow plays. We see what the platform wants us to see and mistake it for a complete picture of the world.",
    readTime: 4,
  },
  {
    id: "phi-003",
    category: "philosophy",
    title: "Stoicism Is Not Emotional Suppression",
    body: "The Stoics — Epictetus, Marcus Aurelius, Seneca — didn't advocate for emotional numbness. They taught the art of distinguishing what is within your control from what isn't, and responding with clarity rather than reacting with panic.",
    readTime: 4,
  },
  {
    id: "phi-004",
    category: "philosophy",
    title: "The Ship of Theseus",
    body: "If a ship has every single plank replaced over time, is it still the same ship? This ancient paradox applies directly to identity and consciousness. Are you the same person you were ten years ago? Physically, you largely aren't.",
    readTime: 4,
  },
  {
    id: "phi-005",
    category: "philosophy",
    title: "Nietzsche Was Alarmed, Not Celebrating",
    body: "When Nietzsche wrote 'God is dead,' he wasn't triumphant — he was alarmed. He meant that secular modernity had destroyed the shared moral framework giving life meaning, and warned that nihilism would fill the vacuum.",
    readTime: 5,
  },
  {
    id: "phi-006",
    category: "philosophy",
    title: "The Trolley Problem Has No Answer",
    body: "The trolley problem isn't designed to have a correct answer. It exposes the tension between consequentialist thinking (outcomes matter most) and deontological thinking (actions carry inherent moral weight regardless of outcome).",
    readTime: 4,
  },
  {
    id: "phi-007",
    category: "philosophy",
    title: "Socrates Never Wrote Anything Down",
    body: "Everything we know about one of history's most influential thinkers comes secondhand — mostly through Plato's dialogues. Socrates believed writing weakened memory. The irony: he survives only through text.",
    readTime: 3,
  },
  {
    id: "phi-008",
    category: "philosophy",
    title: "Free Will and Determinism Can Coexist",
    body: "Compatibilism argues that free will and determinism aren't mutually exclusive. Even if every event is causally determined, 'freedom' can mean acting according to your own desires without external coercion. Most philosophers today are compatibilists.",
    readTime: 5,
  },
  {
    id: "phi-009",
    category: "philosophy",
    title: "The Absurd Is Not Nihilism",
    body: "Albert Camus argued that life has no inherent meaning — but instead of despair, he proposed revolt: embracing life fully despite its absurdity. 'Imagine Sisyphus happy,' he wrote. Defiance itself becomes a form of joy.",
    readTime: 4,
  },
  {
    id: "phi-010",
    category: "philosophy",
    title: "Zen Koans Break Logic Deliberately",
    body: "What is the sound of one hand clapping? Zen koans aren't riddles with answers — they are designed to exhaust rational thinking until the mind surrenders and reaches direct experience. What Zen calls satori: sudden awakening.",
    readTime: 4,
  },

  // ── TECH (10) ────────────────────────────────────────────────────────────
  {
    id: "tec-001",
    category: "tech",
    title: "The Internet Weighs About 50 Grams",
    body: "All digital data is stored as electrons. Scientists estimate the mass-energy equivalent of all electrons holding the internet's data is roughly 50 grams — about the weight of a strawberry. The entire global information network.",
    readTime: 3,
  },
  {
    id: "tec-002",
    category: "tech",
    title: "Wi-Fi Was Invented by Accident",
    body: "In the 1990s, Australian astronomer John O'Sullivan was trying to detect exploding mini black holes using radio waves. His experiment failed, but the signal-processing algorithm he developed became the foundation of Wi-Fi technology.",
    readTime: 3,
  },
  {
    id: "tec-003",
    category: "tech",
    title: "The First Spam Email Was Sent in 1978",
    body: "Gary Thuerk sent an unsolicited mass email to 393 ARPANET users advertising DEC computers. He received angry responses but also made several sales. The internet had existed for under a decade and was already exploited for marketing.",
    readTime: 3,
  },
  {
    id: "tec-004",
    category: "tech",
    title: "GPS Requires Einstein's Relativity",
    body: "GPS satellites experience time differently than clocks on Earth due to both special and general relativity. Engineers must correct for a drift of ~38 microseconds per day. Without Einstein's equations, GPS would accumulate errors of 10 km daily.",
    readTime: 4,
  },
  {
    id: "tec-005",
    category: "tech",
    title: "The First Computer Bug Was a Real Bug",
    body: "In 1947, Grace Hopper's team found a moth stuck in a relay of the Harvard Mark II computer — causing a malfunction. They taped it into their logbook: 'First actual case of bug being found.' The term debugging became universal.",
    readTime: 3,
  },
  {
    id: "tec-006",
    category: "tech",
    title: "Moore's Law Is Ending",
    body: "Gordon Moore's 1965 prediction — transistor density doubles every two years — held for decades. But we're now approaching physical limits: transistors are just a few atoms wide. The era of predictable silicon scaling is over.",
    readTime: 4,
  },
  {
    id: "tec-007",
    category: "tech",
    title: "Quantum Computers Don't Replace Classical Ones",
    body: "Quantum computers are not universally faster — they excel only at specific problem types: factoring large numbers, simulating molecules, optimisation. For most everyday computing tasks, a classical computer will always be more practical.",
    readTime: 4,
  },
  {
    id: "tec-008",
    category: "tech",
    title: "The Cloud Is Someone Else's Computer",
    body: "'Stored in the cloud' obscures a physical reality: your data lives in a warehouse-sized data centre, consuming enormous electricity and water. Global data centres use roughly 200 terawatt-hours of electricity annually.",
    readTime: 3,
  },
  {
    id: "tec-009",
    category: "tech",
    title: "Open Source Powers Civilisation",
    body: "Linux runs on 96% of the world's top servers, Android, and most internet infrastructure. The code was written mostly by volunteers. The modern internet — and arguably modern civilisation — is built on freely shared, collaboratively written code.",
    readTime: 3,
  },
  {
    id: "tec-010",
    category: "tech",
    title: "The Dark Web Is Mostly Boring",
    body: "The 'dark web' sounds sinister, but most of it is legitimate — privacy forums, whistleblower platforms, censorship-circumvention tools. Actual criminal marketplaces are a small fraction. Most Tor traffic is from people who simply want privacy.",
    readTime: 3,
  },

  // ── PSYCHOLOGY (10) ──────────────────────────────────────────────────────
  {
    id: "psy-001",
    category: "psychology",
    title: "The Dunning-Kruger Effect Is Misunderstood",
    body: "The famous study shows incompetent people overestimate their ability — but the full finding is that experts underestimate theirs. Confidence and competence are inversely correlated at the extremes. Knowing more reveals how little you know.",
    readTime: 4,
  },
  {
    id: "psy-002",
    category: "psychology",
    title: "Sleep Deprivation Mimics Psychosis",
    body: "After 72 hours without sleep, most people experience hallucinations, paranoia, and disordered thinking indistinguishable from acute psychosis. Sleep isn't rest — it's the brain's essential maintenance cycle, clearing metabolic waste.",
    readTime: 4,
  },
  {
    id: "psy-003",
    category: "psychology",
    title: "Your Brain Actively Rewrites Memories",
    body: "Every time you recall a memory, you reconstruct it — and subtly alter it in the process. Memories aren't recordings; they're narratives. This is why eyewitness testimony is notoriously unreliable and why nostalgia is always fiction.",
    readTime: 3,
  },
  {
    id: "psy-004",
    category: "psychology",
    title: "Flow State: When Time Disappears",
    body: "Psychologist Mihaly Csikszentmihalyi identified 'flow' — complete absorption in a challenging task where self-consciousness dissolves and time distorts. It requires skill and challenge to be closely matched. It may be the closest humans get to happiness.",
    readTime: 4,
  },
  {
    id: "psy-005",
    category: "psychology",
    title: "Cognitive Dissonance Shapes Beliefs",
    body: "When our actions contradict our beliefs, the discomfort often leads us to change our beliefs to match our actions — not the other way around. We are remarkably skilled at rationalising what we have already decided to do.",
    readTime: 4,
  },
  {
    id: "psy-006",
    category: "psychology",
    title: "The Hawthorne Effect: Being Watched Changes You",
    body: "Workers at a 1920s factory became more productive simply because they were being observed — regardless of what changes were made. Awareness of observation alters behaviour. This is why placebo-controlled, double-blind trials were invented.",
    readTime: 4,
  },
  {
    id: "psy-007",
    category: "psychology",
    title: "Loneliness Is as Deadly as Smoking",
    body: "Research by Julianne Holt-Lunstad found social isolation increases mortality risk by 26% — comparable to smoking 15 cigarettes a day. The brain processes social rejection in the same regions as physical pain. Connection is a biological need.",
    readTime: 4,
  },
  {
    id: "psy-008",
    category: "psychology",
    title: "The Peak-End Rule Shapes All Experience",
    body: "Daniel Kahneman found we judge experiences almost entirely by their peak moment and how they ended — not their total duration. A shorter painful procedure with a gentle ending is remembered as less painful than one that ends abruptly.",
    readTime: 4,
  },
  {
    id: "psy-009",
    category: "psychology",
    title: "Priming: Your Environment Controls Your Thoughts",
    body: "Exposure to certain stimuli unconsciously influences subsequent behaviour. People exposed to elderly-related words walked more slowly afterward. The words you read, images you see, and music you hear are silently shaping your next decision.",
    readTime: 4,
  },
  {
    id: "psy-010",
    category: "psychology",
    title: "The Bystander Effect Is Overblown",
    body: "Studies show people are less likely to help in emergencies when others are present. But recent analysis of real CCTV footage found bystanders actually intervene in the vast majority of conflict situations — especially in groups.",
    readTime: 4,
  },
];

export const getFactById = (id: string): Fact | undefined =>
  FACTS.find((f) => f.id === id);

export const getFactsByCategories = (categories: CategoryId[]): Fact[] =>
  FACTS.filter((f) => categories.includes(f.category));

export const getDailyFact = (categories: CategoryId[]): Fact => {
  const pool =
    categories.length > 0 ? getFactsByCategories(categories) : FACTS;
  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();
  return pool[seed % pool.length];
};

export const getNextFacts = (
  categories: CategoryId[],
  currentId: string,
  count = 5
): Fact[] => {
  const pool =
    categories.length > 0 ? getFactsByCategories(categories) : FACTS;
  const idx = pool.findIndex((f) => f.id === currentId);
  const result: Fact[] = [];
  for (let i = 1; i <= count; i++) {
    result.push(pool[(idx + i) % pool.length]);
  }
  return result;
};
