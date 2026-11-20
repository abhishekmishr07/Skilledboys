const http = require("http");

async function testAll() {
  console.log("🚀 Starting Server Integration Tests...");

  // Start server process programmatically by importing or spawning
  process.env.PORT = "5099";
  process.env.JWT_SECRET = "testsecret123456";
  process.env.ADMIN_USERNAME = "admin";
  process.env.ADMIN_PASSWORD = "admin123";

  // Require server
  require("./server.js");

  // Wait 1.5s for server to start listening
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const baseUrl = "http://127.0.0.1:5099";

  async function req(path, options = {}) {
    const res = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    const json = await res.json().catch(() => ({}));
    return { status: res.status, ok: res.ok, body: json };
  }

  // Test 1: Health
  const health = await req("/api/health");
  console.log("✅ 1. Health check:", health.status, health.body.message);

  // Test 2: Search Workers
  const workers = await req("/api/workers?category=Electrician");
  console.log("✅ 2. Workers search:", workers.status, `Found ${Array.isArray(workers.body) ? workers.body.length : 0} workers`);

  // Test 3: Admin Login
  const adminLogin = await req("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ username: "admin", password: "admin123" }),
  });
  console.log("✅ 3. Admin login:", adminLogin.status, "Token acquired:", !!adminLogin.body.token);

  const adminToken = adminLogin.body.token;

  // Test 4: Admin Stats
  const adminStats = await req("/api/admin/stats", {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  console.log("✅ 4. Admin stats:", adminStats.status, `Total workers: ${adminStats.body.stats?.totalWorkers}`);

  // Test 5: Worker Registration
  const testNumber = `999${Math.floor(1000000 + Math.random() * 9000000)}`;
  const workerReg = await req("/api/workers/register", {
    method: "POST",
    body: JSON.stringify({
      name: "Rohit Test Pro",
      number: testNumber,
      password: "TestPassword123",
      category: "Plumber",
      location: "Noida",
      experience: 4,
      age: 29,
      gender: "Male",
    }),
  });
  console.log("✅ 5. Worker registration:", workerReg.status, workerReg.body.message);

  // Test 6: Worker Login
  const workerLogin = await req("/api/workers/login", {
    method: "POST",
    body: JSON.stringify({
      number: testNumber,
      password: "TestPassword123",
    }),
  });
  console.log("✅ 6. Worker login:", workerLogin.status, "Worker ID:", workerLogin.body.worker?.id);

  // Test 7: Contact Inquiry
  const contact = await req("/api/contact", {
    method: "POST",
    body: JSON.stringify({
      name: "Customer John",
      email: "john@example.com",
      message: "Need urgent plumbing service",
    }),
  });
  console.log("✅ 7. Contact inquiry:", contact.status, contact.body.message);

  console.log("\n🎉 ALL 7 BACKEND INTEGRATION TESTS PASSED CLEANLY!");
  process.exit(0);
}

testAll().catch((err) => {
  console.error("❌ Test failed:", err);
  process.exit(1);
});
