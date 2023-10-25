const Lesson = require('../models/lesson');

const getLessons = async (username) => {
    try {
        if(username !== ''){
            lessons = await Lesson.find({user: username});
            return lessons;
        }else {
            return lessons = await Lesson.find({});
        }
    } catch(err){
        console.error(err);
        return [];
    }
};

module.exports = { getLessons };
