import axios from 'axios'
import { X509Certificate } from 'crypto'
import { Resolver } from 'did-resolver'
import dotenv from 'dotenv'
import web from 'web-did-resolver'

import { holderDdoJson2 as holderDdoJson, labelLevelTestJSON, mockCertificate, participantJson, serviceOfferingTestJSON } from '../../assets'
import Utils from './common-functions'

dotenv.config()
const webResolver = web.getResolver()
const resolver = new Resolver(webResolver)

const exampleCertificate = 'Sample Certificate'

describe('commonFunction Testing', () => {
	describe('verification', () => {
		it('proof is not JSONWebSignature2020', async () => {
			const mockParticipantJson = JSON.parse(JSON.stringify(participantJson))
			mockParticipantJson.selfDescriptionCredential.verifiableCredential[0].proof.type = 'JsonWebSignature2021'
			const complianceCred = JSON.parse(JSON.stringify(mockParticipantJson.selfDescriptionCredential.verifiableCredential[0]))
			const complianceProof = JSON.parse(JSON.stringify(complianceCred.proof))
			delete complianceCred.proof
			let isError = false
			try {
				await Utils.verification(complianceCred, complianceProof, false, resolver)
			} catch (error) {
				isError = true
				expect((error as Error).message).toEqual(`signature type: 'JsonWebSignature2021' not supported`)
			}
			expect(isError).toBe(true)
		})
		it('empty ddo', async () => {
			jest.spyOn(Utils, 'getDDOfromDID').mockResolvedValue({})
			const mockParticipantJson = JSON.parse(JSON.stringify(participantJson))
			const complianceCred = JSON.parse(JSON.stringify(mockParticipantJson.complianceCredential))
			const complianceProof = JSON.parse(JSON.stringify(complianceCred.proof))
			delete complianceCred.proof
			let isError = false
			try {
				await Utils.verification(complianceCred, complianceProof, false, resolver)
			} catch (error) {
				isError = true
				expect((error as Error).message).toBe(`publicKeyJwk not found in ddo`)
			}
			expect(isError).toBe(true)
			jest.resetAllMocks()
		})
		it('undefined ddo', async () => {
			jest.spyOn(Utils, 'getDDOfromDID').mockResolvedValue(undefined)
			const mockParticipantJson = JSON.parse(JSON.stringify(participantJson))
			const complianceCred = JSON.parse(JSON.stringify(mockParticipantJson.complianceCredential))
			const complianceProof = JSON.parse(JSON.stringify(complianceCred.proof))
			delete complianceCred.proof
			let isError = false
			try {
				await Utils.verification(complianceCred, complianceProof, false, resolver)
			} catch (error) {
				isError = true
				expect((error as Error).message).toBe(`DDO not found for given did: 'did:web:compliance.lab.gaia-x.eu:development#X509-JWK2020' in proof`)
			}
			expect(isError).toBe(true)

			jest.resetAllMocks()
		})
		it('verification method not matched with DDO', async () => {
			jest.spyOn(Utils, 'getDDOfromDID').mockResolvedValue({ ...holderDdoJson })
			const mockParticipantJson = JSON.parse(JSON.stringify(participantJson))
			const complianceCred = JSON.parse(JSON.stringify(mockParticipantJson.complianceCredential))
			const complianceProof = JSON.parse(JSON.stringify(complianceCred.proof))
			delete complianceCred.proof
			let isError = false

			try {
				await Utils.verification(complianceCred, complianceProof, false, resolver)
			} catch (error) {
				isError = true

				expect((error as Error).message).toBe(`publicKeyJwk not found in ddo`)
			}
			expect(isError).toBe(true)

			jest.resetAllMocks()
		})
		it('publicKeyJwk not found', async () => {
			const mockHolderDDO = JSON.parse(JSON.stringify(holderDdoJson))
			delete mockHolderDDO.didDocument.verificationMethod[0].publicKeyJwk
			jest.spyOn(Utils, 'getDDOfromDID').mockResolvedValue({ ...mockHolderDDO })
			const mockParticipantJson = JSON.parse(JSON.stringify(participantJson))
			const complianceCred = JSON.parse(JSON.stringify(mockParticipantJson.complianceCredential))
			const complianceProof = JSON.parse(JSON.stringify(complianceCred.proof))
			delete complianceCred.proof
			let isError = false

			try {
				await Utils.verification(complianceCred, complianceProof, false, resolver)
			} catch (error) {
				isError = true

				expect((error as Error).message).toBe(`publicKeyJwk not found in ddo`)
			}
			expect(isError).toBe(true)

			jest.resetAllMocks()
		})
		it('x5u not found', async () => {
			const mockHolderDDO = JSON.parse(JSON.stringify(holderDdoJson))
			delete mockHolderDDO.didDocument.verificationMethod[0].publicKeyJwk.x5u
			jest.spyOn(Utils, 'getDDOfromDID').mockResolvedValue({ ...mockHolderDDO })
			const mockParticipantJson = JSON.parse(JSON.stringify(participantJson))
			const holderCred = JSON.parse(JSON.stringify(mockParticipantJson.selfDescriptionCredential.verifiableCredential[0]))
			const proof = JSON.parse(JSON.stringify(holderCred.proof))
			delete holderCred.proof
			let isError = false

			try {
				await Utils.verification(holderCred, proof, false, resolver)
			} catch (error) {
				isError = true

				expect((error as Error).message).toBe(`x5u not found in ddo`)
			}
			expect(isError).toBe(true)

			jest.resetAllMocks()
		})

		it('error in axios while fetching certificate', async () => {
			const mockHolderDDO = JSON.parse(JSON.stringify(holderDdoJson))

			jest.spyOn(Utils, 'getDDOfromDID').mockResolvedValue({ ...mockHolderDDO })
			jest.spyOn(axios, 'get').mockImplementation(async () => {
				throw new Error('Fail to fetch certificate')
			})
			const mockParticipantJson = JSON.parse(JSON.stringify(participantJson))
			const holderCred = JSON.parse(JSON.stringify(mockParticipantJson.selfDescriptionCredential.verifiableCredential[0]))
			const proof = JSON.parse(JSON.stringify(holderCred.proof))
			let isError = false

			try {
				await Utils.verification(holderCred, proof, false, resolver)
			} catch (error) {
				isError = true

				expect((error as Error).message).toBe(`fail to fetch x5u certificate`)
			}
			expect(isError).toBe(true)

			jest.resetAllMocks()
		})

		it('certificate not found', async () => {
			const mockHolderDDO = JSON.parse(JSON.stringify(holderDdoJson))

			jest.spyOn(Utils, 'getDDOfromDID').mockResolvedValue({ ...mockHolderDDO })
			jest.spyOn(axios, 'get').mockResolvedValue(undefined)
			const mockParticipantJson = JSON.parse(JSON.stringify(participantJson))
			const holderCred = JSON.parse(JSON.stringify(mockParticipantJson.selfDescriptionCredential.verifiableCredential[0]))
			const proof = JSON.parse(JSON.stringify(holderCred.proof))
			let isError = false

			try {
				await Utils.verification(holderCred, proof, false, resolver)
			} catch (error) {
				isError = true

				expect((error as Error).message).toBe(`ssl certificate not found`)
			}
			expect(isError).toBe(true)

			jest.resetAllMocks()
		})
		it('sslRegistry responds false', async () => {
			const mockHolderDDO = JSON.parse(JSON.stringify(holderDdoJson))

			jest.spyOn(Utils, 'getDDOfromDID').mockResolvedValue({ ...mockHolderDDO })
			jest.spyOn(Utils, 'validateSslFromRegistryWithUri').mockResolvedValue(false)
			jest.spyOn(axios, 'get').mockResolvedValue({ data: exampleCertificate })
			const mockParticipantJson = JSON.parse(JSON.stringify(participantJson))
			const holderCred = JSON.parse(JSON.stringify(mockParticipantJson.selfDescriptionCredential.verifiableCredential[0]))
			const proof = JSON.parse(JSON.stringify(holderCred.proof))
			let isError = false
			try {
				await Utils.verification(holderCred, proof, true, resolver)
			} catch (error) {
				isError = true
				expect((error as Error).message).toBe(`Certificate validation failed`)
			}
			expect(isError).toBe(true)
			jest.resetAllMocks()
		})
		it('comparePub key fails', async () => {
			const mockHolderDDO = JSON.parse(JSON.stringify(holderDdoJson))
			jest.spyOn(Utils, 'getDDOfromDID').mockResolvedValue({ ...mockHolderDDO })
			jest.spyOn(axios, 'get').mockResolvedValue({ data: exampleCertificate })
			jest.spyOn(Utils, 'comparePubKeys').mockResolvedValue(false)
			const mockParticipantJson = JSON.parse(JSON.stringify(participantJson))
			const holderCred = JSON.parse(JSON.stringify(mockParticipantJson.selfDescriptionCredential.verifiableCredential[0]))
			const proof = JSON.parse(JSON.stringify(holderCred.proof))
			let isError = false
			try {
				await Utils.verification(holderCred, proof, false, resolver)
			} catch (error) {
				isError = true
				expect((error as Error).message).toBe(`Public Key Mismatched`)
			}
			expect(isError).toBe(true)
			jest.resetAllMocks()
		})
		it('normalize fails', async () => {
			const mockHolderDDO = JSON.parse(JSON.stringify(holderDdoJson))
			jest.spyOn(Utils, 'getDDOfromDID').mockResolvedValue({ ...mockHolderDDO })
			jest.spyOn(axios, 'get').mockResolvedValue({ data: exampleCertificate })
			jest.spyOn(Utils, 'comparePubKeys').mockResolvedValue(true)
			jest.spyOn(Utils, 'normalize').mockResolvedValue(undefined)

			const mockParticipantJson = JSON.parse(JSON.stringify(participantJson))
			const holderCred = JSON.parse(JSON.stringify(mockParticipantJson.selfDescriptionCredential.verifiableCredential[0]))
			const proof = JSON.parse(JSON.stringify(holderCred.proof))
			let isError = false
			try {
				await Utils.verification(holderCred, proof, false, resolver)
			} catch (error) {
				isError = true
				expect((error as Error).message).toBe(`Normalizing Credential Failed`)
			}
			expect(isError).toBe(true)
			jest.resetAllMocks()
		})
		it('normalize fails', async () => {
			const mockHolderDDO = JSON.parse(JSON.stringify(holderDdoJson))
			jest.spyOn(Utils, 'getDDOfromDID').mockResolvedValue({ ...mockHolderDDO })
			jest.spyOn(axios, 'get').mockResolvedValue({ data: exampleCertificate })
			jest.spyOn(Utils, 'comparePubKeys').mockResolvedValue(true)
			jest.spyOn(Utils, 'normalize').mockResolvedValue(undefined)

			const mockParticipantJson = JSON.parse(JSON.stringify(participantJson))
			const holderCred = JSON.parse(JSON.stringify(mockParticipantJson.selfDescriptionCredential.verifiableCredential[0]))
			const proof = JSON.parse(JSON.stringify(holderCred.proof))
			let isError = false
			try {
				await Utils.verification(holderCred, proof, false, resolver)
			} catch (error) {
				isError = true
				expect((error as Error).message).toBe(`Normalizing Credential Failed`)
			}
			expect(isError).toBe(true)
			jest.resetAllMocks()
		})
		it('hash verification fails', async () => {
			const mockHolderDDO = JSON.parse(JSON.stringify(holderDdoJson))
			jest.spyOn(Utils, 'getDDOfromDID').mockResolvedValue({ ...mockHolderDDO })
			jest.spyOn(axios, 'get').mockResolvedValue({ data: exampleCertificate })
			jest.spyOn(Utils, 'comparePubKeys').mockResolvedValue(true)
			jest.spyOn(Utils, 'normalize').mockResolvedValue('abc')

			const mockParticipantJson = JSON.parse(JSON.stringify(participantJson))
			const holderCred = JSON.parse(JSON.stringify(mockParticipantJson.selfDescriptionCredential.verifiableCredential[0]))
			const proof = JSON.parse(JSON.stringify(holderCred.proof))
			let isError = false
			try {
				await Utils.verification(holderCred, proof, false, resolver)
			} catch (error) {
				isError = true
				// expect(error).toBeInstanceOf(Error)
			}
			expect(isError).toBe(true)
			jest.resetAllMocks()
		})
		it('hash verification successful', async () => {
			const mockHolderDDO = JSON.parse(JSON.stringify(holderDdoJson))
			jest.spyOn(Utils, 'getDDOfromDID').mockResolvedValue({ ...mockHolderDDO })
			jest.spyOn(axios, 'get').mockResolvedValue({ data: exampleCertificate })
			jest.spyOn(Utils, 'comparePubKeys').mockResolvedValue(true)
			jest.spyOn(Utils, 'normalize').mockResolvedValue('abc')
			jest.spyOn(Utils, 'verify').mockResolvedValue(true)

			const mockParticipantJson = JSON.parse(JSON.stringify(participantJson))
			const holderCred = JSON.parse(JSON.stringify(mockParticipantJson.selfDescriptionCredential.verifiableCredential[0]))
			const proof = JSON.parse(JSON.stringify(holderCred.proof))
			let isError = false
			try {
				const response = await Utils.verification(holderCred, proof, false, resolver)
				expect(response).toBe(true)
			} catch (error) {
				isError = true
			}
			expect(isError).toBe(false)
			jest.resetAllMocks()
		})
		it('Veracity calculated successfully', async () => {
			let isError = false
			try {
				const {
					validLPJSON: {
						selfDescriptionCredential: { verifiableCredential }
					},
					veracityResponse
				} = serviceOfferingTestJSON
				jest.spyOn(Utils, 'calcVeracity').mockImplementation(async () => {
					return veracityResponse
				})
				const resolver = new Resolver(webResolver)
				const response = await Utils.calcVeracity(verifiableCredential, resolver)
				expect(response).toEqual(veracityResponse)
			} catch (error) {
				isError = true
			}
			expect(isError).toBe(false)
			jest.resetAllMocks()
		})
		it('Certificate parsed successfully', async () => {
			// get the SSL certificates from x5u url
			// const x5u = 'https://smartsense.dev.smart-x.smartsenselabs.com/.well-known/x509CertificateChain.pem'
			const x5uResp = {
				validFrom: 'Feb 21 04:23:46 2024 GMT',
				validTo: 'Mar 22 04:23:46 2024 GMT',
				subject: {
					jurisdictionCountry: null,
					jurisdictionSate: null,
					jurisdictionLocality: null,
					businessCategory: null,
					serialNumber: null,
					country: null,
					state: null,
					locality: null,
					organization: null,
					commonName: 'localhost'
				},
				issuer: { commonName: 'localhost', organization: null, country: null }
			}
			// jest.spyOn(Utils, 'parseCertificate').mockImplementation(() => {
			// 	return x5uResp
			// })
			let isError = false
			try {
				// const certificates = (await axios.get(x5u)).data as string
				// getting object of a PEM encoded X509 Certificate.
				const certificates = mockCertificate
				const certificate = new X509Certificate(certificates)
				const response = await Utils.parseCertificate(certificate)

				expect(response).toEqual(x5uResp)
			} catch (error) {
				isError = true
			}
			expect(isError).toBe(false)
			jest.resetAllMocks()
		})
		it('Duplicates removed', async () => {
			let isError = false
			try {
				const { uniqueVC } = serviceOfferingTestJSON
				const uniqueVC1: [] = JSON.parse(JSON.stringify(uniqueVC))
				const response = await Utils.removeDuplicates(uniqueVC1, 'id')
				expect(response).toEqual(uniqueVC)
			} catch (error) {
				isError = true
			}
			expect(isError).toBe(false)
			jest.resetAllMocks()
		})
		it('ServiceOffering Compliance API called successfully', async () => {
			jest.spyOn(Utils, 'callServiceOfferingCompliance').mockImplementation(async () => {
				return {}
			})
			let isError = false
			try {
				let { validSOComplianceReq } = serviceOfferingTestJSON
				validSOComplianceReq = JSON.parse(JSON.stringify(validSOComplianceReq))
				await Utils.callServiceOfferingCompliance(validSOComplianceReq)
			} catch (error) {
				isError = true
			}
			expect(isError).toBe(false)
			jest.resetAllMocks()
		})
		it('Transparency calculation successful', async () => {
			let isError = false
			try {
				let { transparencyCS } = serviceOfferingTestJSON
				transparencyCS = JSON.parse(JSON.stringify(transparencyCS))
				const response = await Utils.calcTransparency(transparencyCS)
				expect(response).toBe(1.6)
			} catch (error) {
				isError = true
			}
			expect(isError).toBe(false)
			jest.resetAllMocks()
		})
		it('Trust index calculation successful', async () => {
			let isError = false
			try {
				const response = await Utils.calcTrustIndex(1, 1)
				expect(response).toBe(1)
			} catch (error) {
				isError = true
			}
			expect(isError).toBe(false)
			jest.resetAllMocks()
		})
		it('Label Level calculation successful', async () => {
			let isError = false
			try {
				let { labelLevelCS } = labelLevelTestJSON
				labelLevelCS = JSON.parse(JSON.stringify(labelLevelCS))
				const response = await Utils.calcLabelLevel(labelLevelCS)
				expect(response).toBe('L1')
			} catch (error) {
				isError = true
			}
			expect(isError).toBe(false)
			jest.resetAllMocks()
		})
		it('Rule point key not found in criteria json - P5.2.1', async () => {
			let errorMsg = ''
			try {
				let { invalidLabelLevelCS } = labelLevelTestJSON
				invalidLabelLevelCS = JSON.parse(JSON.stringify(invalidLabelLevelCS))
				await Utils.calcLabelLevel(invalidLabelLevelCS)
			} catch (error) {
				errorMsg = (error as Error).message
			}
			expect(errorMsg).toBe('Rule point key not found in criteria json - gx:P5.2.1')
			jest.resetAllMocks()
		})
		it('LabelLevel Calculated BC', async () => {
			let isError = false
			try {
				let { labelLevelBC } = labelLevelTestJSON
				labelLevelBC = JSON.parse(JSON.stringify(labelLevelBC))
				const response = await Utils.calcLabelLevel(labelLevelBC)
				expect(response).toBe('BC')
			} catch (error) {
				isError = true
			}
			expect(isError).toBe(false)
			jest.resetAllMocks()
		})
	})
})
