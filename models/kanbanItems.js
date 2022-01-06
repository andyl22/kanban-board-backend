var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var KanbanItemsSchema = new Schema({
  name: {type: String, required: true, maxLength: 100},
  description: {type: String, required: false, maxLength: 1500},
  project: {type: Schema.Types.ObjectId, ref: 'KanbanProject', required: true},
  date_of_creation: {type: Date}
})

module.exports = mongoose.model('KanbanItems', KanbanItemsSchema);