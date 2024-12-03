import { Router } from 'express'

import { ROUTES } from '../../../utils/constants'
import { checkResults } from '../../../utils/validators/commonValidation'
import SignerToolValidations from '../../../utils/validators/SignerToolValidations'
import STController from './SignerToolController'

const router: Router = Router()

router.post(ROUTES.V1_APIS.LEGAL_PARTICIPANT, SignerToolValidations.GXLegalParticipant, checkResults, STController.GXLegalParticipant)
router.post(ROUTES.V1_APIS.SERVICE_OFFERING, SignerToolValidations.ServiceOffering, checkResults, STController.ServiceOffering)
router.post(ROUTES.V1_APIS.RESOURCE, SignerToolValidations.Resource, checkResults, STController.Resource)
router.post(ROUTES.V1_APIS.LABEL_LEVEL, SignerToolValidations.LabelLevel, checkResults, STController.LabelLevel)
router.post(ROUTES.V1_APIS.VERIFY, SignerToolValidations.Verify, checkResults, STController.Verify)
router.post(ROUTES.V1_APIS.CREATE_WEB_DID, SignerToolValidations.CreateWebDID, checkResults, STController.CreateWebDID)
router.post(ROUTES.V1_APIS.VERIFY_WEB_DID, SignerToolValidations.VerifyWebDID, checkResults, STController.VerifyWebDID)
router.post(ROUTES.V1_APIS.GET_TRUST_INDEX, SignerToolValidations.TrustIndex, checkResults, STController.GetTrustIndex)
router.post(ROUTES.V1_APIS.REGISTRATION_NUMBER, SignerToolValidations.RegistrationNumber, checkResults, STController.ValidateRegistrationNumber)

export default router
