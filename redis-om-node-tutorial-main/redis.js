import {
	createClient
} from 'redis'

export const redis = createClient({
	url: 'redis://10.1.2.238:6379'
});
redis.on('error', (error) => console.error(error))
await redis.connect()