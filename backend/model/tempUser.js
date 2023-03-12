const mongoose = require("mongoose");
const TempSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
  },
  profilePass: {
    type: String,
    required: true,
    max: 1024,
  },
  balance: {
    type: Number,
  },
  beneficiaries: {
    type: Array,
    default: [],
  },
  transactions: {
    type: Array,
    default: [],
  },
});

// const Bene = new mongoose.Schema({
//   userid: { type: String, required: true },
//   limit: { type: Number, required: true },
// });

module.exports = mongoose.model("TempUser", TempSchema);
// module.exports = mongoose.model("Bene", Bene);
