var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  active: {type: Boolean, required: true},
  date_of_creation: {type: Date},
})

module.exports = mongoose.model('User', UserSchema);