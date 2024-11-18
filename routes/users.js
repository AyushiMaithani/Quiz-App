const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb+srv://hellalitiu:ma6i1FMDMklCdwaS@cluster0.y62nv.mongodb.net/");

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
