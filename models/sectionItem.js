var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var sectionItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: false, maxLength: 1500 },
  projectID: {
    type: Schema.Types.ObjectId,
    ref: "KanbanProjects",
    required: true,
  },
  sectionID: {
    type: Schema.Types.ObjectId,
    ref: "KanbanSection",
    required: true,
  },
  date_of_creation: { type: Date },
});

module.exports = mongoose.model("SectionItem", sectionItemSchema);
