import { Redis } from '@upstash/redis';

declare const globalThis: {
    redisGlobal: Redis;
} & typeof global;

const redisSingleton = () => {
    return Redis.fromEnv();
};

const redis = globalThis.redisGlobal ?? redisSingleton();

export default redis;

if (process.env.NODE_ENV !== 'production') globalThis.redisGlobal = redis;