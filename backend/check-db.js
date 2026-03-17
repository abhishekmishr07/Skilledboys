const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://abhishekmishraadev_db_user:Abhishek%402003@abhishekdb.idmxnex.mongodb.net/SkilledBoys');

const workerSchema = new mongoose.Schema({}, { strict: false });
const Worker = mongoose.model('Worker', workerSchema);

async function checkDatabase() {
  try {
    const total = await Worker.countDocuments();
    console.log(`\n📊 Total workers in database: ${total}\n`);

    const workers = await Worker.find().limit(5);
    
    console.log('=== First 5 Workers ===\n');
    workers.forEach((w, i) => {
      console.log(`Worker ${i+1}:`);
      console.log(`  Name: ${w.name}`);
      console.log(`  Category: ${w.category}`);
      console.log(`  Location: ${w.location}`);
      console.log(`  Phone: ${w.number || w.phone}`);
      console.log('');
    });

    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

checkDatabase();
