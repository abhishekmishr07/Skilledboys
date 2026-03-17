const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://abhishekmishraadev_db_user:Abhishek%402003@abhishekdb.idmxnex.mongodb.net/SkilledBoys');

const workerSchema = new mongoose.Schema({}, { strict: false });
const Worker = mongoose.model('Worker', workerSchema);

async function listAll() {
  try {
    const workers = await Worker.find({});
    console.log(`\n📊 Total Workers: ${workers.length}\n`);
    
    console.log('=== ALL WORKERS IN DATABASE ===\n');
    workers.forEach((w, i) => {
      console.log(`${i+1}. ${w.name}`);
      console.log(`   📂 Category: ${w.category || '❌ MISSING'}`);
      console.log(`   📍 Location: ${w.location || '❌ MISSING'}`);
      console.log(`   📞 Phone: ${w.number || w.phone}`);
      console.log('');
    });

    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

listAll();
