const mongoose = require("mongoose")

const lessonSchema = new mongoose.Schema({
    tittle: String,
    content: String,
    category: String
})

module.exports = mongoose.model("Lesson", lessonSchema)