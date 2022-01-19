var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var KanbanProjectsSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date_of_creation: { type: Date },
});

module.exports = mongoose.model("KanbanProjects", KanbanProjectsSchema);
