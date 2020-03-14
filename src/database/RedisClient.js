const redis = require("redis");
const asyncRedis = require("async-redis");

const RedisClient = redis.createClient();
const AsyncRedisClient = asyncRedis.createClient();
const redis_cache = {};

var setValue = async (key, value) => {
  return await AsyncRedisClient.set(key, value);
};

var getValue = async key => {
  let val = await AsyncRedisClient.get(key);
  return val;
};

export { RedisClient, redis_cache, setValue, getValue };
