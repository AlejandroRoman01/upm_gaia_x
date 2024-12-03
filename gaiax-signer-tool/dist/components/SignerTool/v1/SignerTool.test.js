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
;
`/ pragma: allowlist-secret /`;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const common_functions_1 = __importDefault(require("../../../utils/common-functions"));
const vault_service_1 = require("../../../utils/service/vault.service");
const constants_1 = require("../../../utils/constants");
const assets_1 = require("../../../assets");
const axios_1 = __importStar(require("axios"));
const exampleCertificate = process.env.SSL_CERTIFICATE;
//mocking - Utils
jest.mock('../../../utils/common-functions', () => {
    return Object.assign(Object.assign({}, jest.requireActual('../../../utils/common-functions')), { verification: () => {
            return true;
        }, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fetchParticipantJson: () => __awaiter(void 0, void 0, void 0, function* () {
            const mockPJ = JSON.parse(JSON.stringify(assets_1.participantJson));
            return Object.assign({}, mockPJ);
        }), 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fetchServiceOfferingJson: () => __awaiter(void 0, void 0, void 0, function* () {
            const { validSOJSON } = assets_1.serviceOfferingTestJSON;
            const mockSOJ = JSON.parse(JSON.stringify(validSOJSON));
            return Object.assign({}, mockSOJ);
        }), 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        callServiceOfferingCompliance: () => __awaiter(void 0, void 0, void 0, function* () {
            const { validSOComplianceResponse } = assets_1.serviceOfferingTestJSON;
            const mockPJ = JSON.parse(JSON.stringify(validSOComplianceResponse));
            return Object.assign({}, mockPJ);
        }), 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getDDOfromDID: (did, resolver) => {
            if (did == 'did:web:ferrari.smart-x.smartsenselabs.com') {
                const { holderDid } = assets_1.labelLevelTestJSON;
                return { didDocument: holderDid };
            }
            else if (did == 'did:web:greenworld.proofsense.in') {
                return { didDocument: assets_1.holderDdoJson };
            }
        }, generatePublicJWK: () => {
            return {};
        }, getInnerVCs: () => { }, getPublicKeys: () => {
            const { verificationMethod } = assets_1.holderDdoJson;
            const { publicKeyJwk } = verificationMethod[0];
            return publicKeyJwk;
        }, addProof: () => {
            const { serviceOfferingProof } = assets_1.serviceOfferingTestJSON;
            return serviceOfferingProof;
        }, removeDuplicates: () => {
            const { uniqueVC } = assets_1.serviceOfferingTestJSON;
            return uniqueVC;
        }, createVP: () => {
            const { serviceOfferingVP } = assets_1.serviceOfferingTestJSON;
            return serviceOfferingVP;
        }, calcVeracity: () => {
            const { veracityResponse } = assets_1.serviceOfferingTestJSON;
            return veracityResponse;
        }, calcTransparency: () => {
            return 1.6;
        }, calcTrustIndex: () => {
            return 0.925;
        }, generateDID: () => {
            return {};
        }, sign: () => {
            return { replace: function () { } };
        }, verify: () => {
            return true;
        }, issueRegistrationNumberVC: () => {
            return assets_1.legalRegistrationNumberJson;
        }, calcLabelLevel: () => {
            return 'L1';
        }, IsValidURL: () => {
            return false;
        }, getVcType: () => {
            return '';
        } });
});
jest.mock('../../../utils/service/vault.service', () => {
    return Object.assign(Object.assign({}, jest.requireActual('../../../utils/service/vault.service')), { getSecrets: () => {
            return '';
        } });
});
describe('/v1/gaia-x/verify', () => {
    const validBody = {
        policies: ['integrityCheck', 'holderSignature', 'complianceSignature', 'complianceCheck'],
        url: 'https://greenworld.proofsense.in/.well-known/participant.json#0'
    };
    describe('Failing Cases', () => {
        describe('validation error', () => {
            it('empty body', () => __awaiter(void 0, void 0, void 0, function* () {
                const error = {
                    error: "Invalid value of param 'policies'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY}`)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
            it('url is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
                const body = {
                    policies: ['integrityCheck', 'holderSignature', 'complianceSignature', 'complianceCheck'],
                    url: ''
                };
                const error = {
                    error: "Invalid value of param 'url'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY}`)
                    .send(body)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
                body.url = 'abc';
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY}`)
                    .send(body)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
            it('policies is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
                const body = {
                    policies: [],
                    url: 'https://greenworld.proofsense.in/.well-known/participant.json'
                };
                const error = {
                    error: "Invalid value of param 'policies'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY}`)
                    .send(body)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
                body.policies = ['invalid policies'];
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY}`)
                    .send(body)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
        });
        describe('general failing case', () => {
            it('fail to fetch participant json from url', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'fetchParticipantJson').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    throw new Error('Fail to fetch');
                }));
                const body = validBody;
                const error = {
                    error: 'Fail to fetch',
                    message: constants_1.AppMessages.SIG_VERIFY_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY}`)
                    .send(body)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.INTERNAL_SERVER_ERROR);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('fetched participantJson in invalid form', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'fetchParticipantJson').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return {};
                }));
                const body = validBody;
                const error = {
                    error: `VC not found`,
                    message: constants_1.AppMessages.SIG_VERIFY_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY}`)
                    .send(body)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.BAD_REQUEST);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('vc invalid', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'fetchParticipantJson').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return Object.assign(Object.assign({}, assets_1.participantJson), { selfDescriptionCredential: Object.assign(Object.assign({}, assets_1.participantJson.selfDescriptionCredential), { verifiableCredential: 'verifiable credential' }) });
                }));
                const body = validBody;
                const error = {
                    error: `VC not valid`,
                    message: constants_1.AppMessages.SIG_VERIFY_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY}`)
                    .send(body)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.BAD_REQUEST);
                    expect(response.body).toEqual(error);
                });
                jest.spyOn(common_functions_1.default, 'fetchParticipantJson').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    //creating deep copy
                    const mockParticipantJson = JSON.parse(JSON.stringify(assets_1.participantJson));
                    delete mockParticipantJson.selfDescriptionCredential.verifiableCredential;
                    return Object.assign({}, mockParticipantJson);
                }));
                error.error = 'VC not found';
                error.message = constants_1.AppMessages.SIG_VERIFY_FAILED;
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY}`)
                    .send(body)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.BAD_REQUEST);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            // it('compliance credential invalid', async () => {
            // 	jest.spyOn(Utils, 'fetchParticipantJson').mockImplementation(async () => {
            // 		const mockParticipantJson = JSON.parse(JSON.stringify(participantJson))
            // 		delete mockParticipantJson.complianceCredential
            // 		return { ...mockParticipantJson }
            // 	})
            // 	const body = validBody
            // 	const error = {
            // 		error: `Compliance Credential not found`,
            // 		message: AppMessages.COMPLIANCE_CRED_FOUND_FAILED
            // 	}
            // 	await supertest(app)
            // 		.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
            // 		.send(body)
            // 		.expect((response) => {
            // 			expect(response.status).toBe(STATUS_CODES.BAD_REQUEST)
            // 			expect(response.body).toEqual(error)
            // 		})
            // 	jest.resetAllMocks()
            // 	jest.spyOn(Utils, 'fetchParticipantJson').mockImplementation(async () => {
            // 		const mockParticipantJson = JSON.parse(JSON.stringify(participantJson))
            // 		delete mockParticipantJson.complianceCredential.proof
            // 		return { ...mockParticipantJson }
            // 	})
            // 	await supertest(app)
            // 		.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
            // 		.send(body)
            // 		.expect((response) => {
            // 			expect(response.status).toBe(STATUS_CODES.BAD_REQUEST)
            // 			expect(response.body).toEqual(error)
            // 		})
            // 	jest.resetAllMocks()
            // })
            it('type invalid in selfDescription', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'fetchParticipantJson').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    const mockParticipantJson = JSON.parse(JSON.stringify(assets_1.participantJson));
                    delete mockParticipantJson.selfDescriptionCredential.type;
                    return Object.assign({}, mockParticipantJson);
                }));
                const body = validBody;
                const error = {
                    error: `Credential Type not supported`,
                    message: constants_1.AppMessages.SIG_VERIFY_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY}`)
                    .send(body)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.BAD_REQUEST);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
                jest.spyOn(common_functions_1.default, 'fetchParticipantJson').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    const mockParticipantJson = JSON.parse(JSON.stringify(assets_1.participantJson));
                    mockParticipantJson.selfDescriptionCredential.type = ['randomProof'];
                    return Object.assign({}, mockParticipantJson);
                }));
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY}`)
                    .send(body)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.BAD_REQUEST);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('vc found without gx:LegalParticipant', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'fetchParticipantJson').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    const mockParticipantJson = JSON.parse(JSON.stringify(assets_1.participantJson));
                    mockParticipantJson.selfDescriptionCredential.verifiableCredential = [
                        {
                            '@context': [
                                'https://www.w3.org/2018/credentials/v1',
                                'https://w3id.org/security/suites/jws-2020/v1',
                                'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
                            ],
                            type: ['VerifiableCredential'],
                            issuanceDate: '2023-07-28T11:13:56.533Z',
                            credentialSubject: {
                                '@context': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
                                type: 'gx:GaiaXTermsAndConditions',
                                'gx:termsAndConditions': 'The PARTICIPANT signing the Self-Description agrees as follows:\n- to update its descriptions about any changes, be it technical, organizational, or legal - especially but not limited to contractual in regards to the indicated attributes present in the descriptions.\n\nThe keypair used to sign Verifiable Credentials will be revoked where Gaia-X Association becomes aware of any inaccurate statements in regards to the claims which result in a non-compliance with the Trust Framework and policy rules defined in the Policy Rules and Labelling Document (PRLD).',
                                id: 'https://greenworld.proofsense.in/.well-known/participant.json#2'
                            },
                            issuer: 'did:web:greenworld.proofsense.in',
                            id: 'did:web:greenworld.proofsense.in',
                            proof: {
                                type: 'JsonWebSignature2020',
                                created: '2023-07-31T11:47:31.186Z',
                                proofPurpose: 'assertionMethod',
                                verificationMethod: 'did:web:greenworld.proofsense.in',
                                jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..FhIctfvYnWlNaUVCduHe9sPSOLZUyfwuz6EbMbwtN1DYhRD0P9fCHJfKbF5TwWI9i2S0rF2LlM3lXK00RxNJN2qFTpeydR01kxDzYZrlEUZO7xXyy8XdYxwZaEwXRfSrbNkKI1AcsHLoANofo460udlIAEj9hAqHvM4tS05ZMIx8jI1a3LBI6K879zENeoSOyn713lIU5hMSU4jhX06iT152PUqAiyrMbJFHKp9KI2JlZs0T90vB5JYYo9V_Lqe3n3Ad3sn5Yi7bBZJipHEsSavHYRQqEbvANdWFWDuU_7aClNbWeQrCPhbMdS3x5RVmBzRVYin-YXQVyBcp5FXhKQ'
                            }
                        }
                    ];
                    return Object.assign({}, mockParticipantJson);
                }));
                const body = validBody;
                const error = {
                    error: `${validBody.url} VC ID not found or VC doesn't have supported type`,
                    message: constants_1.AppMessages.SIG_VERIFY_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY}`)
                    .send(body)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.BAD_REQUEST);
                    expect(response.body).toEqual(error);
                });
            }));
        });
        describe('integrityCheck', () => {
            it('integrity fails', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'fetchParticipantJson').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    const mockParticipantJson = JSON.parse(JSON.stringify(assets_1.participantJson));
                    mockParticipantJson.selfDescriptionCredential.verifiableCredential[1].id = 'did:web:whiteworld.proofsense.in';
                    return Object.assign({}, mockParticipantJson);
                }));
                jest.spyOn(common_functions_1.default, 'getVcType').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return 'gx:LegalParticipant';
                }));
                const body = validBody;
                body.policies = ['integrityCheck'];
                const message = {
                    message: constants_1.AppMessages.SIG_VERIFY_SUCCESS,
                    data: {
                        gxType: 'gx:LegalParticipant',
                        integrityCheck: false,
                        valid: false
                    }
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY}`)
                    .send(body)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.OK);
                    expect(response.body).toEqual(message);
                });
                jest.resetAllMocks();
            }));
        });
        describe('holderSignature', () => {
            it('error from verification', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'verification').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    throw new Error('Verification failed due to xyz reason');
                }));
                jest.spyOn(common_functions_1.default, 'getVcType').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return 'gx:LegalParticipant';
                }));
                const body = validBody;
                body.policies = ['holderSignature'];
                const error = {
                    message: constants_1.AppMessages.SIG_VERIFY_FAILED,
                    error: 'Verification failed due to xyz reason'
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY}`)
                    .send(body)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.INTERNAL_SERVER_ERROR);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('verification returns false', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'verification').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return false;
                }));
                jest.spyOn(common_functions_1.default, 'getVcType').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return 'gx:LegalParticipant';
                }));
                const body = validBody;
                body.policies = ['holderSignature'];
                const message = {
                    message: constants_1.AppMessages.SIG_VERIFY_SUCCESS,
                    data: {
                        gxType: 'gx:LegalParticipant',
                        holderSignature: false,
                        valid: false
                    }
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY}`)
                    .send(body)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.OK);
                    expect(response.body).toEqual(message);
                });
                jest.resetAllMocks();
            }));
        });
        describe('complianceSignature', () => {
            it('error from verification', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'verification').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    throw new Error('Verification failed due to xyz reason');
                }));
                jest.spyOn(common_functions_1.default, 'getVcType').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return 'gx:LegalParticipant';
                }));
                const body = validBody;
                body.policies = ['complianceSignature'];
                const error = {
                    message: constants_1.AppMessages.SIG_VERIFY_FAILED,
                    error: 'Verification failed due to xyz reason'
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY}`)
                    .send(body)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.INTERNAL_SERVER_ERROR);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('verification returns false', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'verification').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return false;
                }));
                jest.spyOn(common_functions_1.default, 'getVcType').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return 'gx:LegalParticipant';
                }));
                const body = validBody;
                body.policies = ['complianceSignature'];
                const message = {
                    message: constants_1.AppMessages.SIG_VERIFY_SUCCESS,
                    data: {
                        gxType: 'gx:LegalParticipant',
                        complianceSignature: false,
                        valid: false
                    }
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY}`)
                    .send(body)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.OK);
                    expect(response.body).toEqual(message);
                });
                jest.resetAllMocks();
            }));
        });
    });
    describe('success case', () => {
        describe('integrityCheck', () => {
            it('integrity successful', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'getVcType').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return 'gx:LegalParticipant';
                }));
                const body = validBody;
                body.policies = ['integrityCheck'];
                const message = {
                    message: constants_1.AppMessages.SIG_VERIFY_SUCCESS,
                    data: {
                        gxType: 'gx:LegalParticipant',
                        integrityCheck: true,
                        valid: true
                    }
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY}`)
                    .send(body)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.OK);
                    expect(response.body).toEqual(message);
                });
                jest.resetAllMocks();
            }));
        });
        describe('holderSignature', () => {
            it('holder sig validated', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'getVcType').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return 'gx:LegalParticipant';
                }));
                const body = validBody;
                body.policies = ['holderSignature'];
                const message = {
                    message: constants_1.AppMessages.SIG_VERIFY_SUCCESS,
                    data: {
                        gxType: 'gx:LegalParticipant',
                        holderSignature: true,
                        valid: true
                    }
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY}`)
                    .send(body)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.OK);
                    expect(response.body).toEqual(message);
                });
                jest.resetAllMocks();
            }));
        });
        describe('complianceSignature', () => {
            it('compliance signature verified', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'getVcType').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return 'gx:LegalParticipant';
                }));
                const body = validBody;
                body.policies = ['complianceSignature'];
                const message = {
                    message: constants_1.AppMessages.SIG_VERIFY_SUCCESS,
                    data: {
                        gxType: 'gx:LegalParticipant',
                        complianceSignature: true,
                        valid: true
                    }
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY}`)
                    .send(body)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.OK);
                    expect(response.body).toEqual(message);
                });
                jest.resetAllMocks();
            }));
        });
        describe('check all', () => {
            it('compliance signature verified', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'getVcType').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return 'gx:LegalParticipant';
                }));
                const body = validBody;
                body.policies = ['holderSignature', 'integrityCheck', 'complianceSignature'];
                const message = {
                    message: constants_1.AppMessages.SIG_VERIFY_SUCCESS,
                    data: {
                        gxType: 'gx:LegalParticipant',
                        holderSignature: true,
                        integrityCheck: true,
                        complianceSignature: true,
                        valid: true
                    }
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY}`)
                    .send(body)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.OK);
                    expect(response.body).toEqual(message);
                });
                jest.resetAllMocks();
            }));
        });
        describe('serviceOffering testcase', () => {
            it('testing verification api for serviceoffering', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'fetchParticipantJson').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    const mockParticipantJson = JSON.parse(JSON.stringify(assets_1.ServiceOfferingParticipantJson));
                    return Object.assign({}, mockParticipantJson);
                }));
                jest.spyOn(common_functions_1.default, 'getVcType').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return 'gx:LegalParticipant';
                }));
                const body = validBody;
                body.policies = ['holderSignature', 'integrityCheck', 'complianceSignature', 'complianceCheck'];
                const message = {
                    message: constants_1.AppMessages.SIG_VERIFY_SUCCESS,
                    data: {
                        gxType: 'gx:LegalParticipant',
                        holderSignature: true,
                        integrityCheck: true,
                        complianceSignature: true,
                        complianceCheck: true,
                        valid: true
                    }
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY}`)
                    .send(body)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.OK);
                    expect(response.body).toEqual(message);
                });
                jest.resetAllMocks();
            }));
        });
    });
});
describe('/v1/create-web-did', () => {
    const validBody = {
        domain: 'dev.smartproof.in',
        tenant: 'smart',
        services: [
            {
                type: 'CredentialRegistry',
                serviceEndpoint: 'https://ssi.eecc.de/api/registry/vcs'
            }
        ],
        x5u: 'https://dev.smartproof.in/.well-known/x509CertificateChain.pem'
    };
    describe('failing case', () => {
        it('validation error', () => __awaiter(void 0, void 0, void 0, function* () {
            const error = {
                error: "Invalid value of param 'domain'",
                message: 'Validation Error, please provide valid req.body'
            };
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.CREATE_WEB_DID}`)
                .expect((response) => {
                expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                expect(response.body).toEqual(error);
            });
            const body = {
                domain: 'dev.smartproof.in',
                x5u: 'abc'
            };
            error.error = "Invalid value of param 'x5u'";
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.CREATE_WEB_DID}`)
                .send(body)
                .expect((response) => {
                expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                expect(response.body).toEqual(error);
            });
            const body2 = {
                domain: 'dev.smartproof.in',
                tenant: 'smart',
                services: [
                    {
                        type: '',
                        serviceEndpoint: 'https://ssi.eecc.de/api/registry/vcs'
                    }
                ]
            };
            error.error = "Invalid value of param 'services[0].type'";
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.CREATE_WEB_DID}`)
                .send(body2)
                .expect((response) => {
                expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                expect(response.body).toEqual(error);
            });
            const body3 = {
                domain: 'dev.smartproof.in',
                tenant: 'smart',
                services: [
                    {
                        type: 'CredentialRegistry',
                        serviceEndpoint: 'abc2'
                    }
                ]
            };
            error.error = "Invalid value of param 'services[0].serviceEndpoint'";
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.CREATE_WEB_DID}`)
                .send(body3)
                .expect((response) => {
                expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                expect(response.body).toEqual(error);
            });
            const body4 = {
                domain: 'dev.smartproof.in',
                services: 'abc'
            };
            error.error = "Invalid value of param 'services'";
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.CREATE_WEB_DID}`)
                .send(body4)
                .expect((response) => {
                expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                expect(response.body).toEqual(error);
            });
        }));
        it('Axios get certificate fails', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(axios_1.default, 'get').mockResolvedValue(undefined);
            const body = validBody;
            const error = {
                error: 'x5u URL not resolved: https://dev.smartproof.in/.well-known/x509CertificateChain.pem',
                message: 'DID creation failed.'
            };
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.CREATE_WEB_DID}`)
                .send(body)
                .expect((response) => {
                expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                expect(response.body).toEqual(error);
            });
            jest.resetAllMocks();
        }));
        it('generatePublicJWK returns undefined', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(axios_1.default, 'get').mockResolvedValue({ data: exampleCertificate });
            jest.spyOn(common_functions_1.default, 'generatePublicJWK').mockResolvedValue(undefined);
            const body = validBody;
            const error = {
                error: 'fail to create publicKeyJWK',
                message: 'DID creation failed.'
            };
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.CREATE_WEB_DID}`)
                .send(body)
                .expect((response) => {
                expect(response.status).toBe(http_status_codes_1.default.INTERNAL_SERVER_ERROR);
                expect(response.body).toEqual(error);
            });
        }));
        it('generateDID returns undefined', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(axios_1.default, 'get').mockResolvedValue({ data: exampleCertificate });
            jest.spyOn(common_functions_1.default, 'generatePublicJWK').mockResolvedValue({});
            jest.spyOn(common_functions_1.default, 'generateDID').mockResolvedValue(undefined);
            const body = validBody;
            const error = {
                error: 'fail to create did',
                message: 'DID creation failed.'
            };
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.CREATE_WEB_DID}`)
                .send(body)
                .expect((response) => {
                expect(response.status).toBe(http_status_codes_1.default.INTERNAL_SERVER_ERROR);
                expect(response.body).toEqual(error);
            });
        }));
    });
    describe('success case', () => {
        it('successful case with tenant', () => __awaiter(void 0, void 0, void 0, function* () {
            const did = {
                '@context': ['https://www.w3.org/ns/did/v1'],
                id: 'did:web:dev.smartproof.in',
                verificationMethod: [
                    {
                        '@context': 'https://w3c-ccg.github.io/lds-jws2020/contexts/v1/',
                        id: 'did:web:dev.smartproof.in',
                        type: 'JsonWebKey2020',
                        controller: 'did:web:dev.smartproof.in',
                        publicKeyJwk: {
                            crv: 'Ed25519',
                            kty: 'OKP',
                            alg: 'PS256',
                            x5u: 'https://dev.smartproof.in/.well-known/x509CertificateChain.pem',
                            x: 'yM1FmySIISrMqruOIjLwKpbwsaUbRLEEH6r1gDWmW4s' /*pragma: allowlist secret*/
                        }
                    }
                ],
                assertionMethod: ['did:web:dev.smartproof.in#JWK2020-RSA']
            };
            jest.spyOn(axios_1.default, 'get').mockResolvedValue({ data: exampleCertificate });
            jest.spyOn(common_functions_1.default, 'generateDID').mockResolvedValue(Object.assign({}, did));
            const body = Object.assign(Object.assign({}, validBody), { x5u: undefined });
            const responseData = {
                data: {
                    did: Object.assign({}, did)
                },
                message: 'DID created successfully.'
            };
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.CREATE_WEB_DID}`)
                .send(body)
                .expect((response) => {
                expect(response.status).toBe(http_status_codes_1.default.OK);
                expect(response.body).toEqual(responseData);
            });
        }));
        it('successful case with domain', () => __awaiter(void 0, void 0, void 0, function* () {
            const did = {
                '@context': ['https://www.w3.org/ns/did/v1'],
                id: 'did:web:dev.smartproof.in',
                verificationMethod: [
                    {
                        '@context': 'https://w3c-ccg.github.io/lds-jws2020/contexts/v1/',
                        id: 'did:web:dev.smartproof.in',
                        type: 'JsonWebKey2020',
                        controller: 'did:web:dev.smartproof.in',
                        publicKeyJwk: {
                            crv: 'Ed25519',
                            kty: 'OKP',
                            alg: 'PS256',
                            x5u: 'https://dev.smartproof.in/.well-known/x509CertificateChain.pem',
                            x: 'yM1FmySIISrMqruOIjLwKpbwsaUbRLEEH6r1gDWmW4s' /*pragma: allowlist secret*/
                        }
                    }
                ],
                assertionMethod: ['did:web:dev.smartproof.in#JWK2020-RSA']
            };
            jest.spyOn(axios_1.default, 'get').mockResolvedValue({ data: exampleCertificate });
            jest.spyOn(common_functions_1.default, 'generateDID').mockResolvedValue(Object.assign({}, did));
            const body = Object.assign(Object.assign({}, validBody), { x5u: undefined, tenant: undefined });
            const responseData = {
                data: {
                    did: Object.assign({}, did)
                },
                message: 'DID created successfully.'
            };
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.CREATE_WEB_DID}`)
                .send(body)
                .expect((response) => {
                expect(response.status).toBe(http_status_codes_1.default.OK);
                expect(response.body).toEqual(responseData);
            });
        }));
    });
});
describe('/gaia-x/service-offering', () => {
    describe('Negative scenarios', () => {
        describe('Validation checks', () => {
            it('Empty request body', () => __awaiter(void 0, void 0, void 0, function* () {
                const error = {
                    error: "Invalid value of param 'privateKey'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.SERVICE_OFFERING}`)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
            it('Invalid issuer value', () => __awaiter(void 0, void 0, void 0, function* () {
                const { invalidIssuerJSON } = assets_1.serviceOfferingTestJSON;
                const error = {
                    error: "Invalid value of param 'issuer'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.SERVICE_OFFERING}`)
                    .send(invalidIssuerJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
            it('Invalid verificationMethod value', () => __awaiter(void 0, void 0, void 0, function* () {
                const { invalidMerificationMethodJSON } = assets_1.serviceOfferingTestJSON;
                const error = {
                    error: "Invalid value of param 'verificationMethod'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.SERVICE_OFFERING}`)
                    .send(invalidMerificationMethodJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
            it('Invalid serviceOffering object', () => __awaiter(void 0, void 0, void 0, function* () {
                const { invalidSO } = assets_1.serviceOfferingTestJSON;
                const error = {
                    error: "Invalid value of param 'vcs.serviceOffering'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.SERVICE_OFFERING}`)
                    .send(invalidSO)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
        });
        describe('Unresolvable links/data', () => {
            it('fail to resolve legal participant url', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'fetchParticipantJson').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    throw new Error('Fail to fetch');
                }));
                const { validReqJSON: validJSON } = assets_1.serviceOfferingTestJSON;
                const error = {
                    error: 'Fail to fetch',
                    message: constants_1.AppMessages.SD_SIGN_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.SERVICE_OFFERING}`)
                    .send(validJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.INTERNAL_SERVER_ERROR);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('DDO not found for given did', () => __awaiter(void 0, void 0, void 0, function* () {
                const { invalidReqJSON } = assets_1.serviceOfferingTestJSON;
                const error = {
                    error: "DDO not found for given did: 'did:web:suzuki.smart-x.smartsenselabs.com' in proof",
                    message: constants_1.AppMessages.SD_SIGN_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.SERVICE_OFFERING}`)
                    .send(invalidReqJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.BAD_REQUEST);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('X5U not found from the holder DID', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'getPublicKeys').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return { x5u: '', publicKeyJwk: '' };
                }));
                const { validReqJSON } = assets_1.serviceOfferingTestJSON;
                const error = {
                    error: constants_1.AppMessages.X5U_NOT_FOUND,
                    message: constants_1.AppMessages.SD_SIGN_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.SERVICE_OFFERING}`)
                    .send(validReqJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.BAD_REQUEST);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('fail to call service offering compliance service', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'callServiceOfferingCompliance').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    throw new Error('error while calling compliance service');
                }));
                jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return { didDocument: assets_1.holderDdoJson };
                }));
                const { validReqJSON: validJSON } = assets_1.serviceOfferingTestJSON;
                const error = {
                    error: 'error while calling compliance service',
                    message: constants_1.AppMessages.SD_SIGN_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.SERVICE_OFFERING}`)
                    .send(validJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.INTERNAL_SERVER_ERROR);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('fail to calculate veracity: LP proof verification method and did verification method id not matched', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'callServiceOfferingCompliance').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    const { validSOComplianceResponse } = assets_1.serviceOfferingTestJSON;
                    return validSOComplianceResponse;
                }));
                jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return { didDocument: assets_1.holderDdoJson };
                }));
                jest.spyOn(common_functions_1.default, 'calcVeracity').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    throw new Error('Participant proof verification method and did verification method id not matched');
                }));
                const { validReqJSON: validJSON } = assets_1.serviceOfferingTestJSON;
                const error = {
                    error: 'Participant proof verification method and did verification method id not matched',
                    message: constants_1.AppMessages.SD_SIGN_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.SERVICE_OFFERING}`)
                    .send(validJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.INTERNAL_SERVER_ERROR);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('fail to calculate veracity: Verifiable credential array not found in participant self description', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'callServiceOfferingCompliance').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    const { validSOComplianceResponse } = assets_1.serviceOfferingTestJSON;
                    return validSOComplianceResponse;
                }));
                jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return { didDocument: assets_1.holderDdoJson };
                }));
                jest.spyOn(common_functions_1.default, 'calcVeracity').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    throw new Error('Verifiable credential array not found in participant self description');
                }));
                const { validReqJSON: validJSON } = assets_1.serviceOfferingTestJSON;
                const error = {
                    error: 'Verifiable credential array not found in participant self description',
                    message: constants_1.AppMessages.SD_SIGN_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.SERVICE_OFFERING}`)
                    .send(validJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.INTERNAL_SERVER_ERROR);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('fail to calculate transparency', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'callServiceOfferingCompliance').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    const { validSOComplianceResponse } = assets_1.serviceOfferingTestJSON;
                    return validSOComplianceResponse;
                }));
                jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return { didDocument: assets_1.holderDdoJson };
                }));
                jest.spyOn(common_functions_1.default, 'calcTransparency').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    throw new Error('Error while calculating transparency');
                }));
                const { validReqJSON: validJSON } = assets_1.serviceOfferingTestJSON;
                const error = {
                    error: 'Error while calculating transparency',
                    message: constants_1.AppMessages.SD_SIGN_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.SERVICE_OFFERING}`)
                    .send(validJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.INTERNAL_SERVER_ERROR);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
        });
        it('fail to get dependsOn', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(common_functions_1.default, 'callServiceOfferingCompliance').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                const { validSOComplianceResponse } = assets_1.serviceOfferingTestJSON;
                return validSOComplianceResponse;
            }));
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return { didDocument: assets_1.holderDdoJson };
            }));
            jest.spyOn(common_functions_1.default, 'getInnerVCs').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                throw new Error(`gx:dependsOn VC ID not found or required vc type not found`);
            }));
            const error = {
                error: `gx:dependsOn VC ID not found or required vc type not found`,
                message: constants_1.AppMessages.SD_SIGN_FAILED
            };
            const { validReqJSON: validJSON } = assets_1.serviceOfferingTestJSON;
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.SERVICE_OFFERING}`)
                .send(validJSON)
                .expect((response) => {
                expect(response.status).toEqual(http_status_codes_1.default.BAD_REQUEST);
                expect(response.body).toEqual(error);
            });
            jest.resetAllMocks();
        }));
    });
    describe('Positive scenarios', () => {
        it('Service offering compliance success', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(common_functions_1.default, 'callServiceOfferingCompliance').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                const { validSOComplianceResponse } = assets_1.serviceOfferingTestJSON;
                return validSOComplianceResponse;
            }));
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return { didDocument: assets_1.holderDdoJson };
            }));
            const { validReqJSON: validJSON } = assets_1.serviceOfferingTestJSON;
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.SERVICE_OFFERING}`)
                .send(validJSON)
                .expect((response) => {
                expect(response.status).toEqual(http_status_codes_1.default.OK);
            });
            jest.resetAllMocks();
        }));
        it('Service offering compliance success with vault', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(common_functions_1.default, 'callServiceOfferingCompliance').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                const { validSOComplianceResponse } = assets_1.serviceOfferingTestJSON;
                return validSOComplianceResponse;
            }));
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return { didDocument: assets_1.holderDdoJson };
            }));
            jest.spyOn(vault_service_1.VaultService.prototype, 'getSecrets').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return '';
            }));
            const { validReqJSON: validJSON } = assets_1.serviceOfferingTestJSON;
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.SERVICE_OFFERING}`)
                .send(Object.assign(Object.assign({}, validJSON), { isVault: true }))
                .expect((response) => {
                expect(response.status).toEqual(http_status_codes_1.default.OK);
            });
            jest.resetAllMocks();
        }));
    });
});
describe('/gaia-x/legal-participant', () => {
    describe('Negative scenarios', () => {
        describe('Validation checks', () => {
            it('Empty request body', () => __awaiter(void 0, void 0, void 0, function* () {
                const error = {
                    error: "Invalid value of param 'privateKey'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
            it('Invalid issuer value', () => __awaiter(void 0, void 0, void 0, function* () {
                const { invalidIssuerJSON } = assets_1.legalParticipantTestJSON;
                const error = {
                    error: "Invalid value of param 'issuer'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
                    .send(invalidIssuerJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
            it('Invalid verificationMethod value', () => __awaiter(void 0, void 0, void 0, function* () {
                const { invalidVerificationMethodJSON } = assets_1.legalParticipantTestJSON;
                const error = {
                    error: "Invalid value of param 'verificationMethod'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
                    .send(invalidVerificationMethodJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
            it('Invalid legalParticipant object', () => __awaiter(void 0, void 0, void 0, function* () {
                const { invalidLegalParticipant } = assets_1.legalParticipantTestJSON;
                const error = {
                    error: "Invalid value of param 'vcs.legalParticipant'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
                    .send(invalidLegalParticipant)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
            it('Invalid legalRegistrationNumber object', () => __awaiter(void 0, void 0, void 0, function* () {
                const { invalidLegalRegistrationNumber } = assets_1.legalParticipantTestJSON;
                const error = {
                    error: "Invalid value of param 'vcs.legalRegistrationNumber'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
                    .send(invalidLegalRegistrationNumber)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
            it('Invalid gaiaXTermsAndConditions object', () => __awaiter(void 0, void 0, void 0, function* () {
                const { invalidGaiaXTermsAndConditions } = assets_1.legalParticipantTestJSON;
                const error = {
                    error: "Invalid value of param 'vcs.gaiaXTermsAndConditions'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
                    .send(invalidGaiaXTermsAndConditions)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
        });
        describe('Unresolvable links/data', () => {
            it('fail to resolve issuer DDO', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return undefined;
                }));
                const { validReqJSON: validJSON } = assets_1.legalParticipantTestJSON;
                const error = {
                    error: `DDO not found for given did: '${validJSON.issuer}'`,
                    message: constants_1.AppMessages.VP_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
                    .send(validJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.BAD_REQUEST);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('fail to get getPublicKeys', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'getPublicKeys').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return { x5u: '', publicKeyJwk: '' };
                }));
                jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return { didDocument: assets_1.holderDdoJson };
                }));
                const { validReqJSON: validJSON } = assets_1.legalParticipantTestJSON;
                const error = {
                    error: constants_1.AppMessages.X5U_NOT_FOUND,
                    message: constants_1.AppMessages.VP_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
                    .send(validJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.BAD_REQUEST);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('fail to get parentOrganization', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return { didDocument: assets_1.holderDdoJson };
                }));
                jest.spyOn(common_functions_1.default, 'issueRegistrationNumberVC').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return assets_1.legalRegistrationNumberJson;
                }));
                jest.spyOn(common_functions_1.default, 'getInnerVCs').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    throw new Error(`gx:parentOrganization VC ID not found or required vc type not found`);
                }));
                const error = {
                    error: `gx:parentOrganization VC ID not found or required vc type not found`,
                    message: constants_1.AppMessages.VP_FAILED
                };
                const { validReqJSON: validJSON } = assets_1.legalParticipantTestJSON;
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
                    .send(validJSON)
                    .expect((response) => {
                    expect(response.status).toEqual(http_status_codes_1.default.BAD_REQUEST);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('network error', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(axios_1.default, 'post').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    throw new axios_1.AxiosError('', axios_1.AxiosError.ECONNABORTED, undefined, {}, {
                        status: 409
                    });
                }));
                jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return { didDocument: assets_1.holderDdoJson };
                }));
                jest.spyOn(common_functions_1.default, 'issueRegistrationNumberVC').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return assets_1.legalRegistrationNumberJson;
                }));
                const { validReqJSON: validJSON } = assets_1.legalParticipantTestJSON;
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
                    .send(validJSON)
                    .expect((response) => {
                    expect(response.status).toEqual(http_status_codes_1.default.CONFLICT);
                });
                jest.resetAllMocks();
            }));
            it('internal server error', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return { didDocument: assets_1.holderDdoJson };
                }));
                const { validReqJSON: validJSON } = assets_1.legalParticipantTestJSON;
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
                    .send(Object.assign({}, validJSON))
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.INTERNAL_SERVER_ERROR);
                });
                jest.resetAllMocks();
            }));
        });
    });
    describe('Positive scenarios', () => {
        it('compliance legal participant', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(axios_1.default, 'post').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                const { validComplianceResponse } = assets_1.legalParticipantTestJSON;
                return validComplianceResponse;
            }));
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return { didDocument: assets_1.holderDdoJson };
            }));
            jest.spyOn(common_functions_1.default, 'issueRegistrationNumberVC').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return assets_1.legalRegistrationNumberJson;
            }));
            const { validReqJSON: validJSON } = assets_1.legalParticipantTestJSON;
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
                .send(validJSON)
                .expect((response) => {
                expect(response.status).toEqual(http_status_codes_1.default.OK);
            });
            jest.resetAllMocks();
        }));
        it('compliance legal participant with vault', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(axios_1.default, 'post').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                const { validComplianceResponse } = assets_1.legalParticipantTestJSON;
                return validComplianceResponse;
            }));
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return { didDocument: assets_1.holderDdoJson };
            }));
            jest.spyOn(common_functions_1.default, 'issueRegistrationNumberVC').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return assets_1.legalRegistrationNumberJson;
            }));
            jest.spyOn(vault_service_1.VaultService.prototype, 'getSecrets').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return '';
            }));
            const { validReqJSON: validJSON } = assets_1.legalParticipantTestJSON;
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
                .send(Object.assign(Object.assign({}, validJSON), { isVault: true }))
                .expect((response) => {
                expect(response.status).toEqual(http_status_codes_1.default.OK);
            });
            jest.resetAllMocks();
        }));
    });
});
describe('/gaia-x/resource', () => {
    describe('Negative scenarios', () => {
        describe('Validation checks', () => {
            it('Empty request body', () => __awaiter(void 0, void 0, void 0, function* () {
                const error = {
                    error: "Invalid value of param 'privateKey'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.RESOURCE}`)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
            it('Invalid issuer value', () => __awaiter(void 0, void 0, void 0, function* () {
                const { invalidIssuerJSON } = assets_1.resourceTestJSON;
                const error = {
                    error: "Invalid value of param 'issuer'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.RESOURCE}`)
                    .send(invalidIssuerJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
            it('Invalid verificationMethod value', () => __awaiter(void 0, void 0, void 0, function* () {
                const { invalidVerificationMethodJSON } = assets_1.resourceTestJSON;
                const error = {
                    error: "Invalid value of param 'verificationMethod'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.RESOURCE}`)
                    .send(invalidVerificationMethodJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
            it('Invalid resource object', () => __awaiter(void 0, void 0, void 0, function* () {
                const { invalidResource } = assets_1.resourceTestJSON;
                const error = {
                    error: "Invalid value of param 'vcs.resource'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.RESOURCE}`)
                    .send(invalidResource)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
            it('Invalid resource credential subject object', () => __awaiter(void 0, void 0, void 0, function* () {
                const { invalidCredentialSubjectResource } = assets_1.resourceTestJSON;
                const error = {
                    error: "Invalid value of param 'vcs.resource.credentialSubject'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.RESOURCE}`)
                    .send(invalidCredentialSubjectResource)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
            it('Invalid resource type', () => __awaiter(void 0, void 0, void 0, function* () {
                const { invalidResourceType } = assets_1.resourceTestJSON;
                const error = {
                    error: `VC with type 'gx:DataResource' or 'gx:PhysicalResource' or 'gx:SoftwareResource' not found!!`,
                    message: constants_1.AppMessages.VP_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.RESOURCE}`)
                    .send(invalidResourceType)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
        });
        describe('Unresolvable links/data', () => {
            it('fail to resolve issuer DDO', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return undefined;
                }));
                const { validVirtualDataResourceReqJSON: validJSON } = assets_1.resourceTestJSON;
                const error = {
                    error: `DDO not found for given did: '${validJSON.issuer}'`,
                    message: constants_1.AppMessages.VP_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.RESOURCE}`)
                    .send(validJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.BAD_REQUEST);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('fail to get copyrightOwnedBy', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return { didDocument: assets_1.holderDdoJson };
                }));
                const { validVirtualDataResourceReqJSON: validJSON } = assets_1.resourceTestJSON;
                jest.spyOn(common_functions_1.default, 'getInnerVCs').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    throw new Error(`gx:copyrightOwnedBy VC ID not found or required vc type not found`);
                }));
                const error = {
                    error: `gx:copyrightOwnedBy VC ID not found or required vc type not found`,
                    message: constants_1.AppMessages.VP_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.RESOURCE}`)
                    .send(validJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.BAD_REQUEST);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('internal server error', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    throw Error('');
                }));
                const { validVirtualDataResourceReqJSON: validJSON } = assets_1.resourceTestJSON;
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.RESOURCE}`)
                    .send(Object.assign({}, validJSON))
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.INTERNAL_SERVER_ERROR);
                });
                jest.resetAllMocks();
            }));
        });
    });
    describe('Positive scenarios', () => {
        it('compliance validPhysicalResource', () => __awaiter(void 0, void 0, void 0, function* () {
            // jest.spyOn(axios, 'post').mockImplementation(async () => {
            // 	const { validComplianceResponse } = resourceTestJSON
            // 	return validComplianceResponse
            // })
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return { didDocument: assets_1.holderDdoJson };
            }));
            const { validPhysicalResourceReqJSON: validJSON } = assets_1.resourceTestJSON;
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.RESOURCE}`)
                .send(validJSON)
                .expect((response) => {
                expect(response.status).toEqual(http_status_codes_1.default.OK);
            });
            jest.resetAllMocks();
        }));
        it('compliance validVirtualDataResource', () => __awaiter(void 0, void 0, void 0, function* () {
            // jest.spyOn(axios, 'post').mockImplementation(async () => {
            // 	const { validComplianceResponse } = resourceTestJSON
            // 	return validComplianceResponse
            // })
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return { didDocument: assets_1.holderDdoJson };
            }));
            const { validVirtualDataResourceReqJSON: validJSON } = assets_1.resourceTestJSON;
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.RESOURCE}`)
                .send(validJSON)
                .expect((response) => {
                expect(response.status).toEqual(http_status_codes_1.default.OK);
            });
            jest.resetAllMocks();
        }));
        it('compliance validVirtualSoftwareResource', () => __awaiter(void 0, void 0, void 0, function* () {
            // jest.spyOn(axios, 'post').mockImplementation(async () => {
            // 	const { validComplianceResponse } = resourceTestJSON
            // 	return validComplianceResponse
            // })
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return { didDocument: assets_1.holderDdoJson };
            }));
            const { validVirtualSoftwareResourceReqJSON: validJSON } = assets_1.resourceTestJSON;
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.RESOURCE}`)
                .send(validJSON)
                .expect((response) => {
                expect(response.status).toEqual(http_status_codes_1.default.OK);
            });
            jest.resetAllMocks();
        }));
        it('compliance validVirtualSoftwareResource with vault', () => __awaiter(void 0, void 0, void 0, function* () {
            // jest.spyOn(axios, 'post').mockImplementation(async () => {
            // 	const { validComplianceResponse } = resourceTestJSON
            // 	return validComplianceResponse
            // })
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return { didDocument: assets_1.holderDdoJson };
            }));
            jest.spyOn(vault_service_1.VaultService.prototype, 'getSecrets').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return '';
            }));
            const { validVirtualSoftwareResourceReqJSON: validJSON } = assets_1.resourceTestJSON;
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.RESOURCE}`)
                .send(Object.assign(Object.assign({}, validJSON), { isVault: true }))
                .expect((response) => {
                expect(response.status).toEqual(http_status_codes_1.default.OK);
            });
            jest.resetAllMocks();
        }));
    });
});
describe('/verify-web-did', () => {
    describe('Negative scenarios', () => {
        describe('Validation checks', () => {
            it('Empty request body', () => __awaiter(void 0, void 0, void 0, function* () {
                const error = {
                    error: "Invalid value of param 'privateKey'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY_WEB_DID}`)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
            it('Invalid did value', () => __awaiter(void 0, void 0, void 0, function* () {
                const { invalidDidJSON } = assets_1.verifyDIDTestJSON;
                const error = {
                    error: "Invalid value of param 'did'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY_WEB_DID}`)
                    .send(invalidDidJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
            it('Invalid verificationMethod value', () => __awaiter(void 0, void 0, void 0, function* () {
                const { invalidVerificationMethodJSON } = assets_1.verifyDIDTestJSON;
                const error = {
                    error: "Invalid value of param 'verificationMethod'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY_WEB_DID}`)
                    .send(invalidVerificationMethodJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
        });
        describe('Unresolvable links/data', () => {
            it('fail to resolve issuer DDO', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return undefined;
                }));
                const { validReq: validJSON } = assets_1.verifyDIDTestJSON;
                const error = {
                    error: `DDO not found for given did: '${validJSON.did}'`,
                    message: constants_1.AppMessages.DID_VERIFY_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY_WEB_DID}`)
                    .send(validJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.BAD_REQUEST);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('fail to find verification method', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return { didDocument: assets_1.holderDdoJson };
                }));
                const { invalidReq: validJSON } = assets_1.verifyDIDTestJSON;
                const error = {
                    error: `Verification Method not found in DDO: '${validJSON.verificationMethod}'`,
                    message: constants_1.AppMessages.DID_VERIFY_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY_WEB_DID}`)
                    .send(validJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.BAD_REQUEST);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('internal server error', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    throw Error('');
                }));
                const { validReq: validJSON } = assets_1.verifyDIDTestJSON;
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY_WEB_DID}`)
                    .send(Object.assign({}, validJSON))
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.INTERNAL_SERVER_ERROR);
                });
                jest.resetAllMocks();
            }));
        });
    });
    describe('Positive scenarios', () => {
        it('validate did web with valid false', () => __awaiter(void 0, void 0, void 0, function* () {
            const isValid = false;
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return { didDocument: assets_1.holderDdoJson };
            }));
            jest.spyOn(common_functions_1.default, 'verify').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return isValid;
            }));
            const expectedResponse = {
                data: { isValid },
                message: isValid ? constants_1.AppMessages.DID_VERIFY : constants_1.AppMessages.DID_VERIFY_FAILED
            };
            const { validReq: validJSON } = assets_1.verifyDIDTestJSON;
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY_WEB_DID}`)
                .send(validJSON)
                .expect((response) => {
                expect(response.status).toEqual(http_status_codes_1.default.OK);
                expect(response.body).toEqual(expectedResponse);
            });
            jest.resetAllMocks();
        }));
        it('validate did web with valid with error', () => __awaiter(void 0, void 0, void 0, function* () {
            const isValid = false;
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return { didDocument: assets_1.holderDdoJson };
            }));
            jest.spyOn(common_functions_1.default, 'verify').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                throw Error();
            }));
            const expectedResponse = {
                data: { isValid },
                message: isValid ? constants_1.AppMessages.DID_VERIFY : constants_1.AppMessages.DID_VERIFY_FAILED
            };
            const { validReq: validJSON } = assets_1.verifyDIDTestJSON;
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY_WEB_DID}`)
                .send(validJSON)
                .expect((response) => {
                expect(response.status).toEqual(http_status_codes_1.default.OK);
                expect(response.body).toEqual(expectedResponse);
            });
            jest.resetAllMocks();
        }));
        it('validate did web with valid true', () => __awaiter(void 0, void 0, void 0, function* () {
            const isValid = true;
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return { didDocument: assets_1.holderDdoJson };
            }));
            jest.spyOn(common_functions_1.default, 'verify').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return isValid;
            }));
            const expectedResponse = {
                data: { isValid },
                message: isValid ? constants_1.AppMessages.DID_VERIFY : constants_1.AppMessages.DID_VERIFY_FAILED
            };
            const { validReq: validJSON } = assets_1.verifyDIDTestJSON;
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY_WEB_DID}`)
                .send(validJSON)
                .expect((response) => {
                expect(response.status).toEqual(http_status_codes_1.default.OK);
                expect(response.body).toEqual(expectedResponse);
            });
            jest.resetAllMocks();
        }));
        it('validate did web with valid true with vault', () => __awaiter(void 0, void 0, void 0, function* () {
            const isValid = true;
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return { didDocument: assets_1.holderDdoJson };
            }));
            jest.spyOn(common_functions_1.default, 'verify').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return isValid;
            }));
            jest.spyOn(vault_service_1.VaultService.prototype, 'getSecrets').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return '';
            }));
            const expectedResponse = {
                data: { isValid },
                message: isValid ? constants_1.AppMessages.DID_VERIFY : constants_1.AppMessages.DID_VERIFY_FAILED
            };
            const { validReq: validJSON } = assets_1.verifyDIDTestJSON;
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.VERIFY_WEB_DID}`)
                .send(Object.assign(Object.assign({}, validJSON), { isVault: true }))
                .expect((response) => {
                expect(response.status).toEqual(http_status_codes_1.default.OK);
                expect(response.body).toEqual(expectedResponse);
            });
            jest.resetAllMocks();
        }));
    });
});
describe('/gaia-x/label-level', () => {
    describe('Negative scenarios', () => {
        describe('Validation checks', () => {
            it('Empty request body', () => __awaiter(void 0, void 0, void 0, function* () {
                const error = {
                    error: "Invalid value of param 'privateKey'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LABEL_LEVEL}`)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
            it('Invalid issuer value', () => __awaiter(void 0, void 0, void 0, function* () {
                const { invalidIssuerJSON } = assets_1.labelLevelTestJSON;
                const error = {
                    error: "Invalid value of param 'issuer'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LABEL_LEVEL}`)
                    .send(invalidIssuerJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
            it('Invalid verification method value', () => __awaiter(void 0, void 0, void 0, function* () {
                const { invalidVerificationMethodJSON } = assets_1.labelLevelTestJSON;
                const error = {
                    error: "Invalid value of param 'verificationMethod'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LABEL_LEVEL}`)
                    .send(invalidVerificationMethodJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
            it('Invalid labelLevel object', () => __awaiter(void 0, void 0, void 0, function* () {
                const { invalidLabelLevel } = assets_1.labelLevelTestJSON;
                const error = {
                    error: "Invalid value of param 'vcs.labelLevel'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LABEL_LEVEL}`)
                    .send(invalidLabelLevel)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
        });
        describe('', () => {
            it('DDO not found for given did', () => __awaiter(void 0, void 0, void 0, function* () {
                const { invalidReqJSON } = assets_1.labelLevelTestJSON;
                const error = {
                    error: "DDO not found for given did: 'did:web:suzuki.smart-x.smartsenselabs.com' in proof",
                    message: constants_1.AppMessages.LL_SIGN_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LABEL_LEVEL}`)
                    .send(invalidReqJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.BAD_REQUEST);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('Credential subject not found', () => __awaiter(void 0, void 0, void 0, function* () {
                const { emptyCSReqJSON } = assets_1.labelLevelTestJSON;
                const error = {
                    error: constants_1.AppMessages.CS_EMPTY,
                    message: constants_1.AppMessages.LL_SIGN_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LABEL_LEVEL}`)
                    .send(emptyCSReqJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.BAD_REQUEST);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('Label level value can not be empty', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'calcLabelLevel').mockImplementation(() => {
                    return '';
                });
                const { validReqJSON } = assets_1.labelLevelTestJSON;
                const error = {
                    error: constants_1.AppMessages.LABEL_LEVEL_CALC_FAILED,
                    message: constants_1.AppMessages.LL_SIGN_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LABEL_LEVEL}`)
                    .send(validReqJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.BAD_REQUEST);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('X5U not found from the holder DID', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'getPublicKeys').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return { x5u: '', publicKeyJwk: '' };
                }));
                const { validReqJSON } = assets_1.labelLevelTestJSON;
                const error = {
                    error: constants_1.AppMessages.X5U_NOT_FOUND,
                    message: constants_1.AppMessages.LL_SIGN_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LABEL_LEVEL}`)
                    .send(validReqJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.BAD_REQUEST);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('fail to calculate labelLevel', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return { didDocument: assets_1.holderDdoJson };
                }));
                jest.spyOn(common_functions_1.default, 'calcLabelLevel').mockImplementation(() => {
                    throw new Error('Error while calculating labelLevel');
                });
                const { validReqJSON: validJSON } = assets_1.labelLevelTestJSON;
                const error = {
                    error: 'Error while calculating labelLevel',
                    message: constants_1.AppMessages.LL_SIGN_FAILED
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LABEL_LEVEL}`)
                    .send(validJSON)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.INTERNAL_SERVER_ERROR);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
        });
    });
    describe('Positive scenarios', () => {
        it('Label Level success', () => __awaiter(void 0, void 0, void 0, function* () {
            const { validReqJSON } = assets_1.labelLevelTestJSON;
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LABEL_LEVEL}`)
                .send(validReqJSON)
                .expect((response) => {
                expect(response.status).toEqual(http_status_codes_1.default.OK);
            });
            jest.resetAllMocks();
        }));
        it('Label Level success with vault', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(vault_service_1.VaultService.prototype, 'getSecrets').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return '';
            }));
            const { validReqJSON } = assets_1.labelLevelTestJSON;
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.LABEL_LEVEL}`)
                .send(Object.assign(Object.assign({}, validReqJSON), { isVault: true }))
                .expect((response) => {
                expect(response.status).toEqual(http_status_codes_1.default.OK);
            });
            jest.resetAllMocks();
        }));
    });
});
describe('/get/trust-index', () => {
    describe('Negative scenarios', () => {
        describe('Validation checks', () => {
            it('Empty request body', () => __awaiter(void 0, void 0, void 0, function* () {
                const error = {
                    error: "Invalid value of param 'participantSD'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.GET_TRUST_INDEX}`)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
            it('serviceOfferingSD not found', () => __awaiter(void 0, void 0, void 0, function* () {
                const request = {
                    participantSD: 'https://wizard-api.smart-x.smartsenselabs.com/cdfd35ca-3302-4948-95fb-afd36b34e09e/participant.json'
                };
                const error = {
                    error: "Invalid value of param 'serviceOfferingSD'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.GET_TRUST_INDEX}`)
                    .send(request)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
            it('Invalid participant self description url format', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'IsValidURL').mockImplementationOnce(() => {
                    return false;
                });
                const error = {
                    error: 'Invalid participant self description url format',
                    message: 'Trust index calculation failed'
                };
                const request = {
                    participantSD: 'hpa://wizard-api.smart-x.smartsenselabs.com/cdfd35ca-3302-4948-95fb-afd36b34e09e/participant.json',
                    serviceOfferingSD: 'https://wizard-api.smart-x.smartsenselabs.com/cdfd35ca-3302-4948-95fb-afd36b34e09e/service_YlA1.json'
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.GET_TRUST_INDEX}`)
                    .send(request)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.BAD_REQUEST);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('Invalid service offering self description url format', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'IsValidURL').mockImplementationOnce(() => {
                    return true;
                });
                const error = {
                    error: 'Invalid service offering self description url format',
                    message: 'Trust index calculation failed'
                };
                const request = {
                    participantSD: 'https://wizard-api.smart-x.smartsenselabs.com/cdfd35ca-3302-4948-95fb-afd36b34e09e/participant.json',
                    serviceOfferingSD: 'hps://wizard-api.smart-x.smartsenselabs.com/cdfd35ca-3302-4948-95fb-afd36b34e09e/service_YlA1.json'
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.GET_TRUST_INDEX}`)
                    .send(request)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.BAD_REQUEST);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('DDO not found for given did: did:web:ferrari.smart-x.smartsenselabs.com in proof', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'IsValidURL').mockImplementation(() => {
                    return true;
                });
                jest.spyOn(common_functions_1.default, 'calcVeracity').mockImplementation(() => {
                    throw new Error(`DDO not found for given did: did:web:ferrari.smart-x.smartsenselabs.com in proof`);
                });
                const error = {
                    error: 'DDO not found for given did: did:web:ferrari.smart-x.smartsenselabs.com in proof',
                    message: 'Trust index calculation failed'
                };
                const request = {
                    participantSD: 'https://wizard-api.smart-x.smartsenselabs.com/cdfd35ca-3302-4948-95fb-afd36b34e09e/participant.json',
                    serviceOfferingSD: 'https://wizard-api.smart-x.smartsenselabs.com/cdfd35ca-3302-4948-95fb-afd36b34e09e/service_YlA1.json'
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.GET_TRUST_INDEX}`)
                    .send(request)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.INTERNAL_SERVER_ERROR);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('Participant proof verification method and did verification method id not matched', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'IsValidURL').mockImplementation(() => {
                    return true;
                });
                jest.spyOn(common_functions_1.default, 'calcVeracity').mockImplementation(() => {
                    throw new Error('Participant proof verification method and did verification method id not matched');
                });
                const error = {
                    error: 'Participant proof verification method and did verification method id not matched',
                    message: 'Trust index calculation failed'
                };
                const request = {
                    participantSD: 'https://wizard-api.smart-x.smartsenselabs.com/cdfd35ca-3302-4948-95fb-afd36b34e09e/participant.json',
                    serviceOfferingSD: 'https://wizard-api.smart-x.smartsenselabs.com/cdfd35ca-3302-4948-95fb-afd36b34e09e/service_YlA1.json'
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.GET_TRUST_INDEX}`)
                    .send(request)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.INTERNAL_SERVER_ERROR);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
            it('Verifiable credential array not found in participant self description', () => __awaiter(void 0, void 0, void 0, function* () {
                jest.spyOn(common_functions_1.default, 'IsValidURL').mockImplementation(() => {
                    return true;
                });
                jest.spyOn(common_functions_1.default, 'calcVeracity').mockImplementation(() => {
                    throw new Error('Verifiable credential array not found in participant self description');
                });
                const error = {
                    error: 'Verifiable credential array not found in participant self description',
                    message: 'Trust index calculation failed'
                };
                const request = {
                    participantSD: 'https://wizard-api.smart-x.smartsenselabs.com/cdfd35ca-3302-4948-95fb-afd36b34e09e/participant.json',
                    serviceOfferingSD: 'https://wizard-api.smart-x.smartsenselabs.com/cdfd35ca-3302-4948-95fb-afd36b34e09e/service_YlA1.json'
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.GET_TRUST_INDEX}`)
                    .send(request)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.INTERNAL_SERVER_ERROR);
                    expect(response.body).toEqual(error);
                });
                jest.resetAllMocks();
            }));
        });
    });
    describe('Positive scenarios', () => {
        it('Trust index calculated', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(common_functions_1.default, 'IsValidURL').mockImplementation(() => {
                return true;
            });
            const request = {
                participantSD: 'https://lakhani.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/participant.json#0',
                serviceOfferingSD: 'https://wizard-api.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/service_aTRg.json'
            };
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.GET_TRUST_INDEX}`)
                .send(request)
                .expect((response) => {
                expect(response.status).toBe(http_status_codes_1.default.OK);
            });
            jest.resetAllMocks();
        }));
    });
});
describe('/gaia-x/validate-registration-number', () => {
    describe('Negative scenarios', () => {
        describe('Validation checks', () => {
            it('Empty request body', () => __awaiter(void 0, void 0, void 0, function* () {
                const error = {
                    error: "Invalid value of param 'legalRegistrationNumber'",
                    message: constants_1.AppMessages.VALIDATION_ERROR
                };
                yield (0, supertest_1.default)(app_1.default)
                    .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.REGISTRATION_NUMBER}`)
                    .expect((response) => {
                    expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                    expect(response.body).toEqual(error);
                });
            }));
        });
    });
    describe('Positive scenarios', () => {
        it('RegistrationNumberVC checked true', () => __awaiter(void 0, void 0, void 0, function* () {
            const { validReqJSON: validJSON } = assets_1.legalParticipantTestJSON;
            jest.spyOn(common_functions_1.default, 'issueRegistrationNumberVC').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return assets_1.legalRegistrationNumberJson;
            }));
            const res = {
                data: { isValid: true },
                message: constants_1.AppMessages.RN_VERIFY
            };
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.REGISTRATION_NUMBER}`)
                .send({ legalRegistrationNumber: validJSON.vcs.legalRegistrationNumber })
                .expect((response) => {
                expect(response.status).toBe(http_status_codes_1.default.OK);
                expect(response.body).toEqual(res);
            });
            jest.resetAllMocks();
        }));
        it('RegistrationNumberVC checked false', () => __awaiter(void 0, void 0, void 0, function* () {
            const { validReqJSON: validJSON } = assets_1.legalParticipantTestJSON;
            jest.spyOn(common_functions_1.default, 'issueRegistrationNumberVC').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                throw new Error();
            }));
            const res = {
                data: { isValid: false },
                message: constants_1.AppMessages.RN_VERIFY_FAILED
            };
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.REGISTRATION_NUMBER}`)
                .send({ legalRegistrationNumber: validJSON.vcs.legalRegistrationNumber })
                .expect((response) => {
                expect(response.status).toBe(http_status_codes_1.default.OK);
                expect(response.body).toEqual(res);
            });
            jest.resetAllMocks();
        }));
        it('RegistrationNumberVC checked false', () => __awaiter(void 0, void 0, void 0, function* () {
            const { validReqJSON: validJSON } = assets_1.legalParticipantTestJSON;
            jest.spyOn(common_functions_1.default, 'issueRegistrationNumberVC').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return false;
            }));
            const res = {
                data: { isValid: false },
                message: constants_1.AppMessages.RN_VERIFY_FAILED
            };
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.REGISTRATION_NUMBER}`)
                .send({ legalRegistrationNumber: validJSON.vcs.legalRegistrationNumber })
                .expect((response) => {
                expect(response.status).toBe(http_status_codes_1.default.OK);
                expect(response.body).toEqual(res);
            });
            jest.resetAllMocks();
        }));
    });
});
