const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Connect to MongoDB
const mongoURI = "mongodb+srv://abhishekmishraadev_db_user:Abhishek%402003@abhishekdb.idmxnex.mongodb.net/SkilledBoys";

mongoose.connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ Connection error:", err));

// Define Worker Schema
const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  experience: { type: Number, default: 0 },
  gender: { type: String, required: true },
  startTime: { type: String, default: "09:00" },
  endTime: { type: String, default: "18:00" },
  age: { type: Number, required: true },
  phone: { type: String, default: "" },
  rating: { type: Number, default: 4.5 },
  photo: { type: String, default: "https://via.placeholder.com/150" },
  status: { type: String, default: "working" },
  createdAt: { type: Date, default: Date.now },
});

const Worker = mongoose.model("Worker", workerSchema);

// Sample Workers Data
const sampleWorkers = [
  {
    name: "Amit Sharma",
    number: "9876543210",
    password: "Test123",
    category: "Cook",
    location: "Noida",
    experience: 5,
    gender: "Male",
    age: 28,
    rating: 4.7,
    phone: "9876543210",
  },
  {
    name: "Priya Singh",
    number: "8765432109",
    password: "Test123",
    category: "Electrician",
    location: "Noida",
    experience: 8,
    gender: "Female",
    age: 32,
    rating: 4.8,
    phone: "8765432109",
  },
  {
    name: "Rajesh Kumar",
    number: "7654321098",
    password: "Test123",
    category: "Plumber",
    location: "Noida",
    experience: 10,
    gender: "Male",
    age: 35,
    rating: 4.6,
    phone: "7654321098",
  },
  {
    name: "Neha Verma",
    number: "6543210987",
    password: "Test123",
    category: "Maid",
    location: "Noida",
    experience: 6,
    gender: "Female",
    age: 26,
    rating: 4.9,
    phone: "6543210987",
  },
  {
    name: "Vikram Yadav",
    number: "5432109876",
    password: "Test123",
    category: "Carpenter",
    location: "Noida",
    experience: 12,
    gender: "Male",
    age: 40,
    rating: 4.5,
    phone: "5432109876",
  },
  {
    name: "Suresh Patel",
    number: "4321098765",
    password: "Test123",
    category: "Painter",
    location: "Delhi",
    experience: 7,
    gender: "Male",
    age: 30,
    rating: 4.4,
    phone: "4321098765",
  },
  {
    name: "Geeta Singh",
    number: "3210987654",
    password: "Test123",
    category: "Cook",
    location: "Delhi",
    experience: 9,
    gender: "Female",
    age: 34,
    rating: 4.8,
    phone: "3210987654",
  },
  {
    name: "Mohan Das",
    number: "2109876543",
    password: "Test123",
    category: "Driver",
    location: "Greater Noida",
    experience: 15,
    gender: "Male",
    age: 45,
    rating: 4.3,
    phone: "2109876543",
  },
];

// Add Sample Workers
async function addSampleWorkers() {
  try {
    // Hash passwords
    const workersWithHashedPasswords = await Promise.all(
      sampleWorkers.map(async (worker) => {
        const hashedPassword = await bcrypt.hash(worker.password, 10);
        return { ...worker, password: hashedPassword };
      })
    );

    // Insert workers
    await Worker.insertMany(workersWithHashedPasswords);
    console.log("✅ Sample workers added successfully!");
    
    // Display summary
    const count = await Worker.countDocuments();
    console.log(`📊 Total workers in database: ${count}`);
    
    process.exit(0);
  } catch (err) {
    console.error("❌ Error adding workers:", err.message);
    process.exit(1);
  }
}

addSampleWorkers();
