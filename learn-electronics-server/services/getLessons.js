const mongoose = require('mongoose');
const Redis = require('ioredis');
const redis = new Redis();

const getCachedLessons = async () => {
    const cachedData = await redis.get('lessons');
    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      // Fetch lessons from MongoDB
      const lessons = await fetchLessonsFromMongoDB();
      
      // Cache lessons with expiration
      redis.set('lessons', JSON.stringify(lessons), 'ex', 600);
      
      return lessons;
    }
};