const Lesson = require('../models/lesson');

const getLessons = async (username) => {
    try {
        if(username != ''){
            return lessons = await await Lesson.find({user: username});
        }else {
            return lessons = await await Lesson.find({});
        }
    } catch(err){
        console.error(err);
        return [];
    }
};

module.exports = { getLessons };
