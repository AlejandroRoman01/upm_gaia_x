import supertest from 'supertest'
import STATUS_CODES from 'http-status-codes'
import app from './app'
import { ROUTES } from './utils/constants'

jest.mock('./utils/logger', () => {
	return {
		...jest.requireActual('./utils/logger'),
		setConsoleLevel: () => {
			return true
		}
	}
})

describe('health', () => {
	describe('success case', () => {
		it('health check', async () => {
			await supertest(app)
				.get(`${ROUTES.HEALTH}`)
				.expect((response) => {
					expect(response.status).toBe(STATUS_CODES.OK)
				})
		})
	})
})

describe('', () => {
	describe('success case', () => {
		it('docs', async () => {
			await supertest(app)
				.get('/')
				.expect((response) => {
					expect(response.status).toBe(STATUS_CODES.MOVED_TEMPORARILY)
				})
		})
	})
})

describe('xyz', () => {
	describe('success case', () => {
		it('docs', async () => {
			await supertest(app)
				.get('/xyz')
				.expect((response) => {
					expect(response.status).toBe(STATUS_CODES.BAD_REQUEST)
				})
		})
	})
})

describe('/v1/update-log', () => {
	const validBody = {
		logLevel: 'silly'
	}
	describe('failing case', () => {
		it('validation error', async () => {
			const error = {
				error: "Invalid value of param 'logLevel'",
				message: 'Validation Error, please provide valid req.body'
			}
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.UPDATE_LOG}`)
				.expect((response) => {
					expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
					expect(response.body).toEqual(error)
				})
		})
	})
	describe('success case', () => {
		it('update log successful', async () => {
			const responseData = {
				message: 'Log Updated'
			}
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.UPDATE_LOG}`)
				.send(validBody)
				.expect((response) => {
					expect(response.status).toBe(STATUS_CODES.OK)
					expect(response.body).toEqual(responseData)
				})
		})
	})
})
