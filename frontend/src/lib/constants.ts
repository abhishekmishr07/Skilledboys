export interface CategoryItem {
  id: string;
  name: string;
  category: string;
  badge: string;
  count: string;
  image: string;
  description: string;
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: "cleaner",
    name: "Home Cleaning",
    category: "Cleaner",
    badge: "🏠 Home Services",
    count: "2,400+ Pros",
    image: "/images/cleaner.png",
    description: "Deep house cleaning, dusting, disinfection, kitchen & bathroom sanitization.",
  },
  {
    id: "electrician",
    name: "Electrician",
    category: "Electrician",
    badge: "⚡ Electrical",
    count: "1,200+ Pros",
    image: "/images/electrician.png",
    description: "Wiring, switchboards, appliance repair, MCB trips, inverter setup.",
  },
  {
    id: "plumber",
    name: "Plumber",
    category: "Plumber",
    badge: "🔧 Plumbing",
    count: "980+ Experts",
    image: "/images/plumber.png",
    description: "Pipe leakage, sanitary fitting, water tank repair, tap installations.",
  },
  {
    id: "carpenter",
    name: "Carpenter",
    category: "Carpenter",
    badge: "🪵 Carpentry",
    count: "650+ Skilled",
    image: "/images/carpanter.png",
    description: "Furniture repair, custom wood crafting, door locks, modular setups.",
  },
  {
    id: "cook",
    name: "Cook / Chef",
    category: "Cook",
    badge: "🍳 Culinary",
    count: "500+ Cooks",
    image: "/images/cook.png",
    description: "Home-style breakfast, lunch, dinner, party catering & custom dietary menus.",
  },
  {
    id: "driver",
    name: "Driver",
    category: "Driver",
    badge: "🚗 Transport",
    count: "300+ Drivers",
    image: "/images/driver.png",
    description: "Personal chauffeur, daily commute, intercity travel, night shifts.",
  },
  {
    id: "maid",
    name: "Maid / Housekeeper",
    category: "Maid",
    badge: "🧹 Housekeeping",
    count: "800+ Helpers",
    image: "/images/maid.png",
    description: "Daily housekeeping, dish washing, floor mopping, laundry folding.",
  },
  {
    id: "painter",
    name: "Painter",
    category: "Painter",
    badge: "🎨 Painting",
    count: "420+ Painters",
    image: "/images/painter.png",
    description: "Interior/exterior wall painting, waterproof coating, texture designs.",
  },
  {
    id: "labour",
    name: "Labour / Helper",
    category: "Labour",
    badge: "💪 Labour",
    count: "1,500+ Workers",
    image: "/images/labour.png",
    description: "Loading, unloading, construction assistance, shifting, manual tasks.",
  },
  {
    id: "gardener",
    name: "Gardener",
    category: "Gardener",
    badge: "🌿 Gardening",
    count: "250+ Gardeners",
    image: "/images/garder.png",
    description: "Balcony garden landscaping, plant repotting, lawn care, tree pruning.",
  },
  {
    id: "interior",
    name: "Interior Designer",
    category: "Interior Designer",
    badge: "✨ Design",
    count: "180+ Designers",
    image: "/images/Interior.png",
    description: "Room styling, space planning, lighting design, modern renovation.",
  },
  {
    id: "trainer",
    name: "Fitness Trainer",
    category: "Fitness Trainer",
    badge: "🏋️ Health",
    count: "200+ Trainers",
    image: "/images/trainer.png",
    description: "Personal training, strength workouts, fat loss guidance, home sessions.",
  },
  {
    id: "yoga",
    name: "Yoga Instructor",
    category: "Yoga Instructor",
    badge: "🧘 Wellness",
    count: "190+ Instructors",
    image: "/images/Yoga.png",
    description: "Hatha, Vinyasa, Pranayama, meditation, posture alignment & healing.",
  },
  {
    id: "teacher",
    name: "Private Tutor",
    category: "Teacher",
    badge: "📚 Education",
    count: "350+ Tutors",
    image: "/images/teacher.png",
    description: "School syllabus, mathematics, science, language tutoring for kids.",
  },
  {
    id: "nurse",
    name: "Nurse / Caretaker",
    category: "Nurse",
    badge: "🩺 Healthcare",
    count: "160+ Caregivers",
    image: "/images/nurse.png",
    description: "Patient care, elderly assistance, wound dressing, post-op support.",
  },
  {
    id: "baby",
    name: "Babysitter",
    category: "Babysitter",
    badge: "👶 Childcare",
    count: "210+ Sitters",
    image: "/images/baby.png",
    description: "Infant & toddler care, storytelling, playful supervision, baby meals.",
  },
  {
    id: "guard",
    name: "Security Guard",
    category: "Security Guard",
    badge: "🛡️ Security",
    count: "400+ Guards",
    image: "/images/gurd.png",
    description: "Residential & commercial security, visitor logs, 24/7 vigil.",
  },
  {
    id: "builder",
    name: "Builder / Mason",
    category: "Builder",
    badge: "🧱 Construction",
    count: "320+ Masons",
    image: "/images/builder.png",
    description: "Brickwork, tile fitting, plastering, boundary wall, structural fixes.",
  },
];

