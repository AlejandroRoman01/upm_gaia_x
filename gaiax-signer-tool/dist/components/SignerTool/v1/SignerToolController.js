"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateRoute = void 0;
const axios_1 = __importDefault(require("axios"));
const canonicalize_1 = __importDefault(require("canonicalize"));
const crypto_1 = __importStar(require("crypto"));
const did_resolver_1 = require("did-resolver");
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const jose = __importStar(require("jose"));
const jsonld_1 = __importDefault(require("jsonld"));
const web_did_resolver_1 = __importDefault(require("web-did-resolver"));
const common_functions_1 = __importDefault(require("../../../utils/common-functions"));
const constants_1 = require("../../../utils/constants");
const logger_1 = require("../../../utils/logger");
const vault_service_1 = require("../../../utils/service/vault.service");
const webResolver = web_did_resolver_1.default.getResolver();
const resolver = new did_resolver_1.Resolver(webResolver);
exports.privateRoute = express_1.default.Router();
const vaultService = new vault_service_1.VaultService();
class SignerToolController {
    constructor() {
        this.GXLegalParticipant = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { issuer, verificationMethod, isVault } = req.body;
                const vc = req.body.vcs;
                let { privateKey } = req.body;
                const { legalParticipant, legalRegistrationNumber, gaiaXTermsAndConditions } = vc;
                logger_1.logger.debug(__filename, 'GXLegalParticipant', 'req.body', req.custom.uuid, { issuer, verificationMethod, isVault });
                logger_1.logger.debug(__filename, 'GXLegalParticipant', 'req.body', req.custom.uuid, JSON.stringify(vc, null, 2));
                const ddo = yield common_functions_1.default.getDDOfromDID(issuer, resolver);
                if (!ddo) {
                    logger_1.logger.error(__filename, 'GXLegalParticipant', `❌ DDO not found for given did: '${issuer}'`, req.custom.uuid);
                    res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        error: `DDO not found for given did: '${issuer}'`,
                        message: constants_1.AppMessages.VP_FAILED
                    });
                    return;
                }
                const { x5u } = yield common_functions_1.default.getPublicKeys(ddo.didDocument);
                if (!x5u) {
                    logger_1.logger.error(__filename, 'GXLegalParticipant', constants_1.AppMessages.X5U_NOT_FOUND, req.custom.uuid);
                    res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        error: constants_1.AppMessages.X5U_NOT_FOUND,
                        message: constants_1.AppMessages.VP_FAILED
                    });
                    return;
                }
                const vcsMap = new Map();
                try {
                    if (legalParticipant.credentialSubject['gx:parentOrganization']) {
                        yield common_functions_1.default.getInnerVCs(legalParticipant, 'gx:parentOrganization', ['gx:LegalParticipant'], vcsMap);
                    }
                    if (legalParticipant.credentialSubject['gx:subOrganization']) {
                        yield common_functions_1.default.getInnerVCs(legalParticipant, 'gx:subOrganization', ['gx:LegalParticipant'], vcsMap);
                    }
                }
                catch (e) {
                    res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        error: e.message,
                        message: constants_1.AppMessages.VP_FAILED
                    });
                    return;
                }
                const legalRegistrationNumberVc = yield common_functions_1.default.issueRegistrationNumberVC(axios_1.default, legalRegistrationNumber);
                logger_1.logger.info(__filename, 'GXLegalParticipant', 'legalRegistrationNumber vc created', JSON.stringify(legalRegistrationNumberVc));
                const vcs = [legalParticipant, legalRegistrationNumberVc, gaiaXTermsAndConditions];
                privateKey = isVault ? yield vaultService.getSecrets(privateKey) : Buffer.from(privateKey, 'base64').toString('ascii');
                // privateKey = process.env.PRIVATE_KEY as string
                for (let index = 0; index < vcs.length; index++) {
                    const vc = vcs[index];
                    // eslint-disable-next-line no-prototype-builtins
                    if (!vc.hasOwnProperty('proof')) {
                        const proof = yield common_functions_1.default.addProof(jsonld_1.default, axios_1.default, jose, crypto_1.default, vc, privateKey, verificationMethod, constants_1.AppConst.RSA_ALGO, x5u);
                        vcs[index].proof = proof;
                    }
                }
                vcs.push(...Array.from(vcsMap.values()));
                const selfDescription = common_functions_1.default.createVP(vcs);
                logger_1.logger.debug(__filename, 'GXLegalParticipant', 'selfDescription', req.custom.uuid, JSON.stringify(selfDescription));
                const complianceCredential = yield axios_1.default.post(process.env.COMPLIANCE_SERVICE, selfDescription);
                logger_1.logger.debug(__filename, 'GXLegalParticipant', 'complianceCRED', req.custom.uuid, Object.assign({}, complianceCredential));
                // const complianceCredential = vcs
                logger_1.logger.info(__filename, 'GXLegalParticipant', '🔒 SD signed successfully (compliance service)', req.custom.uuid);
                const completeSD = {
                    selfDescriptionCredential: selfDescription,
                    complianceCredential: complianceCredential.data
                };
                res.status(http_status_codes_1.default.OK).json({
                    data: { completeSD },
                    message: constants_1.AppMessages.VP_SUCCESS
                });
            }
            catch (error) {
                logger_1.logger.error(__filename, 'GXLegalParticipant', error.message, req.custom.uuid);
                if (error.response) {
                    // If server responded with a status code for a request
                    res.status(error.response.status).json({
                        error: error.response.data,
                        message: constants_1.AppMessages.VP_FAILED
                    });
                }
                else {
                    res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        error: error.message,
                        message: constants_1.AppMessages.VP_FAILED
                    });
                }
            }
        });
        this.Resource = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { issuer, verificationMethod, isVault } = req.body;
                const { resource } = req.body.vcs;
                let { privateKey } = req.body;
                logger_1.logger.debug(__filename, 'Resource', 'Resource Creation', req.body.uuid, JSON.stringify(req.body));
                const VC = ['gx:DataResource', 'gx:PhysicalResource', 'gx:SoftwareResource'].includes(resource.credentialSubject.type);
                if (!VC) {
                    logger_1.logger.error(__filename, 'Verify', `❌ Verifiable Credential doesn't have type 'gx:DataResource' or  'gx:PhysicalResource' or 'gx:SoftwareResource'`, req.custom.uuid);
                    res.status(http_status_codes_1.default.UNPROCESSABLE_ENTITY).json({
                        error: `VC with type 'gx:DataResource' or 'gx:PhysicalResource' or 'gx:SoftwareResource' not found!!`,
                        message: constants_1.AppMessages.VP_FAILED
                    });
                    return;
                }
                const ddo = yield common_functions_1.default.getDDOfromDID(issuer, resolver);
                if (!ddo) {
                    logger_1.logger.error(__filename, 'GXLegalParticipant', `❌ DDO not found for given did: '${issuer}'`, req.custom.uuid);
                    res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        error: `DDO not found for given did: '${issuer}'`,
                        message: constants_1.AppMessages.VP_FAILED
                    });
                    return;
                }
                const { x5u } = yield common_functions_1.default.getPublicKeys(ddo.didDocument);
                privateKey = isVault ? yield vaultService.getSecrets(privateKey) : Buffer.from(privateKey, 'base64').toString('ascii');
                // privateKey = process.env.PRIVATE_KEY as string
                const vcsMap = new Map();
                try {
                    switch (resource.credentialSubject.type) {
                        case 'gx:DataResource': {
                            if (resource.credentialSubject['gx:copyrightOwnedBy']) {
                                // A list of copyright owners
                                yield common_functions_1.default.getInnerVCs(resource, 'gx:copyrightOwnedBy', ['gx:LegalParticipant'], vcsMap);
                            }
                            // A resolvable link to the participant
                            if (resource.credentialSubject['gx:producedBy']) {
                                yield common_functions_1.default.getInnerVC(resource, 'gx:producedBy', ['gx:LegalParticipant'], vcsMap);
                            }
                            // A resolvable link to the data exchange component that exposes the data resource. Type ServiceOffering
                            if (resource.credentialSubject['gx:exposedThrough']) {
                                yield common_functions_1.default.getInnerVC(resource, 'gx:exposedThrough', ['gx:ServiceOffering'], vcsMap);
                            }
                            break;
                        }
                        case 'gx:PhysicalResource': {
                            if (resource.credentialSubject['gx:maintainedBy']) {
                                yield common_functions_1.default.getInnerVCs(resource, 'gx:maintainedBy', ['gx:LegalParticipant'], vcsMap);
                            }
                            if (resource.credentialSubject['gx:ownedBy']) {
                                yield common_functions_1.default.getInnerVCs(resource, 'gx:ownedBy', ['gx:LegalParticipant'], vcsMap);
                            }
                            // A list of resolvable links
                            if (resource.credentialSubject['gx:manufacturedBy']) {
                                yield common_functions_1.default.getInnerVCs(resource, 'gx:manufacturedBy', ['gx:LegalParticipant'], vcsMap);
                            }
                            break;
                        }
                        case 'gx:SoftwareResource': {
                            if (resource.credentialSubject['gx:copyrightOwnedBy']) {
                                yield common_functions_1.default.getInnerVCs(resource, 'gx:copyrightOwnedBy', ['gx:LegalParticipant'], vcsMap);
                            }
                            break;
                        }
                    }
                    if (resource.credentialSubject['gx:aggregationOf']) {
                        yield common_functions_1.default.getInnerVCs(resource, 'gx:aggregationOf', ['gx:DataResource', 'gx:PhysicalResource', 'gx:SoftwareResource'], vcsMap);
                    }
                }
                catch (e) {
                    res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        error: e.message,
                        message: constants_1.AppMessages.VP_FAILED
                    });
                    return;
                }
                const vcs = [resource];
                for (let index = 0; index < vcs.length; index++) {
                    const vc = vcs[index];
                    // eslint-disable-next-line no-prototype-builtins
                    if (!vc.hasOwnProperty('proof')) {
                        const proof = yield common_functions_1.default.addProof(jsonld_1.default, axios_1.default, jose, crypto_1.default, vc, privateKey, verificationMethod, constants_1.AppConst.RSA_ALGO, x5u);
                        vcs[index].proof = proof;
                    }
                }
                vcs.push(...Array.from(vcsMap.values()));
                const selfDescription = common_functions_1.default.createVP(vcs);
                logger_1.logger.debug(__filename, 'Resource', 'Resource Compliance', 'data', { url: process.env.COMPLIANCE_SERVICE, sd: JSON.stringify(selfDescription) });
                const complianceCredential = (yield axios_1.default.post(process.env.COMPLIANCE_SERVICE, selfDescription)).data;
                logger_1.logger.info(__filename, 'GXLegalParticipant', complianceCredential ? '🔒 SD signed successfully (compliance service)' : '❌ SD signing failed (compliance service)', req.custom.uuid);
                const completeSD = {
                    selfDescriptionCredential: selfDescription,
                    complianceCredential
                };
                res.status(http_status_codes_1.default.OK).json({
                    data: { completeSD },
                    message: constants_1.AppMessages.VP_SUCCESS
                });
            }
            catch (e) {
                logger_1.logger.error(__filename, 'Resource', e.message, req.custom.uuid, e);
                res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    error: e.message,
                    message: constants_1.AppMessages.VP_FAILED
                });
            }
        });
        this.ServiceOffering = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let { privateKey } = req.body;
                const { isVault, verificationMethod, issuer: issuerDID, vcs: { serviceOffering } } = req.body;
                logger_1.logger.debug(__filename, 'ServiceOffering', 'Service offering VC', JSON.stringify(serviceOffering));
                // Data received in provided by will be the LP URL.
                // Extract it and fetch LP JSON from the URL
                const legalParticipantURL = serviceOffering['credentialSubject']['gx:providedBy']['id'];
                const legalParticipant = yield common_functions_1.default.fetchParticipantJson(legalParticipantURL);
                logger_1.logger.debug(__filename, 'ServiceOffering', 'ParticipantJSONNNNNNNN', JSON.stringify(legalParticipant));
                const aggregationURL = serviceOffering['credentialSubject']['gx:aggregationOf'][0]['@id'];
                logger_1.logger.debug(__filename, 'ServiceOffering', 'DataResourceURL', aggregationURL);
                const dataResource = yield common_functions_1.default.fetchParticipantJson(aggregationURL);
                logger_1.logger.debug(__filename, 'ServiceOffering', 'DataResource', JSON.stringify(dataResource));
                const exposedURL = dataResource['credentialSubject']['gx:exposedThrough']['@id'];
                logger_1.logger.debug(__filename, 'ServiceOffering', 'Exposed URL', exposedURL);
                const exposedResource = yield common_functions_1.default.fetchParticipantJson(exposedURL);
                logger_1.logger.debug(__filename, 'ServiceOffering', 'exposed Json', JSON.stringify(exposedResource));
                let { selfDescriptionCredential: { verifiableCredential } } = legalParticipant;
                //logger.debug(__filename, 'ServiceOffering','ParticipantJSONBBBBBBB',JSON.stringify(legalParticipant))
                // Get DID document of issuer from issuer DID
                const ddo = yield common_functions_1.default.getDDOfromDID(issuerDID, resolver);
                if (!ddo) {
                    logger_1.logger.error(__filename, 'ServiceOffering', `❌ DDO not found for given did: '${issuerDID}' in proof`, req.custom.uuid);
                    res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        error: `DDO not found for given did: '${issuerDID}' in proof`,
                        message: constants_1.AppMessages.SD_SIGN_FAILED
                    });
                    return;
                }
                // Extract certificate url from did document
                const { x5u } = yield common_functions_1.default.getPublicKeys(ddo.didDocument);
                if (!x5u) {
                    logger_1.logger.error(__filename, 'ServiceOffering', constants_1.AppMessages.X5U_NOT_FOUND, req.custom.uuid);
                    res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        error: constants_1.AppMessages.X5U_NOT_FOUND,
                        message: constants_1.AppMessages.SD_SIGN_FAILED
                    });
                    return;
                }
                // Decrypt private key(received in request) from base64 to raw string
                privateKey = isVault ? yield vaultService.getSecrets(privateKey) : Buffer.from(privateKey, 'base64').toString('ascii');
                // privateKey = process.env.PRIVATE_KEY as string
                //try {
                //	const cloudWalletResponse = await axios.post(`${process.env.CLOUD_WALLET_URL}/issuing-demo/store-vc`, serviceOffering)
                //	const serviceOfferingId = cloudWalletResponse.data.groupId
                //	serviceOffering.credentialSubject['gx:accessCredential'] = `${process.env.CLOUD_WALLET_URL}/issuing-demo/create-offer/${serviceOfferingId}`
                //	logger.debug(__filename, 'ServiceOffering', '🔒 Got service offering id from cloud wallet', serviceOfferingId)
                //} catch (cloudWalletError) {
                //	logger.error(__filename, 'ServiceOffering', 'Failed to get service offering id from cloud wallet', '', cloudWalletError)
                //}
                // Sign service offering self description with private key(received in request)
                const proof = yield common_functions_1.default.addProof(jsonld_1.default, axios_1.default, jose, crypto_1.default, serviceOffering, privateKey, verificationMethod, constants_1.AppConst.RSA_ALGO, x5u);
                serviceOffering.proof = proof;
                verifiableCredential.push(serviceOffering);
                verifiableCredential.push(dataResource);
                verifiableCredential.push(exposedResource);
                const { credentialSubject: serviceOfferingCS } = serviceOffering;
                const vcsMap = new Map();
                // Extract VC of dependant Services
                // eslint-disable-next-line no-prototype-builtins
                /*if (serviceOfferingCS.hasOwnProperty('gx:dependsOn')) {
                    try {
                        await Utils.getInnerVCs(serviceOffering, 'gx:dependsOn', ['gx:ServiceOffering'], vcsMap)
                    } catch (error) {
                        res.status(STATUS_CODES.BAD_REQUEST).json({
                            error: (error as Error).message,
                            message: AppMessages.SD_SIGN_FAILED
                        })
                    }
                }*/
                /* Extract VC of aggregated Resources
                // eslint-disable-next-line no-prototype-builtins
    
                //const aggregationURL = serviceOffering['credentialSubject']['gx:aggregationOf'][0]['id']
                //const dataResource = await Utils.fetchParticipantJson(aggregationURL)
                //logger.debug(__filename, 'ServiceOffering','DataResource',JSON.stringify(dataResouuce))
                
                 
    
                if (serviceOfferingCS.hasOwnProperty('gx:aggregationOf')) {
                    try {
                        await Utils.getInnerVCs(serviceOffering, 'gx:aggregationOf', ['gx:Resource'], vcsMap)
                    } catch (error) {
                        res.status(STATUS_CODES.BAD_REQUEST).json({
                            error: (error as Error).message,
                            message: AppMessages.SD_SIGN_FAILED
                        })
                        return
                    }
                }*/
                verifiableCredential.push(...Array.from(vcsMap.values()));
                verifiableCredential = common_functions_1.default.removeDuplicates(verifiableCredential, 'id');
                // Create VP for service offering
                const selfDescriptionCredentialVP = common_functions_1.default.createVP(verifiableCredential);
                // Call compliance service to sign in gaia-x
                const complianceCredential = yield common_functions_1.default.callServiceOfferingCompliance(selfDescriptionCredentialVP);
                const completeSD = {
                    selfDescriptionCredential: selfDescriptionCredentialVP,
                    complianceCredential: complianceCredential
                };
                // Calculate Veracity
                const { veracity, certificateDetails } = yield common_functions_1.default.calcVeracity(verifiableCredential, resolver);
                logger_1.logger.debug(__filename, 'ServiceOffering', '🔒 veracity calculated', req.custom.uuid);
                // Calculate Transparency
                const transparency = yield common_functions_1.default.calcTransparency(serviceOfferingCS);
                logger_1.logger.debug(__filename, 'ServiceOffering', '🔒 transparency calculated', req.custom.uuid);
                // Calculate TrustIndex
                const trustIndex = common_functions_1.default.calcTrustIndex(veracity, transparency);
                logger_1.logger.debug(__filename, 'ServiceOffering', '🔒 trustIndex calculated', req.custom.uuid);
                res.status(http_status_codes_1.default.OK).json({
                    data: {
                        completeSD,
                        trustIndex: {
                            veracity,
                            transparency,
                            trustIndex,
                            certificateDetails
                        }
                    },
                    message: constants_1.AppMessages.SD_SIGN_SUCCESS
                });
            }
            catch (error) {
                // logger.error(__filename, 'ServiceOffering', `❌ ${AppMessages.SD_SIGN_FAILED}`, req.custom.uuid, error)
                res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    error: error.message,
                    message: constants_1.AppMessages.SD_SIGN_FAILED
                });
            }
        });
        this.Verify = (req, res) => __awaiter(this, void 0, void 0, function* () {
            /**
             * Request Body :
                    1. url : EG . https://greenworld.proofsense.in/.well-known/participant.json
                  2. policies : policy we want to check
             */
            var _a, _b, _c;
            //todo : compliance check is remaining
            try {
                const { url, policies } = req.body;
                const verificationStatus = {
                    valid: false
                };
                logger_1.logger.debug(__filename, 'Verify', 'fetching participant json...', req.custom.uuid);
                const participantJson = yield common_functions_1.default.fetchParticipantJson(url);
                //check if VC not null or in other form
                if (!((_a = participantJson === null || participantJson === void 0 ? void 0 : participantJson.selfDescriptionCredential) === null || _a === void 0 ? void 0 : _a.verifiableCredential)) {
                    logger_1.logger.error(__filename, 'Verify', `❌ No Verifiable Credential Found`, req.custom.uuid);
                    res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        error: `VC not found`,
                        message: constants_1.AppMessages.SIG_VERIFY_FAILED
                    });
                    return;
                }
                else if (!Array.isArray(participantJson.selfDescriptionCredential.verifiableCredential)) {
                    logger_1.logger.error(__filename, 'Verify', `❌ Verifiable Credential isn't array`, req.custom.uuid);
                    res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        error: `VC not valid`,
                        message: constants_1.AppMessages.SIG_VERIFY_FAILED
                    });
                    return;
                }
                // check if complianceCred not null
                // if (!participantJson?.complianceCredential || !participantJson?.complianceCredential?.proof) {
                // 	logger.error(__filename, 'Verify', `❌ Compliance Credential Not Found`, req.custom.uuid)
                // 	res.status(STATUS_CODES.BAD_REQUEST).json({
                // 		error: `Compliance Credential not found`,
                // 		message: AppMessages.COMPLIANCE_CRED_FOUND_FAILED
                // 	})
                // 	return
                // }
                // check VC are of valid type
                const { verifiableCredential, type } = participantJson.selfDescriptionCredential;
                if (!Array.isArray(type) || !(type.includes('VerifiableCredential') || type.includes('VerifiablePresentation'))) {
                    logger_1.logger.error(__filename, 'Verify', `❌ Credential Type not supported`, req.custom.uuid);
                    res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        error: `Credential Type not supported`,
                        message: constants_1.AppMessages.SIG_VERIFY_FAILED
                    });
                    return;
                }
                const typeName = yield common_functions_1.default.getVcType(verifiableCredential, url);
                verificationStatus.gxType = typeName;
                if (![
                    'gx:ServiceOffering',
                    'gx:LegalParticipant',
                    'gx:DataResource',
                    'gx:PhysicalResource',
                    'gx:SoftwareResource',
                    'gx:legalRegistrationNumber',
                    'gx:GaiaXTermsAndConditions'
                ].includes(typeName)) {
                    res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        error: `${url} VC ID not found or VC doesn't have supported type`,
                        message: constants_1.AppMessages.SIG_VERIFY_FAILED
                    });
                    return;
                }
                for (const policy of policies) {
                    logger_1.logger.debug(__filename, 'Verify', `Executing ${policy} check ...`, req.custom.uuid);
                    switch (policy) {
                        case constants_1.AppConst.VERIFY_LP_POLICIES[0]: {
                            // integrity check
                            let allChecksPassed = true;
                            for (const vc of participantJson.selfDescriptionCredential.verifiableCredential) {
                                let vcID = '';
                                const integrityHash = `sha256-${(0, crypto_1.createHash)('sha256')
                                    .update((0, canonicalize_1.default)(vc))
                                    .digest('hex')}`;
                                if (Array.isArray(vc.credentialSubject)) {
                                    vcID = vc.credentialSubject[0].id;
                                }
                                else {
                                    vcID = vc.credentialSubject.id;
                                }
                                const credIntegrityHash = (_c = (_b = participantJson.complianceCredential) === null || _b === void 0 ? void 0 : _b.credentialSubject) === null || _c === void 0 ? void 0 : _c.find((cs) => cs.id == vcID)['gx:integrity'];
                                const integrityCheck = integrityHash === credIntegrityHash;
                                if (!integrityCheck) {
                                    allChecksPassed = false;
                                    logger_1.logger.error(__filename, 'Verify', `❌ Integrity Failed`, req.custom.uuid);
                                    break;
                                }
                            }
                            verificationStatus.integrityCheck = allChecksPassed;
                            break;
                        }
                        case constants_1.AppConst.VERIFY_LP_POLICIES[1]: {
                            //holder sig verification
                            for (const vc of verifiableCredential) {
                                const vcProof = JSON.parse(JSON.stringify(vc.proof));
                                const vcCredentialContent = JSON.parse(JSON.stringify(vc));
                                delete vcCredentialContent.proof;
                                verificationStatus.holderSignature = yield common_functions_1.default.verification(vcCredentialContent, vcProof, process.env.CHECK_SSL == 'true', resolver);
                            }
                            break;
                        }
                        case constants_1.AppConst.VERIFY_LP_POLICIES[2]: {
                            // compliance sig verification
                            const complianceCred = JSON.parse(JSON.stringify(participantJson.complianceCredential));
                            const complianceProof = JSON.parse(JSON.stringify(complianceCred.proof));
                            delete complianceCred.proof;
                            //it was initially false
                            verificationStatus.complianceSignature = yield common_functions_1.default.verification(complianceCred, complianceProof, false, resolver);
                            break;
                        }
                        case constants_1.AppConst.VERIFY_LP_POLICIES[3]: {
                            const complianceCred = JSON.parse(JSON.stringify(participantJson.complianceCredential));
                            const expirationDate = new Date(complianceCred.expirationDate).getTime();
                            const now = new Date().getTime();
                            verificationStatus.complianceCheck = expirationDate > now;
                            break;
                        }
                    }
                }
                let validity = true;
                for (const status in verificationStatus) {
                    if (status !== 'valid' && !verificationStatus[status]) {
                        validity = false;
                        break;
                    }
                }
                verificationStatus.valid = validity;
                res.status(http_status_codes_1.default.OK).json({
                    data: Object.assign({}, verificationStatus),
                    message: constants_1.AppMessages.SIG_VERIFY_SUCCESS
                });
            }
            catch (error) {
                res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    error: error.message,
                    message: constants_1.AppMessages.SIG_VERIFY_FAILED
                });
            }
        });
        this.GetTrustIndex = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { participantSD, serviceOfferingSD } = req.body;
                if (!common_functions_1.default.IsValidURL(participantSD)) {
                    res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        error: 'Invalid participant self description url format',
                        message: constants_1.AppMessages.TRUST_INDEX_CALC_FAILED
                    });
                    return;
                }
                if (!common_functions_1.default.IsValidURL(serviceOfferingSD)) {
                    res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        error: 'Invalid service offering self description url format',
                        message: constants_1.AppMessages.TRUST_INDEX_CALC_FAILED
                    });
                    return;
                }
                // get the json document of participant self description
                const { selfDescriptionCredential: { verifiableCredential } } = yield common_functions_1.default.fetchParticipantJson(participantSD);
                const { veracity, certificateDetails } = yield common_functions_1.default.calcVeracity(verifiableCredential, resolver);
                logger_1.logger.debug(__filename, 'GetTrustIndex', `veracity :- ${veracity}`, req.custom.uuid);
                // get the json document of service offering
                const { selfDescriptionCredential: { verifiableCredential: verifiableCredentialVCS } } = yield common_functions_1.default.fetchServiceOfferingJson(serviceOfferingSD);
                const serviceOfferingVC = verifiableCredentialVCS.find((credential) => {
                    const { credentialSubject: { type, id } } = credential;
                    return type === 'gx:ServiceOffering' && id === serviceOfferingSD;
                });
                const { credentialSubject } = serviceOfferingVC;
                const transparency = yield common_functions_1.default.calcTransparency(credentialSubject);
                logger_1.logger.debug(__filename, 'GetTrustIndex', `transparency :-, ${transparency}`, req.custom.uuid);
                const trustIndex = common_functions_1.default.calcTrustIndex(veracity, transparency);
                logger_1.logger.debug(__filename, 'GetTrustIndex', `trustIndex :-, ${trustIndex}`, req.custom.uuid);
                res.status(http_status_codes_1.default.OK).json({
                    message: 'Success',
                    data: {
                        veracity,
                        transparency,
                        trustIndex,
                        certificateDetails
                    }
                });
            }
            catch (error) {
                logger_1.logger.error(__filename, 'GetTrustIndex', `❌ ${constants_1.AppMessages.TRUST_INDEX_CALC_FAILED} : ${error}`, req.custom.uuid);
                res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    error: error.message,
                    message: constants_1.AppMessages.TRUST_INDEX_CALC_FAILED
                });
            }
        });
        this.CreateWebDID = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { domain, tenant, services } = req.body;
                let x5uURL = req.body.x5u;
                const didId = tenant ? `did:web:${domain}:${tenant}` : `did:web:${domain}`;
                if (!x5uURL) {
                    x5uURL = tenant ? `https://${domain}/${tenant}/x509CertificateChain.pem` : `https://${domain}/.well-known/x509CertificateChain.pem`;
                }
                let certificate = null;
                try {
                    certificate = (yield axios_1.default.get(x5uURL)).data;
                }
                catch (e) {
                    logger_1.logger.error(__filename, 'CreateWebDID', e.message, req.custom.uuid, e);
                    res.status(http_status_codes_1.default.UNPROCESSABLE_ENTITY).json({
                        error: `x5u URL not resolved: ${x5uURL}`,
                        message: constants_1.AppMessages.DID_FAILED
                    });
                    return;
                }
                const publicKeyJwk = yield common_functions_1.default.generatePublicJWK(jose, constants_1.AppConst.RSA_ALGO, certificate, x5uURL);
                if (!publicKeyJwk) {
                    logger_1.logger.error(__filename, 'CreateWebDID', '❌ fail to create publicKeyJWK', req.custom.uuid);
                    throw new Error('fail to create publicKeyJWK');
                }
                const did = yield common_functions_1.default.generateDID(didId, publicKeyJwk, services);
                if (!did) {
                    logger_1.logger.error(__filename, 'CreateWebDID', '❌ fail to create did', req.custom.uuid);
                    throw new Error('fail to create did');
                }
                res.status(http_status_codes_1.default.OK).json({
                    data: { did },
                    message: constants_1.AppMessages.DID_SUCCESS
                });
            }
            catch (e) {
                logger_1.logger.error(__filename, 'CreateWebDID', e.message, req.custom.uuid, e);
                res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    error: e.message,
                    message: constants_1.AppMessages.DID_FAILED
                });
            }
        });
        this.VerifyWebDID = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { did, verificationMethod, privateKey, isVault } = req.body;
                const ddo = yield common_functions_1.default.getDDOfromDID(did, resolver);
                if (!ddo) {
                    logger_1.logger.error(__filename, 'VerifyWebDID', `❌ DDO not found for given did: '${did}'`, req.custom.uuid);
                    res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        error: `DDO not found for given did: '${did}'`,
                        message: constants_1.AppMessages.DID_VERIFY_FAILED
                    });
                    return;
                }
                const { didDocument: { verificationMethod: verificationMethodArray } } = ddo;
                const foundVerificationMethod = verificationMethodArray.find((e) => e.id === verificationMethod);
                if (!foundVerificationMethod) {
                    logger_1.logger.error(__filename, 'VerifyWebDID', `❌ Verification Method not found in DDO: '${verificationMethod}'`, req.custom.uuid);
                    res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        error: `Verification Method not found in DDO: '${verificationMethod}'`,
                        message: constants_1.AppMessages.DID_VERIFY_FAILED
                    });
                    return;
                }
                const decodedPrivateKey = isVault ? yield vaultService.getSecrets(privateKey) : Buffer.from(privateKey, 'base64').toString('ascii');
                // const decodedPrivateKey = process.env.PRIVATE_KEY as string
                const hash = 'sampleText';
                const jws = yield common_functions_1.default.sign(jose, constants_1.AppConst.RSA_ALGO, hash, decodedPrivateKey);
                try {
                    const isValid = yield common_functions_1.default.verify(jose, jws.replace('..', `.${hash}.`), constants_1.AppConst.RSA_ALGO, foundVerificationMethod.publicKeyJwk, hash);
                    // const isValid = false
                    res.status(http_status_codes_1.default.OK).json({
                        data: { isValid },
                        message: isValid ? constants_1.AppMessages.DID_VERIFY : constants_1.AppMessages.DID_VERIFY_FAILED
                    });
                }
                catch (e) {
                    logger_1.logger.error(__filename, 'VerifyWebDID', e.message, req.custom.uuid);
                    res.status(http_status_codes_1.default.OK).json({
                        data: { isValid: false },
                        message: constants_1.AppMessages.DID_VERIFY_FAILED
                    });
                }
            }
            catch (e) {
                logger_1.logger.error(__filename, 'VerifyWebDID', e.message, req.custom.uuid);
                res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    error: e.message,
                    message: constants_1.AppMessages.DID_VERIFY_FAILED
                });
            }
        });
        this.ValidateRegistrationNumber = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { legalRegistrationNumber } = req.body;
                const isValid = (yield common_functions_1.default.issueRegistrationNumberVC(axios_1.default, legalRegistrationNumber)) ? true : false;
                res.status(http_status_codes_1.default.OK).json({
                    data: { isValid },
                    message: isValid ? constants_1.AppMessages.RN_VERIFY : constants_1.AppMessages.RN_VERIFY_FAILED
                });
            }
            catch (e) {
                logger_1.logger.error(__filename, 'ValidateRegistrationNumber', e.message, req.custom.uuid);
                res.status(http_status_codes_1.default.OK).json({
                    data: { isValid: false },
                    message: constants_1.AppMessages.RN_VERIFY_FAILED
                });
            }
        });
        this.LabelLevel = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let { privateKey } = req.body;
                const { verificationMethod, isVault, issuer: issuerDID, vcs: { labelLevel } } = req.body;
                // Get DID document of issuer from issuer DID
                const ddo = yield common_functions_1.default.getDDOfromDID(issuerDID, resolver);
                if (!ddo) {
                    logger_1.logger.error(__filename, 'LabelLevel', `❌ DDO not found for given did: '${issuerDID}' in proof`, req.custom.uuid);
                    res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        error: `DDO not found for given did: '${issuerDID}' in proof`,
                        message: constants_1.AppMessages.LL_SIGN_FAILED
                    });
                    return;
                }
                const { credentialSubject: labelLevelCS } = labelLevel;
                if (!labelLevelCS) {
                    logger_1.logger.error(__filename, 'LabelLevel', constants_1.AppMessages.CS_EMPTY, req.custom.uuid);
                    res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        error: constants_1.AppMessages.CS_EMPTY,
                        message: constants_1.AppMessages.LL_SIGN_FAILED
                    });
                    return;
                }
                // Calculate LabelLevel
                const labelLevelResult = yield common_functions_1.default.calcLabelLevel(labelLevelCS);
                if (labelLevelResult === '') {
                    logger_1.logger.error(__filename, 'LabelLevel', constants_1.AppMessages.LABEL_LEVEL_CALC_FAILED, req.custom.uuid);
                    res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        error: constants_1.AppMessages.LABEL_LEVEL_CALC_FAILED,
                        message: constants_1.AppMessages.LL_SIGN_FAILED
                    });
                    return;
                }
                labelLevelCS['gx:labelLevel'] = labelLevelResult;
                logger_1.logger.debug(__filename, 'LabelLevel', '🔒 labelLevel calculated', req.custom.uuid);
                // Extract certificate url from did document
                const { x5u } = yield common_functions_1.default.getPublicKeys(ddo.didDocument);
                if (!x5u || x5u == '') {
                    logger_1.logger.error(__filename, 'LabelLevel', constants_1.AppMessages.X5U_NOT_FOUND, req.custom.uuid);
                    res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        error: constants_1.AppMessages.X5U_NOT_FOUND,
                        message: constants_1.AppMessages.LL_SIGN_FAILED
                    });
                    return;
                }
                // Decrypt private key(received in request) from base64 to raw string
                privateKey = isVault ? yield vaultService.getSecrets(privateKey) : Buffer.from(privateKey, 'base64').toString('ascii');
                // Sign service offering self description with private key(received in request)
                const proof = yield common_functions_1.default.addProof(jsonld_1.default, axios_1.default, jose, crypto_1.default, labelLevel, privateKey, verificationMethod, constants_1.AppConst.RSA_ALGO, x5u);
                labelLevel.proof = proof;
                const completeSD = {
                    selfDescriptionCredential: labelLevel,
                    complianceCredential: {}
                };
                res.status(http_status_codes_1.default.OK).json({
                    data: completeSD,
                    message: constants_1.AppMessages.LL_SIGN_SUCCESS
                });
            }
            catch (error) {
                logger_1.logger.error(__filename, 'LabelLevel', `❌ ${constants_1.AppMessages.LL_SIGN_FAILED}`, req.custom.uuid, '');
                res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    error: error.message,
                    message: constants_1.AppMessages.LL_SIGN_FAILED
                });
            }
        });
    }
}
exports.default = new SignerToolController();
