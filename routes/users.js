const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/userinfo");

const userSchema = new mongoose.Schema({

  fullname:{
    type: String,
    required: true,
    unique: true,
  }
,
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

 
});

userSchema.plugin(plm);
module.exports = mongoose.model("User", userSchema);
