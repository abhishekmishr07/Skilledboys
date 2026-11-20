require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://abhishekmishraadev_db_user:Abhishek%402003@abhishekdb.idmxnex.mongodb.net/SkilledBoys";
const JWT_SECRET = process.env.JWT_SECRET || "skilledboys_secure_jwt_secret_key_2025";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// MongoDB Connect
let isDbConnected = false;
mongoose
  .connect(MONGO_URI)
  .then(async () => {
    isDbConnected = true;
    console.log("✅ MongoDB connected successfully to:", mongoose.connection.name || "SkilledBoys");
    await seedInitialDataIfNeeded();
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    console.warn("⚠️ Server running in degraded mode without live MongoDB. Set a reachable MONGO_URI in backend/.env to connect.");
  });

// Worker Schema
const workerSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  number:     { type: String, unique: true, required: true },
  password:   { type: String, required: true },
  category:   { type: String, required: true },
  location:   { type: String, required: true },
  experience: { type: Number, default: 0 },
  gender:     { type: String, required: true },
  startTime:  { type: String, default: "09:00" },
  endTime:    { type: String, default: "18:00" },
  age:        { type: Number, required: true },
  phone:      { type: String, default: "" },
  rating:     { type: Number, default: 4.8 },
  photo:      { type: String, default: "/images/electrician.png" },
  status:     { type: String, default: "working" }, // "working" | "not working"
  hourlyRate: { type: Number, default: 299 },
  bio:        { type: String, default: "Dedicated local professional with proven expertise." },
  createdAt:  { type: Date, default: Date.now },
});

const Worker = mongoose.model("Worker", workerSchema);

