import { Application } from 'express'
import { ROUTES } from '../utils/constants'
import router from '../components/SignerTool/v1'
export default (app: Application) => {
	app.use(ROUTES.V1, router)
}
