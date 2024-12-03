import { body } from 'express-validator'

class AppValidation {
	Log = [body('logLevel').isString().isIn(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])]
}
export default new AppValidation()
