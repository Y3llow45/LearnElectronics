const Lesson = require('../models/lesson');

const getLessons = async (username) => {
    console.log(username)
    try {
        if(username !== ''){
            console.log('lesson with this username: '+username);
            lessons = await await Lesson.find({user: username});
            console.log(lessons);
            return lessons;
        }else {
            console.log('all lessons');
            return lessons = await await Lesson.find({});
        }
    } catch(err){
        console.error(err);
        return [];
    }
};

module.exports = { getLessons };
