import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import STATUS_CODES from 'http-status-codes'
import { AppMessages } from '../constants'

export const checkResults = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		const errorsArr = errors.array()
		res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).json({
			error: `${errorsArr[0].msg} of param '${errorsArr[0].param}'`,
			message: AppMessages.VALIDATION_ERROR
		})
	} else {
		next()
	}
}
