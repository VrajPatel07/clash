import { Job, Queue, Worker } from "bullmq";
import { defaultQueueOptions, redisConnection } from "@/lib/queue";
import { sendEmail } from "@/lib/emails/sendEmail";

interface emailJobProps {
    email : string;
    username : string;
    link : string;
    subject : string;
    template : "verifyEmail" | "resetPassword";
    verifyCode? : string
}


export const emailQueueName = "emailQueue";


export const emailQueue = new Queue(emailQueueName, {
    connection: redisConnection,
    defaultJobOptions: defaultQueueOptions
});


// Workers
export const handler = new Worker(
    emailQueueName,
    async (job : Job) => {
        const data : emailJobProps = job.data;
        await sendEmail(data);
    },
    {
        connection : redisConnection,
        concurrency : 3
    }
);