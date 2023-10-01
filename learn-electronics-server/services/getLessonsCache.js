const Redis = require('ioredis');
const redis = new Redis();

const getCachedLessons = async (db) => {
  try {
    const cachedData = await redis.get('lessons');
    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      const lessons = await db.collection('lessons').find({}).toArray();
      console.log(lessons);
      if(lessons.length > 0){
        redis.set('lessons', JSON.stringify(lessons));
      }
      
      return lessons;
    }
  } catch (error) {
    console.error('Error fetching lessons:', error);
    //throw error;
  }
};

module.exports = { redis, getCachedLessons };