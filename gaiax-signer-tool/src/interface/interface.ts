export interface DidDocument {
	'@context': string[]
	id: string
	verificationMethod: any
	assertionMethod: string[]
	service?: Service[]
}

export interface Service {
	id: string
	type: string
	serviceEndpoint: string
}

export interface X509CertificateDetail {
	validFrom: string
	validTo: string
	subject: {
		jurisdictionCountry: string | null
		jurisdictionSate: string | null
		jurisdictionLocality: string | null
		businessCategory: string | null
		serialNumber: string | null
		country: string | null
		state: string | null
		locality: string | null
		organization: string | null
		commonName: string | null
	}
	issuer: {
		commonName: string | null
		organization: string | null
		country: string | null
	}
}

export interface LegalRegistrationNumberDto {
	'@context': string[] | any
	id: string
	type: string
	[key: string]: string
}

export interface VerifiableCredentialDto {
	'@context': string[] | any
	type: string | string[]
	id?: string
	credentialSubject: any
	issuer: string
	expirationDate?: string
	issuanceDate: string
	proof: SignatureDto
}

export interface SignatureDto {
	type: string
	created: string
	proofPurpose: string
	jws: string
	verificationMethod: string
}

export interface VerificationStatus {
	integrityCheck?: boolean
	holderSignature?: boolean
	complianceSignature?: boolean
	complianceCheck?: boolean
	gxType?: string
	valid: boolean
}

export interface ComplianceCredential {
	type: string
	id: string
	integrity: string
	version: string
}

export type PublicKeyJwk = {
	kty: string
	n: string
	e: string
	alg: string
	x5u: string
}

export type VerificationMethod = {
	'@context': string
	id: string
	type: string
	controller: string
	publicKeyJwk: PublicKeyJwk
}
