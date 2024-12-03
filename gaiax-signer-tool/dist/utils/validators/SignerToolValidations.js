"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const constants_1 = require("../constants");
class SignerToolValidation {
    constructor() {
        this.GXLegalParticipant = [
            (0, express_validator_1.body)('privateKey').not().isEmpty().trim().escape(),
            (0, express_validator_1.body)('isVault').isBoolean().optional(),
            (0, express_validator_1.body)('issuer').not().isEmpty().trim().escape(),
            (0, express_validator_1.body)('verificationMethod').not().isEmpty().trim().escape(),
            (0, express_validator_1.body)('vcs.legalParticipant').isObject(),
            (0, express_validator_1.body)('vcs.legalRegistrationNumber').isObject(),
            (0, express_validator_1.body)('vcs.gaiaXTermsAndConditions').isObject()
        ];
        this.ServiceOffering = [
            (0, express_validator_1.body)('privateKey').not().isEmpty().trim().escape(),
            (0, express_validator_1.body)('isVault').isBoolean().optional(),
            (0, express_validator_1.body)('issuer').not().isEmpty().trim().escape(),
            (0, express_validator_1.body)('verificationMethod').not().isEmpty().trim().escape(),
            (0, express_validator_1.body)('vcs.serviceOffering').isObject()
        ];
        this.Resource = [
            (0, express_validator_1.body)('privateKey').not().isEmpty().trim().escape(),
            (0, express_validator_1.body)('isVault').isBoolean().optional(),
            (0, express_validator_1.body)('issuer').not().isEmpty().trim().escape(),
            (0, express_validator_1.body)('verificationMethod').not().isEmpty().trim().escape(),
            (0, express_validator_1.body)('vcs.resource').isObject(),
            (0, express_validator_1.body)('vcs.resource.credentialSubject').isObject()
        ];
        this.LabelLevel = [
            (0, express_validator_1.body)('privateKey').not().isEmpty().trim().escape(),
            (0, express_validator_1.body)('isVault').isBoolean().optional(),
            (0, express_validator_1.body)('issuer').not().isEmpty().trim().escape(),
            (0, express_validator_1.body)('verificationMethod').not().isEmpty().trim().escape(),
            (0, express_validator_1.body)('vcs.labelLevel').isObject()
        ];
        this.Verify = [
            (0, express_validator_1.body)('policies')
                .exists()
                .isArray()
                .custom((obj) => {
                if (obj.length == 0) {
                    return false;
                }
                for (const policy of obj) {
                    if (!constants_1.AppConst.VERIFY_LP_POLICIES.includes(policy)) {
                        return false;
                    }
                }
                return true;
            }),
            (0, express_validator_1.body)('url').exists().isString().isURL()
        ];
        this.CreateWebDID = [
            (0, express_validator_1.body)('domain').not().isEmpty().trim(),
            (0, express_validator_1.body)('x5u').not().isEmpty().isURL().optional(),
            (0, express_validator_1.body)('services').isArray().optional(),
            (0, express_validator_1.body)('services.*.serviceEndpoint').isURL().optional(),
            (0, express_validator_1.body)('services.*.type').not().isEmpty().trim().escape().optional()
        ];
        this.VerifyWebDID = [
            (0, express_validator_1.body)('privateKey').not().isEmpty().trim().escape(),
            (0, express_validator_1.body)('isVault').isBoolean().optional(),
            (0, express_validator_1.body)('did').not().isEmpty().trim().escape(),
            (0, express_validator_1.body)('verificationMethod').not().isEmpty().trim().escape()
        ];
        this.TrustIndex = [(0, express_validator_1.body)('participantSD').not().isEmpty().trim(), (0, express_validator_1.body)('serviceOfferingSD').not().isEmpty().trim()];
        this.RegistrationNumber = [(0, express_validator_1.body)('legalRegistrationNumber').isObject()];
    }
}
exports.default = new SignerToolValidation();
