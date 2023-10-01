const Lesson = require('../models/lesson');

const getLessons = async (db) => {
    console.log('Getting lessons...')
    try {
        const lessons = await await Lesson.find({});
        console.log(lessons);
        return lessons;
    } catch(err){
        console.error(err);
        return [];
    }
};

module.exports = { getLessons };
