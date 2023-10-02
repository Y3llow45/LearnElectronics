const Lesson = require('../models/lesson');

const getLessons = async () => {
    try {
        const lessons = await await Lesson.find({});
        return lessons;
    } catch(err){
        console.error(err);
        return [];
    }
};

module.exports = { getLessons };
