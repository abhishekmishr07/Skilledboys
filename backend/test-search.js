const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://abhishekmishraadev_db_user:Abhishek%402003@abhishekdb.idmxnex.mongodb.net/SkilledBoys');

const workerSchema = new mongoose.Schema({}, { strict: false });
const Worker = mongoose.model('Worker', workerSchema);

async function testSearch() {
  try {
    console.log('\n🔍 Testing Search Queries...\n');

    // Test 1: Search for Electrician in Noida
    console.log('1️⃣  Search: Electrician + Noida');
    let query = {
      category: new RegExp(`^Electrician$`, "i"),
      location: new RegExp(`^Noida$`, "i")
    };
    let results = await Worker.find(query);
    console.log(`   Found: ${results.length} workers`);
    results.forEach(w => console.log(`   - ${w.name}`));

    // Test 2: All Electricians
    console.log('\n2️⃣  Search: All Electricians (any location)');
    query = { category: new RegExp(`^Electrician$`, "i") };
    results = await Worker.find(query);
    console.log(`   Found: ${results.length} workers`);
    results.forEach(w => console.log(`   - ${w.name} (${w.location})`));

    // Test 3: All in Noida
    console.log('\n3️⃣  Search: All in Noida (any category)');
    query = { location: new RegExp(`^Noida$`, "i") };
    results = await Worker.find(query);
    console.log(`   Found: ${results.length} workers`);
    results.forEach(w => console.log(`   - ${w.name} (${w.category})`));

    // Test 4: No filters
    console.log('\n4️⃣  Search: All workers (no filter)');
    results = await Worker.find({});
    console.log(`   Found: ${results.length} workers`);

    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

testSearch();
