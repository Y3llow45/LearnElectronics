const Lesson = require('../models/lesson');

const getLessonDetail = async (title) => {
    console.log('details')
    try {
        if(title !== ''){
            console.log('before search')
            const lessonDetail = await Lesson.find({title: title});
            return lessonDetail;
        } else {
            console.log('nope');
        }
    } catch(err){
        console.error(err);
        return [];
    }
};

module.exports = { getLessonDetail };