// Contact Inquiry Schema
const contactSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  phone:     { type: String, default: "" },
  queryType: { type: String, default: "General" },
  message:   { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const ContactInquiry = mongoose.model("ContactInquiry", contactSchema);

// In-memory fallback if MongoDB connection fails or runs in restricted network
let memoryWorkers = [];
let memoryInquiries = [];

async function seedInitialDataIfNeeded() {
  try {
    const count = await Worker.countDocuments();
    if (count === 0) {
      console.log("🌱 Database is empty. Seeding verified skilled professionals...");
      const sampleWorkers = getSampleSeedWorkers();
      const hashedWorkers = await Promise.all(
        sampleWorkers.map(async (w) => ({
          ...w,
          password: await bcrypt.hash("Password123", 10),
        }))
      );
      await Worker.insertMany(hashedWorkers);
      console.log(`✅ Successfully seeded ${hashedWorkers.length} sample workers into database.`);
    }
  } catch (err) {
    console.error("Error during initial seeding check:", err.message);
  }
}

function getSampleSeedWorkers() {
  return [
    {
      name: "Amit Sharma",
      number: "9876543210",
      phone: "9876543210",
      category: "Electrician",
      location: "Noida",
      experience: 6,
      gender: "Male",
      age: 28,
      rating: 4.9,
      hourlyRate: 350,
      photo: "/images/electrician.png",
      status: "working",
      bio: "Master Electrician with 6+ years experience in household wiring, appliance fixing & MCB installations."
    },
    {
      name: "Priya Singh",
      number: "8765432109",
      phone: "8765432109",
      category: "Cook",
      location: "Delhi",
      experience: 8,
      gender: "Female",
      age: 32,
      rating: 4.8,
      hourlyRate: 400,
      photo: "/images/cook.png",
      status: "working",
      bio: "Specialist North & South Indian home cook, hygienic meal prep, healthy diet menus."
    },
    {
      name: "Rajesh Kumar",
      number: "7654321098",
      phone: "7654321098",
      category: "Plumber",
      location: "Noida",
      experience: 10,
      gender: "Male",
      age: 35,
      rating: 4.7,
      hourlyRate: 300,
      photo: "/images/plumber.png",
      status: "working",
      bio: "Emergency pipeline repair, bathroom fitting, sanitary installations and leakage detection."
    },
    {
      name: "Neha Verma",
      number: "6543210987",
      phone: "6543210987",
      category: "Maid",
      location: "Greater Noida",
      experience: 5,
      gender: "Female",
      age: 27,
      rating: 4.9,
      hourlyRate: 250,
      photo: "/images/maid.png",
      status: "working",
      bio: "Punctual and reliable housekeeping, dusting, kitchen organizing and deep sanitization."
    },
    {
      name: "Vikram Yadav",
      number: "5432109876",
      phone: "5432109876",
      category: "Carpenter",
      location: "Delhi",
      experience: 12,
      gender: "Male",
      age: 40,
      rating: 4.8,
      hourlyRate: 450,
      photo: "/images/carpanter.png",
      status: "working",
      bio: "Custom furniture design, wooden cabinet repairs, door fittings and modular kitchens."
    },
    {
      name: "Suresh Patel",
      number: "4321098765",
      phone: "4321098765",
      category: "Painter",
      location: "Delhi",
      experience: 7,
      gender: "Male",
      age: 31,
      rating: 4.6,
      hourlyRate: 320,
      photo: "/images/painter.png",
      status: "working",
      bio: "Interior & exterior wall painting, texture finish, waterproof coating."
    },
    {
      name: "Mohan Das",
      number: "2109876543",
      phone: "2109876543",
      category: "Driver",
      location: "Gurgaon",
      experience: 15,
      gender: "Male",
      age: 44,
      rating: 4.9,
      hourlyRate: 350,
      photo: "/images/driver.png",
      status: "working",
      bio: "Experienced chauffeur with clean license, automatic & manual cars, intercity navigation."
    },
    {
      name: "Sunita Devi",
      number: "9811223344",
      phone: "9811223344",
      category: "Cleaner",
      location: "Ghaziabad",
      experience: 4,
      gender: "Female",
      age: 29,
      rating: 4.8,
      hourlyRate: 280,
      photo: "/images/cleaner.png",
      status: "working",
      bio: "Deep home cleaning, sofa & carpet shampooing, bathroom descaling."
    },
    {
      name: "Ramesh Chand",
      number: "9899001122",
      phone: "9899001122",
      category: "Gardener",
      location: "Noida",
      experience: 9,
      gender: "Male",
      age: 38,
      rating: 4.7,
      hourlyRate: 260,
      photo: "/images/garder.png",
      status: "working",
      bio: "Balcony garden setup, plant pruning, lawn mowing and organic pest control."
    },
    {
      name: "Anita Saxena",
      number: "9711556677",
      phone: "9711556677",
      category: "Yoga Instructor",
      location: "Delhi",
      experience: 6,
      gender: "Female",
      age: 30,
      rating: 5.0,
      hourlyRate: 600,
      photo: "/images/Yoga.png",
      status: "working",
      bio: "Certified Hatha & Ashtanga yoga coach for weight management, posture & stress relief."
    }
  ];
}

// Populate memory fallback initially
memoryWorkers = getSampleSeedWorkers().map((w, index) => ({
  _id: `mem_${index + 1}`,
  ...w,
  createdAt: new Date(),
}));

// Middleware: Verify Worker Token
function authMiddleware(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "No authentication token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}

// Middleware: Verify Admin Token
function adminAuthMiddleware(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Admin authorization required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.isAdmin) {
      return res.status(403).json({ success: false, message: "Forbidden: Admin privileges required" });
    }
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid admin session" });
  }
}

// ================= ROUTES =================

// Root status
app.get("/", (req, res) => {
  res.json({
    name: "SkilledBoys API",
    tagline: "Connecting local experts in one click.",
    status: "online",
    dbConnected: isDbConnected,
    version: "3.0.0",
  });
});

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "ok",
    message: "✅ SkilledBoys Server is running smoothly!",
    database: isDbConnected ? "connected" : "offline_fallback",
    timestamp: new Date().toISOString()
  });
});

// ================= WORKER PUBLIC & AUTH ENDPOINTS =================

