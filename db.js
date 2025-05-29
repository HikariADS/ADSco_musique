// db.js
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://hikaroiu2134:Quang2004%40%2A%23@cluster0.yd3evqu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


// Thay <db_password> bằng mật khẩu thật của user hikaroiu2134
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

module.exports = { client, connectDB };
