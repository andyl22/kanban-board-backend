var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var kanbanSectionSchema = new Schema({
  name: {type: String, required: true, maxLength: 100},
  project: {type: Schema.Types.ObjectId, ref: 'KanbanProjects', required: true},
  date_of_creation: {type: Date}
})

module.exports = mongoose.model('KanbanSection', kanbanSectionSchema);