// Search Workers
app.get("/api/workers", async (req, res) => {
  const { category, location, search, status, gender, minRating } = req.query;

  if (isDbConnected) {
    try {
      let query = {};
      if (category && category.trim()) {
        query.category = new RegExp(`^${category.trim()}$`, "i");
      }
      if (location && location.trim()) {
        query.location = new RegExp(`^${location.trim()}$`, "i");
      }
      if (status && status.trim()) {
        query.status = status.trim();
      }
      if (gender && gender.trim()) {
        query.gender = new RegExp(`^${gender.trim()}$`, "i");
      }
      if (minRating) {
        query.rating = { $gte: parseFloat(minRating) };
      }
      if (search && search.trim()) {
        const sRegex = new RegExp(search.trim(), "i");
        query.$or = [
          { name: sRegex },
          { category: sRegex },
          { location: sRegex },
          { bio: sRegex },
        ];
      }

      const workers = await Worker.find(query).select("-password").sort({ rating: -1, createdAt: -1 });
      return res.json(workers);
    } catch (err) {
      console.error("Worker search error:", err);
      return res.status(500).json({ error: "Server error searching workers" });
    }
  }

  // Memory fallback filter
  let filtered = [...memoryWorkers];
  if (category && category.trim()) {
    filtered = filtered.filter(w => w.category.toLowerCase() === category.trim().toLowerCase());
  }
  if (location && location.trim()) {
    filtered = filtered.filter(w => w.location.toLowerCase() === location.trim().toLowerCase());
  }
  if (status && status.trim()) {
    filtered = filtered.filter(w => w.status === status.trim());
  }
  if (gender && gender.trim()) {
    filtered = filtered.filter(w => w.gender.toLowerCase() === gender.trim().toLowerCase());
  }
  if (minRating) {
    filtered = filtered.filter(w => w.rating >= parseFloat(minRating));
  }
  if (search && search.trim()) {
    const s = search.trim().toLowerCase();
    filtered = filtered.filter(w =>
      w.name.toLowerCase().includes(s) ||
      w.category.toLowerCase().includes(s) ||
      w.location.toLowerCase().includes(s)
    );
  }
  return res.json(filtered);
});

// Register Worker
app.post("/api/workers/register", async (req, res) => {
  try {
    const {
      name, number, password, category, location,
      experience, gender, startTime, endTime, age, photo, phone, hourlyRate, bio
    } = req.body;

    if (!name || !number || !password || !category || !location || !age) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields (name, phone number, password, category, location, age)."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (isDbConnected) {
      const existingWorker = await Worker.findOne({ number });
      if (existingWorker) {
        return res.status(400).json({ success: false, message: "A worker with this phone number is already registered!" });
      }

      const newWorker = new Worker({
        name,
        number,
        phone:      phone || number,
        password:   hashedPassword,
        category,
        location,
        experience: Number(experience) || 0,
        gender:     gender || "Male",
        startTime:  startTime || "09:00",
        endTime:    endTime || "18:00",
        age:        Number(age),
        photo:      photo || "/images/electrician.png",
        hourlyRate: Number(hourlyRate) || 299,
        bio:        bio || `${name} is an experienced ${category} in ${location}.`,
      });

      await newWorker.save();
      return res.json({ success: true, message: "✅ Worker registered successfully! You can now login." });
    }

    // Fallback in memory
    const existingMem = memoryWorkers.find(w => w.number === number);
    if (existingMem) {
      return res.status(400).json({ success: false, message: "A worker with this phone number is already registered!" });
    }

    const memWorker = {
      _id: `mem_${Date.now()}`,
      name,
      number,
      phone: phone || number,
      password: hashedPassword,
      category,
      location,
      experience: Number(experience) || 0,
      gender: gender || "Male",
      startTime: startTime || "09:00",
      endTime: endTime || "18:00",
      age: Number(age),
      rating: 4.8,
      photo: photo || "/images/electrician.png",
      status: "working",
      hourlyRate: Number(hourlyRate) || 299,
      bio: bio || `${name} is an experienced ${category} in ${location}.`,
      createdAt: new Date(),
    };
    memoryWorkers.unshift(memWorker);

    return res.json({ success: true, message: "✅ Worker registered successfully! You can now login." });
  } catch (err) {
    console.error("Worker register error:", err);
    res.status(500).json({ success: false, message: "Error registering worker: " + err.message });
  }
});

// Worker Login
app.post("/api/workers/login", async (req, res) => {
  const { number, password } = req.body;

  if (!number || !password) {
    return res.status(400).json({ success: false, message: "Phone number and password are required" });
  }

  try {
    let worker = null;
    if (isDbConnected) {
      worker = await Worker.findOne({ number });
    } else {
      worker = memoryWorkers.find(w => w.number === number);
    }

    if (!worker) {
      return res.status(400).json({ success: false, message: "No worker found with this phone number" });
    }

    const isMatch = await bcrypt.compare(password, worker.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid password credentials" });
    }

    const token = jwt.sign({ id: worker._id, number: worker.number }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      success: true,
      token,
      worker: {
        id:         worker._id,
        name:       worker.name,
        number:     worker.number,
        phone:      worker.phone || worker.number,
        category:   worker.category,
        location:   worker.location,
        experience: worker.experience,
        age:        worker.age,
        gender:     worker.gender,
        rating:     worker.rating,
        photo:      worker.photo,
        status:     worker.status,
        startTime:  worker.startTime,
        endTime:    worker.endTime,
        hourlyRate: worker.hourlyRate,
        bio:        worker.bio,
      },
    });
  } catch (err) {
    console.error("Worker login error:", err);
    res.status(500).json({ success: false, message: "Server error during worker login" });
  }
});

