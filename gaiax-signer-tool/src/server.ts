import { createServer } from 'http'
import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(__dirname, '../.env') })
import app from './app'

const server = createServer(app)
const port: number = Number(process.env.PORT) || 8000

;(async () => {
	try {
		server.listen(port, () => {
			console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
		})
		server.timeout = 400000
	} catch (err) {
		console.error(`Unable to connect to the server : `, err)
		process.exit(1)
	}
})()
