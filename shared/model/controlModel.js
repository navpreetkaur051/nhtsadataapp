const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const controlSchema = new Schema({
  viewsol: Boolean
});

const Control = mongoose.model("admin_control", controlSchema);

module.exports = Control;
