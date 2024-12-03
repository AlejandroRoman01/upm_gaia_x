import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'

import middleware from './middleware'
import routes from './routes'
import * as swaggerDocument from './swagger/swagger.json'
import { logger } from './utils/logger'
import { AppValidation } from './utils/validators'
import { checkResults } from './utils/validators/commonValidation'
import STATUS_CODES from 'http-status-codes'

const app: express.Application = express()

const port = process.env.PORT
swaggerDocument.servers[0].url = process.env.HOST || `http://localhost:${port}`

app.get('/health', (req: Request, res: Response) => {
	return res.status(STATUS_CODES.OK).send('healthy')
})
middleware(app)
// body-parser
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
routes(app)
// order : error , warn , info,  verbose, debug, silly
app.post('/v1/update-log', AppValidation.Log, checkResults, async (req: Request, res: Response) => {
	logger.setConsoleLevel(req.body.logLevel)
	logger.setFileLevel(req.body.logLevel)
	return res.status(STATUS_CODES.OK).json({
		message: 'Log Updated'
	})
})
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.all('/*', (req: Request, res: Response) => {
	if (req.path == '/') {
		res.redirect('/docs')
	} else {
		logger.error(__filename, 'Invalid Route Handler ', 'Invalid Route Fired : ' + req.path, req.custom.uuid)
		return res.status(STATUS_CODES.BAD_REQUEST).json({
			status: STATUS_CODES.BAD_REQUEST,
			message: 'Bad Request'
		})
	}
})

export default app
