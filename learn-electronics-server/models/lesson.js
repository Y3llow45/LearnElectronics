const mongoose = require("mongoose")

const lessonSchema = new mongoose.Schema({
    title: String,
    content: String,
    category: String,
    likes: { type: Number, default: 0 },
    user: String,
})

module.exports = mongoose.model("Lesson", lessonSchema)