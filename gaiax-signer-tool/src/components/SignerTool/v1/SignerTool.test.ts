;`/ pragma: allowlist-secret /`

import STATUS_CODES from 'http-status-codes'
import supertest from 'supertest'

import app from '../../../app'
import Utils from '../../../utils/common-functions'
import { VaultService } from '../../../utils/service/vault.service'
import { AppMessages, ROUTES } from '../../../utils/constants'

import {
	participantJson,
	holderDdoJson,
	ServiceOfferingParticipantJson,
	serviceOfferingTestJSON,
	legalParticipantTestJSON,
	legalRegistrationNumberJson,
	resourceTestJSON,
	verifyDIDTestJSON,
	labelLevelTestJSON
} from '../../../assets'
import axios, { AxiosError } from 'axios'
const exampleCertificate = process.env.SSL_CERTIFICATE as string

//mocking - Utils

jest.mock('../../../utils/common-functions', () => {
	return {
		...jest.requireActual('../../../utils/common-functions'),
		verification: () => {
			return true
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		fetchParticipantJson: async () => {
			const mockPJ = JSON.parse(JSON.stringify(participantJson))
			return { ...mockPJ }
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		fetchServiceOfferingJson: async () => {
			const { validSOJSON } = serviceOfferingTestJSON
			const mockSOJ = JSON.parse(JSON.stringify(validSOJSON))
			return { ...mockSOJ }
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		callServiceOfferingCompliance: async () => {
			const { validSOComplianceResponse } = serviceOfferingTestJSON
			const mockPJ = JSON.parse(JSON.stringify(validSOComplianceResponse))
			return { ...mockPJ }
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		getDDOfromDID: (did: string, resolver: any) => {
			if (did == 'did:web:ferrari.smart-x.smartsenselabs.com') {
				const { holderDid } = labelLevelTestJSON
				return { didDocument: holderDid }
			} else if (did == 'did:web:greenworld.proofsense.in') {
				return { didDocument: holderDdoJson }
			}
		},
		generatePublicJWK: () => {
			return {}
		},
		getInnerVCs: () => {},
		getPublicKeys: () => {
			const { verificationMethod } = holderDdoJson
			const { publicKeyJwk } = verificationMethod[0]
			return publicKeyJwk
		},
		addProof: () => {
			const { serviceOfferingProof } = serviceOfferingTestJSON
			return serviceOfferingProof
		},
		removeDuplicates: () => {
			const { uniqueVC } = serviceOfferingTestJSON
			return uniqueVC
		},
		createVP: () => {
			const { serviceOfferingVP } = serviceOfferingTestJSON
			return serviceOfferingVP
		},
		calcVeracity: () => {
			const { veracityResponse } = serviceOfferingTestJSON
			return veracityResponse
		},
		calcTransparency: () => {
			return 1.6
		},
		calcTrustIndex: () => {
			return 0.925
		},
		generateDID: () => {
			return {}
		},
		sign: () => {
			return { replace: function () {} }
		},
		verify: () => {
			return true
		},
		issueRegistrationNumberVC: () => {
			return legalRegistrationNumberJson
		},
		calcLabelLevel: () => {
			return 'L1'
		},
		IsValidURL: () => {
			return false
		},
		getVcType: () => {
			return ''
		}
	}
})

jest.mock('../../../utils/service/vault.service', () => {
	return {
		...jest.requireActual('../../../utils/service/vault.service'),
		getSecrets: () => {
			return ''
		}
	}
})

describe('/v1/gaia-x/verify', () => {
	const validBody = {
		policies: ['integrityCheck', 'holderSignature', 'complianceSignature', 'complianceCheck'],
		url: 'https://greenworld.proofsense.in/.well-known/participant.json#0'
	}
	describe('Failing Cases', () => {
		describe('validation error', () => {
			it('empty body', async () => {
				const error = {
					error: "Invalid value of param 'policies'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
			it('url is invalid', async () => {
				const body = {
					policies: ['integrityCheck', 'holderSignature', 'complianceSignature', 'complianceCheck'],
					url: ''
				}
				const error = {
					error: "Invalid value of param 'url'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
					.send(body)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
				body.url = 'abc'

				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
					.send(body)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
			it('policies is invalid', async () => {
				const body: {
					policies: string[]
					url: string
				} = {
					policies: [],
					url: 'https://greenworld.proofsense.in/.well-known/participant.json'
				}
				const error = {
					error: "Invalid value of param 'policies'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
					.send(body)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
				body.policies = ['invalid policies']
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
					.send(body)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
		})
		describe('general failing case', () => {
			it('fail to fetch participant json from url', async () => {
				jest.spyOn(Utils, 'fetchParticipantJson').mockImplementation(async () => {
					throw new Error('Fail to fetch')
				})
				const body = validBody
				const error = {
					error: 'Fail to fetch',
					message: AppMessages.SIG_VERIFY_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
					.send(body)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.INTERNAL_SERVER_ERROR)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('fetched participantJson in invalid form', async () => {
				jest.spyOn(Utils, 'fetchParticipantJson').mockImplementation(async () => {
					return {}
				})
				const body = validBody
				const error = {
					error: `VC not found`,
					message: AppMessages.SIG_VERIFY_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
					.send(body)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.BAD_REQUEST)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('vc invalid', async () => {
				jest.spyOn(Utils, 'fetchParticipantJson').mockImplementation(async () => {
					return { ...participantJson, selfDescriptionCredential: { ...participantJson.selfDescriptionCredential, verifiableCredential: 'verifiable credential' } }
				})
				const body = validBody
				const error = {
					error: `VC not valid`,
					message: AppMessages.SIG_VERIFY_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
					.send(body)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.BAD_REQUEST)
						expect(response.body).toEqual(error)
					})

				jest.spyOn(Utils, 'fetchParticipantJson').mockImplementation(async () => {
					//creating deep copy
					const mockParticipantJson = JSON.parse(JSON.stringify(participantJson))
					delete mockParticipantJson.selfDescriptionCredential.verifiableCredential
					return { ...mockParticipantJson }
				})
				error.error = 'VC not found'
				error.message = AppMessages.SIG_VERIFY_FAILED
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
					.send(body)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.BAD_REQUEST)
						expect(response.body).toEqual(error)
					})

				jest.resetAllMocks()
			})
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
			it('type invalid in selfDescription', async () => {
				jest.spyOn(Utils, 'fetchParticipantJson').mockImplementation(async () => {
					const mockParticipantJson = JSON.parse(JSON.stringify(participantJson))
					delete mockParticipantJson.selfDescriptionCredential.type
					return { ...mockParticipantJson }
				})
				const body = validBody
				const error = {
					error: `Credential Type not supported`,
					message: AppMessages.SIG_VERIFY_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
					.send(body)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.BAD_REQUEST)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
				jest.spyOn(Utils, 'fetchParticipantJson').mockImplementation(async () => {
					const mockParticipantJson = JSON.parse(JSON.stringify(participantJson))
					mockParticipantJson.selfDescriptionCredential.type = ['randomProof']
					return { ...mockParticipantJson }
				})
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
					.send(body)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.BAD_REQUEST)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('vc found without gx:LegalParticipant', async () => {
				jest.spyOn(Utils, 'fetchParticipantJson').mockImplementation(async () => {
					const mockParticipantJson = JSON.parse(JSON.stringify(participantJson))
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
								'gx:termsAndConditions':
									'The PARTICIPANT signing the Self-Description agrees as follows:\n- to update its descriptions about any changes, be it technical, organizational, or legal - especially but not limited to contractual in regards to the indicated attributes present in the descriptions.\n\nThe keypair used to sign Verifiable Credentials will be revoked where Gaia-X Association becomes aware of any inaccurate statements in regards to the claims which result in a non-compliance with the Trust Framework and policy rules defined in the Policy Rules and Labelling Document (PRLD).',
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
					]
					return { ...mockParticipantJson }
				})
				const body = validBody
				const error = {
					error: `${validBody.url} VC ID not found or VC doesn't have supported type`,
					message: AppMessages.SIG_VERIFY_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
					.send(body)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.BAD_REQUEST)
						expect(response.body).toEqual(error)
					})
			})
		})
		describe('integrityCheck', () => {
			it('integrity fails', async () => {
				jest.spyOn(Utils, 'fetchParticipantJson').mockImplementation(async () => {
					const mockParticipantJson = JSON.parse(JSON.stringify(participantJson))
					mockParticipantJson.selfDescriptionCredential.verifiableCredential[1].id = 'did:web:whiteworld.proofsense.in'
					return { ...mockParticipantJson }
				})

				jest.spyOn(Utils, 'getVcType').mockImplementation(async () => {
					return 'gx:LegalParticipant'
				})

				const body = validBody
				body.policies = ['integrityCheck']

				const message = {
					message: AppMessages.SIG_VERIFY_SUCCESS,
					data: {
						gxType: 'gx:LegalParticipant',
						integrityCheck: false,
						valid: false
					}
				}

				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
					.send(body)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.OK)
						expect(response.body).toEqual(message)
					})
				jest.resetAllMocks()
			})
		})
		describe('holderSignature', () => {
			it('error from verification', async () => {
				jest.spyOn(Utils, 'verification').mockImplementation(async () => {
					throw new Error('Verification failed due to xyz reason')
				})
				jest.spyOn(Utils, 'getVcType').mockImplementation(async () => {
					return 'gx:LegalParticipant'
				})
				const body = validBody
				body.policies = ['holderSignature']

				const error = {
					message: AppMessages.SIG_VERIFY_FAILED,
					error: 'Verification failed due to xyz reason'
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
					.send(body)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.INTERNAL_SERVER_ERROR)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('verification returns false', async () => {
				jest.spyOn(Utils, 'verification').mockImplementation(async () => {
					return false
				})
				jest.spyOn(Utils, 'getVcType').mockImplementation(async () => {
					return 'gx:LegalParticipant'
				})
				const body = validBody
				body.policies = ['holderSignature']

				const message = {
					message: AppMessages.SIG_VERIFY_SUCCESS,
					data: {
						gxType: 'gx:LegalParticipant',
						holderSignature: false,
						valid: false
					}
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
					.send(body)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.OK)
						expect(response.body).toEqual(message)
					})
				jest.resetAllMocks()
			})
		})
		describe('complianceSignature', () => {
			it('error from verification', async () => {
				jest.spyOn(Utils, 'verification').mockImplementation(async () => {
					throw new Error('Verification failed due to xyz reason')
				})
				jest.spyOn(Utils, 'getVcType').mockImplementation(async () => {
					return 'gx:LegalParticipant'
				})
				const body = validBody
				body.policies = ['complianceSignature']

				const error = {
					message: AppMessages.SIG_VERIFY_FAILED,
					error: 'Verification failed due to xyz reason'
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
					.send(body)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.INTERNAL_SERVER_ERROR)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('verification returns false', async () => {
				jest.spyOn(Utils, 'verification').mockImplementation(async () => {
					return false
				})
				jest.spyOn(Utils, 'getVcType').mockImplementation(async () => {
					return 'gx:LegalParticipant'
				})
				const body = validBody
				body.policies = ['complianceSignature']

				const message = {
					message: AppMessages.SIG_VERIFY_SUCCESS,
					data: {
						gxType: 'gx:LegalParticipant',
						complianceSignature: false,
						valid: false
					}
				}

				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
					.send(body)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.OK)
						expect(response.body).toEqual(message)
					})
				jest.resetAllMocks()
			})
		})
	})
	describe('success case', () => {
		describe('integrityCheck', () => {
			it('integrity successful', async () => {
				jest.spyOn(Utils, 'getVcType').mockImplementation(async () => {
					return 'gx:LegalParticipant'
				})
				const body = validBody
				body.policies = ['integrityCheck']

				const message = {
					message: AppMessages.SIG_VERIFY_SUCCESS,
					data: {
						gxType: 'gx:LegalParticipant',
						integrityCheck: true,
						valid: true
					}
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
					.send(body)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.OK)
						expect(response.body).toEqual(message)
					})
				jest.resetAllMocks()
			})
		})
		describe('holderSignature', () => {
			it('holder sig validated', async () => {
				jest.spyOn(Utils, 'getVcType').mockImplementation(async () => {
					return 'gx:LegalParticipant'
				})
				const body = validBody
				body.policies = ['holderSignature']

				const message = {
					message: AppMessages.SIG_VERIFY_SUCCESS,
					data: {
						gxType: 'gx:LegalParticipant',
						holderSignature: true,
						valid: true
					}
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
					.send(body)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.OK)
						expect(response.body).toEqual(message)
					})
				jest.resetAllMocks()
			})
		})
		describe('complianceSignature', () => {
			it('compliance signature verified', async () => {
				jest.spyOn(Utils, 'getVcType').mockImplementation(async () => {
					return 'gx:LegalParticipant'
				})
				const body = validBody
				body.policies = ['complianceSignature']

				const message = {
					message: AppMessages.SIG_VERIFY_SUCCESS,
					data: {
						gxType: 'gx:LegalParticipant',
						complianceSignature: true,
						valid: true
					}
				}

				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
					.send(body)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.OK)
						expect(response.body).toEqual(message)
					})
				jest.resetAllMocks()
			})
		})
		describe('check all', () => {
			it('compliance signature verified', async () => {
				jest.spyOn(Utils, 'getVcType').mockImplementation(async () => {
					return 'gx:LegalParticipant'
				})
				const body = validBody
				body.policies = ['holderSignature', 'integrityCheck', 'complianceSignature']

				const message = {
					message: AppMessages.SIG_VERIFY_SUCCESS,
					data: {
						gxType: 'gx:LegalParticipant',
						holderSignature: true,
						integrityCheck: true,
						complianceSignature: true,
						valid: true
					}
				}

				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
					.send(body)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.OK)
						expect(response.body).toEqual(message)
					})
				jest.resetAllMocks()
			})
		})
		describe('serviceOffering testcase', () => {
			it('testing verification api for serviceoffering', async () => {
				jest.spyOn(Utils, 'fetchParticipantJson').mockImplementation(async () => {
					const mockParticipantJson = JSON.parse(JSON.stringify(ServiceOfferingParticipantJson))
					return { ...mockParticipantJson }
				})
				jest.spyOn(Utils, 'getVcType').mockImplementation(async () => {
					return 'gx:LegalParticipant'
				})
				const body = validBody
				body.policies = ['holderSignature', 'integrityCheck', 'complianceSignature', 'complianceCheck']
				const message = {
					message: AppMessages.SIG_VERIFY_SUCCESS,
					data: {
						gxType: 'gx:LegalParticipant',
						holderSignature: true,
						integrityCheck: true,
						complianceSignature: true,
						complianceCheck: true,
						valid: true
					}
				}

				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY}`)
					.send(body)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.OK)
						expect(response.body).toEqual(message)
					})
				jest.resetAllMocks()
			})
		})
	})
})

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
	}
	describe('failing case', () => {
		it('validation error', async () => {
			const error = {
				error: "Invalid value of param 'domain'",
				message: 'Validation Error, please provide valid req.body'
			}
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.CREATE_WEB_DID}`)
				.expect((response) => {
					expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
					expect(response.body).toEqual(error)
				})
			const body = {
				domain: 'dev.smartproof.in',
				x5u: 'abc'
			}
			error.error = "Invalid value of param 'x5u'"
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.CREATE_WEB_DID}`)
				.send(body)
				.expect((response) => {
					expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
					expect(response.body).toEqual(error)
				})
			const body2 = {
				domain: 'dev.smartproof.in',
				tenant: 'smart',
				services: [
					{
						type: '',
						serviceEndpoint: 'https://ssi.eecc.de/api/registry/vcs'
					}
				]
			}
			error.error = "Invalid value of param 'services[0].type'"

			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.CREATE_WEB_DID}`)
				.send(body2)
				.expect((response) => {
					expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
					expect(response.body).toEqual(error)
				})
			const body3 = {
				domain: 'dev.smartproof.in',
				tenant: 'smart',
				services: [
					{
						type: 'CredentialRegistry',
						serviceEndpoint: 'abc2'
					}
				]
			}
			error.error = "Invalid value of param 'services[0].serviceEndpoint'"

			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.CREATE_WEB_DID}`)
				.send(body3)
				.expect((response) => {
					expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
					expect(response.body).toEqual(error)
				})
			const body4 = {
				domain: 'dev.smartproof.in',
				services: 'abc'
			}
			error.error = "Invalid value of param 'services'"
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.CREATE_WEB_DID}`)
				.send(body4)
				.expect((response) => {
					expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
					expect(response.body).toEqual(error)
				})
		})
		it('Axios get certificate fails', async () => {
			jest.spyOn(axios, 'get').mockResolvedValue(undefined)
			const body = validBody
			const error = {
				error: 'x5u URL not resolved: https://dev.smartproof.in/.well-known/x509CertificateChain.pem',
				message: 'DID creation failed.'
			}

			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.CREATE_WEB_DID}`)
				.send(body)
				.expect((response) => {
					expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
					expect(response.body).toEqual(error)
				})

			jest.resetAllMocks()
		})
		it('generatePublicJWK returns undefined', async () => {
			jest.spyOn(axios, 'get').mockResolvedValue({ data: exampleCertificate })
			jest.spyOn(Utils, 'generatePublicJWK').mockResolvedValue(undefined)
			const body = validBody
			const error = {
				error: 'fail to create publicKeyJWK',
				message: 'DID creation failed.'
			}

			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.CREATE_WEB_DID}`)
				.send(body)
				.expect((response) => {
					expect(response.status).toBe(STATUS_CODES.INTERNAL_SERVER_ERROR)
					expect(response.body).toEqual(error)
				})
		})
		it('generateDID returns undefined', async () => {
			jest.spyOn(axios, 'get').mockResolvedValue({ data: exampleCertificate })
			jest.spyOn(Utils, 'generatePublicJWK').mockResolvedValue({})
			jest.spyOn(Utils, 'generateDID').mockResolvedValue(undefined)
			const body = validBody
			const error = {
				error: 'fail to create did',
				message: 'DID creation failed.'
			}

			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.CREATE_WEB_DID}`)
				.send(body)
				.expect((response) => {
					expect(response.status).toBe(STATUS_CODES.INTERNAL_SERVER_ERROR)
					expect(response.body).toEqual(error)
				})
		})
	})
	describe('success case', () => {
		it('successful case with tenant', async () => {
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
			}
			jest.spyOn(axios, 'get').mockResolvedValue({ data: exampleCertificate })
			jest.spyOn(Utils, 'generateDID').mockResolvedValue({ ...did })

			const body = { ...validBody, x5u: undefined }
			const responseData = {
				data: {
					did: {
						...did
					}
				},
				message: 'DID created successfully.'
			}

			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.CREATE_WEB_DID}`)
				.send(body)
				.expect((response) => {
					expect(response.status).toBe(STATUS_CODES.OK)
					expect(response.body).toEqual(responseData)
				})
		})
		it('successful case with domain', async () => {
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
			}
			jest.spyOn(axios, 'get').mockResolvedValue({ data: exampleCertificate })
			jest.spyOn(Utils, 'generateDID').mockResolvedValue({ ...did })

			const body = { ...validBody, x5u: undefined, tenant: undefined }
			const responseData = {
				data: {
					did: {
						...did
					}
				},
				message: 'DID created successfully.'
			}

			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.CREATE_WEB_DID}`)
				.send(body)
				.expect((response) => {
					expect(response.status).toBe(STATUS_CODES.OK)
					expect(response.body).toEqual(responseData)
				})
		})
	})
})

describe('/gaia-x/service-offering', () => {
	describe('Negative scenarios', () => {
		describe('Validation checks', () => {
			it('Empty request body', async () => {
				const error = {
					error: "Invalid value of param 'privateKey'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.SERVICE_OFFERING}`)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
			it('Invalid issuer value', async () => {
				const { invalidIssuerJSON } = serviceOfferingTestJSON
				const error = {
					error: "Invalid value of param 'issuer'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.SERVICE_OFFERING}`)
					.send(invalidIssuerJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
			it('Invalid verificationMethod value', async () => {
				const { invalidMerificationMethodJSON } = serviceOfferingTestJSON
				const error = {
					error: "Invalid value of param 'verificationMethod'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.SERVICE_OFFERING}`)
					.send(invalidMerificationMethodJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
			it('Invalid serviceOffering object', async () => {
				const { invalidSO } = serviceOfferingTestJSON
				const error = {
					error: "Invalid value of param 'vcs.serviceOffering'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.SERVICE_OFFERING}`)
					.send(invalidSO)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
		})
		describe('Unresolvable links/data', () => {
			it('fail to resolve legal participant url', async () => {
				jest.spyOn(Utils, 'fetchParticipantJson').mockImplementation(async () => {
					throw new Error('Fail to fetch')
				})
				const { validReqJSON: validJSON } = serviceOfferingTestJSON
				const error = {
					error: 'Fail to fetch',
					message: AppMessages.SD_SIGN_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.SERVICE_OFFERING}`)
					.send(validJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.INTERNAL_SERVER_ERROR)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('DDO not found for given did', async () => {
				const { invalidReqJSON } = serviceOfferingTestJSON
				const error = {
					error: "DDO not found for given did: 'did:web:suzuki.smart-x.smartsenselabs.com' in proof",
					message: AppMessages.SD_SIGN_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.SERVICE_OFFERING}`)
					.send(invalidReqJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.BAD_REQUEST)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('X5U not found from the holder DID', async () => {
				jest.spyOn(Utils, 'getPublicKeys').mockImplementation(async () => {
					return { x5u: '', publicKeyJwk: '' }
				})
				const { validReqJSON } = serviceOfferingTestJSON
				const error = {
					error: AppMessages.X5U_NOT_FOUND,
					message: AppMessages.SD_SIGN_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.SERVICE_OFFERING}`)
					.send(validReqJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.BAD_REQUEST)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('fail to call service offering compliance service', async () => {
				jest.spyOn(Utils, 'callServiceOfferingCompliance').mockImplementation(async () => {
					throw new Error('error while calling compliance service')
				})
				jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
					return { didDocument: holderDdoJson }
				})
				const { validReqJSON: validJSON } = serviceOfferingTestJSON
				const error = {
					error: 'error while calling compliance service',
					message: AppMessages.SD_SIGN_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.SERVICE_OFFERING}`)
					.send(validJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.INTERNAL_SERVER_ERROR)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('fail to calculate veracity: LP proof verification method and did verification method id not matched', async () => {
				jest.spyOn(Utils, 'callServiceOfferingCompliance').mockImplementation(async () => {
					const { validSOComplianceResponse } = serviceOfferingTestJSON
					return validSOComplianceResponse
				})
				jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
					return { didDocument: holderDdoJson }
				})
				jest.spyOn(Utils, 'calcVeracity').mockImplementation(async () => {
					throw new Error('Participant proof verification method and did verification method id not matched')
				})
				const { validReqJSON: validJSON } = serviceOfferingTestJSON
				const error = {
					error: 'Participant proof verification method and did verification method id not matched',
					message: AppMessages.SD_SIGN_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.SERVICE_OFFERING}`)
					.send(validJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.INTERNAL_SERVER_ERROR)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('fail to calculate veracity: Verifiable credential array not found in participant self description', async () => {
				jest.spyOn(Utils, 'callServiceOfferingCompliance').mockImplementation(async () => {
					const { validSOComplianceResponse } = serviceOfferingTestJSON
					return validSOComplianceResponse
				})
				jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
					return { didDocument: holderDdoJson }
				})
				jest.spyOn(Utils, 'calcVeracity').mockImplementation(async () => {
					throw new Error('Verifiable credential array not found in participant self description')
				})
				const { validReqJSON: validJSON } = serviceOfferingTestJSON
				const error = {
					error: 'Verifiable credential array not found in participant self description',
					message: AppMessages.SD_SIGN_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.SERVICE_OFFERING}`)
					.send(validJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.INTERNAL_SERVER_ERROR)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('fail to calculate transparency', async () => {
				jest.spyOn(Utils, 'callServiceOfferingCompliance').mockImplementation(async () => {
					const { validSOComplianceResponse } = serviceOfferingTestJSON
					return validSOComplianceResponse
				})
				jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
					return { didDocument: holderDdoJson }
				})
				jest.spyOn(Utils, 'calcTransparency').mockImplementation(async () => {
					throw new Error('Error while calculating transparency')
				})
				const { validReqJSON: validJSON } = serviceOfferingTestJSON
				const error = {
					error: 'Error while calculating transparency',
					message: AppMessages.SD_SIGN_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.SERVICE_OFFERING}`)
					.send(validJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.INTERNAL_SERVER_ERROR)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
		})
		it('fail to get dependsOn', async () => {
			jest.spyOn(Utils, 'callServiceOfferingCompliance').mockImplementation(async () => {
				const { validSOComplianceResponse } = serviceOfferingTestJSON
				return validSOComplianceResponse
			})
			jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
				return { didDocument: holderDdoJson }
			})
			jest.spyOn(Utils, 'getInnerVCs').mockImplementation(async () => {
				throw new Error(`gx:dependsOn VC ID not found or required vc type not found`)
			})
			const error = {
				error: `gx:dependsOn VC ID not found or required vc type not found`,
				message: AppMessages.SD_SIGN_FAILED
			}
			const { validReqJSON: validJSON } = serviceOfferingTestJSON
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.SERVICE_OFFERING}`)
				.send(validJSON)
				.expect((response) => {
					expect(response.status).toEqual(STATUS_CODES.BAD_REQUEST)
					expect(response.body).toEqual(error)
				})
			jest.resetAllMocks()
		})
	})
	describe('Positive scenarios', () => {
		it('Service offering compliance success', async () => {
			jest.spyOn(Utils, 'callServiceOfferingCompliance').mockImplementation(async () => {
				const { validSOComplianceResponse } = serviceOfferingTestJSON
				return validSOComplianceResponse
			})
			jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
				return { didDocument: holderDdoJson }
			})
			const { validReqJSON: validJSON } = serviceOfferingTestJSON
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.SERVICE_OFFERING}`)
				.send(validJSON)
				.expect((response) => {
					expect(response.status).toEqual(STATUS_CODES.OK)
				})
			jest.resetAllMocks()
		})

		it('Service offering compliance success with vault', async () => {
			jest.spyOn(Utils, 'callServiceOfferingCompliance').mockImplementation(async () => {
				const { validSOComplianceResponse } = serviceOfferingTestJSON
				return validSOComplianceResponse
			})
			jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
				return { didDocument: holderDdoJson }
			})
			jest.spyOn(VaultService.prototype, 'getSecrets').mockImplementation(async () => {
				return ''
			})
			const { validReqJSON: validJSON } = serviceOfferingTestJSON
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.SERVICE_OFFERING}`)
				.send({ ...validJSON, isVault: true })
				.expect((response) => {
					expect(response.status).toEqual(STATUS_CODES.OK)
				})
			jest.resetAllMocks()
		})
	})
})

describe('/gaia-x/legal-participant', () => {
	describe('Negative scenarios', () => {
		describe('Validation checks', () => {
			it('Empty request body', async () => {
				const error = {
					error: "Invalid value of param 'privateKey'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
			it('Invalid issuer value', async () => {
				const { invalidIssuerJSON } = legalParticipantTestJSON
				const error = {
					error: "Invalid value of param 'issuer'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
					.send(invalidIssuerJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
			it('Invalid verificationMethod value', async () => {
				const { invalidVerificationMethodJSON } = legalParticipantTestJSON
				const error = {
					error: "Invalid value of param 'verificationMethod'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
					.send(invalidVerificationMethodJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
			it('Invalid legalParticipant object', async () => {
				const { invalidLegalParticipant } = legalParticipantTestJSON
				const error = {
					error: "Invalid value of param 'vcs.legalParticipant'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
					.send(invalidLegalParticipant)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
			it('Invalid legalRegistrationNumber object', async () => {
				const { invalidLegalRegistrationNumber } = legalParticipantTestJSON
				const error = {
					error: "Invalid value of param 'vcs.legalRegistrationNumber'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
					.send(invalidLegalRegistrationNumber)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
			it('Invalid gaiaXTermsAndConditions object', async () => {
				const { invalidGaiaXTermsAndConditions } = legalParticipantTestJSON
				const error = {
					error: "Invalid value of param 'vcs.gaiaXTermsAndConditions'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
					.send(invalidGaiaXTermsAndConditions)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
		})
		describe('Unresolvable links/data', () => {
			it('fail to resolve issuer DDO', async () => {
				jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
					return undefined
				})
				const { validReqJSON: validJSON } = legalParticipantTestJSON
				const error = {
					error: `DDO not found for given did: '${validJSON.issuer}'`,
					message: AppMessages.VP_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
					.send(validJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.BAD_REQUEST)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('fail to get getPublicKeys', async () => {
				jest.spyOn(Utils, 'getPublicKeys').mockImplementation(async () => {
					return { x5u: '', publicKeyJwk: '' }
				})
				jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
					return { didDocument: holderDdoJson }
				})
				const { validReqJSON: validJSON } = legalParticipantTestJSON
				const error = {
					error: AppMessages.X5U_NOT_FOUND,
					message: AppMessages.VP_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
					.send(validJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.BAD_REQUEST)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('fail to get parentOrganization', async () => {
				jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
					return { didDocument: holderDdoJson }
				})
				jest.spyOn(Utils, 'issueRegistrationNumberVC').mockImplementation(async () => {
					return legalRegistrationNumberJson
				})
				jest.spyOn(Utils, 'getInnerVCs').mockImplementation(async () => {
					throw new Error(`gx:parentOrganization VC ID not found or required vc type not found`)
				})
				const error = {
					error: `gx:parentOrganization VC ID not found or required vc type not found`,
					message: AppMessages.VP_FAILED
				}
				const { validReqJSON: validJSON } = legalParticipantTestJSON
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
					.send(validJSON)
					.expect((response) => {
						expect(response.status).toEqual(STATUS_CODES.BAD_REQUEST)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('network error', async () => {
				jest.spyOn(axios, 'post').mockImplementation(async () => {
					throw new AxiosError('', AxiosError.ECONNABORTED, undefined, {}, {
						status: 409
					} as any)
				})
				jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
					return { didDocument: holderDdoJson }
				})
				jest.spyOn(Utils, 'issueRegistrationNumberVC').mockImplementation(async () => {
					return legalRegistrationNumberJson
				})
				const { validReqJSON: validJSON } = legalParticipantTestJSON
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
					.send(validJSON)
					.expect((response) => {
						expect(response.status).toEqual(STATUS_CODES.CONFLICT)
					})
				jest.resetAllMocks()
			})
			it('internal server error', async () => {
				jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
					return { didDocument: holderDdoJson }
				})
				const { validReqJSON: validJSON } = legalParticipantTestJSON
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
					.send({ ...validJSON })
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.INTERNAL_SERVER_ERROR)
					})
				jest.resetAllMocks()
			})
		})
	})
	describe('Positive scenarios', () => {
		it('compliance legal participant', async () => {
			jest.spyOn(axios, 'post').mockImplementation(async () => {
				const { validComplianceResponse } = legalParticipantTestJSON
				return validComplianceResponse
			})
			jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
				return { didDocument: holderDdoJson }
			})
			jest.spyOn(Utils, 'issueRegistrationNumberVC').mockImplementation(async () => {
				return legalRegistrationNumberJson
			})
			const { validReqJSON: validJSON } = legalParticipantTestJSON
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
				.send(validJSON)
				.expect((response) => {
					expect(response.status).toEqual(STATUS_CODES.OK)
				})
			jest.resetAllMocks()
		})
		it('compliance legal participant with vault', async () => {
			jest.spyOn(axios, 'post').mockImplementation(async () => {
				const { validComplianceResponse } = legalParticipantTestJSON
				return validComplianceResponse
			})
			jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
				return { didDocument: holderDdoJson }
			})
			jest.spyOn(Utils, 'issueRegistrationNumberVC').mockImplementation(async () => {
				return legalRegistrationNumberJson
			})
			jest.spyOn(VaultService.prototype, 'getSecrets').mockImplementation(async () => {
				return ''
			})
			const { validReqJSON: validJSON } = legalParticipantTestJSON
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.LEGAL_PARTICIPANT}`)
				.send({ ...validJSON, isVault: true })
				.expect((response) => {
					expect(response.status).toEqual(STATUS_CODES.OK)
				})
			jest.resetAllMocks()
		})
	})
})

describe('/gaia-x/resource', () => {
	describe('Negative scenarios', () => {
		describe('Validation checks', () => {
			it('Empty request body', async () => {
				const error = {
					error: "Invalid value of param 'privateKey'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.RESOURCE}`)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
			it('Invalid issuer value', async () => {
				const { invalidIssuerJSON } = resourceTestJSON
				const error = {
					error: "Invalid value of param 'issuer'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.RESOURCE}`)
					.send(invalidIssuerJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
			it('Invalid verificationMethod value', async () => {
				const { invalidVerificationMethodJSON } = resourceTestJSON
				const error = {
					error: "Invalid value of param 'verificationMethod'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.RESOURCE}`)
					.send(invalidVerificationMethodJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
			it('Invalid resource object', async () => {
				const { invalidResource } = resourceTestJSON
				const error = {
					error: "Invalid value of param 'vcs.resource'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.RESOURCE}`)
					.send(invalidResource)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
			it('Invalid resource credential subject object', async () => {
				const { invalidCredentialSubjectResource } = resourceTestJSON
				const error = {
					error: "Invalid value of param 'vcs.resource.credentialSubject'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.RESOURCE}`)
					.send(invalidCredentialSubjectResource)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
			it('Invalid resource type', async () => {
				const { invalidResourceType } = resourceTestJSON
				const error = {
					error: `VC with type 'gx:DataResource' or 'gx:PhysicalResource' or 'gx:SoftwareResource' not found!!`,
					message: AppMessages.VP_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.RESOURCE}`)
					.send(invalidResourceType)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
		})
		describe('Unresolvable links/data', () => {
			it('fail to resolve issuer DDO', async () => {
				jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
					return undefined
				})
				const { validVirtualDataResourceReqJSON: validJSON } = resourceTestJSON
				const error = {
					error: `DDO not found for given did: '${validJSON.issuer}'`,
					message: AppMessages.VP_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.RESOURCE}`)
					.send(validJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.BAD_REQUEST)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('fail to get copyrightOwnedBy', async () => {
				jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
					return { didDocument: holderDdoJson }
				})
				const { validVirtualDataResourceReqJSON: validJSON } = resourceTestJSON
				jest.spyOn(Utils, 'getInnerVCs').mockImplementation(async () => {
					throw new Error(`gx:copyrightOwnedBy VC ID not found or required vc type not found`)
				})
				const error = {
					error: `gx:copyrightOwnedBy VC ID not found or required vc type not found`,
					message: AppMessages.VP_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.RESOURCE}`)
					.send(validJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.BAD_REQUEST)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('internal server error', async () => {
				jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
					throw Error('')
				})
				const { validVirtualDataResourceReqJSON: validJSON } = resourceTestJSON
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.RESOURCE}`)
					.send({ ...validJSON })
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.INTERNAL_SERVER_ERROR)
					})
				jest.resetAllMocks()
			})
		})
	})

	describe('Positive scenarios', () => {
		it('compliance validPhysicalResource', async () => {
			// jest.spyOn(axios, 'post').mockImplementation(async () => {
			// 	const { validComplianceResponse } = resourceTestJSON
			// 	return validComplianceResponse
			// })
			jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
				return { didDocument: holderDdoJson }
			})
			const { validPhysicalResourceReqJSON: validJSON } = resourceTestJSON
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.RESOURCE}`)
				.send(validJSON)
				.expect((response) => {
					expect(response.status).toEqual(STATUS_CODES.OK)
				})
			jest.resetAllMocks()
		})
		it('compliance validVirtualDataResource', async () => {
			// jest.spyOn(axios, 'post').mockImplementation(async () => {
			// 	const { validComplianceResponse } = resourceTestJSON
			// 	return validComplianceResponse
			// })
			jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
				return { didDocument: holderDdoJson }
			})
			const { validVirtualDataResourceReqJSON: validJSON } = resourceTestJSON
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.RESOURCE}`)
				.send(validJSON)
				.expect((response) => {
					expect(response.status).toEqual(STATUS_CODES.OK)
				})
			jest.resetAllMocks()
		})
		it('compliance validVirtualSoftwareResource', async () => {
			// jest.spyOn(axios, 'post').mockImplementation(async () => {
			// 	const { validComplianceResponse } = resourceTestJSON
			// 	return validComplianceResponse
			// })
			jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
				return { didDocument: holderDdoJson }
			})
			const { validVirtualSoftwareResourceReqJSON: validJSON } = resourceTestJSON
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.RESOURCE}`)
				.send(validJSON)
				.expect((response) => {
					expect(response.status).toEqual(STATUS_CODES.OK)
				})
			jest.resetAllMocks()
		})
		it('compliance validVirtualSoftwareResource with vault', async () => {
			// jest.spyOn(axios, 'post').mockImplementation(async () => {
			// 	const { validComplianceResponse } = resourceTestJSON
			// 	return validComplianceResponse
			// })
			jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
				return { didDocument: holderDdoJson }
			})
			jest.spyOn(VaultService.prototype, 'getSecrets').mockImplementation(async () => {
				return ''
			})
			const { validVirtualSoftwareResourceReqJSON: validJSON } = resourceTestJSON
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.RESOURCE}`)
				.send({ ...validJSON, isVault: true })
				.expect((response) => {
					expect(response.status).toEqual(STATUS_CODES.OK)
				})
			jest.resetAllMocks()
		})
	})
})

describe('/verify-web-did', () => {
	describe('Negative scenarios', () => {
		describe('Validation checks', () => {
			it('Empty request body', async () => {
				const error = {
					error: "Invalid value of param 'privateKey'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY_WEB_DID}`)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
			it('Invalid did value', async () => {
				const { invalidDidJSON } = verifyDIDTestJSON
				const error = {
					error: "Invalid value of param 'did'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY_WEB_DID}`)
					.send(invalidDidJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
			it('Invalid verificationMethod value', async () => {
				const { invalidVerificationMethodJSON } = verifyDIDTestJSON
				const error = {
					error: "Invalid value of param 'verificationMethod'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY_WEB_DID}`)
					.send(invalidVerificationMethodJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
		})
		describe('Unresolvable links/data', () => {
			it('fail to resolve issuer DDO', async () => {
				jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
					return undefined
				})
				const { validReq: validJSON } = verifyDIDTestJSON
				const error = {
					error: `DDO not found for given did: '${validJSON.did}'`,
					message: AppMessages.DID_VERIFY_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY_WEB_DID}`)
					.send(validJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.BAD_REQUEST)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('fail to find verification method', async () => {
				jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
					return { didDocument: holderDdoJson }
				})
				const { invalidReq: validJSON } = verifyDIDTestJSON
				const error = {
					error: `Verification Method not found in DDO: '${validJSON.verificationMethod}'`,
					message: AppMessages.DID_VERIFY_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY_WEB_DID}`)
					.send(validJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.BAD_REQUEST)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('internal server error', async () => {
				jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
					throw Error('')
				})
				const { validReq: validJSON } = verifyDIDTestJSON
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY_WEB_DID}`)
					.send({ ...validJSON })
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.INTERNAL_SERVER_ERROR)
					})
				jest.resetAllMocks()
			})
		})
	})
	describe('Positive scenarios', () => {
		it('validate did web with valid false', async () => {
			const isValid = false
			jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
				return { didDocument: holderDdoJson }
			})
			jest.spyOn(Utils, 'verify').mockImplementation(async () => {
				return isValid
			})
			const expectedResponse = {
				data: { isValid },
				message: isValid ? AppMessages.DID_VERIFY : AppMessages.DID_VERIFY_FAILED
			}
			const { validReq: validJSON } = verifyDIDTestJSON
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY_WEB_DID}`)
				.send(validJSON)
				.expect((response) => {
					expect(response.status).toEqual(STATUS_CODES.OK)
					expect(response.body).toEqual(expectedResponse)
				})
			jest.resetAllMocks()
		})
		it('validate did web with valid with error', async () => {
			const isValid = false
			jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
				return { didDocument: holderDdoJson }
			})
			jest.spyOn(Utils, 'verify').mockImplementation(async () => {
				throw Error()
			})
			const expectedResponse = {
				data: { isValid },
				message: isValid ? AppMessages.DID_VERIFY : AppMessages.DID_VERIFY_FAILED
			}
			const { validReq: validJSON } = verifyDIDTestJSON
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY_WEB_DID}`)
				.send(validJSON)
				.expect((response) => {
					expect(response.status).toEqual(STATUS_CODES.OK)
					expect(response.body).toEqual(expectedResponse)
				})
			jest.resetAllMocks()
		})
		it('validate did web with valid true', async () => {
			const isValid = true
			jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
				return { didDocument: holderDdoJson }
			})
			jest.spyOn(Utils, 'verify').mockImplementation(async () => {
				return isValid
			})
			const expectedResponse = {
				data: { isValid },
				message: isValid ? AppMessages.DID_VERIFY : AppMessages.DID_VERIFY_FAILED
			}
			const { validReq: validJSON } = verifyDIDTestJSON
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY_WEB_DID}`)
				.send(validJSON)
				.expect((response) => {
					expect(response.status).toEqual(STATUS_CODES.OK)
					expect(response.body).toEqual(expectedResponse)
				})
			jest.resetAllMocks()
		})
		it('validate did web with valid true with vault', async () => {
			const isValid = true
			jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
				return { didDocument: holderDdoJson }
			})
			jest.spyOn(Utils, 'verify').mockImplementation(async () => {
				return isValid
			})
			jest.spyOn(VaultService.prototype, 'getSecrets').mockImplementation(async () => {
				return ''
			})
			const expectedResponse = {
				data: { isValid },
				message: isValid ? AppMessages.DID_VERIFY : AppMessages.DID_VERIFY_FAILED
			}
			const { validReq: validJSON } = verifyDIDTestJSON
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.VERIFY_WEB_DID}`)
				.send({ ...validJSON, isVault: true })
				.expect((response) => {
					expect(response.status).toEqual(STATUS_CODES.OK)
					expect(response.body).toEqual(expectedResponse)
				})
			jest.resetAllMocks()
		})
	})
})

describe('/gaia-x/label-level', () => {
	describe('Negative scenarios', () => {
		describe('Validation checks', () => {
			it('Empty request body', async () => {
				const error = {
					error: "Invalid value of param 'privateKey'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.LABEL_LEVEL}`)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
			it('Invalid issuer value', async () => {
				const { invalidIssuerJSON } = labelLevelTestJSON
				const error = {
					error: "Invalid value of param 'issuer'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.LABEL_LEVEL}`)
					.send(invalidIssuerJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
			it('Invalid verification method value', async () => {
				const { invalidVerificationMethodJSON } = labelLevelTestJSON
				const error = {
					error: "Invalid value of param 'verificationMethod'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.LABEL_LEVEL}`)
					.send(invalidVerificationMethodJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
			it('Invalid labelLevel object', async () => {
				const { invalidLabelLevel } = labelLevelTestJSON
				const error = {
					error: "Invalid value of param 'vcs.labelLevel'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.LABEL_LEVEL}`)
					.send(invalidLabelLevel)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
		})
		describe('', () => {
			it('DDO not found for given did', async () => {
				const { invalidReqJSON } = labelLevelTestJSON
				const error = {
					error: "DDO not found for given did: 'did:web:suzuki.smart-x.smartsenselabs.com' in proof",
					message: AppMessages.LL_SIGN_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.LABEL_LEVEL}`)
					.send(invalidReqJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.BAD_REQUEST)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('Credential subject not found', async () => {
				const { emptyCSReqJSON } = labelLevelTestJSON
				const error = {
					error: AppMessages.CS_EMPTY,
					message: AppMessages.LL_SIGN_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.LABEL_LEVEL}`)
					.send(emptyCSReqJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.BAD_REQUEST)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('Label level value can not be empty', async () => {
				jest.spyOn(Utils, 'calcLabelLevel').mockImplementation(() => {
					return ''
				})
				const { validReqJSON } = labelLevelTestJSON
				const error = {
					error: AppMessages.LABEL_LEVEL_CALC_FAILED,
					message: AppMessages.LL_SIGN_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.LABEL_LEVEL}`)
					.send(validReqJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.BAD_REQUEST)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('X5U not found from the holder DID', async () => {
				jest.spyOn(Utils, 'getPublicKeys').mockImplementation(async () => {
					return { x5u: '', publicKeyJwk: '' }
				})
				const { validReqJSON } = labelLevelTestJSON
				const error = {
					error: AppMessages.X5U_NOT_FOUND,
					message: AppMessages.LL_SIGN_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.LABEL_LEVEL}`)
					.send(validReqJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.BAD_REQUEST)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('fail to calculate labelLevel', async () => {
				jest.spyOn(Utils, 'getDDOfromDID').mockImplementation(async () => {
					return { didDocument: holderDdoJson }
				})
				jest.spyOn(Utils, 'calcLabelLevel').mockImplementation(() => {
					throw new Error('Error while calculating labelLevel')
				})
				const { validReqJSON: validJSON } = labelLevelTestJSON
				const error = {
					error: 'Error while calculating labelLevel',
					message: AppMessages.LL_SIGN_FAILED
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.LABEL_LEVEL}`)
					.send(validJSON)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.INTERNAL_SERVER_ERROR)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
		})
	})
	describe('Positive scenarios', () => {
		it('Label Level success', async () => {
			const { validReqJSON } = labelLevelTestJSON
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.LABEL_LEVEL}`)
				.send(validReqJSON)
				.expect((response) => {
					expect(response.status).toEqual(STATUS_CODES.OK)
				})
			jest.resetAllMocks()
		})
		it('Label Level success with vault', async () => {
			jest.spyOn(VaultService.prototype, 'getSecrets').mockImplementation(async () => {
				return ''
			})
			const { validReqJSON } = labelLevelTestJSON
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.LABEL_LEVEL}`)
				.send({ ...validReqJSON, isVault: true })
				.expect((response) => {
					expect(response.status).toEqual(STATUS_CODES.OK)
				})
			jest.resetAllMocks()
		})
	})
})

describe('/get/trust-index', () => {
	describe('Negative scenarios', () => {
		describe('Validation checks', () => {
			it('Empty request body', async () => {
				const error = {
					error: "Invalid value of param 'participantSD'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.GET_TRUST_INDEX}`)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
			it('serviceOfferingSD not found', async () => {
				const request = {
					participantSD: 'https://wizard-api.smart-x.smartsenselabs.com/cdfd35ca-3302-4948-95fb-afd36b34e09e/participant.json'
				}
				const error = {
					error: "Invalid value of param 'serviceOfferingSD'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.GET_TRUST_INDEX}`)
					.send(request)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
			it('Invalid participant self description url format', async () => {
				jest.spyOn(Utils, 'IsValidURL').mockImplementationOnce(() => {
					return false
				})
				const error = {
					error: 'Invalid participant self description url format',
					message: 'Trust index calculation failed'
				}
				const request = {
					participantSD: 'hpa://wizard-api.smart-x.smartsenselabs.com/cdfd35ca-3302-4948-95fb-afd36b34e09e/participant.json',
					serviceOfferingSD: 'https://wizard-api.smart-x.smartsenselabs.com/cdfd35ca-3302-4948-95fb-afd36b34e09e/service_YlA1.json'
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.GET_TRUST_INDEX}`)
					.send(request)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.BAD_REQUEST)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('Invalid service offering self description url format', async () => {
				jest.spyOn(Utils, 'IsValidURL').mockImplementationOnce(() => {
					return true
				})
				const error = {
					error: 'Invalid service offering self description url format',
					message: 'Trust index calculation failed'
				}
				const request = {
					participantSD: 'https://wizard-api.smart-x.smartsenselabs.com/cdfd35ca-3302-4948-95fb-afd36b34e09e/participant.json',
					serviceOfferingSD: 'hps://wizard-api.smart-x.smartsenselabs.com/cdfd35ca-3302-4948-95fb-afd36b34e09e/service_YlA1.json'
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.GET_TRUST_INDEX}`)
					.send(request)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.BAD_REQUEST)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('DDO not found for given did: did:web:ferrari.smart-x.smartsenselabs.com in proof', async () => {
				jest.spyOn(Utils, 'IsValidURL').mockImplementation(() => {
					return true
				})
				jest.spyOn(Utils, 'calcVeracity').mockImplementation(() => {
					throw new Error(`DDO not found for given did: did:web:ferrari.smart-x.smartsenselabs.com in proof`)
				})
				const error = {
					error: 'DDO not found for given did: did:web:ferrari.smart-x.smartsenselabs.com in proof',
					message: 'Trust index calculation failed'
				}
				const request = {
					participantSD: 'https://wizard-api.smart-x.smartsenselabs.com/cdfd35ca-3302-4948-95fb-afd36b34e09e/participant.json',
					serviceOfferingSD: 'https://wizard-api.smart-x.smartsenselabs.com/cdfd35ca-3302-4948-95fb-afd36b34e09e/service_YlA1.json'
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.GET_TRUST_INDEX}`)
					.send(request)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.INTERNAL_SERVER_ERROR)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('Participant proof verification method and did verification method id not matched', async () => {
				jest.spyOn(Utils, 'IsValidURL').mockImplementation(() => {
					return true
				})
				jest.spyOn(Utils, 'calcVeracity').mockImplementation(() => {
					throw new Error('Participant proof verification method and did verification method id not matched')
				})
				const error = {
					error: 'Participant proof verification method and did verification method id not matched',
					message: 'Trust index calculation failed'
				}
				const request = {
					participantSD: 'https://wizard-api.smart-x.smartsenselabs.com/cdfd35ca-3302-4948-95fb-afd36b34e09e/participant.json',
					serviceOfferingSD: 'https://wizard-api.smart-x.smartsenselabs.com/cdfd35ca-3302-4948-95fb-afd36b34e09e/service_YlA1.json'
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.GET_TRUST_INDEX}`)
					.send(request)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.INTERNAL_SERVER_ERROR)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
			it('Verifiable credential array not found in participant self description', async () => {
				jest.spyOn(Utils, 'IsValidURL').mockImplementation(() => {
					return true
				})
				jest.spyOn(Utils, 'calcVeracity').mockImplementation(() => {
					throw new Error('Verifiable credential array not found in participant self description')
				})
				const error = {
					error: 'Verifiable credential array not found in participant self description',
					message: 'Trust index calculation failed'
				}
				const request = {
					participantSD: 'https://wizard-api.smart-x.smartsenselabs.com/cdfd35ca-3302-4948-95fb-afd36b34e09e/participant.json',
					serviceOfferingSD: 'https://wizard-api.smart-x.smartsenselabs.com/cdfd35ca-3302-4948-95fb-afd36b34e09e/service_YlA1.json'
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.GET_TRUST_INDEX}`)
					.send(request)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.INTERNAL_SERVER_ERROR)
						expect(response.body).toEqual(error)
					})
				jest.resetAllMocks()
			})
		})
	})
	describe('Positive scenarios', () => {
		it('Trust index calculated', async () => {
			jest.spyOn(Utils, 'IsValidURL').mockImplementation(() => {
				return true
			})
			const request = {
				participantSD: 'https://lakhani.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/participant.json#0',
				serviceOfferingSD: 'https://wizard-api.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/service_aTRg.json'
			}
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.GET_TRUST_INDEX}`)
				.send(request)
				.expect((response) => {
					expect(response.status).toBe(STATUS_CODES.OK)
				})
			jest.resetAllMocks()
		})
	})
})

describe('/gaia-x/validate-registration-number', () => {
	describe('Negative scenarios', () => {
		describe('Validation checks', () => {
			it('Empty request body', async () => {
				const error = {
					error: "Invalid value of param 'legalRegistrationNumber'",
					message: AppMessages.VALIDATION_ERROR
				}
				await supertest(app)
					.post(`${ROUTES.V1}${ROUTES.V1_APIS.REGISTRATION_NUMBER}`)
					.expect((response) => {
						expect(response.status).toBe(STATUS_CODES.UNPROCESSABLE_ENTITY)
						expect(response.body).toEqual(error)
					})
			})
		})
	})
	describe('Positive scenarios', () => {
		it('RegistrationNumberVC checked true', async () => {
			const { validReqJSON: validJSON } = legalParticipantTestJSON
			jest.spyOn(Utils, 'issueRegistrationNumberVC').mockImplementation(async () => {
				return legalRegistrationNumberJson
			})
			const res = {
				data: { isValid: true },
				message: AppMessages.RN_VERIFY
			}
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.REGISTRATION_NUMBER}`)
				.send({ legalRegistrationNumber: validJSON.vcs.legalRegistrationNumber })
				.expect((response) => {
					expect(response.status).toBe(STATUS_CODES.OK)
					expect(response.body).toEqual(res)
				})
			jest.resetAllMocks()
		})
		it('RegistrationNumberVC checked false', async () => {
			const { validReqJSON: validJSON } = legalParticipantTestJSON
			jest.spyOn(Utils, 'issueRegistrationNumberVC').mockImplementation(async () => {
				throw new Error()
			})
			const res = {
				data: { isValid: false },
				message: AppMessages.RN_VERIFY_FAILED
			}
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.REGISTRATION_NUMBER}`)
				.send({ legalRegistrationNumber: validJSON.vcs.legalRegistrationNumber })
				.expect((response) => {
					expect(response.status).toBe(STATUS_CODES.OK)
					expect(response.body).toEqual(res)
				})
			jest.resetAllMocks()
		})
		it('RegistrationNumberVC checked false', async () => {
			const { validReqJSON: validJSON } = legalParticipantTestJSON
			jest.spyOn(Utils, 'issueRegistrationNumberVC').mockImplementation(async () => {
				return false
			})
			const res = {
				data: { isValid: false },
				message: AppMessages.RN_VERIFY_FAILED
			}
			await supertest(app)
				.post(`${ROUTES.V1}${ROUTES.V1_APIS.REGISTRATION_NUMBER}`)
				.send({ legalRegistrationNumber: validJSON.vcs.legalRegistrationNumber })
				.expect((response) => {
					expect(response.status).toBe(STATUS_CODES.OK)
					expect(response.body).toEqual(res)
				})
			jest.resetAllMocks()
		})
	})
})
