const { redis, getCachedLessons } = require('./getLessons');

export const invalidateCache = () => {
    redis.del('lessons');
    getCachedLessons();
};