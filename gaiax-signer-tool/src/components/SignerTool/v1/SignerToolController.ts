import axios from 'axios'
import canonicalize from 'canonicalize'
import crypto, { createHash } from 'crypto'
import { Resolver } from 'did-resolver'
import express, { Request, Response } from 'express'
import STATUS_CODES from 'http-status-codes'
import * as jose from 'jose'
import jsonld from 'jsonld'
import web from 'web-did-resolver'

import { ComplianceCredential, VerificationStatus } from '../../../interface'
import Utils from '../../../utils/common-functions'
import { AppConst, AppMessages } from '../../../utils/constants'
import { logger } from '../../../utils/logger'
import { VaultService } from '../../../utils/service/vault.service'

const webResolver = web.getResolver()
const resolver = new Resolver(webResolver)
export const privateRoute = express.Router()
const vaultService = new VaultService()
class SignerToolController {
	GXLegalParticipant = async (req: Request, res: Response): Promise<void> => {
		try {
			const { issuer, verificationMethod, isVault } = req.body
			const vc = req.body.vcs
			let { privateKey } = req.body
			const { legalParticipant, legalRegistrationNumber, gaiaXTermsAndConditions } = vc
			logger.debug(__filename, 'GXLegalParticipant', 'req.body', req.custom.uuid, { issuer, verificationMethod, isVault })
			logger.debug(__filename, 'GXLegalParticipant', 'req.body', req.custom.uuid, JSON.stringify(vc, null, 2))
			const ddo = await Utils.getDDOfromDID(issuer, resolver)
			if (!ddo) {
				logger.error(__filename, 'GXLegalParticipant', `❌ DDO not found for given did: '${issuer}'`, req.custom.uuid)
				res.status(STATUS_CODES.BAD_REQUEST).json({
					error: `DDO not found for given did: '${issuer}'`,
					message: AppMessages.VP_FAILED
				})
				return
			}
			const { x5u } = await Utils.getPublicKeys(ddo.didDocument)
			if (!x5u) {
				logger.error(__filename, 'GXLegalParticipant', AppMessages.X5U_NOT_FOUND, req.custom.uuid)
				res.status(STATUS_CODES.BAD_REQUEST).json({
					error: AppMessages.X5U_NOT_FOUND,
					message: AppMessages.VP_FAILED
				})
				return
			}

			const vcsMap = new Map()
			try {
				if (legalParticipant.credentialSubject['gx:parentOrganization']) {
					await Utils.getInnerVCs(legalParticipant, 'gx:parentOrganization', ['gx:LegalParticipant'], vcsMap)
				}
				if (legalParticipant.credentialSubject['gx:subOrganization']) {
					await Utils.getInnerVCs(legalParticipant, 'gx:subOrganization', ['gx:LegalParticipant'], vcsMap)
				}
			} catch (e) {
				res.status(STATUS_CODES.BAD_REQUEST).json({
					error: (e as Error).message,
					message: AppMessages.VP_FAILED
				})
				return
			}

			const legalRegistrationNumberVc = await Utils.issueRegistrationNumberVC(axios, legalRegistrationNumber)
			logger.info(__filename, 'GXLegalParticipant', 'legalRegistrationNumber vc created', JSON.stringify(legalRegistrationNumberVc))

			const vcs = [legalParticipant, legalRegistrationNumberVc, gaiaXTermsAndConditions]

			privateKey = isVault ? await vaultService.getSecrets(privateKey) : Buffer.from(privateKey, 'base64').toString('ascii')
			// privateKey = process.env.PRIVATE_KEY as string

			for (let index = 0; index < vcs.length; index++) {
				const vc = vcs[index]
				// eslint-disable-next-line no-prototype-builtins
				if (!vc.hasOwnProperty('proof')) {
					const proof = await Utils.addProof(jsonld, axios, jose, crypto, vc, privateKey, verificationMethod, AppConst.RSA_ALGO, x5u)
					vcs[index].proof = proof
				}
			}

			vcs.push(...Array.from(vcsMap.values()))

			const selfDescription = Utils.createVP(vcs)
			logger.debug(__filename, 'GXLegalParticipant', 'selfDescription', req.custom.uuid, JSON.stringify(selfDescription))

			const complianceCredential = await axios.post(process.env.COMPLIANCE_SERVICE as string, selfDescription)
			logger.debug(__filename, 'GXLegalParticipant', 'complianceCRED', req.custom.uuid, { ...complianceCredential })

			// const complianceCredential = vcs
			logger.info(__filename, 'GXLegalParticipant', '🔒 SD signed successfully (compliance service)', req.custom.uuid)

			const completeSD = {
				selfDescriptionCredential: selfDescription,
				complianceCredential: complianceCredential.data
			}

			res.status(STATUS_CODES.OK).json({
				data: { completeSD },
				message: AppMessages.VP_SUCCESS
			})
		} catch (error: any) {
			logger.error(__filename, 'GXLegalParticipant', error.message, req.custom.uuid)
			if (error.response) {
				// If server responded with a status code for a request
				res.status(error.response.status).json({
					error: error.response.data,
					message: AppMessages.VP_FAILED
				})
			} else {
				res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
					error: (error as Error).message,
					message: AppMessages.VP_FAILED
				})
			}
		}
	}

	Resource = async (req: Request, res: Response): Promise<void> => {
		try {
			const { issuer, verificationMethod, isVault } = req.body
			const { resource } = req.body.vcs
			let { privateKey } = req.body

			logger.debug(__filename, 'Resource', 'Resource Creation', req.body.uuid, JSON.stringify(req.body))

			const VC = ['gx:DataResource', 'gx:PhysicalResource', 'gx:SoftwareResource'].includes(resource.credentialSubject.type)
			if (!VC) {
				logger.error(__filename, 'Verify', `❌ Verifiable Credential doesn't have type 'gx:DataResource' or  'gx:PhysicalResource' or 'gx:SoftwareResource'`, req.custom.uuid)
				res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).json({
					error: `VC with type 'gx:DataResource' or 'gx:PhysicalResource' or 'gx:SoftwareResource' not found!!`,
					message: AppMessages.VP_FAILED
				})
				return
			}

			const ddo = await Utils.getDDOfromDID(issuer, resolver)
			if (!ddo) {
				logger.error(__filename, 'GXLegalParticipant', `❌ DDO not found for given did: '${issuer}'`, req.custom.uuid)
				res.status(STATUS_CODES.BAD_REQUEST).json({
					error: `DDO not found for given did: '${issuer}'`,
					message: AppMessages.VP_FAILED
				})
				return
			}
			const { x5u } = await Utils.getPublicKeys(ddo.didDocument)
			privateKey = isVault ? await vaultService.getSecrets(privateKey) : Buffer.from(privateKey, 'base64').toString('ascii')
			// privateKey = process.env.PRIVATE_KEY as string
			const vcsMap = new Map()
			try {
				switch (resource.credentialSubject.type) {
					case 'gx:DataResource': {
						if (resource.credentialSubject['gx:copyrightOwnedBy']) {
							// A list of copyright owners
							await Utils.getInnerVCs(resource, 'gx:copyrightOwnedBy', ['gx:LegalParticipant'], vcsMap)
						}

						// A resolvable link to the participant
						if (resource.credentialSubject['gx:producedBy']) {
							await Utils.getInnerVC(resource, 'gx:producedBy', ['gx:LegalParticipant'], vcsMap)
						}

						// A resolvable link to the data exchange component that exposes the data resource. Type ServiceOffering
						if (resource.credentialSubject['gx:exposedThrough']) {
							await Utils.getInnerVC(resource, 'gx:exposedThrough', ['gx:ServiceOffering'], vcsMap)
						}

						break
					}
					case 'gx:PhysicalResource': {
						if (resource.credentialSubject['gx:maintainedBy']) {
							await Utils.getInnerVCs(resource, 'gx:maintainedBy', ['gx:LegalParticipant'], vcsMap)
						}
						if (resource.credentialSubject['gx:ownedBy']) {
							await Utils.getInnerVCs(resource, 'gx:ownedBy', ['gx:LegalParticipant'], vcsMap)
						}
						// A list of resolvable links
						if (resource.credentialSubject['gx:manufacturedBy']) {
							await Utils.getInnerVCs(resource, 'gx:manufacturedBy', ['gx:LegalParticipant'], vcsMap)
						}
						break
					}
					case 'gx:SoftwareResource': {
						if (resource.credentialSubject['gx:copyrightOwnedBy']) {
							await Utils.getInnerVCs(resource, 'gx:copyrightOwnedBy', ['gx:LegalParticipant'], vcsMap)
						}
						break
					}
				}

				if (resource.credentialSubject['gx:aggregationOf']) {
					await Utils.getInnerVCs(resource, 'gx:aggregationOf', ['gx:DataResource', 'gx:PhysicalResource', 'gx:SoftwareResource'], vcsMap)
				}
			} catch (e) {
				res.status(STATUS_CODES.BAD_REQUEST).json({
					error: (e as Error).message,
					message: AppMessages.VP_FAILED
				})
				return
			}

			const vcs = [resource]

			for (let index = 0; index < vcs.length; index++) {
				const vc = vcs[index]
				// eslint-disable-next-line no-prototype-builtins
				if (!vc.hasOwnProperty('proof')) {
					const proof = await Utils.addProof(jsonld, axios, jose, crypto, vc, privateKey, verificationMethod, AppConst.RSA_ALGO, x5u)
					vcs[index].proof = proof
				}
			}

			vcs.push(...Array.from(vcsMap.values()))

			const selfDescription = Utils.createVP(vcs)

			logger.debug(__filename, 'Resource', 'Resource Compliance', 'data', { url: process.env.COMPLIANCE_SERVICE, sd: JSON.stringify(selfDescription) })
			const complianceCredential = (await axios.post(process.env.COMPLIANCE_SERVICE as string, selfDescription)).data
			logger.info(
				__filename,
				'GXLegalParticipant',
				complianceCredential ? '🔒 SD signed successfully (compliance service)' : '❌ SD signing failed (compliance service)',
				req.custom.uuid
			)

			const completeSD = {
				selfDescriptionCredential: selfDescription,
				complianceCredential
			}

			res.status(STATUS_CODES.OK).json({
				data: { completeSD },
				message: AppMessages.VP_SUCCESS
			})
		} catch (e: any) {
			logger.error(__filename, 'Resource', e.message, req.custom.uuid, e)
			res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
				error: (e as Error).message,
				message: AppMessages.VP_FAILED
			})
		}
	}

	ServiceOffering = async (req: Request, res: Response): Promise<void> => {
		try {
			let { privateKey } = req.body
			const {
				isVault,
				verificationMethod,
				issuer: issuerDID,
				vcs: { serviceOffering }
			} = req.body

			logger.debug(__filename, 'ServiceOffering', 'Service offering VC', JSON.stringify(serviceOffering))
			// Data received in provided by will be the LP URL.
			// Extract it and fetch LP JSON from the URL
			const legalParticipantURL = serviceOffering['credentialSubject']['gx:providedBy']['id']
				
                        
			                         
                        
			const legalParticipant = await Utils.fetchParticipantJson(legalParticipantURL)
                        logger.debug(__filename, 'ServiceOffering','ParticipantJSONNNNNNNN',JSON.stringify(legalParticipant))
			
                
     		        const aggregationURL = serviceOffering['credentialSubject']['gx:aggregationOf'][0]['@id']
			logger.debug(__filename, 'ServiceOffering','DataResourceURL',aggregationURL)
			const dataResource = await Utils.fetchParticipantJson(aggregationURL)
                        logger.debug(__filename, 'ServiceOffering','DataResource',JSON.stringify(dataResource))
			
			const exposedURL = dataResource['credentialSubject']['gx:exposedThrough']['@id']
                        logger.debug(__filename, 'ServiceOffering','Exposed URL',exposedURL)
			const exposedResource = await Utils.fetchParticipantJson(exposedURL)
                        logger.debug(__filename, 'ServiceOffering','exposed Json',JSON.stringify(exposedResource))

			
		
			let {
				selfDescriptionCredential: { verifiableCredential }
			} = legalParticipant
			
                        //logger.debug(__filename, 'ServiceOffering','ParticipantJSONBBBBBBB',JSON.stringify(legalParticipant))


			// Get DID document of issuer from issuer DID
                        
			const ddo = await Utils.getDDOfromDID(issuerDID, resolver)
                        
			
	                                            
		        if (!ddo) {
				logger.error(__filename, 'ServiceOffering', `❌ DDO not found for given did: '${issuerDID}' in proof`, req.custom.uuid)
				res.status(STATUS_CODES.BAD_REQUEST).json({
					error: `DDO not found for given did: '${issuerDID}' in proof`,
					message: AppMessages.SD_SIGN_FAILED
				})
				return
			}

			// Extract certificate url from did document
			const { x5u } = await Utils.getPublicKeys(ddo.didDocument)
			if (!x5u) {
				logger.error(__filename, 'ServiceOffering', AppMessages.X5U_NOT_FOUND, req.custom.uuid)
				res.status(STATUS_CODES.BAD_REQUEST).json({
					error: AppMessages.X5U_NOT_FOUND,
					message: AppMessages.SD_SIGN_FAILED
				})
				return
			}

			// Decrypt private key(received in request) from base64 to raw string
			privateKey = isVault ? await vaultService.getSecrets(privateKey) : Buffer.from(privateKey, 'base64').toString('ascii')
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
			const proof = await Utils.addProof(jsonld, axios, jose, crypto, serviceOffering, privateKey, verificationMethod, AppConst.RSA_ALGO, x5u)
			serviceOffering.proof = proof
			verifiableCredential.push(serviceOffering)
		
			verifiableCredential.push(dataResource)
			verifiableCredential.push(exposedResource)




			const { credentialSubject: serviceOfferingCS } = serviceOffering
			const vcsMap = new Map()

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

			
	

			verifiableCredential.push(...Array.from(vcsMap.values()))
			verifiableCredential = Utils.removeDuplicates(verifiableCredential, 'id')

			// Create VP for service offering
			const selfDescriptionCredentialVP = Utils.createVP(verifiableCredential)

			// Call compliance service to sign in gaia-x
			const complianceCredential = await Utils.callServiceOfferingCompliance(selfDescriptionCredentialVP)

			const completeSD = {
				selfDescriptionCredential: selfDescriptionCredentialVP,
				complianceCredential: complianceCredential
			}

			// Calculate Veracity
			const { veracity, certificateDetails } = await Utils.calcVeracity(verifiableCredential, resolver)
			logger.debug(__filename, 'ServiceOffering', '🔒 veracity calculated', req.custom.uuid)

			// Calculate Transparency
			const transparency: number = await Utils.calcTransparency(serviceOfferingCS)
			logger.debug(__filename, 'ServiceOffering', '🔒 transparency calculated', req.custom.uuid)

			// Calculate TrustIndex
			const trustIndex: number = Utils.calcTrustIndex(veracity, transparency)
			logger.debug(__filename, 'ServiceOffering', '🔒 trustIndex calculated', req.custom.uuid)

			res.status(STATUS_CODES.OK).json({
				data: {
					completeSD,
					trustIndex: {
						veracity,
						transparency,
						trustIndex,
						certificateDetails
					}
				},
				message: AppMessages.SD_SIGN_SUCCESS
			})
		} catch (error) {
			// logger.error(__filename, 'ServiceOffering', `❌ ${AppMessages.SD_SIGN_FAILED}`, req.custom.uuid, error)
			res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
				error: (error as Error).message,
				message: AppMessages.SD_SIGN_FAILED
			})
		}
	}

	Verify = async (req: Request, res: Response): Promise<void> => {
		/**
		 * Request Body :
				1. url : EG . https://greenworld.proofsense.in/.well-known/participant.json
			  2. policies : policy we want to check
		 */

		//todo : compliance check is remaining
		try {
			const { url, policies } = req.body
			const verificationStatus: VerificationStatus = {
				valid: false
			}

			logger.debug(__filename, 'Verify', 'fetching participant json...', req.custom.uuid)
			const participantJson = await Utils.fetchParticipantJson(url)

			//check if VC not null or in other form
			if (!participantJson?.selfDescriptionCredential?.verifiableCredential) {
				logger.error(__filename, 'Verify', `❌ No Verifiable Credential Found`, req.custom.uuid)
				res.status(STATUS_CODES.BAD_REQUEST).json({
					error: `VC not found`,
					message: AppMessages.SIG_VERIFY_FAILED
				})
				return
			} else if (!Array.isArray(participantJson.selfDescriptionCredential.verifiableCredential)) {
				logger.error(__filename, 'Verify', `❌ Verifiable Credential isn't array`, req.custom.uuid)
				res.status(STATUS_CODES.BAD_REQUEST).json({
					error: `VC not valid`,
					message: AppMessages.SIG_VERIFY_FAILED
				})
				return
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
			const { verifiableCredential, type } = participantJson.selfDescriptionCredential
			if (!Array.isArray(type) || !(type.includes('VerifiableCredential') || type.includes('VerifiablePresentation'))) {
				logger.error(__filename, 'Verify', `❌ Credential Type not supported`, req.custom.uuid)
				res.status(STATUS_CODES.BAD_REQUEST).json({
					error: `Credential Type not supported`,
					message: AppMessages.SIG_VERIFY_FAILED
				})
				return
			}

			const typeName = await Utils.getVcType(verifiableCredential, url)

			verificationStatus.gxType = typeName
			if (
				![
					'gx:ServiceOffering',
					'gx:LegalParticipant',
					'gx:DataResource',
					'gx:PhysicalResource',
					'gx:SoftwareResource',
					'gx:legalRegistrationNumber',
					'gx:GaiaXTermsAndConditions'
				].includes(typeName)
			) {
				res.status(STATUS_CODES.BAD_REQUEST).json({
					error: `${url} VC ID not found or VC doesn't have supported type`,
					message: AppMessages.SIG_VERIFY_FAILED
				})
				return
			}
			for (const policy of policies) {
				logger.debug(__filename, 'Verify', `Executing ${policy} check ...`, req.custom.uuid)
				switch (policy) {
					case AppConst.VERIFY_LP_POLICIES[0]: {
						// integrity check
						let allChecksPassed = true

						for (const vc of participantJson.selfDescriptionCredential.verifiableCredential) {
							let vcID = ''
							const integrityHash = `sha256-${createHash('sha256')
								.update(canonicalize(vc) as any)
								.digest('hex')}`
							if (Array.isArray(vc.credentialSubject)) {
								vcID = vc.credentialSubject[0].id
							} else {
								vcID = vc.credentialSubject.id
							}
							const credIntegrityHash = participantJson.complianceCredential?.credentialSubject?.find((cs: ComplianceCredential) => cs.id == vcID)['gx:integrity']
							const integrityCheck = integrityHash === credIntegrityHash

							if (!integrityCheck) {
								allChecksPassed = false
								logger.error(__filename, 'Verify', `❌ Integrity Failed`, req.custom.uuid)
								break
							}
						}
						verificationStatus.integrityCheck = allChecksPassed
						break
					}

					case AppConst.VERIFY_LP_POLICIES[1]: {
						//holder sig verification
						for (const vc of verifiableCredential) {
							const vcProof = JSON.parse(JSON.stringify(vc.proof))
							const vcCredentialContent = JSON.parse(JSON.stringify(vc))
							delete vcCredentialContent.proof
							verificationStatus.holderSignature = await Utils.verification(vcCredentialContent, vcProof, process.env.CHECK_SSL == 'true', resolver)
						}
						break
					}
					case AppConst.VERIFY_LP_POLICIES[2]: {
						// compliance sig verification

						const complianceCred = JSON.parse(JSON.stringify(participantJson.complianceCredential))
						const complianceProof = JSON.parse(JSON.stringify(complianceCred.proof))
						delete complianceCred.proof
						//it was initially false
						verificationStatus.complianceSignature = await Utils.verification(complianceCred, complianceProof, false, resolver)
						break
					}
					case AppConst.VERIFY_LP_POLICIES[3]: {
						const complianceCred = JSON.parse(JSON.stringify(participantJson.complianceCredential))
						const expirationDate = new Date(complianceCred.expirationDate).getTime()
						const now = new Date().getTime()
						verificationStatus.complianceCheck = expirationDate > now
						break
					}
				}
			}

			let validity = true

			for (const status in verificationStatus) {
				if (status !== 'valid' && !verificationStatus[status as keyof typeof verificationStatus]) {
					validity = false
					break
				}
			}

			verificationStatus.valid = validity
			res.status(STATUS_CODES.OK).json({
				data: { ...verificationStatus },
				message: AppMessages.SIG_VERIFY_SUCCESS
			})
		} catch (error) {
			res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
				error: (error as Error).message,
				message: AppMessages.SIG_VERIFY_FAILED
			})
		}
	}
	GetTrustIndex = async (req: Request, res: Response): Promise<void> => {
		try {
			const { participantSD, serviceOfferingSD } = req.body
			if (!Utils.IsValidURL(participantSD)) {
				res.status(STATUS_CODES.BAD_REQUEST).json({
					error: 'Invalid participant self description url format',
					message: AppMessages.TRUST_INDEX_CALC_FAILED
				})
				return
			}
			if (!Utils.IsValidURL(serviceOfferingSD)) {
				res.status(STATUS_CODES.BAD_REQUEST).json({
					error: 'Invalid service offering self description url format',
					message: AppMessages.TRUST_INDEX_CALC_FAILED
				})
				return
			}

			// get the json document of participant self description
			const {
				selfDescriptionCredential: { verifiableCredential }
			} = await Utils.fetchParticipantJson(participantSD)
			const { veracity, certificateDetails } = await Utils.calcVeracity(verifiableCredential, resolver)
			logger.debug(__filename, 'GetTrustIndex', `veracity :- ${veracity}`, req.custom.uuid)

			// get the json document of service offering
			const {
				selfDescriptionCredential: { verifiableCredential: verifiableCredentialVCS }
			} = await Utils.fetchServiceOfferingJson(serviceOfferingSD)

			const serviceOfferingVC = verifiableCredentialVCS.find((credential: any) => {
				const {
					credentialSubject: { type, id }
				} = credential
				return type === 'gx:ServiceOffering' && id === serviceOfferingSD
			})

			const { credentialSubject } = serviceOfferingVC
			const transparency: number = await Utils.calcTransparency(credentialSubject)
			logger.debug(__filename, 'GetTrustIndex', `transparency :-, ${transparency}`, req.custom.uuid)

			const trustIndex: number = Utils.calcTrustIndex(veracity, transparency)
			logger.debug(__filename, 'GetTrustIndex', `trustIndex :-, ${trustIndex}`, req.custom.uuid)

			res.status(STATUS_CODES.OK).json({
				message: 'Success',
				data: {
					veracity,
					transparency,
					trustIndex,
					certificateDetails
				}
			})
		} catch (error) {
			logger.error(__filename, 'GetTrustIndex', `❌ ${AppMessages.TRUST_INDEX_CALC_FAILED} : ${error}`, req.custom.uuid)
			res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
				error: (error as Error).message,
				message: AppMessages.TRUST_INDEX_CALC_FAILED
			})
		}
	}

	CreateWebDID = async (req: Request, res: Response): Promise<void> => {
		try {
			const { domain, tenant, services } = req.body
			let x5uURL = req.body.x5u
			const didId = tenant ? `did:web:${domain}:${tenant}` : `did:web:${domain}`

			if (!x5uURL) {
				x5uURL = tenant ? `https://${domain}/${tenant}/x509CertificateChain.pem` : `https://${domain}/.well-known/x509CertificateChain.pem`
			}
			let certificate = null
			try {
				certificate = (await axios.get(x5uURL)).data as string
			} catch (e: any) {
				logger.error(__filename, 'CreateWebDID', e.message, req.custom.uuid, e)
				res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).json({
					error: `x5u URL not resolved: ${x5uURL}`,
					message: AppMessages.DID_FAILED
				})
				return
			}
			const publicKeyJwk = await Utils.generatePublicJWK(jose, AppConst.RSA_ALGO, certificate, x5uURL)
			if (!publicKeyJwk) {
				logger.error(__filename, 'CreateWebDID', '❌ fail to create publicKeyJWK', req.custom.uuid)
				throw new Error('fail to create publicKeyJWK')
			}
			const did = await Utils.generateDID(didId, publicKeyJwk, services)
			if (!did) {
				logger.error(__filename, 'CreateWebDID', '❌ fail to create did', req.custom.uuid)
				throw new Error('fail to create did')
			}
			res.status(STATUS_CODES.OK).json({
				data: { did },
				message: AppMessages.DID_SUCCESS
			})
		} catch (e: any) {
			logger.error(__filename, 'CreateWebDID', e.message, req.custom.uuid, e)
			res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
				error: (e as Error).message,
				message: AppMessages.DID_FAILED
			})
		}
	}

	VerifyWebDID = async (req: Request, res: Response): Promise<void> => {
		try {
			const { did, verificationMethod, privateKey, isVault } = req.body
			const ddo = await Utils.getDDOfromDID(did, resolver)
			if (!ddo) {
				logger.error(__filename, 'VerifyWebDID', `❌ DDO not found for given did: '${did}'`, req.custom.uuid)
				res.status(STATUS_CODES.BAD_REQUEST).json({
					error: `DDO not found for given did: '${did}'`,
					message: AppMessages.DID_VERIFY_FAILED
				})
				return
			}
			const {
				didDocument: { verificationMethod: verificationMethodArray }
			} = ddo
			const foundVerificationMethod = verificationMethodArray.find((e: any) => e.id === verificationMethod)
			if (!foundVerificationMethod) {
				logger.error(__filename, 'VerifyWebDID', `❌ Verification Method not found in DDO: '${verificationMethod}'`, req.custom.uuid)
				res.status(STATUS_CODES.BAD_REQUEST).json({
					error: `Verification Method not found in DDO: '${verificationMethod}'`,
					message: AppMessages.DID_VERIFY_FAILED
				})
				return
			}
			const decodedPrivateKey = isVault ? await vaultService.getSecrets(privateKey) : Buffer.from(privateKey, 'base64').toString('ascii')
			// const decodedPrivateKey = process.env.PRIVATE_KEY as string
			const hash = 'sampleText'
			const jws = await Utils.sign(jose, AppConst.RSA_ALGO, hash, decodedPrivateKey)

			try {
				const isValid = await Utils.verify(jose, jws.replace('..', `.${hash}.`), AppConst.RSA_ALGO, foundVerificationMethod.publicKeyJwk, hash)
				// const isValid = false
				res.status(STATUS_CODES.OK).json({
					data: { isValid },
					message: isValid ? AppMessages.DID_VERIFY : AppMessages.DID_VERIFY_FAILED
				})
			} catch (e: any) {
				logger.error(__filename, 'VerifyWebDID', e.message, req.custom.uuid)
				res.status(STATUS_CODES.OK).json({
					data: { isValid: false },
					message: AppMessages.DID_VERIFY_FAILED
				})
			}
		} catch (e: any) {
			logger.error(__filename, 'VerifyWebDID', e.message, req.custom.uuid)
			res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
				error: (e as Error).message,
				message: AppMessages.DID_VERIFY_FAILED
			})
		}
	}

	ValidateRegistrationNumber = async (req: Request, res: Response): Promise<void> => {
		try {
			const { legalRegistrationNumber } = req.body
			const isValid = (await Utils.issueRegistrationNumberVC(axios, legalRegistrationNumber)) ? true : false
			res.status(STATUS_CODES.OK).json({
				data: { isValid },
				message: isValid ? AppMessages.RN_VERIFY : AppMessages.RN_VERIFY_FAILED
			})
		} catch (e: any) {
			logger.error(__filename, 'ValidateRegistrationNumber', e.message, req.custom.uuid)
			res.status(STATUS_CODES.OK).json({
				data: { isValid: false },
				message: AppMessages.RN_VERIFY_FAILED
			})
		}
	}

	LabelLevel = async (req: Request, res: Response): Promise<void> => {
		try {
			let { privateKey } = req.body
			const {
				verificationMethod,
				isVault,
				issuer: issuerDID,
				vcs: { labelLevel }
			} = req.body
			// Get DID document of issuer from issuer DID
			const ddo = await Utils.getDDOfromDID(issuerDID, resolver)
			if (!ddo) {
				logger.error(__filename, 'LabelLevel', `❌ DDO not found for given did: '${issuerDID}' in proof`, req.custom.uuid)
				res.status(STATUS_CODES.BAD_REQUEST).json({
					error: `DDO not found for given did: '${issuerDID}' in proof`,
					message: AppMessages.LL_SIGN_FAILED
				})
				return
			}

			const { credentialSubject: labelLevelCS } = labelLevel
			if (!labelLevelCS) {
				logger.error(__filename, 'LabelLevel', AppMessages.CS_EMPTY, req.custom.uuid)
				res.status(STATUS_CODES.BAD_REQUEST).json({
					error: AppMessages.CS_EMPTY,
					message: AppMessages.LL_SIGN_FAILED
				})
				return
			}

			// Calculate LabelLevel
			const labelLevelResult = await Utils.calcLabelLevel(labelLevelCS)
			if (labelLevelResult === '') {
				logger.error(__filename, 'LabelLevel', AppMessages.LABEL_LEVEL_CALC_FAILED, req.custom.uuid)
				res.status(STATUS_CODES.BAD_REQUEST).json({
					error: AppMessages.LABEL_LEVEL_CALC_FAILED,
					message: AppMessages.LL_SIGN_FAILED
				})
				return
			}
			labelLevelCS['gx:labelLevel'] = labelLevelResult
			logger.debug(__filename, 'LabelLevel', '🔒 labelLevel calculated', req.custom.uuid)

			// Extract certificate url from did document
			const { x5u } = await Utils.getPublicKeys(ddo.didDocument)
			if (!x5u || x5u == '') {
				logger.error(__filename, 'LabelLevel', AppMessages.X5U_NOT_FOUND, req.custom.uuid)
				res.status(STATUS_CODES.BAD_REQUEST).json({
					error: AppMessages.X5U_NOT_FOUND,
					message: AppMessages.LL_SIGN_FAILED
				})
				return
			}

			// Decrypt private key(received in request) from base64 to raw string
			privateKey = isVault ? await vaultService.getSecrets(privateKey) : Buffer.from(privateKey, 'base64').toString('ascii')

			// Sign service offering self description with private key(received in request)
			const proof = await Utils.addProof(jsonld, axios, jose, crypto, labelLevel, privateKey, verificationMethod, AppConst.RSA_ALGO, x5u)
			labelLevel.proof = proof

			const completeSD = {
				selfDescriptionCredential: labelLevel,
				complianceCredential: {}
			}
			res.status(STATUS_CODES.OK).json({
				data: completeSD,
				message: AppMessages.LL_SIGN_SUCCESS
			})
		} catch (error) {
			logger.error(__filename, 'LabelLevel', `❌ ${AppMessages.LL_SIGN_FAILED}`, req.custom.uuid, '')
			res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
				error: (error as Error).message,
				message: AppMessages.LL_SIGN_FAILED
			})
		}
	}
}

export default new SignerToolController()