// Worker Profile (Authenticated)
app.get("/api/workers/profile", authMiddleware, async (req, res) => {
  try {
    let worker = null;
    if (isDbConnected) {
      worker = await Worker.findById(req.user.id).select("-password");
    } else {
      worker = memoryWorkers.find(w => String(w._id) === String(req.user.id));
    }

    if (!worker) {
      return res.status(404).json({ success: false, message: "Worker not found" });
    }

    res.json({ success: true, worker });
  } catch (err) {
    console.error("Worker profile error:", err);
    res.status(500).json({ success: false, message: "Server error fetching worker profile" });
  }
});

// Toggle Worker Status
app.put("/api/workers/status/:id", authMiddleware, async (req, res) => {
  try {
    if (String(req.params.id) !== String(req.user.id)) {
      return res.status(403).json({ success: false, message: "You can only update your own status" });
    }

    if (isDbConnected) {
      const worker = await Worker.findById(req.params.id);
      if (!worker) return res.status(404).json({ success: false, message: "Worker not found" });

      worker.status = worker.status === "working" ? "not working" : "working";
      await worker.save();
      return res.json({ success: true, status: worker.status });
    }

    const worker = memoryWorkers.find(w => String(w._id) === String(req.params.id));
    if (!worker) return res.status(404).json({ success: false, message: "Worker not found" });

    worker.status = worker.status === "working" ? "not working" : "working";
    return res.json({ success: true, status: worker.status });
  } catch (err) {
    console.error("Worker status toggle error:", err);
    res.status(500).json({ success: false, message: "Error updating status" });
  }
});

// Update Worker Profile
app.put("/api/workers/:id", authMiddleware, async (req, res) => {
  try {
    if (String(req.params.id) !== String(req.user.id)) {
      return res.status(403).json({ success: false, message: "You can only update your own profile" });
    }

    const allowedFields = [
      "name", "category", "location", "experience", "gender",
      "startTime", "endTime", "age", "phone", "photo", "hourlyRate", "bio"
    ];
    const updates = {};
    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: "No valid profile fields provided" });
    }

    if (isDbConnected) {
      const updated = await Worker.findByIdAndUpdate(
        req.params.id,
        { $set: updates },
        { new: true, runValidators: true }
      ).select("-password");

      if (!updated) return res.status(404).json({ success: false, message: "Worker not found" });
      return res.json({ success: true, worker: updated });
    }

    const worker = memoryWorkers.find(w => String(w._id) === String(req.params.id));
    if (!worker) return res.status(404).json({ success: false, message: "Worker not found" });

    Object.assign(worker, updates);
    return res.json({ success: true, worker });
  } catch (err) {
    console.error("Worker update error:", err);
    res.status(400).json({ success: false, message: "Error updating profile" });
  }
});

// ================= CONTACT INQUIRY ENDPOINT =================

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, queryType, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Name and email are required" });
    }

    if (isDbConnected) {
      const inquiry = new ContactInquiry({ name, email, phone, queryType, message });
      await inquiry.save();
    } else {
      memoryInquiries.unshift({ id: Date.now(), name, email, phone, queryType, message, createdAt: new Date() });
    }

    res.json({ success: true, message: "Thank you for reaching out! Our team will contact you shortly." });
  } catch (err) {
    console.error("Contact inquiry error:", err);
    res.status(500).json({ success: false, message: "Failed to submit inquiry" });
  }
});

// ================= ADMIN DASHBOARD & CRUD ENDPOINTS =================

// Admin Login
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      { username: ADMIN_USERNAME, isAdmin: true },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    return res.json({
      success: true,
      token,
      admin: { username: ADMIN_USERNAME, role: "Super Administrator" }
    });
  }

  return res.status(401).json({ success: false, message: "Invalid administrator credentials" });
});

