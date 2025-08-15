import {ConnectionOptions, DefaultJobOptions} from "bullmq";


export const redisConnection : ConnectionOptions = {
    host : process.env.REDIS_HOST,
    port : 14004,
    password : process.env.REDIS_PASSWORD   
}


export const defaultQueueOptions : DefaultJobOptions = {
    removeOnComplete : {
        count : 20,
        age : 60*60
    },
    removeOnFail: {
        count: 100, 
        age: 7 * 24 * 60 * 60,
    },
    attempts : 3,
    backoff : {
        type : "exponential",
        delay : 3000
    }
}