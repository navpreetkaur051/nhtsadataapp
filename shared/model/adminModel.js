const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  outlookId: String,
  googleId:String,
  name: String,
  email: String,
  admin: Boolean
});

const User = mongoose.model("admin_users", adminSchema);

module.exports = User;
