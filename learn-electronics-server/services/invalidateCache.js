const invalidateCache = () => {
    redis.del('lessons');
};