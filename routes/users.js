const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

require('dotenv').config();
mongoose.connect(process.env.MONGO_DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  highscore: {
    type: Number,
    default: 0,
  },
  lastscore: {
    type: Number,
    default: 0,
  },
});

userSchema.plugin(plm);
module.exports = mongoose.model("User", userSchema);