// Admin Stats
app.get("/api/admin/stats", adminAuthMiddleware, async (req, res) => {
  try {
    if (isDbConnected) {
      const totalWorkers = await Worker.countDocuments();
      const activeWorkers = await Worker.countDocuments({ status: "working" });
      const inactiveWorkers = await Worker.countDocuments({ status: "not working" });
      const totalInquiries = await ContactInquiry.countDocuments();

      const categoriesAggregation = await Worker.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);

      const locationsAggregation = await Worker.aggregate([
        { $group: { _id: "$location", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);

      return res.json({
        success: true,
        stats: {
          totalWorkers,
          activeWorkers,
          inactiveWorkers,
          totalInquiries,
          categories: categoriesAggregation.map(c => ({ name: c._id, count: c.count })),
          locations: locationsAggregation.map(l => ({ name: l._id, count: l.count })),
        }
      });
    }

    // Memory stats
    const totalWorkers = memoryWorkers.length;
    const activeWorkers = memoryWorkers.filter(w => w.status === "working").length;
    const inactiveWorkers = totalWorkers - activeWorkers;
    const totalInquiries = memoryInquiries.length;

    const catMap = {};
    const locMap = {};
    memoryWorkers.forEach(w => {
      catMap[w.category] = (catMap[w.category] || 0) + 1;
      locMap[w.location] = (locMap[w.location] || 0) + 1;
    });

    return res.json({
      success: true,
      stats: {
        totalWorkers,
        activeWorkers,
        inactiveWorkers,
        totalInquiries,
        categories: Object.entries(catMap).map(([name, count]) => ({ name, count })),
        locations: Object.entries(locMap).map(([name, count]) => ({ name, count })),
      }
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    res.status(500).json({ success: false, message: "Error fetching admin stats" });
  }
});

// Admin Get All Workers (CRUD - Read All)
app.get("/api/admin/workers", adminAuthMiddleware, async (req, res) => {
  try {
    const { search, category, location, status } = req.query;

    if (isDbConnected) {
      let query = {};
      if (category) query.category = new RegExp(`^${category}$`, "i");
      if (location) query.location = new RegExp(`^${location}$`, "i");
      if (status) query.status = status;
      if (search) {
        const sRegex = new RegExp(search, "i");
        query.$or = [{ name: sRegex }, { number: sRegex }, { category: sRegex }, { location: sRegex }];
      }

      const workers = await Worker.find(query).select("-password").sort({ createdAt: -1 });
      return res.json({ success: true, count: workers.length, workers });
    }

    let workers = [...memoryWorkers];
    if (category) workers = workers.filter(w => w.category.toLowerCase() === category.toLowerCase());
    if (location) workers = workers.filter(w => w.location.toLowerCase() === location.toLowerCase());
    if (status) workers = workers.filter(w => w.status === status);
    if (search) {
      const s = search.toLowerCase();
      workers = workers.filter(w =>
        w.name.toLowerCase().includes(s) ||
        w.number.includes(s) ||
        w.category.toLowerCase().includes(s) ||
        w.location.toLowerCase().includes(s)
      );
    }
    return res.json({ success: true, count: workers.length, workers });
  } catch (err) {
    console.error("Admin workers error:", err);
    res.status(500).json({ success: false, message: "Error fetching workers" });
  }
});

// Admin Create Worker (CRUD - Create)
app.post("/api/admin/workers", adminAuthMiddleware, async (req, res) => {
  try {
    const {
      name, number, password, category, location,
      experience, gender, startTime, endTime, age, photo, rating, hourlyRate, bio, status
    } = req.body;

    if (!name || !number || !category || !location) {
      return res.status(400).json({ success: false, message: "Name, phone number, category and location are required." });
    }

    const hashedPassword = await bcrypt.hash(password || "Worker123", 10);

    if (isDbConnected) {
      const existing = await Worker.findOne({ number });
      if (existing) {
        return res.status(400).json({ success: false, message: "Worker with this phone number already exists" });
      }

      const newWorker = new Worker({
        name,
        number,
        phone: number,
        password: hashedPassword,
        category,
        location,
        experience: Number(experience) || 0,
        gender: gender || "Male",
        startTime: startTime || "09:00",
        endTime: endTime || "18:00",
        age: Number(age) || 25,
        rating: Number(rating) || 4.8,
        photo: photo || "/images/electrician.png",
        hourlyRate: Number(hourlyRate) || 299,
        bio: bio || `${name} is a verified ${category} in ${location}.`,
        status: status || "working",
      });

      await newWorker.save();
      const saved = newWorker.toObject();
      delete saved.password;
      return res.status(201).json({ success: true, message: "Worker created successfully", worker: saved });
    }

    const newWorker = {
      _id: `mem_${Date.now()}`,
      name,
      number,
      phone: number,
      category,
      location,
      experience: Number(experience) || 0,
      gender: gender || "Male",
      startTime: startTime || "09:00",
      endTime: endTime || "18:00",
      age: Number(age) || 25,
      rating: Number(rating) || 4.8,
      photo: photo || "/images/electrician.png",
      hourlyRate: Number(hourlyRate) || 299,
      bio: bio || `${name} is a verified ${category} in ${location}.`,
      status: status || "working",
      createdAt: new Date(),
    };
    memoryWorkers.unshift(newWorker);
    return res.status(201).json({ success: true, message: "Worker created successfully", worker: newWorker });
  } catch (err) {
    console.error("Admin create worker error:", err);
    res.status(500).json({ success: false, message: "Error creating worker: " + err.message });
  }
});

// Admin Get Single Worker (CRUD - Read One)
app.get("/api/admin/workers/:id", adminAuthMiddleware, async (req, res) => {
  try {
    if (isDbConnected) {
      const worker = await Worker.findById(req.params.id).select("-password");
      if (!worker) return res.status(404).json({ success: false, message: "Worker not found" });
      return res.json({ success: true, worker });
    }

    const worker = memoryWorkers.find(w => String(w._id) === String(req.params.id));
    if (!worker) return res.status(404).json({ success: false, message: "Worker not found" });
    return res.json({ success: true, worker });
  } catch (err) {
    console.error("Admin get worker error:", err);
    res.status(500).json({ success: false, message: "Error finding worker" });
  }
});

// Admin Update Worker (CRUD - Update)
app.put("/api/admin/workers/:id", adminAuthMiddleware, async (req, res) => {
  try {
    const allowedFields = [
      "name", "number", "category", "location", "experience", "gender",
      "startTime", "endTime", "age", "phone", "photo", "rating", "hourlyRate", "bio", "status"
    ];
    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (req.body.password) {
      updates.password = await bcrypt.hash(req.body.password, 10);
    }

    if (isDbConnected) {
      const updated = await Worker.findByIdAndUpdate(
        req.params.id,
        { $set: updates },
        { new: true, runValidators: true }
      ).select("-password");

      if (!updated) return res.status(404).json({ success: false, message: "Worker not found" });
      return res.json({ success: true, message: "Worker updated successfully", worker: updated });
    }

    const worker = memoryWorkers.find(w => String(w._id) === String(req.params.id));
    if (!worker) return res.status(404).json({ success: false, message: "Worker not found" });

    Object.assign(worker, updates);
    return res.json({ success: true, message: "Worker updated successfully", worker });
  } catch (err) {
    console.error("Admin update worker error:", err);
    res.status(500).json({ success: false, message: "Error updating worker" });
  }
});

// Admin Delete Worker (CRUD - Delete)
app.delete("/api/admin/workers/:id", adminAuthMiddleware, async (req, res) => {
  try {
    if (isDbConnected) {
      const deleted = await Worker.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ success: false, message: "Worker not found" });
      return res.json({ success: true, message: "Worker deleted successfully" });
    }

    const index = memoryWorkers.findIndex(w => String(w._id) === String(req.params.id));
    if (index === -1) return res.status(404).json({ success: false, message: "Worker not found" });

    memoryWorkers.splice(index, 1);
    return res.json({ success: true, message: "Worker deleted successfully" });
  } catch (err) {
    console.error("Admin delete worker error:", err);
    res.status(500).json({ success: false, message: "Error deleting worker" });
  }
});

// Admin Inquiries
app.get("/api/admin/inquiries", adminAuthMiddleware, async (req, res) => {
  try {
    if (isDbConnected) {
      const inquiries = await ContactInquiry.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: inquiries.length, inquiries });
    }
    return res.json({ success: true, count: memoryInquiries.length, inquiries: memoryInquiries });
  } catch (err) {
    console.error("Admin inquiries error:", err);
    res.status(500).json({ success: false, message: "Error fetching inquiries" });
  }
});

// Start Server
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 SkilledBoys Express Backend running on port ${PORT}`);
  console.log(`🌐 API status endpoint: http://localhost:${PORT}/`);
  console.log(`🩺 Health check endpoint: http://localhost:${PORT}/api/health`);
});

// Graceful Shutdown for Cloud Deployments (Render / Docker / Kubernetes)
process.on("SIGTERM", () => {
  console.log("SIGTERM received, closing HTTP server...");
  server.close(() => {
    if (mongoose.connection) {
      mongoose.connection.close(false).catch(() => {});
    }
    process.exit(0);
  });
});
