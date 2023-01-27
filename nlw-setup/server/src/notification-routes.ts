import WebPush from 'web-push';
import { FastifyInstance } from "fastify";
import { z } from 'zod';

console.log(WebPush.generateVAPIDKeys())

const publicKey = 'BCE-rPMWV4WuOpb6SGDsY4IqdDAjB0qccwcFZFuNaFy2CCTaretlKEWZpQI5hpraqpVyf7deHL50xtAE2A1AZB8'
const privateKey = '24XuZDJU9PHbJE92i2bPI-hVs1ZCHw2Af-_fPiM9if8'

WebPush.setVapidDetails('http://localhost:3333', publicKey, privateKey)

export async function notificationRoutes(app: FastifyInstance) {
    app.get('/push/public_key', () => {
        return {
            publicKey,
        }
    })

    app.post('/push/register', (request, reply) => {
        console.log(request.body)

        return reply.status(201).send()
    })

    app.post('/push/send', async (request, reply) => {
        const sendPushBody = z.object({
            subscription: z.object({
                endpoint: z.string(),
                keys: z.object({
                    p256dh: z.string(),
                    auth: z.string()
                })
            })
        })

        const { subscription } = sendPushBody.parse(request.body)

        setTimeout(() => {
            WebPush.sendNotification(subscription, 'Hello do Backend')
        }, 5000)

        return reply.status(201).send()
    })
}
