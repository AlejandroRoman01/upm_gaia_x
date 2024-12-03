import { Application } from 'express'
import uuid from './uuid'

export default (app: Application) => {
	uuid(app)
}
