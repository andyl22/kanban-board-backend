var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  active: { type: Boolean, required: true },
  darkMode: { type: Boolean, required: false },
  date_of_creation: { type: Date },
});

module.exports = mongoose.model("User", UserSchema);
