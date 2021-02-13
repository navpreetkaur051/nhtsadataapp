const mongoose = require("mongoose");
const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;
const Schema = mongoose.Schema;

const controlSchema = new Schema({
  doc:String,
  vw:Boolean
});

// controlSchema.plugin(mongooseFieldEncryption, 
//   { fields: 
//       ["vw"],
//        secret: process.env.SECRETKEY
//   }
// );

const Control = mongoose.model("admin_controls", controlSchema);

module.exports = Control;