export interface CityItem {
  name: string;
  tag: string;
  image: string;
  workersCount: string;
}

export const CITIES: CityItem[] = [
  { name: "Delhi NCR", tag: "Delhi", image: "/images/delhi1.png", workersCount: "5,400+ Pros" },
  { name: "Noida", tag: "Noida", image: "/images/delhi.png", workersCount: "3,200+ Pros" },
  { name: "Greater Noida", tag: "Greater Noida", image: "/images/delhi1.png", workersCount: "1,900+ Pros" },
  { name: "Gurgaon", tag: "Gurgaon", image: "/images/delhi.png", workersCount: "2,800+ Pros" },
  { name: "Ghaziabad", tag: "Ghaziabad", image: "/images/delhi1.png", workersCount: "2,100+ Pros" },
  { name: "Mumbai", tag: "Mumbai", image: "/images/mumbai.png", workersCount: "6,200+ Pros" },
  { name: "Bengaluru", tag: "Bengaluru", image: "/images/bengaluru.png", workersCount: "4,800+ Pros" },
  { name: "Kolkata", tag: "Kolkata", image: "/images/kolkata.png", workersCount: "3,100+ Pros" },
  { name: "Chennai", tag: "Chennai", image: "/images/chennai.png", workersCount: "2,900+ Pros" },
  { name: "Hyderabad", tag: "Hyderabad", image: "/images/hydrabad.png", workersCount: "3,700+ Pros" },
  { name: "Jaipur", tag: "Jaipur", image: "/images/jaipur.png", workersCount: "2,200+ Pros" },
  { name: "Lucknow", tag: "Lucknow", image: "/images/lucknow1.png", workersCount: "2,600+ Pros" },
  { name: "Patna", tag: "Patna", image: "/images/patna.png", workersCount: "1,800+ Pros" },
  { name: "Indore", tag: "Indore", image: "/images/indore.png", workersCount: "1,950+ Pros" },
  { name: "Gorakhpur", tag: "Gorakhpur", image: "/images/gorakhpur1.png", workersCount: "1,400+ Pros" },
];

export const TEAM_MEMBERS = [
  {
    name: "Abhishek Mishra",
    role: "Founder",
    image: "/images/abhishek.png.jpg",
    instagram: "https://www.instagram.com/abhis.hek_mishra/",
    bio: "Passionate about empowering local blue-collar professionals with direct digital access."
  },
  {
    name: "Manish Verma",
    role: "Co-Founder",
    image: "/images/manish.png",
    instagram: "https://www.instagram.com/manish.v05?igsh=NmxoeDZ3NndtaTE0",
    bio: "Driving partnerships, ground worker relationships, and customer satisfaction."
  },
  {
    name: "Anshuman Singh",
    role: "CEO",
    image: "/images/anshuman1.png.jpg",
    instagram: "https://www.instagram.com/anshuman_sachin?igsh=MXcxYnFjaGRsbjEyNg==",
    bio: "Scaling operations, technology systems, and regional city expansion."
  },
  {
    name: "Anshu Singh",
    role: "CFO",
    image: "/images/Anshu.png",
    instagram: "https://www.instagram.com/anshu____siingh?igsh=anZnZXpncHdoODVo",
    bio: "Managing business economics, financial health, and strategic growth."
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Rohit Sharma",
    role: "Customer · Delhi",
    initial: "R",
    rating: 5,
    text: "The electrician arrived within 45 minutes and fixed our short circuit issue effortlessly. SkilledBoys saved our day without any commission charges!",
    avatarBg: "from-purple-600 to-indigo-600",
  },
  {
    id: 2,
    name: "Priya Mehta",
    role: "Customer · Noida",
    initial: "P",
    rating: 5,
    text: "Found an incredible home cook through SkilledBoys. She has been cooking hygienic meals for our family for 4 months now. Truly one-click convenience!",
    avatarBg: "from-amber-500 to-yellow-400",
  },
  {
    id: 3,
    name: "Amit Gupta",
    role: "Customer · Gurgaon",
    initial: "A",
    rating: 5,
    text: "Had a late night plumbing emergency with a burst pipe. Found Rajesh Kumar on SkilledBoys who answered the phone right away and reached in 30 minutes.",
    avatarBg: "from-emerald-500 to-teal-400",
  },
  {
    id: 4,
    name: "Sunil Rawat",
    role: "Electrician · Noida",
    initial: "S",
    rating: 5,
    text: "As a worker, SkilledBoys gave me direct customer leads in my neighborhood. My monthly income increased by 40% after joining the platform!",
    avatarBg: "from-blue-600 to-cyan-500",
  },
];

export const STATS = [
  { target: 15000, suffix: "+", label: "Happy Customers", decimal: 0 },
  { target: 50000, suffix: "+", label: "Jobs Completed", decimal: 0 },
  { target: 4.8, suffix: "★", label: "Average Rating", decimal: 1 },
  { target: 25, suffix: "+", label: "Cities Covered", decimal: 0 },
];
