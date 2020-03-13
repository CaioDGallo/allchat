const redis = require("redis");

const RedisClient = redis.createClient();
const redis_cache = {};

export {
    RedisClient,
    redis_cache
}