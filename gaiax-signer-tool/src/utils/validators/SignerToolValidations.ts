import { body } from 'express-validator'

import { AppConst } from '../constants'

class SignerToolValidation {
	GXLegalParticipant = [
		body('privateKey').not().isEmpty().trim().escape(),
		body('isVault').isBoolean().optional(),
		body('issuer').not().isEmpty().trim().escape(),
		body('verificationMethod').not().isEmpty().trim().escape(),
		body('vcs.legalParticipant').isObject(),
		body('vcs.legalRegistrationNumber').isObject(),
		body('vcs.gaiaXTermsAndConditions').isObject()
	]
	ServiceOffering = [
		body('privateKey').not().isEmpty().trim().escape(),
		body('isVault').isBoolean().optional(),
		body('issuer').not().isEmpty().trim().escape(),
		body('verificationMethod').not().isEmpty().trim().escape(),
		body('vcs.serviceOffering').isObject()
	]
	Resource = [
		body('privateKey').not().isEmpty().trim().escape(),
		body('isVault').isBoolean().optional(),
		body('issuer').not().isEmpty().trim().escape(),
		body('verificationMethod').not().isEmpty().trim().escape(),
		body('vcs.resource').isObject(),
		body('vcs.resource.credentialSubject').isObject()
	]
	LabelLevel = [
		body('privateKey').not().isEmpty().trim().escape(),
		body('isVault').isBoolean().optional(),
		body('issuer').not().isEmpty().trim().escape(),
		body('verificationMethod').not().isEmpty().trim().escape(),
		body('vcs.labelLevel').isObject()
	]
	Verify = [
		body('policies')
			.exists()
			.isArray()
			.custom((obj) => {
				if (obj.length == 0) {
					return false
				}
				for (const policy of obj) {
					if (!AppConst.VERIFY_LP_POLICIES.includes(policy)) {
						return false
					}
				}

				return true
			}),
		body('url').exists().isString().isURL()
	]
	CreateWebDID = [
		body('domain').not().isEmpty().trim(),
		body('x5u').not().isEmpty().isURL().optional(),
		body('services').isArray().optional(),
		body('services.*.serviceEndpoint').isURL().optional(),
		body('services.*.type').not().isEmpty().trim().escape().optional()
	]
	VerifyWebDID = [
		body('privateKey').not().isEmpty().trim().escape(),
		body('isVault').isBoolean().optional(),
		body('did').not().isEmpty().trim().escape(),
		body('verificationMethod').not().isEmpty().trim().escape()
	]
	TrustIndex = [body('participantSD').not().isEmpty().trim(), body('serviceOfferingSD').not().isEmpty().trim()]
	RegistrationNumber = [body('legalRegistrationNumber').isObject()]
}
export default new SignerToolValidation()
