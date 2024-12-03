;`/ pragma: allowlist-secret /`

export const participantJson = {
	selfDescriptionCredential: {
		'@context': 'https://www.w3.org/2018/credentials/v1',
		type: ['VerifiablePresentation'],
		verifiableCredential: [
			{
				credentialSubject: {
					'gx:legalName': 'Gaia-x MVP',
					'gx:headquarterAddress': { 'gx:countrySubdivisionCode': 'AD-07' },
					'gx:legalAddress': { 'gx:countrySubdivisionCode': 'AD-07' },
					id: 'https://gxmvp.dev.smart-x.smartsenselabs.com/74245438-c8b8-425f-ab47-20f0a8d4a782/participant.json#0',
					type: 'gx:LegalParticipant',
					'gx:legalRegistrationNumber': { id: 'https://gxmvp.dev.smart-x.smartsenselabs.com/74245438-c8b8-425f-ab47-20f0a8d4a782/participant.json#1' }
				},
				'@context': [
					'https://www.w3.org/2018/credentials/v1',
					'https://w3id.org/security/suites/jws-2020/v1',
					'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
				],
				type: ['VerifiableCredential'],
				id: 'did:web:gxmvp.dev.smart-x.smartsenselabs.com',
				issuer: 'did:web:gxmvp.dev.smart-x.smartsenselabs.com',
				issuanceDate: '2023-09-14T14:34:23.468336874Z',
				proof: {
					type: 'JsonWebSignature2020',
					created: '2023-09-14T14:34:25.781Z',
					proofPurpose: 'assertionMethod',
					verificationMethod: 'did:web:gxmvp.dev.smart-x.smartsenselabs.com',
					jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..W1RqfbKc96OJGEzmx9IAh22wbQEIvexbdC_2z8V2GTZyfiM0zhCUZ-tfSZqsflYI7Wum0dffnGYklHenBJCn2RBz27XaO2PHW4myPm9Ee6OiFeNV5VnNp29KeaGvoSt6tHOAOpXpFjdAexfxrPBDvexeXqdxwGcu4UGcB7AnN3xmbCXgPtCLEkyC-Gr90pXRRwvdxxgJrC5uFAF6H2Qkf_yx5vff4ZrQrZRyGGlPKf9_ZsWKzOuSvsC_M_OuqX4JfG0u-J7C3XnDStVrMRtYewGUVjRUoJKisvFyKmMe0U1K7zfWMXQkEjy9SSPVB8sPEyFaqMCXWHv7LtABS5fiBQ'
				}
			},
			{
				'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
				type: ['VerifiableCredential'],
				id: 'https://gxmvp.dev.smart-x.smartsenselabs.com/74245438-c8b8-425f-ab47-20f0a8d4a782/participant.json#1',
				issuer: 'did:web:registration.lab.gaia-x.eu:development',
				issuanceDate: '2023-09-14T14:34:23.972Z',
				credentialSubject: {
					'@context': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
					type: 'gx:legalRegistrationNumber',
					id: 'https://gxmvp.dev.smart-x.smartsenselabs.com/74245438-c8b8-425f-ab47-20f0a8d4a782/participant.json#1',
					'gx:vatID': 'FR79537407926',
					'gx:vatID-countryCode': 'FR'
				},
				evidence: [
					{ 'gx:evidenceURL': 'http://ec.europa.eu/taxation_customs/vies/services/checkVatService', 'gx:executionDate': '2023-09-14T14:34:23.972Z', 'gx:evidenceOf': 'gx:vatID' }
				],
				proof: {
					type: 'JsonWebSignature2020',
					created: '2023-09-14T14:34:24.821Z',
					proofPurpose: 'assertionMethod',
					verificationMethod: 'did:web:registration.lab.gaia-x.eu:development#X509-JWK2020',
					jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..TlrHrKuWRSYfxoJVYCACXkr0pZn3ucopTGj1fAxASysdHZZ1uTwBSVPyasbRk88ql0OVGELRuqK4xJF3YFJidvCAM1bO5ZFLA3S2iMrCcYvnIjlT52fe1zBR8aFLnlB6PUTA3-ZUj5kheJZ44YXDkKlGcPSEqBJJdYj11ZReEbOHzjK6ZwZW4eUJRYUatq5QUdYeA1G-yR4oRqQobdWC2MUlVO9EzBba10fcFfvGReudsF5BvhoBS3Ui7D2wtE0_ck4WtzHbadbC-pvV2BE2vpaPhgqzJNnekb8wDvO13hWSrhGWbw-RN01PlHMEd0YNopqvzgSbYvuWVgvwAE3tMw'
				}
			},
			{
				'@context': [
					'https://www.w3.org/2018/credentials/v1',
					'https://w3id.org/security/suites/jws-2020/v1',
					'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
				],
				credentialSubject: {
					'@Context': [
						'https://www.w3.org/2018/credentials/v1',
						'https://w3id.org/security/suites/jws-2020/v1',
						'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
					],
					'gx:termsAndConditions':
						'The PARTICIPANT signing the Self-Description agrees as follows:\n- to update its descriptions about any changes, be it technical, organizational, or legal - especially but not limited to contractual in regards to the indicated attributes present in the descriptions.\n\nThe keypair used to sign Verifiable Credentials will be revoked where Gaia-X Association becomes aware of any inaccurate statements in regards to the claims which result in a non-compliance with the Trust Framework and policy rules defined in the Policy Rules and Labelling Document (PRLD).',
					id: 'https://gxmvp.dev.smart-x.smartsenselabs.com/74245438-c8b8-425f-ab47-20f0a8d4a782/participant.json#2',
					type: 'gx:GaiaXTermsAndConditions'
				},
				id: 'did:web:gxmvp.dev.smart-x.smartsenselabs.com',
				issuanceDate: '2023-09-14T14:34:23.468336874Z',
				issuer: 'did:web:gxmvp.dev.smart-x.smartsenselabs.com',
				type: ['VerifiableCredential'],
				proof: {
					type: 'JsonWebSignature2020',
					created: '2023-09-14T14:34:26.212Z',
					proofPurpose: 'assertionMethod',
					verificationMethod: 'did:web:gxmvp.dev.smart-x.smartsenselabs.com',
					jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..m0sAZfWT0a9w_m3ohU_amSwDJQ9NmafiC0l2kQt8t-9nJtyAqy--9TTvg6nP1VQsk3Mr6vhrqgZx6aWGnKdmXp6mBllcqLlzh2TPtOhJVY6CkA6MC2hjdc1rnLA2AXoS_L_uVtfEjLjz2all6GgOnDBiAAn94wo0y5VUmsg4JZkeKdjy7krfdNh9YGMXj5xigZz905yNx6_VWPQcKe2o0Ss-J5uDYcE5dG6p6zmFhsBEC8uCxX4RSiY96hUvHUMOtIzhbh9fYPPX3NGfNg4Tla3f6ZEzQkGME99xpEa7zphv5sH6Fq6XitaUIbXdgpbt5lpA8eqAeeM8iMVym8wgGg'
				}
			}
		]
	},
	complianceCredential: {
		'@context': [
			'https://www.w3.org/2018/credentials/v1',
			'https://w3id.org/security/suites/jws-2020/v1',
			'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
		],
		type: ['VerifiableCredential'],
		id: 'https://compliance.lab.gaia-x.eu/development/credential-offers/e1f57c4f-7d36-4e4e-8f81-1e80ba93e77b',
		issuer: 'did:web:compliance.lab.gaia-x.eu:development',
		issuanceDate: '2023-09-14T14:34:33.449Z',
		expirationDate: '2023-12-13T14:34:33.449Z',
		credentialSubject: [
			{
				type: 'gx:compliance',
				id: 'https://gxmvp.dev.smart-x.smartsenselabs.com/74245438-c8b8-425f-ab47-20f0a8d4a782/participant.json#0',
				'gx:integrity': 'sha256-0e1ade0c72e1ed845a849d58484bdca6e7b9a53fec084202250db5ab10acadb0',
				'gx:integrityNormalization': 'RFC8785:JCS',
				'gx:version': '22.10',
				'gx:type': 'gx:LegalParticipant'
			},
			{
				type: 'gx:compliance',
				id: 'https://gxmvp.dev.smart-x.smartsenselabs.com/74245438-c8b8-425f-ab47-20f0a8d4a782/participant.json#1',
				'gx:integrity': 'sha256-84ad42e047996dda5bdcededc8df5f65c1bbacc260f359d5e02117c884bb376d',
				'gx:integrityNormalization': 'RFC8785:JCS',
				'gx:version': '22.10',
				'gx:type': 'gx:legalRegistrationNumber'
			},
			{
				type: 'gx:compliance',
				id: 'https://gxmvp.dev.smart-x.smartsenselabs.com/74245438-c8b8-425f-ab47-20f0a8d4a782/participant.json#2',
				'gx:integrity': 'sha256-e49f54cdb1344df040f755002545e4f22a58c48630b00a7267fab5900ed55ed6',
				'gx:integrityNormalization': 'RFC8785:JCS',
				'gx:version': '22.10',
				'gx:type': 'gx:GaiaXTermsAndConditions'
			}
		],
		proof: {
			type: 'JsonWebSignature2020',
			created: '2023-09-14T14:34:33.460Z',
			proofPurpose: 'assertionMethod',
			jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..Wh0vdhxG-4dMd7R-K7wwvUgESNLxe2ohEgphJO7ugw9KRXnYs5MlIrORGIm7BQNAXWg4cIi8yjHA2aUeDjfZgw8rOY8fOen6md7xAPGPH1KB4KJ9LxM3vf1hP1xvOrO4KhgFogceystdlhCYqtDNeO5vcqJA4zufck9T-fxhtKDMBvaYAyrK8oybwxuf6zS3-62B2KHJh_HMy2aO5saduM3XTSIZN46E3mHuVNPfuCc8W9o9GoASLPnI1cq4skggE_KCFTte6W71r4L-XAnJTj6BFCB4CPb1MWT3NBoUYnkDf4_KemICoI9NNe7Xp12i4B_5CLshz-cPN8IQN4TA4w',
			verificationMethod: 'did:web:compliance.lab.gaia-x.eu:development#X509-JWK2020'
		}
	}
}

export const holderDdoJson = {
	'@context': ['https://www.w3.org/ns/did/v1'],
	id: 'did:web:greenworld.proofsense.in',
	//pragma: allowlist secret
	verificationMethod: [
		{
			'@context': 'https://w3c-ccg.github.io/lds-jws2020/contexts/v1/',
			id: 'did:web:greenworld.proofsense.in',
			type: 'JsonWebKey2020',
			controller: 'did:web:greenworld.proofsense.in',
			//removed n to pass Detect secret
			publicKeyJwk: {
				kty: 'RSA',
				e: 'AQAB',
				alg: 'PS256',
				x5u: 'https://greenworld.proofsense.in/.well-known/x509CertificateChain.pem'
			}
		}
	],
	assertionMethod: ['did:web:greenworld.proofsense.in#JWK2020-RSA']
}

export const legalRegistrationNumberJson = {
	'@context': ['https://www.w3.org/2018/credentials/v1'],
	type: 'VerifiableCredential',
	id: 'did:web:example.com:legalRegistrationNumber1',
	issuer: 'did:web:localhost%3A3000',
	issuanceDate: '2023-03-31T13:32:07.979Z',
	credentialSubject: {
		'@context': {
			gx: 'http://localhost:3000/gx#'
		},
		type: 'gx:legalRegistrationNumber',
		id: 'did:web:gaia-x.eu:legalRegistrationNumber.json',
		'gx:vatID': 'FR79537407926'
	},
	proof: {
		type: 'JsonWebSignature2020',
		created: '2023-03-31T13:32:08.528Z',
		proofPurpose: 'assertionMethod',
		verificationMethod: 'did:web:localhost%3A3000',
		jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..hhuXhVcYLICP3R0mGjyjfA6yZOw0qlRkQLFh5aTEBWEwgb6Fwr8LpPl5vHRVTNz7P6lR-AJ9SrJF7C_Bij-zbT3uRthRss0gWMO2bTBbqrhqN_I2tT7mUMZcl0F-DfjRPo4oVo2VV0MNgh23Ep6P0JjXv7PA0Wl_yb3Rt0ZFvkCigdxhatkdOPfENt-ArXyBgNn5JghSUwCzE5xbmuVeU93aFlA8gIWYh-FdtgggfoGIDObJVTuEqzy5kvfERSTa-gXpVctqFOYRGMS4jYzC9qj4YS4KKqeGafSsj60G2rOJkB6rcUYvzTe543QKv2V9bkCgfH3aAxt15FMeH7D6uA'
	}
}

export const ServiceOfferingParticipantJson = {
	selfDescriptionCredential: {
		'@context': 'https://www.w3.org/2018/credentials/v1',
		type: ['VerifiablePresentation'],
		verifiableCredential: [
			{
				credentialSubject: {
					'gx:legalName': 'milton',
					'gx:headquarterAddress': {
						'gx:countrySubdivisionCode': 'AD-03'
					},
					'gx:legalAddress': {
						'gx:countrySubdivisionCode': 'AD-03'
					},
					id: 'https://milton.dev.smart-x.smartsenselabs.com/6723b472-65b0-4a4f-94ce-9d7a4ed9e4af/participant.json#0',
					type: 'gx:LegalParticipant',
					'gx:legalRegistrationNumber': {
						id: 'https://milton.dev.smart-x.smartsenselabs.com/6723b472-65b0-4a4f-94ce-9d7a4ed9e4af/participant.json#1'
					}
				},
				'@context': [
					'https://www.w3.org/2018/credentials/v1',
					'https://w3id.org/security/suites/jws-2020/v1',
					'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
				],
				type: ['VerifiableCredential'],
				id: 'https://milton.dev.smart-x.smartsenselabs.com/6723b472-65b0-4a4f-94ce-9d7a4ed9e4af/participant.json#0',
				issuer: 'did:web:milton.dev.smart-x.smartsenselabs.com',
				issuanceDate: '2024-03-01T09:19:08.858530778Z',
				proof: {
					type: 'JsonWebSignature2020',
					created: '2024-03-01T09:19:15.768Z',
					proofPurpose: 'assertionMethod',
					verificationMethod: 'did:web:milton.dev.smart-x.smartsenselabs.com',
					jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..g5qv0jPT7y33Pf_8rJxwOzPUtK9TbVt17TB2uAmZgsu98gbkdecl-SIChs8I1OVZjRzsetmM079ysuUuvD0FdVBUl4TfpsoTFbfVd81ZCD6-CcfrypSvh0-KezzA8cG9HfHkm62NkYrIuMjoiAAEJm8Cv36nLb4RPT5nsIGxl7jrCx4NQNWhHbqwlLjAwFZD9QLw7KLOU9Wmb4tP3HnHKdhFJPv6xQlfYZDalkn8SjfXdNQVNnYVhFu7pRVOZ6ajzq3wJMcXZiPnG8LG2QpQKOvUUnBOr6OGE8KuljepuCI7PwTEshVYB2Ve6Tv7XWD6mRTqgQaGoHJTxiB91EKyLg'
				}
			},
			{
				'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
				type: ['VerifiableCredential'],
				id: 'https://milton.dev.smart-x.smartsenselabs.com/6723b472-65b0-4a4f-94ce-9d7a4ed9e4af/participant.json#1',
				issuer: 'did:web:registrationnumber.notary.lab.gaia-x.eu:main',
				issuanceDate: '2024-03-01T09:19:13.416+00:00',
				credentialSubject: {
					'@context': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
					id: 'https://milton.dev.smart-x.smartsenselabs.com/6723b472-65b0-4a4f-94ce-9d7a4ed9e4af/participant.json#1',
					type: 'gx:legalRegistrationNumber',
					'gx:vatID': 'FR79537407926',
					'gx:vatID-countryCode': 'FR'
				},
				evidence: [
					{
						'gx:evidenceOf': 'VAT_ID',
						'gx:evidenceURL': 'http://ec.europa.eu/taxation_customs/vies/services/checkVatService',
						'gx:executionDate': '2024-03-01T09:19:13.415+00:00'
					}
				],
				proof: {
					type: 'JsonWebSignature2020',
					created: '2024-03-01T09:19:14.524+00:00',
					proofPurpose: 'assertionMethod',
					verificationMethod: 'did:web:registrationnumber.notary.lab.gaia-x.eu:main#X509-JWK2020',
					jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..SvMoHF6SiPVlU-nBgpzFdNA1nw13y8Ea6NdeOEnmPH3xsRGhz5Zlworr991tLM-XaExsEB87z8roQTcjhM3ML8ZetTND5a3fe8Mgv6TdCiw5dJP5pKtmBc0QYj7gnKwBZDcEPVqoTthLISitF-wc36_VVvdlG1obFWkWdY08LeNL9TAlP8UjGe6uI812yfFK-53xVncv_eva2PDgwL1wKrrIFIig-Bj0vANekFMFMY_1m8WmZu7oRBQRAW-J_5aX881l2d9UBhvMJqlvUMkNjBOoybbGPVDa-RynILsmIGHYMB2v9G6XURPHx_R8nu1XNZJ024xXS75ieWretj0E-Q'
				}
			},
			{
				'@context': [
					'https://www.w3.org/2018/credentials/v1',
					'https://w3id.org/security/suites/jws-2020/v1',
					'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
				],
				credentialSubject: {
					'gx:termsAndConditions':
						'The PARTICIPANT signing the Self-Description agrees as follows:\n- to update its descriptions about any changes, be it technical, organizational, or legal - especially but not limited to contractual in regards to the indicated attributes present in the descriptions.\n\nThe keypair used to sign Verifiable Credentials will be revoked where Gaia-X Association becomes aware of any inaccurate statements in regards to the claims which result in a non-compliance with the Trust Framework and policy rules defined in the Policy Rules and Labelling Document (PRLD).',
					id: 'https://milton.dev.smart-x.smartsenselabs.com/6723b472-65b0-4a4f-94ce-9d7a4ed9e4af/participant.json#2',
					type: 'gx:GaiaXTermsAndConditions',
					'@context': [
						'https://www.w3.org/2018/credentials/v1',
						'https://w3id.org/security/suites/jws-2020/v1',
						'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
					]
				},
				id: 'https://milton.dev.smart-x.smartsenselabs.com/6723b472-65b0-4a4f-94ce-9d7a4ed9e4af/participant.json#2',
				issuanceDate: '2024-03-01T09:19:08.858530778Z',
				issuer: 'did:web:milton.dev.smart-x.smartsenselabs.com',
				type: ['VerifiableCredential'],
				proof: {
					type: 'JsonWebSignature2020',
					created: '2024-03-01T09:19:16.295Z',
					proofPurpose: 'assertionMethod',
					verificationMethod: 'did:web:milton.dev.smart-x.smartsenselabs.com',
					jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..kuC3ZfouSasaQ0zYrPVPuk_6tXDaQ7qHA_BAO1KtBBLNjDOVEDWqFfCY9Ex0UMtJlsRLoV8Z3b93ygcBaXooOGMBG2lMCUmmN2W0Bo97WIIRwVf0OPJLLxaW7a6PKATjA5kVVusUEPFwh4kRtgfSv8Vft6-AyR4Ul-jNTlGto5A3L5c7CHNSxyA8J4gTDLWnJQD9mF-7P5sUoDS5Cf3ElQjHhjaoLqRQIpb22I2h4zQuZJXM4L9ep0d-VEsPdmWrLA9zMn0IdEjqVptoNcltMLrydGwDkVlC0fibgoh3H9EnNZC65fnIyOfGKjHGiVAz-c3F-R-FNRIoVthyIl-4vg'
				}
			},
			{
				type: 'VerifiableCredential',
				id: 'https://milton.dev.smart-x.smartsenselabs.com/6723b472-65b0-4a4f-94ce-9d7a4ed9e4af/service_CX5K.json',
				issuer: 'did:web:milton.dev.smart-x.smartsenselabs.com',
				issuanceDate: '2024-03-01T10:24:14.620236279Z',
				credentialSubject: {
					'gx:labelLevel': 'https://wizard-api.dev.smart-x.smartsenselabs.com/6723b472-65b0-4a4f-94ce-9d7a4ed9e4af/labelLevel_84147f48-2701-4117-a937-73d89f837f7d.json',
					'gx:aggregationOfExists': [
						{
							id: 'https://wizard-api.dev.smart-x.smartsenselabs.com/6723b472-65b0-4a4f-94ce-9d7a4ed9e4af/resource_b1af42bc-2ca7-4143-88f7-aacb8ab00b66.json' //pragma: allowlist secret
						}
					],
					'gx:termsAndConditions': {
						'gx:URL': 'https://www.smartsensesolutions.com/privacy-policy',
						'gx:hash': 'd280c4c5405658bc150ed874e3761bbd4fd76ff0cbb56e1333c28bb902bd9fcd' //pragma: allowlist secret
					},
					'gx:policy': ['https://wizard-api.dev.smart-x.smartsenselabs.com/6723b472-65b0-4a4f-94ce-9d7a4ed9e4af/service_CX5K_policy.json'],
					'gx:dataAccountExport': {
						'gx:requestType': 'webform',
						'gx:accessType': 'physical',
						'gx:formatType': ['application/city+json']
					},
					'gx:dataProtectionRegime': ['GDPR2016'],
					type: 'gx:ServiceOffering',
					'gx:providedBy': {
						id: 'https://milton.dev.smart-x.smartsenselabs.com/6723b472-65b0-4a4f-94ce-9d7a4ed9e4af/participant.json#0'
					},
					id: 'https://milton.dev.smart-x.smartsenselabs.com/6723b472-65b0-4a4f-94ce-9d7a4ed9e4af/service_CX5K.json',
					'gx:name': 'Chome Browser Data',
					'gx:description': 'Chome Browser Data'
				},
				'@context': [
					'https://www.w3.org/2018/credentials/v1',
					'https://w3id.org/security/suites/jws-2020/v1',
					'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
				],
				proof: {
					type: 'JsonWebSignature2020',
					created: '2024-03-06T09:50:01.197Z',
					proofPurpose: 'assertionMethod',
					verificationMethod: 'did:web:milton.dev.smart-x.smartsenselabs.com',
					jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..gla1fWgW7JSjwTtwdkFnbX_rJIs1y_Gi-ntK3SzOElpdo-K5j478kk17OtKI-r2wTqX48AkS64jtjzp-tJpOj5yzQvl0q1EBJs6450q6qfZqDe6DIZnaCTnag4hehL4vataaxASUG9cxqWgFQFiTFEf0OCjG9Y_euslEU9egR1UPMxrJxXQJ4iIDvHcxr7D_fJ8RQQwsGBwWUjnzQ5dGcBl7ixPchDtxSzQQlp5xGrgvGAR7mnlwm7oV3V2UliVvYmnY6OcxZKn1rQXLdIOPtzuDX7fSg_poAJ6pVj3zlM6kkNnJuBlPbSyy2KqeXnxv6qHrpXlnINagbADeDV6xFg'
				}
			}
		]
	},
	complianceCredential: {
		'@context': [
			'https://www.w3.org/2018/credentials/v1',
			'https://w3id.org/security/suites/jws-2020/v1',
			'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
		],
		type: ['VerifiableCredential'],
		id: 'https://compliance.lab.gaia-x.eu/development/credential-offers/a6e0b950-2071-4134-8f5e-9b4aa89b4c3a',
		issuer: 'did:web:compliance.lab.gaia-x.eu:development',
		issuanceDate: '2024-03-06T09:50:09.101Z',
		expirationDate: '2024-06-04T09:50:09.101Z',
		credentialSubject: [
			{
				type: 'gx:compliance',
				id: 'https://milton.dev.smart-x.smartsenselabs.com/6723b472-65b0-4a4f-94ce-9d7a4ed9e4af/participant.json#0',
				'gx:integrity': 'sha256-02fb34583773ab01a2080053389aed55f14cb2e87046ba421eeb4e023190f17c',
				'gx:integrityNormalization': 'RFC8785:JCS',
				'gx:version': '22.10',
				'gx:type': 'gx:LegalParticipant'
			},
			{
				type: 'gx:compliance',
				id: 'https://milton.dev.smart-x.smartsenselabs.com/6723b472-65b0-4a4f-94ce-9d7a4ed9e4af/participant.json#1',
				'gx:integrity': 'sha256-728e9be306d6f9eaeb740390d0a65938153480125071f673f0dd63cfa2164a99',
				'gx:integrityNormalization': 'RFC8785:JCS',
				'gx:version': '22.10',
				'gx:type': 'gx:legalRegistrationNumber'
			},
			{
				type: 'gx:compliance',
				id: 'https://milton.dev.smart-x.smartsenselabs.com/6723b472-65b0-4a4f-94ce-9d7a4ed9e4af/participant.json#2',
				'gx:integrity': 'sha256-ce6c6bb5b78e0fce40d7e3f4113154810f051c655f7c0ec772cc20acab6a1324',
				'gx:integrityNormalization': 'RFC8785:JCS',
				'gx:version': '22.10',
				'gx:type': 'gx:GaiaXTermsAndConditions'
			},
			{
				type: 'gx:compliance',
				id: 'https://milton.dev.smart-x.smartsenselabs.com/6723b472-65b0-4a4f-94ce-9d7a4ed9e4af/service_CX5K.json',
				'gx:integrity': 'sha256-f8daf6ee91aceccf5a540aac08b58bcafd6a48f514fec757c1bb5694b0a8ee38',
				'gx:integrityNormalization': 'RFC8785:JCS',
				'gx:version': '22.10',
				'gx:type': 'gx:ServiceOffering'
			}
		],
		proof: {
			type: 'JsonWebSignature2020',
			created: '2024-03-06T09:50:10.516Z',
			proofPurpose: 'assertionMethod',
			verificationMethod: 'did:web:compliance.lab.gaia-x.eu:development#X509-JWK2020',
			jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..U73LO6F-suGi_tDyzBpW2T8tsFsfAN7iKJBAx1vxqFuFXGlt-3XQVyHO5GUswP_W2UN6se2ne69BKKVQgYuhYmA_azIJZ7Hrrjhy9Vy01sRrzblsf828XDu3tmOX20SbjTRfuZhc_YbfQ-aYyuio5xT7B479aVg0G9PF4rViuIxs9pSQp6hroPD8TSTB2cdRJJkfUm9qgF-FcyizsCk3mRuqxUEPKfH-uSn58VOPNt_YISqfUoTo6NSySg674J44fSislKbAu99DXUEuhGjHPw41gjJ-DmlLAqUBe24Bsce1iVPyP2wyaUomlecNmr-acV3fFF9OLkiVlqSPOlmR8g'
		}
	}
}

export const holderDdoJson2 = {
	didDocument: {
		assertionMethod: ['did:web:gxmvp.dev.smart-x.smartsenselabs.com#JWK2020-RSA'],
		id: 'did:web:gxmvp.dev.smart-x.smartsenselabs.com',
		verificationMethod: [
			{
				controller: 'did:web:gxmvp.dev.smart-x.smartsenselabs.com',
				publicKeyJwk: {
					kty: 'RSA',
					e: 'AQAB',
					x5u: 'https://gxmvp.dev.smart-x.smartsenselabs.com/.well-known/x509CertificateChain.pem',
					alg: 'PS256',
					n: 'nyNZ4YKXj8NFHN45N26n16U0BrHCYQs8kPTHKCHHBaXCKNpdL9PLIoZpdpRkOObRwowyFF8SB6B3l_63JIR6KMxQcIb4pVoevW_8-3LJk4jwcYBZq8a6uSt94xM5dkozqSi6OeufrH-f8S8D-zT74KwWLoViNNw6eusjiqWudomsURJxOuIhSEiUzU4lprGjEbXeFIN9o0QoiAqAe5Haj2VfsY7UWd9sYtERnth4cF9XV5nA_Y__uFeW4KkKV3I4lsamRq4PW6DLwano3hzkETRIdzkWo1Zn0_AFjSa-6XWwEydk2STmTuuLBPvKBZg9a06jIQMmnOfk-2c1iUn1pQ' //pragma: allowlist secret
				},
				id: 'did:web:gxmvp.dev.smart-x.smartsenselabs.com',
				type: 'JsonWebKey2020',
				'@context': 'https://w3c-ccg.github.io/lds-jws2020/contexts/v1/'
			}
		],
		'@context': ['https://www.w3.org/ns/did/v1']
	}
}

export const serviceOfferingTestJSON = {
	invalidIssuerJSON: {
		privateKey: 'Base64 -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----' //pragma: allowlist secret
	},
	invalidMerificationMethodJSON: {
		issuer: 'did:web:ferrari.smart-x.smartsenselabs.com',
		privateKey: 'Base64 -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----' //pragma: allowlist secret
	},
	invalidSO: {
		issuer: 'did:web:ferrari.smart-x.smartsenselabs.com',
		verificationMethod: 'did:web:ferrari.smart-x.smartsenselabs.com',
		privateKey: 'Base64 -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----' //pragma: allowlist secret
	},
	validReqJSON: {
		issuer: 'did:web:ferrari.smart-x.smartsenselabs.com',
		verificationMethod: 'did:web:ferrari.smart-x.smartsenselabs.com',
		privateKey: 'Base64 Encoded -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----', //pragma: allowlist secret
		vcs: {
			serviceOffering: {
				type: 'VerifiableCredential',
				id: 'did:web:ferrari.smart-x.smartsenselabs.com',
				issuer: 'did:web:ferrari.smart-x.smartsenselabs.com',
				issuanceDate: '2023-08-23T16:30:57.209178226Z',
				credentialSubject: {
					'gx:termsAndConditions': {
						'gx:URL': 'https://aws.amazon.com/service-terms/',
						'gx:hash': 'e9aedbf8c9b87ecb285a45c84444c72c69c546beb9457daa0e3543edd9b3b76c' //pragma: allowlist secret
					},
					'gx:policy': ['https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_0Tbi_policy.json'],
					'gx:dataAccountExport': {
						'gx:requestType': 'API',
						'gx:accessType': 'physical',
						'gx:formatType': 'pdf'
					},
					'gx:aggregationOf': [
						{
							id: 'https://wizard-api1.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/resource_86e8a7a9-c341-4049-abc7-dcf20e1736fe.json'
						}
					],
					'gx:dependsOn': [
						{
							id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/service_S7GZ.json'
						}
					],
					'gx:dataProtectionRegime': 'GDPR2016',
					type: 'gx:ServiceOffering',
					'gx:labelLevel': ['https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/labelLevel_52faca44-8ee4-4954-ad99-1043542f9bf1.json'],
					'gx:providedBy': {
						id: 'https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#0'
					},
					id: 'https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_0Tbi.json',
					'gx:name': 'Service_soft_level',
					'gx:description': 'test service data'
				},
				'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1']
			}
		}
	},
	invalidReqJSON: {
		issuer: 'did:web:suzuki.smart-x.smartsenselabs.com',
		verificationMethod: 'did:web:suzuki.smart-x.smartsenselabs.com',
		privateKey: 'Base64 Encoded -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----', //pragma: allowlist secret
		vcs: {
			serviceOffering: {
				type: 'VerifiableCredential',
				id: 'did:web:suzuki.smart-x.smartsenselabs.com',
				issuer: 'did:web:suzuki.smart-x.smartsenselabs.com',
				issuanceDate: '2023-08-23T16:30:57.209178226Z',
				credentialSubject: {
					'gx:termsAndConditions': {
						'gx:URL': 'https://aws.amazon.com/service-terms/',
						'gx:hash': 'e9aedbf8c9b87ecb285a45c84444c72c69c546beb9457daa0e3543edd9b3b76c' //pragma: allowlist secret
					},
					'gx:policy': ['https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_0Tbi_policy.json'],
					'gx:dataAccountExport': {
						'gx:requestType': 'API',
						'gx:accessType': 'physical',
						'gx:formatType': 'pdf'
					},
					'gx:aggregationOf': [
						{
							id: 'https://wizard-api1.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/resource_86e8a7a9-c341-4049-abc7-dcf20e1736fe.json'
						}
					],
					'gx:dependsOn': [
						{
							id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/service_S7GZ.json'
						}
					],
					'gx:dataProtectionRegime': 'GDPR2016',
					type: 'gx:ServiceOffering',
					'gx:labelLevel': ['https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/labelLevel_52faca44-8ee4-4954-ad99-1043542f9bf1.json'],
					'gx:providedBy': {
						id: 'https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#0'
					},
					id: 'https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_0Tbi.json',
					'gx:name': 'Service_soft_level',
					'gx:description': 'test service data'
				},
				'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1']
			}
		}
	},
	validLPJSON: {
		selfDescriptionCredential: {
			'@context': 'https://www.w3.org/2018/credentials/v1',
			type: ['VerifiablePresentation'],
			verifiableCredential: [
				{
					credentialSubject: {
						'gx:legalName': 'Smart Sense Consulting Solutions Private Limited',
						'gx:headquarterAddress': { 'gx:countrySubdivisionCode': 'DE-BE' },
						'gx:legalAddress': { 'gx:countrySubdivisionCode': 'DE-BE' },
						id: 'https://smartsense.smart-x.smartsenselabs.com/3452e577-6628-4b98-9ebd-fc6fe14380d9/participant.json#0',
						type: 'gx:LegalParticipant',
						'gx:legalRegistrationNumber': { id: 'https://smartsense.smart-x.smartsenselabs.com/3452e577-6628-4b98-9ebd-fc6fe14380d9/participant.json#1' }
					},
					'@context': [
						'https://www.w3.org/2018/credentials/v1',
						'https://w3id.org/security/suites/jws-2020/v1',
						'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
					],
					type: ['VerifiableCredential'],
					id: 'did:web:smartsense.smart-x.smartsenselabs.com',
					issuer: 'did:web:smartsense.smart-x.smartsenselabs.com',
					issuanceDate: '2023-09-15T07:07:47.009120978Z',
					proof: {
						type: 'JsonWebSignature2020',
						created: '2023-09-15T07:07:49.740Z',
						proofPurpose: 'assertionMethod',
						verificationMethod: 'did:web:smartsense.smart-x.smartsenselabs.com',
						jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..pgeY0l8o3NesQfQLrppbndtzM0j5MvuXEjYx3QTDM8gElvGldUxKp1ONidJ68KamhtX1Kdkvy96Iz9XcGTSRpzIu88gptqgLIyibySsAsfpXjHIZxELhjvXckzbkmZw2XLNi07tOvc-ngywM_mSLcCNgwLY7Xn04jXOF1zQMGwiFs4nKo8pdoKnFxVE6jr5dYHVkO5SudDGhoYSNIqtyjTpXXry0q1jd22zzDe00NlEL0yPveruUm46HerVYO2rrIOvngrq5caU1W2lZWAnXROgVj0Rwe--z8KGZ3MvxU9_0qDNewUtWtNF1oIm4jZ6mNBiz6P3BUpNZq0qP3n5Y1g'
					}
				},
				{
					'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
					type: ['VerifiableCredential'],
					id: 'https://smartsense.smart-x.smartsenselabs.com/3452e577-6628-4b98-9ebd-fc6fe14380d9/participant.json#1',
					issuer: 'did:web:registration.lab.gaia-x.eu:development',
					issuanceDate: '2023-09-15T07:07:47.896Z',
					credentialSubject: {
						'@context': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
						type: 'gx:legalRegistrationNumber',
						id: 'https://smartsense.smart-x.smartsenselabs.com/3452e577-6628-4b98-9ebd-fc6fe14380d9/participant.json#1',
						'gx:vatID': 'FR79537407926',
						'gx:vatID-countryCode': 'FR'
					},
					evidence: [
						{ 'gx:evidenceURL': 'http://ec.europa.eu/taxation_customs/vies/services/checkVatService', 'gx:executionDate': '2023-09-15T07:07:47.896Z', 'gx:evidenceOf': 'gx:vatID' }
					],
					proof: {
						type: 'JsonWebSignature2020',
						created: '2023-09-15T07:07:48.806Z',
						proofPurpose: 'assertionMethod',
						verificationMethod: 'did:web:registration.lab.gaia-x.eu:development#X509-JWK2020',
						jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..R-PpyUSlW3_LLhlssC8udNZZ8cNnesVhl5-NVVGkigMcdXqzaTnjNnm6vzDqjmSk-8El_Cx4Syy2aHIIFSjWBKI5HHFGRCLpAQS8ymfeZRGnpu8fqhm6IcresCPSpTl2eXg13dJpyzDnC7fiAhREnxGSEAHniHY6exgBPla8BpWoY0-XXKpLSdXNL-W_Gxl-ZUGkD68w_QYJBVEoPdfXuIDD-Ma_RDO3zQSZK-sYiWFIOqcQdti8K053WRspj3llEp0xk6McBEt_NlaHscx_ZXuTDBBGgsZjmBZDrWbwSO53td22hJAhn5aAWUvdaRcQisfPpQCUFUsbSUc564Jnmg'
					}
				},
				{
					'@context': [
						'https://www.w3.org/2018/credentials/v1',
						'https://w3id.org/security/suites/jws-2020/v1',
						'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
					],
					credentialSubject: {
						'@Context': [
							'https://www.w3.org/2018/credentials/v1',
							'https://w3id.org/security/suites/jws-2020/v1',
							'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
						],
						'gx:termsAndConditions':
							'The PARTICIPANT signing the Self-Description agrees as follows:\n- to update its descriptions about any changes, be it technical, organizational, or legal - especially but not limited to contractual in regards to the indicated attributes present in the descriptions.\n\nThe keypair used to sign Verifiable Credentials will be revoked where Gaia-X Association becomes aware of any inaccurate statements in regards to the claims which result in a non-compliance with the Trust Framework and policy rules defined in the Policy Rules and Labelling Document (PRLD).',
						id: 'https://smartsense.smart-x.smartsenselabs.com/3452e577-6628-4b98-9ebd-fc6fe14380d9/participant.json#2',
						type: 'gx:GaiaXTermsAndConditions'
					},
					id: 'did:web:smartsense.smart-x.smartsenselabs.com',
					issuanceDate: '2023-09-15T07:07:47.009120978Z',
					issuer: 'did:web:smartsense.smart-x.smartsenselabs.com',
					type: ['VerifiableCredential'],
					proof: {
						type: 'JsonWebSignature2020',
						created: '2023-09-15T07:07:50.044Z',
						proofPurpose: 'assertionMethod',
						verificationMethod: 'did:web:smartsense.smart-x.smartsenselabs.com',
						jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..PQrCyxgJzYwRsXIdy20IEsxE5R6fgoLuOhElqiSFPppsLpJ8Nu_xsetlUFVdPnS_0VI37FD2gxh4IJmPGyEF8CtFvP8iNuopNNfM9344V94-ljFaUw5wDgaiuN0frmGprT_E-09n5WGDQ1BxmWhzHV22TLROJLzrbAGHrJaLWG_tozj45QyUlAUzNfMbpQzX32dNzZDCjCrrDFVJX-9reZYqFmsQ4p6voXk3pUT5KYaXfzd8UQIyCYhEJfMRZaTjvR10D68a3EOwatN49VL-gc3fSBAwjUczqRSLFnu7qoyNvu2A_HxnO8aMFQuoONA0cIOl1KrABeYs_GOpqAsZqA'
					}
				}
			]
		},
		complianceCredential: {
			'@context': [
				'https://www.w3.org/2018/credentials/v1',
				'https://w3id.org/security/suites/jws-2020/v1',
				'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
			],
			type: ['VerifiableCredential'],
			id: 'https://compliance.lab.gaia-x.eu/development/credential-offers/982e56e9-8831-4b02-867b-239d65e50a53',
			issuer: 'did:web:compliance.lab.gaia-x.eu:development',
			issuanceDate: '2023-09-15T07:07:57.427Z',
			expirationDate: '2023-12-14T07:07:57.427Z',
			credentialSubject: [
				{
					type: 'gx:compliance',
					id: 'https://smartsense.smart-x.smartsenselabs.com/3452e577-6628-4b98-9ebd-fc6fe14380d9/participant.json#0',
					'gx:integrity': 'sha256-cc9c3eb9f06239c4fc94efd72a262e70021f3f1830218cb0183331b48bd5c2e4',
					'gx:integrityNormalization': 'RFC8785:JCS',
					'gx:version': '22.10',
					'gx:type': 'gx:LegalParticipant'
				},
				{
					type: 'gx:compliance',
					id: 'https://smartsense.smart-x.smartsenselabs.com/3452e577-6628-4b98-9ebd-fc6fe14380d9/participant.json#1',
					'gx:integrity': 'sha256-001868af59b60e2f771f21155670fd6ede2aaf662cb94200f5a5e31b9b7d12bd',
					'gx:integrityNormalization': 'RFC8785:JCS',
					'gx:version': '22.10',
					'gx:type': 'gx:legalRegistrationNumber'
				},
				{
					type: 'gx:compliance',
					id: 'https://smartsense.smart-x.smartsenselabs.com/3452e577-6628-4b98-9ebd-fc6fe14380d9/participant.json#2',
					'gx:integrity': 'sha256-2eb381059a4fc20f150a37ef97bcc2b2f2fda9893134939c09abd8e3f01315c6',
					'gx:integrityNormalization': 'RFC8785:JCS',
					'gx:version': '22.10',
					'gx:type': 'gx:GaiaXTermsAndConditions'
				}
			],
			proof: {
				type: 'JsonWebSignature2020',
				created: '2023-09-15T07:07:57.437Z',
				proofPurpose: 'assertionMethod',
				jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..Mqc2ld03gOv2p7JsWfFZCEJRI6KxlqL290vlfGpaMiwDIG4-c6LTDnZ7_wwwqJC8hVqYqNU-P0sytNkaTh927-us7lqKCPwU9ZAaLvpAEOaqWgUszAvO_IQIKgGhEVMfU5HDK8zanbZCfFsuqpBm0c2mqW8q-0gB6UiPDDONJS8OAtuAR5ZA3nPAJx9db3dploqFQToo153gsPXnIIRDAu57rEu152ael0oWrglYq6mv07w1xCjiDuIUD8nNurV3wdNAkrIQt7E0id6Zixp4vD_RvoOQx25Rl-R0Q_ikPL8rPoAaK1U_9RsSvekRGRjoOH0ER9e877FjtWKz2QaiUg',
				verificationMethod: 'did:web:compliance.lab.gaia-x.eu:development#X509-JWK2020'
			}
		}
	},
	validSOJSON: {
		selfDescriptionCredential: {
			'@context': 'https://www.w3.org/2018/credentials/v1',
			type: ['VerifiablePresentation'],
			verifiableCredential: [
				{
					credentialSubject: {
						'gx:legalName': 'Pinank',
						'gx:headquarterAddress': { 'gx:countrySubdivisionCode': 'BE-BRU' },
						'gx:legalAddress': { 'gx:countrySubdivisionCode': 'BE-BRU' },
						id: 'https://lakhani.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/participant.json#0',
						type: 'gx:LegalParticipant',
						'gx:legalRegistrationNumber': { id: 'https://lakhani.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/participant.json#1' }
					},
					'@context': [
						'https://www.w3.org/2018/credentials/v1',
						'https://w3id.org/security/suites/jws-2020/v1',
						'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
					],
					type: ['VerifiableCredential'],
					id: 'did:web:lakhani.smart-x.smartsenselabs.com',
					issuer: 'did:web:lakhani.smart-x.smartsenselabs.com',
					issuanceDate: '2023-09-11T10:13:42.375138125Z',
					proof: {
						type: 'JsonWebSignature2020',
						created: '2023-09-11T10:13:44.680Z',
						proofPurpose: 'assertionMethod',
						verificationMethod: 'did:web:lakhani.smart-x.smartsenselabs.com',
						jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..Z5dAge_qUmzLE5yUaJWf7LbEdHHyAGZOdEAN_boNQ6PFiuFysFav2EkXJEW2LfmRX_e2mkJBHvisFtHpMCpm8_i9cXCS2sJ8KS2d0ehOr2hiKjXn4vDZqYcJWugU_uhWlCj4ebiUy-DGjmK2hBHSKrDaUWQ_lOt-5-fBKIM4etxK818vaVOjQ3hNhVYPYMeceiWfp5L0rqWFcE1-2jb9Ue46qwxvdPdQglup9__k2Q5YweLm_N9S7v9lkd7X-JMyoCHyGCH57kGY5mUmFAJVVA-Mn0UIku8_ZQdYnd7FqXqjoUlEZkv7tPneerX4vQ0uoalufxJiMHjZG8C6rwTWaQ'
					}
				},
				{
					'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
					type: ['VerifiableCredential'],
					id: 'https://lakhani.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/participant.json#1',
					issuer: 'did:web:registration.lab.gaia-x.eu:development',
					issuanceDate: '2023-09-11T10:13:43.001Z',
					credentialSubject: {
						'@context': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
						type: 'gx:legalRegistrationNumber',
						id: 'https://lakhani.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/participant.json#1',
						'gx:leiCode': '9695007586GCAKPYJ703',
						'gx:leiCode-countryCode': 'FR'
					},
					evidence: [{ 'gx:evidenceURL': 'https://api.gleif.org/api/v1/lei-records/', 'gx:executionDate': '2023-09-11T10:13:43.001Z', 'gx:evidenceOf': 'gx:leiCode' }],
					proof: {
						type: 'JsonWebSignature2020',
						created: '2023-09-11T10:13:43.823Z',
						proofPurpose: 'assertionMethod',
						verificationMethod: 'did:web:registration.lab.gaia-x.eu:development#X509-JWK2020',
						jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..pkPC8wu6cGrW3oeNYIixcjKgT_sRmrEREjinEgezYqI4u46OOqoAwtitr-Xr6IDIyzgZrPmR5PBign0uF-HjT_Pav86lcs0qsZEm1Wwq9VMfeMi4Bivpq1AK2Ty4vH8ZZdiVDhV4wFHneGZhcxHfY-pW5abDZ6WX2ceq5Sxex9pCkuk9EesBZco_HM3gMWIKN1Lm0o5rinYMuUh46pKJacLxuOgdkJiOE-KNarnNaVCxaU8sotNjsRRarIeq06y0ulkuMLwuBfyypiND2n28q-GjZ_wfpFeADlqvPLk_nYSJE8LlsjlWEBSnhC4y96je_8Wm-AUybD7KxoBrCPjI1A'
					}
				},
				{
					'@context': [
						'https://www.w3.org/2018/credentials/v1',
						'https://w3id.org/security/suites/jws-2020/v1',
						'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
					],
					credentialSubject: {
						'@Context': [
							'https://www.w3.org/2018/credentials/v1',
							'https://w3id.org/security/suites/jws-2020/v1',
							'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
						],
						'gx:termsAndConditions':
							'The PARTICIPANT signing the Self-Description agrees as follows:\n- to update its descriptions about any changes, be it technical, organizational, or legal - especially but not limited to contractual in regards to the indicated attributes present in the descriptions.\n\nThe keypair used to sign Verifiable Credentials will be revoked where Gaia-X Association becomes aware of any inaccurate statements in regards to the claims which result in a non-compliance with the Trust Framework and policy rules defined in the Policy Rules and Labelling Document (PRLD).',
						id: 'https://lakhani.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/participant.json#2',
						type: 'gx:GaiaXTermsAndConditions'
					},
					id: 'did:web:lakhani.smart-x.smartsenselabs.com',
					issuanceDate: '2023-09-11T10:13:42.375138125Z',
					issuer: 'did:web:lakhani.smart-x.smartsenselabs.com',
					type: ['VerifiableCredential'],
					proof: {
						type: 'JsonWebSignature2020',
						created: '2023-09-11T10:13:45.073Z',
						proofPurpose: 'assertionMethod',
						verificationMethod: 'did:web:lakhani.smart-x.smartsenselabs.com',
						jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..xkXfxFhKRx45N86j9e-1bOAxbfiQmF4jHWcYKl3tZdoNKbY4MIt7CnHD1tnWNd80_ceNlminbhFFq1CyNWJtecY-yWLW4UpdloeM4mkcWikGJHM7iy2Im_VYYwmBkbHl3wKnXUw1T6qnwYLV67SRBlK2B13UkyEamVVUTt6asJQU5jVHquOqG7rH8-Okx5WIvv5kpvALFdXCQmUuRwxkRAI1KZLiDeM6oOe_RjuFkTqEzcBA5DOOKU_rhJjLcrpLFplNKavW3Zik3jsRHWCMKtySy4vaiOa3upcjnAVCJQHnUfF0Y0dTXOrG-7O-cTF4rOrjYWAV5XOD7uUrSfLJZw'
					}
				},
				{
					type: 'VerifiableCredential',
					id: 'did:web:lakhani.smart-x.smartsenselabs.com',
					issuer: 'did:web:lakhani.smart-x.smartsenselabs.com',
					issuanceDate: '2023-09-11T11:29:49.617289325Z',
					credentialSubject: {
						'gx:termsAndConditions': {
							'gx:URL': 'https://gaia-x.eu/privacy-policy/',
							'gx:hash': '58b01f2e99b346d6b46b01fb1028e0cdc8f1a4e3dfeaabf25a5e4065c9597e37' //pragma: allowlist secret
						},
						'gx:policy': ['https://wizard-api.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/service_aTRg_policy.json'],
						'gx:dataAccountExport': { 'gx:requestType': 'API', 'gx:accessType': 'Physical', 'gx:formatType': ['application/ace+cbor'] },
						'gx:aggregationOf': [
							{ id: 'https://wizard-api.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/resource_02b75e13-8108-4a96-a5af-594e1d0707e0.json' },
							{ id: 'https://wizard-api.smart-x.smartsenselabs.com/1fe8ea20-135c-403d-908c-2dbf9dbfac31/resource_0c2aa2e9-ca10-487b-94ea-da6a1563e99e.json' },
							{ id: 'https://wizard-api.smart-x.smartsenselabs.com/1190fc07-7490-48ab-a26c-5c00461d2561/resource_b14ad4d8-a76d-4608-a28b-cc525e4d717b.json' },
							{ id: 'https://wizard-api.smart-x.smartsenselabs.com/5be199c2-58e8-4a95-a7fb-2744f19910a2/resource_7f9575ef-8673-4063-bb92-b6b08bd012a8.json' }
						],
						'gx:dependsOn': [{ id: 'https://wizard-api.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/service_gF20.json' }],
						'gx:dataProtectionRegime': ['GDPR2016'],
						type: 'gx:ServiceOffering',
						'gx:labelLevel': 'https://wizard-api.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/labelLevel_b8d419e7-1734-4e30-8285-c16eb160a8d0.json',
						'gx:providedBy': { id: 'https://lakhani.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/participant.json#0' },
						id: 'https://wizard-api.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/service_aTRg.json',
						'gx:name': 'Cloud Services'
					},
					'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
					proof: {
						type: 'JsonWebSignature2020',
						created: '2023-09-11T11:29:49.887Z',
						proofPurpose: 'assertionMethod',
						verificationMethod: 'did:web:lakhani.smart-x.smartsenselabs.com',
						jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..h4VC70gqYszLAEys_m5-UEV-zstozvhRWVrx5MO2DfpXd_j_t5RgfmMW7Fsi4pPuWOjUMwlp9DPTJDHhawrx7ijKsYj8vdsxAdOk-SWe4cCqVW4Be8yj2ZR4CRLUx0E6iaIeQnkD-wy2QbxloXJtD-ZzkhcgtNdsOXxkNHl9-C8Bq0UVcCyA9kigZuUbT58YmHy7KMRyUwm0jM3v2ld7cBI46SEAxp06c1PvfMTU9q95n7Kqb42CY6vpoLcqjnSgF4AJgjWmnweLgfF32FoIA5B7p4hXC0vHa3PnTPfiVd04ib1-unz6z5VaU0GEDrd51AebIwICKjoxwTUmULcl3Q'
					}
				},
				{
					credentialSubject: {
						'gx:legalName': 'Audi',
						'gx:headquarterAddress': { 'gx:countrySubdivisionCode': 'BE-BRU' },
						'gx:legalAddress': { 'gx:countrySubdivisionCode': 'BE-BRU' },
						id: 'https://audi.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/participant.json#0',
						type: 'gx:LegalParticipant',
						'gx:legalRegistrationNumber': { id: 'https://audi.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/participant.json#1' }
					},
					'@context': [
						'https://www.w3.org/2018/credentials/v1',
						'https://w3id.org/security/suites/jws-2020/v1',
						'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
					],
					type: ['VerifiableCredential'],
					id: 'did:web:audi.smart-x.smartsenselabs.com',
					issuer: 'did:web:audi.smart-x.smartsenselabs.com',
					issuanceDate: '2023-09-11T06:15:34.64150289Z',
					proof: {
						type: 'JsonWebSignature2020',
						created: '2023-09-11T06:15:37.040Z',
						proofPurpose: 'assertionMethod',
						verificationMethod: 'did:web:audi.smart-x.smartsenselabs.com',
						jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..hT3ELMn_8zlIKIB4nym3GiIcpkHHFxQsK-gDJUr2fdYwC-eIRlN38yS66IDPEZvfi_AsW6-5lbNMVRWKnG_vfbEatoPSzBWZrBDds2bDjZsOjtJTvqWGe7Zyoyr_3gTJnGwmDR5ZioQ2bbaKkCVF9w6VVPuT3yLciSfymuK2YUbTBJ7I4v5VRw1pAB0viy7PdOKgO0HgNLOjJ35Um-F0IKkmoEmDeZji_YuZC6c-XoCuIbnbsMTocJHMNTyN-WCE8tq-dDsFhIjmXq5NLFXozBI0vKROKB8CSqf9bEtz14dw2A9ZbRvBDoc9tPpdCOWhnq7h68eKdHzxqu66OCpPUw'
					}
				},
				{
					'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
					type: ['VerifiableCredential'],
					id: 'https://audi.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/participant.json#1',
					issuer: 'did:web:registration.lab.gaia-x.eu:development',
					issuanceDate: '2023-09-11T06:15:35.274Z',
					credentialSubject: {
						'@context': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
						type: 'gx:legalRegistrationNumber',
						id: 'https://audi.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/participant.json#1',
						'gx:vatID': 'FR79537407926',
						'gx:vatID-countryCode': 'FR'
					},
					evidence: [
						{ 'gx:evidenceURL': 'http://ec.europa.eu/taxation_customs/vies/services/checkVatService', 'gx:executionDate': '2023-09-11T06:15:35.274Z', 'gx:evidenceOf': 'gx:vatID' }
					],
					proof: {
						type: 'JsonWebSignature2020',
						created: '2023-09-11T06:15:36.185Z',
						proofPurpose: 'assertionMethod',
						verificationMethod: 'did:web:registration.lab.gaia-x.eu:development#X509-JWK2020',
						jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..rORQKOC_dwetaKCkffSm7WsfiBpNfjiZKizLN8S0WdM-Rl5PBGDYwkpFZpy_FnXX58euBRJJzufgwywbKfvOvUNlO4mbP0ByGZZVTyPdaQ52-diDuiUDPWupsxpsTdVvfsD6dVqPgGXMsiMWfdSvlSWrhZWRoWXMpFqGAXPHuWFrQNwW6gdta-o54HFBkccTUAcVwOOL7dNNsrwWsteUftwv7swS-ZCGkNKvsbjbNLPeq0w-AqjcW0qKtp0oJlKrvmWQCqZVIFl-syvVaWZkQlcTs-UlHTlYL3bmwVDheeaLHLOiuT2IFoYQjWBTfSQCRj7pHEW8CF8EmCv6TGLKUQ'
					}
				},
				{
					'@context': [
						'https://www.w3.org/2018/credentials/v1',
						'https://w3id.org/security/suites/jws-2020/v1',
						'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
					],
					credentialSubject: {
						'@Context': [
							'https://www.w3.org/2018/credentials/v1',
							'https://w3id.org/security/suites/jws-2020/v1',
							'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
						],
						'gx:termsAndConditions':
							'The PARTICIPANT signing the Self-Description agrees as follows:\n- to update its descriptions about any changes, be it technical, organizational, or legal - especially but not limited to contractual in regards to the indicated attributes present in the descriptions.\n\nThe keypair used to sign Verifiable Credentials will be revoked where Gaia-X Association becomes aware of any inaccurate statements in regards to the claims which result in a non-compliance with the Trust Framework and policy rules defined in the Policy Rules and Labelling Document (PRLD).',
						id: 'https://audi.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/participant.json#2',
						type: 'gx:GaiaXTermsAndConditions'
					},
					id: 'did:web:audi.smart-x.smartsenselabs.com',
					issuanceDate: '2023-09-11T06:15:34.64150289Z',
					issuer: 'did:web:audi.smart-x.smartsenselabs.com',
					type: ['VerifiableCredential'],
					proof: {
						type: 'JsonWebSignature2020',
						created: '2023-09-11T06:15:37.445Z',
						proofPurpose: 'assertionMethod',
						verificationMethod: 'did:web:audi.smart-x.smartsenselabs.com',
						jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..VEvozxUPb7ffkTIdOq61BlL_dl_wqsIt7QOJNaKnXWCTgzjJW4UQolv6AOEPd1M4lt4l-qXh2S_CF5pjXJiq7NNNSzekotEej_AQ2gHzTJBLKm--VC9EDv1ugxHy7ZqzgOzBzMCz6QLaHrRnh1j6_Vj40LsjoJiW4nYmq7HjiDb-X9mTFA8nUHg1IDYu11kt_XUH8TpOCdO9_yGOiMceTbuQVK_CJb98SMS_h-3KQ1XSPWSmEnKRTnt7D5ZTTSY-omhQBAsiNrOrfavwZq1W9pGNxFzsv33tbwQBm7bWSdtKTcWaIUjeTYv0vp3bbErzlxNaf6v6qTj5sfLwjP4RLQ'
					}
				},
				{
					type: 'VerifiableCredential',
					id: 'did:web:audi.smart-x.smartsenselabs.com',
					issuer: 'did:web:audi.smart-x.smartsenselabs.com',
					issuanceDate: '2023-09-11T06:27:04.783509072Z',
					credentialSubject: {
						'gx:termsAndConditions': {
							'gx:URL': 'https://www.audi.in/in/web/en/models/a4/a4-sedan-2021/engines.html',
							'gx:hash': 'b5217e4f41bd84580668324f37058e889b7f3cdfc3eb0fc815feb346078ddf61' //pragma: allowlist secret
						},
						'gx:policy': ['https://wizard-api.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/service_gF20_policy.json'],
						'gx:dataAccountExport': {
							'gx:requestType': 'API',
							'gx:accessType': 'Physical',
							'gx:formatType': [
								'application/alto-error+json',
								'application/3gppHal+json',
								'application/vnd.3gpp.mcvideo-affiliation-command+xml',
								'application/3gpdash-qoe-report+xml',
								'application/3gppHalForms+json',
								'application/alto-networkmapfilter+json'
							]
						},
						'gx:aggregationOf': [{ id: 'https://wizard-api.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/resource_02b75e13-8108-4a96-a5af-594e1d0707e0.json' }],
						'gx:dataProtectionRegime': ['GDPR2016', 'LGPD2019', 'PDPA2012', 'CCPA2018', 'VCDPA2021'],
						type: 'gx:ServiceOffering',
						'gx:labelLevel': 'https://wizard-api.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/labelLevel_1a88d772-ee7e-4db7-ac99-9d5a41f66e6e.json',
						'gx:providedBy': { id: 'https://audi.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/participant.json#0' },
						id: 'https://wizard-api.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/service_gF20.json',
						'gx:name': 'Audi A4',
						'gx:description': 'Audi A4 Price 2023, Images, Colours & Reviews\nThe price of Audi A4 starts at Rs. 43.85 Lakh and goes upto Rs. 51.85 Lakh.'
					},
					'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
					proof: {
						type: 'JsonWebSignature2020',
						created: '2023-09-11T06:27:05.070Z',
						proofPurpose: 'assertionMethod',
						verificationMethod: 'did:web:audi.smart-x.smartsenselabs.com',
						jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..RG0K7fTXo_n__UsrjxP6dLMWchJb0xu3TTD6gKUgCxZNvTvsQXcW2kc5p6QUNEXFbLFXex_6RwBo0b9zeuhh_14YOKOJ6KGi8XspXyhn0eL_hptC0Pw4HI8eJCcblQjmYg7UxW3tn0LvD_-vR3upf0y_dXEvZfp5-5IiMkO_niOmF-slKdUVDblfzgu-fKKLrBsjblb6J9jz41iLfhFJTLXcpMoQXw8IRwSnmYS6cEXJrZxYx18pf52KBiepkMTNN0gROHhxT5OpLdAC0tdphhCfRT5-BhoOLeM4ip79XfU9jxGBprEDoKXnal3z3dl3z-kOwaucowxl-8x16k9g8w'
					}
				}
			]
		},
		complianceCredential: {
			'@context': [
				'https://www.w3.org/2018/credentials/v1',
				'https://w3id.org/security/suites/jws-2020/v1',
				'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
			],
			type: ['VerifiableCredential'],
			id: 'https://compliance.lab.gaia-x.eu/development/credential-offers/a948c8f9-8441-42dd-886f-429709aa18c8',
			issuer: 'did:web:compliance.lab.gaia-x.eu:development',
			issuanceDate: '2023-09-11T11:30:05.120Z',
			expirationDate: '2023-12-10T11:30:05.120Z',
			credentialSubject: [
				{
					type: 'gx:compliance',
					id: 'https://lakhani.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/participant.json#0',
					'gx:integrity': 'sha256-0663f1d2d85dc79f01c40e8202737d32512a0c9130e9b9929e7960fd59088447',
					'gx:integrityNormalization': 'RFC8785:JCS',
					'gx:version': '22.10',
					'gx:type': 'gx:LegalParticipant'
				},
				{
					type: 'gx:compliance',
					id: 'https://lakhani.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/participant.json#1',
					'gx:integrity': 'sha256-377ced5831cad1973861a36bbb5f90e4d6388fa8701ca116502e20f2ce14b488',
					'gx:integrityNormalization': 'RFC8785:JCS',
					'gx:version': '22.10',
					'gx:type': 'gx:legalRegistrationNumber'
				},
				{
					type: 'gx:compliance',
					id: 'https://lakhani.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/participant.json#2',
					'gx:integrity': 'sha256-6981524102992518de7bae99a8a8851d7b8202341688d84ddff0ddaadac6e4ff',
					'gx:integrityNormalization': 'RFC8785:JCS',
					'gx:version': '22.10',
					'gx:type': 'gx:GaiaXTermsAndConditions'
				},
				{
					type: 'gx:compliance',
					id: 'https://wizard-api.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/service_aTRg.json',
					'gx:integrity': 'sha256-d84fff65f755016cc82f7e880913512ecbd193f483a3fc43919ba7a4902444c2',
					'gx:integrityNormalization': 'RFC8785:JCS',
					'gx:version': '22.10',
					'gx:type': 'gx:ServiceOffering'
				},
				{
					type: 'gx:compliance',
					id: 'https://audi.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/participant.json#0',
					'gx:integrity': 'sha256-600df8fdd566a51c3fe243c813860cbe386b2a49ac5a903afce1f9b7c6e602e5',
					'gx:integrityNormalization': 'RFC8785:JCS',
					'gx:version': '22.10',
					'gx:type': 'gx:LegalParticipant'
				},
				{
					type: 'gx:compliance',
					id: 'https://audi.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/participant.json#1',
					'gx:integrity': 'sha256-c7315806dc7b88a9e66c91f312c3273de7be5efd6a1c0d4625855551fa64a0c7',
					'gx:integrityNormalization': 'RFC8785:JCS',
					'gx:version': '22.10',
					'gx:type': 'gx:legalRegistrationNumber'
				},
				{
					type: 'gx:compliance',
					id: 'https://audi.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/participant.json#2',
					'gx:integrity': 'sha256-0570ddd6eb1058aec77d6ae0720a68cc0ac56acb4d8d73b9f5559fc4244882d2',
					'gx:integrityNormalization': 'RFC8785:JCS',
					'gx:version': '22.10',
					'gx:type': 'gx:GaiaXTermsAndConditions'
				},
				{
					type: 'gx:compliance',
					id: 'https://wizard-api.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/service_gF20.json',
					'gx:integrity': 'sha256-f606a73fbc66e641049c1d63526c7bb5289e5d6e9a8fe5f00acbbe41b98911dc',
					'gx:integrityNormalization': 'RFC8785:JCS',
					'gx:version': '22.10',
					'gx:type': 'gx:ServiceOffering'
				}
			],
			proof: {
				type: 'JsonWebSignature2020',
				created: '2023-09-11T11:30:05.133Z',
				proofPurpose: 'assertionMethod',
				jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..JMTr7kbaDQHFEaEbNrAE117sPRwR1oa0N9siN8nuKAQSqwhQwD8r0w12tg0GPB91p-UGekEGEOw_uxO9kusvAvjevVRC37zIW4TdXEalk1zKcu91aZNBLXwe5JS_3ARBhgiSHsv9pzJKwjiNRHXiXEF-8bQgWGoeOrJrxSJhoS0BibI4l2FcJULlxWYj2XkXBEf-DomtPxITFP-EtPiOWtW2N9dyZEOYUhb11VwmNEcujgkSbwASEPyT6GOh4pKpvKvE3RE59KxhyhcqzG7k-nTADvMw8xnoZcrmyWZ4kgg9CwBbiWmuz0lfy806JwO84R5YuR1tW77QV-sB6KC7Pw',
				verificationMethod: 'did:web:compliance.lab.gaia-x.eu:development#X509-JWK2020'
			}
		}
	},
	validSOComplianceReq: {
		'@context': 'https://www.w3.org/2018/credentials/v1',
		type: ['VerifiablePresentation'],
		verifiableCredential: [
			{
				credentialSubject: {
					'gx:legalName': 'Pinank',
					'gx:headquarterAddress': {
						'gx:countrySubdivisionCode': 'BE-BRU'
					},
					'gx:legalAddress': {
						'gx:countrySubdivisionCode': 'BE-BRU'
					},
					id: 'https://lakhani.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/participant.json#0',
					type: 'gx:LegalParticipant',
					'gx:legalRegistrationNumber': {
						id: 'https://lakhani.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/participant.json#1'
					}
				},
				'@context': [
					'https://www.w3.org/2018/credentials/v1',
					'https://w3id.org/security/suites/jws-2020/v1',
					'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
				],
				type: ['VerifiableCredential'],
				id: 'did:web:lakhani.smart-x.smartsenselabs.com',
				issuer: 'did:web:lakhani.smart-x.smartsenselabs.com',
				issuanceDate: '2023-09-11T10:13:42.375138125Z',
				proof: {
					type: 'JsonWebSignature2020',
					created: '2023-09-11T10:13:44.680Z',
					proofPurpose: 'assertionMethod',
					verificationMethod: 'did:web:lakhani.smart-x.smartsenselabs.com',
					jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..Z5dAge_qUmzLE5yUaJWf7LbEdHHyAGZOdEAN_boNQ6PFiuFysFav2EkXJEW2LfmRX_e2mkJBHvisFtHpMCpm8_i9cXCS2sJ8KS2d0ehOr2hiKjXn4vDZqYcJWugU_uhWlCj4ebiUy-DGjmK2hBHSKrDaUWQ_lOt-5-fBKIM4etxK818vaVOjQ3hNhVYPYMeceiWfp5L0rqWFcE1-2jb9Ue46qwxvdPdQglup9__k2Q5YweLm_N9S7v9lkd7X-JMyoCHyGCH57kGY5mUmFAJVVA-Mn0UIku8_ZQdYnd7FqXqjoUlEZkv7tPneerX4vQ0uoalufxJiMHjZG8C6rwTWaQ'
				}
			},
			{
				'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
				type: ['VerifiableCredential'],
				id: 'https://lakhani.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/participant.json#1',
				issuer: 'did:web:registration.lab.gaia-x.eu:development',
				issuanceDate: '2023-09-11T10:13:43.001Z',
				credentialSubject: {
					'@context': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
					type: 'gx:legalRegistrationNumber',
					id: 'https://lakhani.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/participant.json#1',
					'gx:leiCode': '9695007586GCAKPYJ703',
					'gx:leiCode-countryCode': 'FR'
				},
				evidence: [
					{
						'gx:evidenceURL': 'https://api.gleif.org/api/v1/lei-records/',
						'gx:executionDate': '2023-09-11T10:13:43.001Z',
						'gx:evidenceOf': 'gx:leiCode'
					}
				],
				proof: {
					type: 'JsonWebSignature2020',
					created: '2023-09-11T10:13:43.823Z',
					proofPurpose: 'assertionMethod',
					verificationMethod: 'did:web:registration.lab.gaia-x.eu:development#X509-JWK2020',
					jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..pkPC8wu6cGrW3oeNYIixcjKgT_sRmrEREjinEgezYqI4u46OOqoAwtitr-Xr6IDIyzgZrPmR5PBign0uF-HjT_Pav86lcs0qsZEm1Wwq9VMfeMi4Bivpq1AK2Ty4vH8ZZdiVDhV4wFHneGZhcxHfY-pW5abDZ6WX2ceq5Sxex9pCkuk9EesBZco_HM3gMWIKN1Lm0o5rinYMuUh46pKJacLxuOgdkJiOE-KNarnNaVCxaU8sotNjsRRarIeq06y0ulkuMLwuBfyypiND2n28q-GjZ_wfpFeADlqvPLk_nYSJE8LlsjlWEBSnhC4y96je_8Wm-AUybD7KxoBrCPjI1A'
				}
			},
			{
				'@context': [
					'https://www.w3.org/2018/credentials/v1',
					'https://w3id.org/security/suites/jws-2020/v1',
					'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
				],
				credentialSubject: {
					'@Context': [
						'https://www.w3.org/2018/credentials/v1',
						'https://w3id.org/security/suites/jws-2020/v1',
						'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
					],
					'gx:termsAndConditions':
						'The PARTICIPANT signing the Self-Description agrees as follows:\n- to update its descriptions about any changes, be it technical, organizational, or legal - especially but not limited to contractual in regards to the indicated attributes present in the descriptions.\n\nThe keypair used to sign Verifiable Credentials will be revoked where Gaia-X Association becomes aware of any inaccurate statements in regards to the claims which result in a non-compliance with the Trust Framework and policy rules defined in the Policy Rules and Labelling Document (PRLD).',
					id: 'https://lakhani.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/participant.json#2',
					type: 'gx:GaiaXTermsAndConditions'
				},
				id: 'did:web:lakhani.smart-x.smartsenselabs.com',
				issuanceDate: '2023-09-11T10:13:42.375138125Z',
				issuer: 'did:web:lakhani.smart-x.smartsenselabs.com',
				type: ['VerifiableCredential'],
				proof: {
					type: 'JsonWebSignature2020',
					created: '2023-09-11T10:13:45.073Z',
					proofPurpose: 'assertionMethod',
					verificationMethod: 'did:web:lakhani.smart-x.smartsenselabs.com',
					jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..xkXfxFhKRx45N86j9e-1bOAxbfiQmF4jHWcYKl3tZdoNKbY4MIt7CnHD1tnWNd80_ceNlminbhFFq1CyNWJtecY-yWLW4UpdloeM4mkcWikGJHM7iy2Im_VYYwmBkbHl3wKnXUw1T6qnwYLV67SRBlK2B13UkyEamVVUTt6asJQU5jVHquOqG7rH8-Okx5WIvv5kpvALFdXCQmUuRwxkRAI1KZLiDeM6oOe_RjuFkTqEzcBA5DOOKU_rhJjLcrpLFplNKavW3Zik3jsRHWCMKtySy4vaiOa3upcjnAVCJQHnUfF0Y0dTXOrG-7O-cTF4rOrjYWAV5XOD7uUrSfLJZw'
				}
			},
			{
				type: 'VerifiableCredential',
				id: 'did:web:lakhani.smart-x.smartsenselabs.com',
				issuer: 'did:web:lakhani.smart-x.smartsenselabs.com',
				issuanceDate: '2023-08-23T16:30:57.209178226Z',
				credentialSubject: {
					'gx:termsAndConditions': {
						'gx:URL': 'https://gaia-x.eu/privacy-policy/',
						'gx:hash': '58b01f2e99b346d6b46b01fb1028e0cdc8f1a4e3dfeaabf25a5e4065c9597e37' //pragma: allowlist secret
					},
					'gx:policy': ['https://wizard-api.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/service_aTRg_policy.json'],
					'gx:dataAccountExport': {
						'gx:requestType': 'API',
						'gx:accessType': 'physical',
						'gx:formatType': 'pdf'
					},
					'gx:aggregationOf': [
						{
							id: 'https://wizard-api.smart-x.smartsenselabs.com/5be199c2-58e8-4a95-a7fb-2744f19910a2/resource_7f9575ef-8673-4063-bb92-b6b08bd012a8.json'
						}
					],
					'gx:dependsOn': [
						{
							id: 'https://wizard-api.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/service_gF20.json'
						}
					],
					'gx:dataProtectionRegime': 'GDPR2016',
					type: 'gx:ServiceOffering',
					'gx:labelLevel': 'https://wizard-api.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/labelLevel_b8d419e7-1734-4e30-8285-c16eb160a8d0.json',
					'gx:providedBy': {
						id: 'https://lakhani.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/participant.json#0'
					},
					id: 'https://wizard-api.smart-x.smartsenselabs.com/15ff8691-96e1-4a4b-ad3f-10ed72452102/service_aTRg.json',
					'gx:name': 'Car repair service',
					'gx:description': 'Car repair service'
				},
				'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
				proof: {
					type: 'JsonWebSignature2020',
					created: '2023-09-13T06:30:18.384Z',
					proofPurpose: 'assertionMethod',
					verificationMethod: 'did:web:lakhani.smart-x.smartsenselabs.com',
					jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..ysYVJxF_qBUeTCUJ-J5zgvpo9-l748jwmqvYpKRm17H2kkAuile1hvd9q-_0VGkmKQT9diqqU-B2jfVRzE8o_Fo2E6glnC3R1JAiPRr8fh3M2YioK_YTluFg0uC70HOtjvn3bHOzItkHJ4k6niW8DtPndMqeSELTddMYnDPM542WHP6pSoJ61RN3CsmF162da4p6EROCVSMc7adQ3v6xn2qPtNGQAflxxfO1or0AgfvJuWx9UaQBEQ6PWfjkoPSVyqcelaRVfEKjWiojU-rVbMW-eXbySTlpXg8oLt-uUOjzMOvSSEnGwGWnB6991X1EUt606nRU7_PjeP8fTh4VGA'
				}
			},
			{
				credentialSubject: {
					'gx:legalName': 'Audi',
					'gx:headquarterAddress': {
						'gx:countrySubdivisionCode': 'BE-BRU'
					},
					'gx:legalAddress': {
						'gx:countrySubdivisionCode': 'BE-BRU'
					},
					id: 'https://audi.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/participant.json#0',
					type: 'gx:LegalParticipant',
					'gx:legalRegistrationNumber': {
						id: 'https://audi.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/participant.json#1'
					}
				},
				'@context': [
					'https://www.w3.org/2018/credentials/v1',
					'https://w3id.org/security/suites/jws-2020/v1',
					'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
				],
				type: ['VerifiableCredential'],
				id: 'did:web:audi.smart-x.smartsenselabs.com',
				issuer: 'did:web:audi.smart-x.smartsenselabs.com',
				issuanceDate: '2023-09-11T06:15:34.64150289Z',
				proof: {
					type: 'JsonWebSignature2020',
					created: '2023-09-11T06:15:37.040Z',
					proofPurpose: 'assertionMethod',
					verificationMethod: 'did:web:audi.smart-x.smartsenselabs.com',
					jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..hT3ELMn_8zlIKIB4nym3GiIcpkHHFxQsK-gDJUr2fdYwC-eIRlN38yS66IDPEZvfi_AsW6-5lbNMVRWKnG_vfbEatoPSzBWZrBDds2bDjZsOjtJTvqWGe7Zyoyr_3gTJnGwmDR5ZioQ2bbaKkCVF9w6VVPuT3yLciSfymuK2YUbTBJ7I4v5VRw1pAB0viy7PdOKgO0HgNLOjJ35Um-F0IKkmoEmDeZji_YuZC6c-XoCuIbnbsMTocJHMNTyN-WCE8tq-dDsFhIjmXq5NLFXozBI0vKROKB8CSqf9bEtz14dw2A9ZbRvBDoc9tPpdCOWhnq7h68eKdHzxqu66OCpPUw'
				}
			},
			{
				'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
				type: ['VerifiableCredential'],
				id: 'https://audi.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/participant.json#1',
				issuer: 'did:web:registration.lab.gaia-x.eu:development',
				issuanceDate: '2023-09-11T06:15:35.274Z',
				credentialSubject: {
					'@context': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
					type: 'gx:legalRegistrationNumber',
					id: 'https://audi.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/participant.json#1',
					'gx:vatID': 'FR79537407926',
					'gx:vatID-countryCode': 'FR'
				},
				evidence: [
					{
						'gx:evidenceURL': 'http://ec.europa.eu/taxation_customs/vies/services/checkVatService',
						'gx:executionDate': '2023-09-11T06:15:35.274Z',
						'gx:evidenceOf': 'gx:vatID'
					}
				],
				proof: {
					type: 'JsonWebSignature2020',
					created: '2023-09-11T06:15:36.185Z',
					proofPurpose: 'assertionMethod',
					verificationMethod: 'did:web:registration.lab.gaia-x.eu:development#X509-JWK2020',
					jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..rORQKOC_dwetaKCkffSm7WsfiBpNfjiZKizLN8S0WdM-Rl5PBGDYwkpFZpy_FnXX58euBRJJzufgwywbKfvOvUNlO4mbP0ByGZZVTyPdaQ52-diDuiUDPWupsxpsTdVvfsD6dVqPgGXMsiMWfdSvlSWrhZWRoWXMpFqGAXPHuWFrQNwW6gdta-o54HFBkccTUAcVwOOL7dNNsrwWsteUftwv7swS-ZCGkNKvsbjbNLPeq0w-AqjcW0qKtp0oJlKrvmWQCqZVIFl-syvVaWZkQlcTs-UlHTlYL3bmwVDheeaLHLOiuT2IFoYQjWBTfSQCRj7pHEW8CF8EmCv6TGLKUQ'
				}
			},
			{
				'@context': [
					'https://www.w3.org/2018/credentials/v1',
					'https://w3id.org/security/suites/jws-2020/v1',
					'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
				],
				credentialSubject: {
					'@Context': [
						'https://www.w3.org/2018/credentials/v1',
						'https://w3id.org/security/suites/jws-2020/v1',
						'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
					],
					'gx:termsAndConditions':
						'The PARTICIPANT signing the Self-Description agrees as follows:\n- to update its descriptions about any changes, be it technical, organizational, or legal - especially but not limited to contractual in regards to the indicated attributes present in the descriptions.\n\nThe keypair used to sign Verifiable Credentials will be revoked where Gaia-X Association becomes aware of any inaccurate statements in regards to the claims which result in a non-compliance with the Trust Framework and policy rules defined in the Policy Rules and Labelling Document (PRLD).',
					id: 'https://audi.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/participant.json#2',
					type: 'gx:GaiaXTermsAndConditions'
				},
				id: 'did:web:audi.smart-x.smartsenselabs.com',
				issuanceDate: '2023-09-11T06:15:34.64150289Z',
				issuer: 'did:web:audi.smart-x.smartsenselabs.com',
				type: ['VerifiableCredential'],
				proof: {
					type: 'JsonWebSignature2020',
					created: '2023-09-11T06:15:37.445Z',
					proofPurpose: 'assertionMethod',
					verificationMethod: 'did:web:audi.smart-x.smartsenselabs.com',
					jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..VEvozxUPb7ffkTIdOq61BlL_dl_wqsIt7QOJNaKnXWCTgzjJW4UQolv6AOEPd1M4lt4l-qXh2S_CF5pjXJiq7NNNSzekotEej_AQ2gHzTJBLKm--VC9EDv1ugxHy7ZqzgOzBzMCz6QLaHrRnh1j6_Vj40LsjoJiW4nYmq7HjiDb-X9mTFA8nUHg1IDYu11kt_XUH8TpOCdO9_yGOiMceTbuQVK_CJb98SMS_h-3KQ1XSPWSmEnKRTnt7D5ZTTSY-omhQBAsiNrOrfavwZq1W9pGNxFzsv33tbwQBm7bWSdtKTcWaIUjeTYv0vp3bbErzlxNaf6v6qTj5sfLwjP4RLQ'
				}
			},
			{
				type: 'VerifiableCredential',
				id: 'did:web:audi.smart-x.smartsenselabs.com',
				issuer: 'did:web:audi.smart-x.smartsenselabs.com',
				issuanceDate: '2023-09-11T06:27:04.783509072Z',
				credentialSubject: {
					'gx:termsAndConditions': {
						'gx:URL': 'https://www.audi.in/in/web/en/models/a4/a4-sedan-2021/engines.html',
						'gx:hash': 'b5217e4f41bd84580668324f37058e889b7f3cdfc3eb0fc815feb346078ddf61' //pragma: allowlist secret
					},
					'gx:policy': ['https://wizard-api.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/service_gF20_policy.json'],
					'gx:dataAccountExport': {
						'gx:requestType': 'API',
						'gx:accessType': 'Physical',
						'gx:formatType': [
							'application/alto-error+json',
							'application/3gppHal+json',
							'application/vnd.3gpp.mcvideo-affiliation-command+xml',
							'application/3gpdash-qoe-report+xml',
							'application/3gppHalForms+json',
							'application/alto-networkmapfilter+json'
						]
					},
					'gx:aggregationOf': [
						{
							id: 'https://wizard-api.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/resource_02b75e13-8108-4a96-a5af-594e1d0707e0.json'
						}
					],
					'gx:dataProtectionRegime': ['GDPR2016', 'LGPD2019', 'PDPA2012', 'CCPA2018', 'VCDPA2021'],
					type: 'gx:ServiceOffering',
					'gx:labelLevel': 'https://wizard-api.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/labelLevel_1a88d772-ee7e-4db7-ac99-9d5a41f66e6e.json',
					'gx:providedBy': {
						id: 'https://audi.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/participant.json#0'
					},
					id: 'https://wizard-api.smart-x.smartsenselabs.com/bed7af39-9d5a-488c-9d22-5f77fdac2ef4/service_gF20.json',
					'gx:name': 'Audi A4',
					'gx:description': 'Audi A4 Price 2023, Images, Colours & Reviews\nThe price of Audi A4 starts at Rs. 43.85 Lakh and goes upto Rs. 51.85 Lakh.'
				},
				'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
				proof: {
					type: 'JsonWebSignature2020',
					created: '2023-09-11T06:27:05.070Z',
					proofPurpose: 'assertionMethod',
					verificationMethod: 'did:web:audi.smart-x.smartsenselabs.com',
					jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..RG0K7fTXo_n__UsrjxP6dLMWchJb0xu3TTD6gKUgCxZNvTvsQXcW2kc5p6QUNEXFbLFXex_6RwBo0b9zeuhh_14YOKOJ6KGi8XspXyhn0eL_hptC0Pw4HI8eJCcblQjmYg7UxW3tn0LvD_-vR3upf0y_dXEvZfp5-5IiMkO_niOmF-slKdUVDblfzgu-fKKLrBsjblb6J9jz41iLfhFJTLXcpMoQXw8IRwSnmYS6cEXJrZxYx18pf52KBiepkMTNN0gROHhxT5OpLdAC0tdphhCfRT5-BhoOLeM4ip79XfU9jxGBprEDoKXnal3z3dl3z-kOwaucowxl-8x16k9g8w'
				}
			}
		]
	},
	validSOComplianceResponse: {
		'@context': [
			'https://www.w3.org/2018/credentials/v1',
			'https://w3id.org/security/suites/jws-2020/v1',
			'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
		],
		type: ['VerifiableCredential'],
		id: 'https://compliance.lab.gaia-x.eu/development/credential-offers/a8ad7ca1-6cd8-4f65-aece-495cec34bc4b',
		issuer: 'did:web:compliance.lab.gaia-x.eu:development',
		issuanceDate: '2023-09-04T11:04:03.179Z',
		expirationDate: '2023-12-03T11:04:03.179Z',
		credentialSubject: [
			{
				type: 'gx:compliance',
				id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#0',
				'gx:integrity': 'sha256-67d8a0b190e5c300b3ac7c4f57e1f5ca9180aa33198ee06345b1c99d54592bcf',
				'gx:version': '22.10'
			},
			{
				type: 'gx:compliance',
				id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#1',
				'gx:integrity': 'sha256-4e093c4979652cd0a6e0ff83e441f05b6e0e8d3c879c5443b2bb61ab4bb1f032',
				'gx:version': '22.10'
			},
			{
				type: 'gx:compliance',
				id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#2',
				'gx:integrity': 'sha256-6f18993ad25984393c2c1a8395f028d8bbf91db492b1c103f496a5a01089a634',
				'gx:version': '22.10'
			},
			{
				type: 'gx:compliance',
				id: 'https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_0Tbi.json',
				'gx:integrity': 'sha256-726533fd93da9ae5e5420cd76a65adca8db810a06098b8c4894fc4d85c11abdb',
				'gx:version': '22.10'
			},
			{
				type: 'gx:compliance',
				id: 'https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_Z5RS.json',
				'gx:integrity': 'sha256-2379edc62860f181a05563211ebe0f36775b3882581e8721ec7def00dd5731f8',
				'gx:version': '22.10'
			}
		],
		proof: {
			type: 'JsonWebSignature2020',
			created: '2023-08-25T12:47:10.429Z',
			proofPurpose: 'assertionMethod',
			jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..EfUcCFQGEEOZZHPwEwcl0r8V4LW3gR34_YA-2z5EM-1JzgQw_eA6iJmEsjc4SLRF-GMkavQNkbB3qpcofzmJWG_pACFTb-uoV9GRriq3oHo2NEQ3INNjhg_lrAs78hLSPTCu8cuGOMxK2q4QAaRcZCMIuVOpaAybfaW8Ym-5lscOuS7zp1qPy8WofrdINPN5xOWWRdQrkHnnHIkQ5ZrmrnAzr1vUv67k_xvhJfRr3Z7XJTqLupe76eRVpw9x4U3qqPrtGXE1afKZN6Skhxcya1Sv2hi263GJuO-zJYLT1a0R1mSITELQzg_5-2BpuWpC3dUZuWnp9hMY6my1-CyqSA',
			verificationMethod: 'did:web:compliance.lab.gaia-x.eu:development#X509-JWK2020'
		}
	},
	veracityResponse: {
		veracity: 0.25,
		certificateDetails: {
			validFrom: 'Sep 15 06:07:13 2023 GMT',
			validTo: 'Dec 14 06:07:12 2023 GMT',
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
				commonName: 'smartsense.smart-x.smartsenselabs.com'
			},
			issuer: { commonName: 'R3', organization: "Let's Encrypt", country: 'US' }
		}
	},
	uniqueVC: [
		{
			credentialSubject: {
				'gx:legalName': 'Ferrari S.p.A.',
				'gx:headquarterAddress': {
					'gx:countrySubdivisionCode': 'BE-BRU'
				},
				'gx:legalAddress': {
					'gx:countrySubdivisionCode': 'BE-BRU'
				},
				id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#0',
				type: 'gx:LegalParticipant',
				'gx:legalRegistrationNumber': {
					id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#1'
				}
			},
			'@context': [
				'https://www.w3.org/2018/credentials/v1',
				'https://w3id.org/security/suites/jws-2020/v1',
				'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
			],
			type: ['VerifiableCredential'],
			id: 'did:web:ferrari.smart-x.smartsenselabs.com',
			issuer: 'did:web:ferrari.smart-x.smartsenselabs.com',
			issuanceDate: '2023-08-22T14:41:15.096514618Z',
			proof: {
				type: 'JsonWebSignature2020',
				created: '2023-08-22T14:41:17.396Z',
				proofPurpose: 'assertionMethod',
				verificationMethod: 'did:web:ferrari.smart-x.smartsenselabs.com',
				jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..bYibkJs5ci0QXMdwwoGEPiCXTk9Kgl5a6EzczrcznWxRrsmhMQD22R6F_0tjlu7uTgwwjjWfBrh0kkKPJ8ELUsOWpRRTWvkBEc5pd9NSz9RCLzTFUOTRXIPeY9_BS-yRckZXBY2xB0jVCJ6lBZIeGUJDy1qXb2fc3_erNhMZF51CH2CSg5EtO3e6dtDMCx6rhJ3r32et0uxppQo5riIQ_R3WaPZ8qq2MRFFZiGtVPpk7Uz6aXHR3lL5frWNYxslb1wTxSFEHk-z1AHKs4ZUBVMMmpQ-dfihgyh1BAfaybcjDdeMUPwODqYxDH3n1Wirh47ZJKWmyzTpNc1OKfGliKw'
			}
		},
		{
			'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
			type: ['VerifiableCredential'],
			id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#1',
			issuer: 'did:web:registration.lab.gaia-x.eu:development',
			issuanceDate: '2023-08-22T14:41:15.806Z',
			credentialSubject: {
				'@context': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
				type: 'gx:legalRegistrationNumber',
				id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#1',
				'gx:leiCode': '9695007586GCAKPYJ703',
				'gx:leiCode-countryCode': 'FR'
			},
			evidence: [
				{
					'gx:evidenceURL': 'https://api.gleif.org/api/v1/lei-records/',
					'gx:executionDate': '2023-08-22T14:41:15.806Z',
					'gx:evidenceOf': 'gx:leiCode'
				}
			],
			proof: {
				type: 'JsonWebSignature2020',
				created: '2023-08-22T14:41:16.756Z',
				proofPurpose: 'assertionMethod',
				verificationMethod: 'did:web:registration.lab.gaia-x.eu:development#X509-JWK2020',
				jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..DnK9JSd_fv5AJEFBV6CUyvJBjhBd-An5OvPyOLW3wHxIUfXB3mypV9rEr5ymvq1Hhf0c8JEi2q14Kd84ugS6XZtq4rHP3lagnsmaUOYwV47kJOt9ZG0GjNsF9u5faIdb4NjiSJAl89rIt8e8WbcZHm2sVxqJYAOS14oKFLb6sFNvtU1IWGy3-LB-A1iYd1bpHlZdnbGLLh_HLNfOSrrSzUoHawvKtTt1RRwn_Ymf-xYjALoVV3o-R6Kto0Sq3GXv-vxqcvOhdV4NcgdHbXVZ89x39n7tu4DeaKVh2L9XdmCn9EB-bZ4-I39B4RdqYOeNiCTPr1eOqMXxaAgortglJA'
			}
		},
		{
			'@context': [
				'https://www.w3.org/2018/credentials/v1',
				'https://w3id.org/security/suites/jws-2020/v1',
				'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
			],
			credentialSubject: {
				'@Context': [
					'https://www.w3.org/2018/credentials/v1',
					'https://w3id.org/security/suites/jws-2020/v1',
					'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
				],
				'gx:termsAndConditions':
					'The PARTICIPANT signing the Self-Description agrees as follows:\n- to update its descriptions about any changes, be it technical, organizational, or legal - especially but not limited to contractual in regards to the indicated attributes present in the descriptions.\n\nThe keypair used to sign Verifiable Credentials will be revoked where Gaia-X Association becomes aware of any inaccurate statements in regards to the claims which result in a non-compliance with the Trust Framework and policy rules defined in the Policy Rules and Labelling Document (PRLD).',
				id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#2',
				type: 'gx:GaiaXTermsAndConditions'
			},
			id: 'did:web:ferrari.smart-x.smartsenselabs.com',
			issuanceDate: '2023-08-22T14:41:15.096514618Z',
			issuer: 'did:web:ferrari.smart-x.smartsenselabs.com',
			type: ['VerifiableCredential'],
			proof: {
				type: 'JsonWebSignature2020',
				created: '2023-08-22T14:41:17.683Z',
				proofPurpose: 'assertionMethod',
				verificationMethod: 'did:web:ferrari.smart-x.smartsenselabs.com',
				jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..H-SLRuyM2q194B2TVmShWBWi_8NZAMOTBwuJLWCpQx9mOhhGHGEkZqd-42KYIpriPevBoGPCdwtJ-ICmtbeU-IFvmLU4yPcsH_mVb1JD2GzslcRCi4Cx2fz8gOpTk8K09JT-WAbEUeM_1NP_nW4q3gVYuRI2ctvqV7A8-nn9jMUxgH0Ba0r0tHDtn9i4YIBF7qXUz5T1dg23tnxEmEVEz_Iup2Vi7a_5UhOqtY_cdpt00lEFasF7mErSYuzOxVbKt0o_mP6mOcMuOjK1yxOPoSAyQV_hZzH3XszfYvMLdwT2w0Fvz5Lihb8ErJGQsYIM5leWI0RuLiub1eXlYUoQmA'
			}
		},
		{
			type: 'VerifiableCredential',
			id: 'did:web:ferrari.smart-x.smartsenselabs.com',
			issuer: 'did:web:ferrari.smart-x.smartsenselabs.com',
			issuanceDate: '2023-08-23T16:30:57.209178226Z',
			credentialSubject: {
				'gx:termsAndConditions': {
					'gx:URL': 'https://aws.amazon.com/service-terms/',
					'gx:hash': 'e9aedbf8c9b87ecb285a45c84444c72c69c546beb9457daa0e3543edd9b3b76c' //pragma: allowlist secret
				},
				'gx:policy': ['https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_0Tbi_policy.json'],
				'gx:dataAccountExport': {
					'gx:requestType': 'API',
					'gx:accessType': 'physical',
					'gx:formatType': 'pdf'
				},
				'gx:aggregationOf': [
					{
						id: 'https://wizard-api1.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/resource_86e8a7a9-c341-4049-abc7-dcf20e1736fe.json'
					}
				],
				'gx:dependsOn': [
					{
						id: 'https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_Z5RS.json'
					}
				],
				'gx:dataProtectionRegime': 'GDPR2016',
				type: 'gx:ServiceOffering',
				'gx:labelLevel': ['https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/labelLevel_52faca44-8ee4-4954-ad99-1043542f9bf1.json'],
				'gx:providedBy': {
					id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json'
				},
				id: 'https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_0Tbi.json',
				'gx:name': 'Service_soft_level',
				'gx:description': 'test service data'
			},
			'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
			proof: {
				type: 'JsonWebSignature2020',
				created: '2023-08-25T12:46:55.876Z',
				proofPurpose: 'assertionMethod',
				verificationMethod: 'did:web:ferrari.smart-x.smartsenselabs.com',
				jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..R9KRgGUYzI6HGIwLeyshlD_Jc6n0NHvZZ7LT0fkjWVlITt-yQXmX_Uab6nAXgfXF-3VClmBqg2R9F6GRB9xSl_CutHv6H4RCG5t7mW_13QY3EQuqph7hPh_O8Cs2byuY5YtOpGZ2lLyU1svb-LdS4q3GO3rdUolDFf_s2Qds_iDKYJVR1ydEo8va-iQhKZXQF6CbSU0wZU0z0se4X1CFMtM6kmvdZjQgI--7UjjUDOyhiAbBXof2_MvCyxKULpe6d1qhmScueS_kXZvwrechl_oN54U-3bEAisc73br2LKcbtndT2qS9L23p1XuAc50BdlSLtQaH_qIw91D9oozX0w'
			}
		},
		{
			type: 'VerifiableCredential',
			id: 'did:web:ferrari.smart-x.smartsenselabs.com',
			issuer: 'did:web:ferrari.smart-x.smartsenselabs.com',
			issuanceDate: '2023-08-23T18:43:21.237205029Z',
			credentialSubject: {
				'gx:termsAndConditions': {
					'gx:URL': 'https://www.volkswagen.co.uk/en/privacy.html',
					'gx:hash': 'de6375fa23c25ea4efb79a66b91d3ad6f270614e38622d9e730985f4f159cfa1' //pragma: allowlist secret
				},
				'gx:policy': ['https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_Z5RS_policy.json'],
				'gx:dataAccountExport': {
					'gx:requestType': 'Support Centre',
					'gx:accessType': 'physical',
					'gx:formatType': 'application/pdf'
				},
				'gx:aggregationOf': [
					{
						id: 'https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/resource_a00d558e-f8b1-4f7b-a42b-4ba9957df400.json'
					}
				],
				'gx:dataProtectionRegime': 'GDPR2016',
				type: 'gx:ServiceOffering',
				'gx:providedBy': {
					id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#0'
				},
				id: 'https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_Z5RS.json',
				'gx:name': 'Volkswagon India 5 Year Service Package',
				'gx:description': 'SO1'
			},
			'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
			proof: {
				type: 'JsonWebSignature2020',
				created: '2023-08-23T13:13:24.487Z',
				proofPurpose: 'assertionMethod',
				verificationMethod: 'did:web:ferrari.smart-x.smartsenselabs.com',
				jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..BY9SK1RqsoaX4kDc3PkmNFlfz0Hk9liOhyHWcCCtud7vfByrv8WOYRqp4JvLd4_3QOHF3Qg2aVTveLiTw9hKPzxc87_cF_RmEeIptHlpAqGvlZa3VN-5PFjGdXFLbdBw4zzs4s6OybhKdeYyeVSAKUgO855GGnkoxa1rOnO53DkExZ5UdinbJSvSramPgACPA14fEYjLQwmTbmKU6shnTMDw92HB-lolVfLNi-EFGstATnaL8z3aznx8xFB1mhiujyCG1BqWGF7TjiBEiuXUQ7v5y7BmYv7N50XRrWozm5qXS7xAvO1Iegtwl8lV1VDpJWN55Omk4FQOcSbGRaG-bQ'
			}
		}
	],
	serviceOfferingProof: {
		type: 'JsonWebSignature2020',
		created: '2023-08-25T12:46:55.876Z',
		proofPurpose: 'assertionMethod',
		verificationMethod: 'did:web:ferrari.smart-x.smartsenselabs.com',
		jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..R9KRgGUYzI6HGIwLeyshlD_Jc6n0NHvZZ7LT0fkjWVlITt-yQXmX_Uab6nAXgfXF-3VClmBqg2R9F6GRB9xSl_CutHv6H4RCG5t7mW_13QY3EQuqph7hPh_O8Cs2byuY5YtOpGZ2lLyU1svb-LdS4q3GO3rdUolDFf_s2Qds_iDKYJVR1ydEo8va-iQhKZXQF6CbSU0wZU0z0se4X1CFMtM6kmvdZjQgI--7UjjUDOyhiAbBXof2_MvCyxKULpe6d1qhmScueS_kXZvwrechl_oN54U-3bEAisc73br2LKcbtndT2qS9L23p1XuAc50BdlSLtQaH_qIw91D9oozX0w'
	},
	serviceOfferingVP: {
		'@context': 'https://www.w3.org/2018/credentials/v1',
		type: ['VerifiablePresentation'],
		verifiableCredential: [
			{
				credentialSubject: {
					'gx:legalName': 'Ferrari S.p.A.',
					'gx:headquarterAddress': {
						'gx:countrySubdivisionCode': 'BE-BRU'
					},
					'gx:legalAddress': {
						'gx:countrySubdivisionCode': 'BE-BRU'
					},
					id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#0',
					type: 'gx:LegalParticipant',
					'gx:legalRegistrationNumber': {
						id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#1'
					}
				},
				'@context': [
					'https://www.w3.org/2018/credentials/v1',
					'https://w3id.org/security/suites/jws-2020/v1',
					'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
				],
				type: ['VerifiableCredential'],
				id: 'did:web:ferrari.smart-x.smartsenselabs.com',
				issuer: 'did:web:ferrari.smart-x.smartsenselabs.com',
				issuanceDate: '2023-08-22T14:41:15.096514618Z',
				proof: {
					type: 'JsonWebSignature2020',
					created: '2023-08-22T14:41:17.396Z',
					proofPurpose: 'assertionMethod',
					verificationMethod: 'did:web:ferrari.smart-x.smartsenselabs.com',
					jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..bYibkJs5ci0QXMdwwoGEPiCXTk9Kgl5a6EzczrcznWxRrsmhMQD22R6F_0tjlu7uTgwwjjWfBrh0kkKPJ8ELUsOWpRRTWvkBEc5pd9NSz9RCLzTFUOTRXIPeY9_BS-yRckZXBY2xB0jVCJ6lBZIeGUJDy1qXb2fc3_erNhMZF51CH2CSg5EtO3e6dtDMCx6rhJ3r32et0uxppQo5riIQ_R3WaPZ8qq2MRFFZiGtVPpk7Uz6aXHR3lL5frWNYxslb1wTxSFEHk-z1AHKs4ZUBVMMmpQ-dfihgyh1BAfaybcjDdeMUPwODqYxDH3n1Wirh47ZJKWmyzTpNc1OKfGliKw'
				}
			},
			{
				'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
				type: ['VerifiableCredential'],
				id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#1',
				issuer: 'did:web:registration.lab.gaia-x.eu:development',
				issuanceDate: '2023-08-22T14:41:15.806Z',
				credentialSubject: {
					'@context': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
					type: 'gx:legalRegistrationNumber',
					id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#1',
					'gx:leiCode': '9695007586GCAKPYJ703',
					'gx:leiCode-countryCode': 'FR'
				},
				evidence: [
					{
						'gx:evidenceURL': 'https://api.gleif.org/api/v1/lei-records/',
						'gx:executionDate': '2023-08-22T14:41:15.806Z',
						'gx:evidenceOf': 'gx:leiCode'
					}
				],
				proof: {
					type: 'JsonWebSignature2020',
					created: '2023-08-22T14:41:16.756Z',
					proofPurpose: 'assertionMethod',
					verificationMethod: 'did:web:registration.lab.gaia-x.eu:development#X509-JWK2020',
					jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..DnK9JSd_fv5AJEFBV6CUyvJBjhBd-An5OvPyOLW3wHxIUfXB3mypV9rEr5ymvq1Hhf0c8JEi2q14Kd84ugS6XZtq4rHP3lagnsmaUOYwV47kJOt9ZG0GjNsF9u5faIdb4NjiSJAl89rIt8e8WbcZHm2sVxqJYAOS14oKFLb6sFNvtU1IWGy3-LB-A1iYd1bpHlZdnbGLLh_HLNfOSrrSzUoHawvKtTt1RRwn_Ymf-xYjALoVV3o-R6Kto0Sq3GXv-vxqcvOhdV4NcgdHbXVZ89x39n7tu4DeaKVh2L9XdmCn9EB-bZ4-I39B4RdqYOeNiCTPr1eOqMXxaAgortglJA'
				}
			},
			{
				'@context': [
					'https://www.w3.org/2018/credentials/v1',
					'https://w3id.org/security/suites/jws-2020/v1',
					'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
				],
				credentialSubject: {
					'@Context': [
						'https://www.w3.org/2018/credentials/v1',
						'https://w3id.org/security/suites/jws-2020/v1',
						'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
					],
					'gx:termsAndConditions':
						'The PARTICIPANT signing the Self-Description agrees as follows:\n- to update its descriptions about any changes, be it technical, organizational, or legal - especially but not limited to contractual in regards to the indicated attributes present in the descriptions.\n\nThe keypair used to sign Verifiable Credentials will be revoked where Gaia-X Association becomes aware of any inaccurate statements in regards to the claims which result in a non-compliance with the Trust Framework and policy rules defined in the Policy Rules and Labelling Document (PRLD).',
					id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#2',
					type: 'gx:GaiaXTermsAndConditions'
				},
				id: 'did:web:ferrari.smart-x.smartsenselabs.com',
				issuanceDate: '2023-08-22T14:41:15.096514618Z',
				issuer: 'did:web:ferrari.smart-x.smartsenselabs.com',
				type: ['VerifiableCredential'],
				proof: {
					type: 'JsonWebSignature2020',
					created: '2023-08-22T14:41:17.683Z',
					proofPurpose: 'assertionMethod',
					verificationMethod: 'did:web:ferrari.smart-x.smartsenselabs.com',
					jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..H-SLRuyM2q194B2TVmShWBWi_8NZAMOTBwuJLWCpQx9mOhhGHGEkZqd-42KYIpriPevBoGPCdwtJ-ICmtbeU-IFvmLU4yPcsH_mVb1JD2GzslcRCi4Cx2fz8gOpTk8K09JT-WAbEUeM_1NP_nW4q3gVYuRI2ctvqV7A8-nn9jMUxgH0Ba0r0tHDtn9i4YIBF7qXUz5T1dg23tnxEmEVEz_Iup2Vi7a_5UhOqtY_cdpt00lEFasF7mErSYuzOxVbKt0o_mP6mOcMuOjK1yxOPoSAyQV_hZzH3XszfYvMLdwT2w0Fvz5Lihb8ErJGQsYIM5leWI0RuLiub1eXlYUoQmA'
				}
			},
			{
				type: 'VerifiableCredential',
				id: 'did:web:ferrari.smart-x.smartsenselabs.com',
				issuer: 'did:web:ferrari.smart-x.smartsenselabs.com',
				issuanceDate: '2023-08-23T16:30:57.209178226Z',
				credentialSubject: {
					'gx:termsAndConditions': {
						'gx:URL': 'https://aws.amazon.com/service-terms/',
						'gx:hash': 'e9aedbf8c9b87ecb285a45c84444c72c69c546beb9457daa0e3543edd9b3b76c' //pragma: allowlist secret
					},
					'gx:policy': ['https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_0Tbi_policy.json'],
					'gx:dataAccountExport': {
						'gx:requestType': 'API',
						'gx:accessType': 'physical',
						'gx:formatType': 'pdf'
					},
					'gx:aggregationOf': [
						{
							id: 'https://wizard-api1.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/resource_86e8a7a9-c341-4049-abc7-dcf20e1736fe.json'
						}
					],
					'gx:dependsOn': [
						{
							id: 'https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_Z5RS.json'
						}
					],
					'gx:dataProtectionRegime': 'GDPR2016',
					type: 'gx:ServiceOffering',
					'gx:labelLevel': ['https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/labelLevel_52faca44-8ee4-4954-ad99-1043542f9bf1.json'],
					'gx:providedBy': {
						id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json'
					},
					id: 'https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_0Tbi.json',
					'gx:name': 'Service_soft_level',
					'gx:description': 'test service data'
				},
				'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
				proof: {
					type: 'JsonWebSignature2020',
					created: '2023-08-25T12:46:55.876Z',
					proofPurpose: 'assertionMethod',
					verificationMethod: 'did:web:ferrari.smart-x.smartsenselabs.com',
					jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..R9KRgGUYzI6HGIwLeyshlD_Jc6n0NHvZZ7LT0fkjWVlITt-yQXmX_Uab6nAXgfXF-3VClmBqg2R9F6GRB9xSl_CutHv6H4RCG5t7mW_13QY3EQuqph7hPh_O8Cs2byuY5YtOpGZ2lLyU1svb-LdS4q3GO3rdUolDFf_s2Qds_iDKYJVR1ydEo8va-iQhKZXQF6CbSU0wZU0z0se4X1CFMtM6kmvdZjQgI--7UjjUDOyhiAbBXof2_MvCyxKULpe6d1qhmScueS_kXZvwrechl_oN54U-3bEAisc73br2LKcbtndT2qS9L23p1XuAc50BdlSLtQaH_qIw91D9oozX0w'
				}
			},
			{
				type: 'VerifiableCredential',
				id: 'did:web:ferrari.smart-x.smartsenselabs.com',
				issuer: 'did:web:ferrari.smart-x.smartsenselabs.com',
				issuanceDate: '2023-08-23T18:43:21.237205029Z',
				credentialSubject: {
					'gx:termsAndConditions': {
						'gx:URL': 'https://www.volkswagen.co.uk/en/privacy.html',
						'gx:hash': 'de6375fa23c25ea4efb79a66b91d3ad6f270614e38622d9e730985f4f159cfa1' //pragma: allowlist secret
					},
					'gx:policy': ['https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_Z5RS_policy.json'],
					'gx:dataAccountExport': {
						'gx:requestType': 'Support Centre',
						'gx:accessType': 'physical',
						'gx:formatType': 'application/pdf'
					},
					'gx:aggregationOf': [
						{
							id: 'https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/resource_a00d558e-f8b1-4f7b-a42b-4ba9957df400.json'
						}
					],
					'gx:dataProtectionRegime': 'GDPR2016',
					type: 'gx:ServiceOffering',
					'gx:providedBy': {
						id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#0'
					},
					id: 'https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_Z5RS.json',
					'gx:name': 'Volkswagon India 5 Year Service Package',
					'gx:description': 'SO1'
				},
				'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
				proof: {
					type: 'JsonWebSignature2020',
					created: '2023-08-23T13:13:24.487Z',
					proofPurpose: 'assertionMethod',
					verificationMethod: 'did:web:ferrari.smart-x.smartsenselabs.com',
					jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..BY9SK1RqsoaX4kDc3PkmNFlfz0Hk9liOhyHWcCCtud7vfByrv8WOYRqp4JvLd4_3QOHF3Qg2aVTveLiTw9hKPzxc87_cF_RmEeIptHlpAqGvlZa3VN-5PFjGdXFLbdBw4zzs4s6OybhKdeYyeVSAKUgO855GGnkoxa1rOnO53DkExZ5UdinbJSvSramPgACPA14fEYjLQwmTbmKU6shnTMDw92HB-lolVfLNi-EFGstATnaL8z3aznx8xFB1mhiujyCG1BqWGF7TjiBEiuXUQ7v5y7BmYv7N50XRrWozm5qXS7xAvO1Iegtwl8lV1VDpJWN55Omk4FQOcSbGRaG-bQ'
				}
			}
		]
	},
	successResponse: {
		data: {
			completeSD: {
				selfDescriptionCredential: {
					'@context': 'https://www.w3.org/2018/credentials/v1',
					type: ['VerifiablePresentation'],
					verifiableCredential: [
						{
							credentialSubject: {
								'gx:legalName': 'Ferrari S.p.A.',
								'gx:headquarterAddress': {
									'gx:countrySubdivisionCode': 'BE-BRU'
								},
								'gx:legalAddress': {
									'gx:countrySubdivisionCode': 'BE-BRU'
								},
								id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#0',
								type: 'gx:LegalParticipant',
								'gx:legalRegistrationNumber': {
									id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#1'
								}
							},
							'@context': [
								'https://www.w3.org/2018/credentials/v1',
								'https://w3id.org/security/suites/jws-2020/v1',
								'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
							],
							type: ['VerifiableCredential'],
							id: 'did:web:ferrari.smart-x.smartsenselabs.com',
							issuer: 'did:web:ferrari.smart-x.smartsenselabs.com',
							issuanceDate: '2023-08-22T14:41:15.096514618Z',
							proof: {
								type: 'JsonWebSignature2020',
								created: '2023-08-22T14:41:17.396Z',
								proofPurpose: 'assertionMethod',
								verificationMethod: 'did:web:ferrari.smart-x.smartsenselabs.com',
								jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..bYibkJs5ci0QXMdwwoGEPiCXTk9Kgl5a6EzczrcznWxRrsmhMQD22R6F_0tjlu7uTgwwjjWfBrh0kkKPJ8ELUsOWpRRTWvkBEc5pd9NSz9RCLzTFUOTRXIPeY9_BS-yRckZXBY2xB0jVCJ6lBZIeGUJDy1qXb2fc3_erNhMZF51CH2CSg5EtO3e6dtDMCx6rhJ3r32et0uxppQo5riIQ_R3WaPZ8qq2MRFFZiGtVPpk7Uz6aXHR3lL5frWNYxslb1wTxSFEHk-z1AHKs4ZUBVMMmpQ-dfihgyh1BAfaybcjDdeMUPwODqYxDH3n1Wirh47ZJKWmyzTpNc1OKfGliKw'
							}
						},
						{
							'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
							type: ['VerifiableCredential'],
							id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#1',
							issuer: 'did:web:registration.lab.gaia-x.eu:development',
							issuanceDate: '2023-08-22T14:41:15.806Z',
							credentialSubject: {
								'@context': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
								type: 'gx:legalRegistrationNumber',
								id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#1',
								'gx:leiCode': '9695007586GCAKPYJ703',
								'gx:leiCode-countryCode': 'FR'
							},
							evidence: [
								{
									'gx:evidenceURL': 'https://api.gleif.org/api/v1/lei-records/',
									'gx:executionDate': '2023-08-22T14:41:15.806Z',
									'gx:evidenceOf': 'gx:leiCode'
								}
							],
							proof: {
								type: 'JsonWebSignature2020',
								created: '2023-08-22T14:41:16.756Z',
								proofPurpose: 'assertionMethod',
								verificationMethod: 'did:web:registration.lab.gaia-x.eu:development#X509-JWK2020',
								jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..DnK9JSd_fv5AJEFBV6CUyvJBjhBd-An5OvPyOLW3wHxIUfXB3mypV9rEr5ymvq1Hhf0c8JEi2q14Kd84ugS6XZtq4rHP3lagnsmaUOYwV47kJOt9ZG0GjNsF9u5faIdb4NjiSJAl89rIt8e8WbcZHm2sVxqJYAOS14oKFLb6sFNvtU1IWGy3-LB-A1iYd1bpHlZdnbGLLh_HLNfOSrrSzUoHawvKtTt1RRwn_Ymf-xYjALoVV3o-R6Kto0Sq3GXv-vxqcvOhdV4NcgdHbXVZ89x39n7tu4DeaKVh2L9XdmCn9EB-bZ4-I39B4RdqYOeNiCTPr1eOqMXxaAgortglJA'
							}
						},
						{
							'@context': [
								'https://www.w3.org/2018/credentials/v1',
								'https://w3id.org/security/suites/jws-2020/v1',
								'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
							],
							credentialSubject: {
								'@Context': [
									'https://www.w3.org/2018/credentials/v1',
									'https://w3id.org/security/suites/jws-2020/v1',
									'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
								],
								'gx:termsAndConditions':
									'The PARTICIPANT signing the Self-Description agrees as follows:\n- to update its descriptions about any changes, be it technical, organizational, or legal - especially but not limited to contractual in regards to the indicated attributes present in the descriptions.\n\nThe keypair used to sign Verifiable Credentials will be revoked where Gaia-X Association becomes aware of any inaccurate statements in regards to the claims which result in a non-compliance with the Trust Framework and policy rules defined in the Policy Rules and Labelling Document (PRLD).',
								id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#2',
								type: 'gx:GaiaXTermsAndConditions'
							},
							id: 'did:web:ferrari.smart-x.smartsenselabs.com',
							issuanceDate: '2023-08-22T14:41:15.096514618Z',
							issuer: 'did:web:ferrari.smart-x.smartsenselabs.com',
							type: ['VerifiableCredential'],
							proof: {
								type: 'JsonWebSignature2020',
								created: '2023-08-22T14:41:17.683Z',
								proofPurpose: 'assertionMethod',
								verificationMethod: 'did:web:ferrari.smart-x.smartsenselabs.com',
								jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..H-SLRuyM2q194B2TVmShWBWi_8NZAMOTBwuJLWCpQx9mOhhGHGEkZqd-42KYIpriPevBoGPCdwtJ-ICmtbeU-IFvmLU4yPcsH_mVb1JD2GzslcRCi4Cx2fz8gOpTk8K09JT-WAbEUeM_1NP_nW4q3gVYuRI2ctvqV7A8-nn9jMUxgH0Ba0r0tHDtn9i4YIBF7qXUz5T1dg23tnxEmEVEz_Iup2Vi7a_5UhOqtY_cdpt00lEFasF7mErSYuzOxVbKt0o_mP6mOcMuOjK1yxOPoSAyQV_hZzH3XszfYvMLdwT2w0Fvz5Lihb8ErJGQsYIM5leWI0RuLiub1eXlYUoQmA'
							}
						},
						{
							type: 'VerifiableCredential',
							id: 'did:web:ferrari.smart-x.smartsenselabs.com',
							issuer: 'did:web:ferrari.smart-x.smartsenselabs.com',
							issuanceDate: '2023-08-23T16:30:57.209178226Z',
							credentialSubject: {
								'gx:termsAndConditions': {
									'gx:URL': 'https://aws.amazon.com/service-terms/',
									'gx:hash': 'e9aedbf8c9b87ecb285a45c84444c72c69c546beb9457daa0e3543edd9b3b76c' //pragma: allowlist secret
								},
								'gx:policy': ['https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_0Tbi_policy.json'],
								'gx:dataAccountExport': {
									'gx:requestType': 'API',
									'gx:accessType': 'physical',
									'gx:formatType': 'pdf'
								},
								'gx:aggregationOf': [
									{
										id: 'https://wizard-api1.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/resource_86e8a7a9-c341-4049-abc7-dcf20e1736fe.json'
									}
								],
								'gx:dependsOn': [
									{
										id: 'https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_Z5RS.json'
									}
								],
								'gx:dataProtectionRegime': 'GDPR2016',
								type: 'gx:ServiceOffering',
								'gx:labelLevel': ['https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/labelLevel_52faca44-8ee4-4954-ad99-1043542f9bf1.json'],
								'gx:providedBy': {
									id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json'
								},
								id: 'https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_0Tbi.json',
								'gx:name': 'Service_soft_level',
								'gx:description': 'test service data'
							},
							'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
							proof: {
								type: 'JsonWebSignature2020',
								created: '2023-08-25T12:46:55.876Z',
								proofPurpose: 'assertionMethod',
								verificationMethod: 'did:web:ferrari.smart-x.smartsenselabs.com',
								jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..R9KRgGUYzI6HGIwLeyshlD_Jc6n0NHvZZ7LT0fkjWVlITt-yQXmX_Uab6nAXgfXF-3VClmBqg2R9F6GRB9xSl_CutHv6H4RCG5t7mW_13QY3EQuqph7hPh_O8Cs2byuY5YtOpGZ2lLyU1svb-LdS4q3GO3rdUolDFf_s2Qds_iDKYJVR1ydEo8va-iQhKZXQF6CbSU0wZU0z0se4X1CFMtM6kmvdZjQgI--7UjjUDOyhiAbBXof2_MvCyxKULpe6d1qhmScueS_kXZvwrechl_oN54U-3bEAisc73br2LKcbtndT2qS9L23p1XuAc50BdlSLtQaH_qIw91D9oozX0w'
							}
						},
						{
							type: 'VerifiableCredential',
							id: 'did:web:ferrari.smart-x.smartsenselabs.com',
							issuer: 'did:web:ferrari.smart-x.smartsenselabs.com',
							issuanceDate: '2023-08-23T18:43:21.237205029Z',
							credentialSubject: {
								'gx:termsAndConditions': {
									'gx:URL': 'https://www.volkswagen.co.uk/en/privacy.html',
									'gx:hash': 'de6375fa23c25ea4efb79a66b91d3ad6f270614e38622d9e730985f4f159cfa1' //pragma: allowlist secret
								},
								'gx:policy': ['https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_Z5RS_policy.json'],
								'gx:dataAccountExport': {
									'gx:requestType': 'Support Centre',
									'gx:accessType': 'physical',
									'gx:formatType': 'application/pdf'
								},
								'gx:aggregationOf': [
									{
										id: 'https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/resource_a00d558e-f8b1-4f7b-a42b-4ba9957df400.json'
									}
								],
								'gx:dataProtectionRegime': 'GDPR2016',
								type: 'gx:ServiceOffering',
								'gx:providedBy': {
									id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#0'
								},
								id: 'https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_Z5RS.json',
								'gx:name': 'Volkswagon India 5 Year Service Package',
								'gx:description': 'SO1'
							},
							'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
							proof: {
								type: 'JsonWebSignature2020',
								created: '2023-08-23T13:13:24.487Z',
								proofPurpose: 'assertionMethod',
								verificationMethod: 'did:web:ferrari.smart-x.smartsenselabs.com',
								jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..BY9SK1RqsoaX4kDc3PkmNFlfz0Hk9liOhyHWcCCtud7vfByrv8WOYRqp4JvLd4_3QOHF3Qg2aVTveLiTw9hKPzxc87_cF_RmEeIptHlpAqGvlZa3VN-5PFjGdXFLbdBw4zzs4s6OybhKdeYyeVSAKUgO855GGnkoxa1rOnO53DkExZ5UdinbJSvSramPgACPA14fEYjLQwmTbmKU6shnTMDw92HB-lolVfLNi-EFGstATnaL8z3aznx8xFB1mhiujyCG1BqWGF7TjiBEiuXUQ7v5y7BmYv7N50XRrWozm5qXS7xAvO1Iegtwl8lV1VDpJWN55Omk4FQOcSbGRaG-bQ'
							}
						}
					]
				},
				complianceCredential: {
					'@context': [
						'https://www.w3.org/2018/credentials/v1',
						'https://w3id.org/security/suites/jws-2020/v1',
						'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
					],
					type: ['VerifiableCredential'],
					id: 'https://compliance.lab.gaia-x.eu/development/credential-offers/a8ad7ca1-6cd8-4f65-aece-495cec34bc4b',
					issuer: 'did:web:compliance.lab.gaia-x.eu:development',
					issuanceDate: '2023-08-25T12:47:09.776Z',
					expirationDate: '2023-11-23T12:47:09.776Z',
					credentialSubject: [
						{
							type: 'gx:compliance',
							id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#0',
							'gx:integrity': 'sha256-67d8a0b190e5c300b3ac7c4f57e1f5ca9180aa33198ee06345b1c99d54592bcf',
							'gx:version': '22.10'
						},
						{
							type: 'gx:compliance',
							id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#1',
							'gx:integrity': 'sha256-4e093c4979652cd0a6e0ff83e441f05b6e0e8d3c879c5443b2bb61ab4bb1f032',
							'gx:version': '22.10'
						},
						{
							type: 'gx:compliance',
							id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json#2',
							'gx:integrity': 'sha256-6f18993ad25984393c2c1a8395f028d8bbf91db492b1c103f496a5a01089a634',
							'gx:version': '22.10'
						},
						{
							type: 'gx:compliance',
							id: 'https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_0Tbi.json',
							'gx:integrity': 'sha256-726533fd93da9ae5e5420cd76a65adca8db810a06098b8c4894fc4d85c11abdb',
							'gx:version': '22.10'
						},
						{
							type: 'gx:compliance',
							id: 'https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_Z5RS.json',
							'gx:integrity': 'sha256-2379edc62860f181a05563211ebe0f36775b3882581e8721ec7def00dd5731f8',
							'gx:version': '22.10'
						}
					],
					proof: {
						type: 'JsonWebSignature2020',
						created: '2023-08-25T12:47:10.429Z',
						proofPurpose: 'assertionMethod',
						jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..EfUcCFQGEEOZZHPwEwcl0r8V4LW3gR34_YA-2z5EM-1JzgQw_eA6iJmEsjc4SLRF-GMkavQNkbB3qpcofzmJWG_pACFTb-uoV9GRriq3oHo2NEQ3INNjhg_lrAs78hLSPTCu8cuGOMxK2q4QAaRcZCMIuVOpaAybfaW8Ym-5lscOuS7zp1qPy8WofrdINPN5xOWWRdQrkHnnHIkQ5ZrmrnAzr1vUv67k_xvhJfRr3Z7XJTqLupe76eRVpw9x4U3qqPrtGXE1afKZN6Skhxcya1Sv2hi263GJuO-zJYLT1a0R1mSITELQzg_5-2BpuWpC3dUZuWnp9hMY6my1-CyqSA',
						verificationMethod: 'did:web:compliance.lab.gaia-x.eu:development#X509-JWK2020'
					}
				}
			},
			trustIndex: {
				veracity: 0.25,
				transparency: 1.6,
				trustIndex: 0.925,
				certificateDetails: {
					validFrom: 'Aug 22 13:39:54 2023 GMT',
					validTo: 'Nov 20 13:39:53 2023 GMT',
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
						commonName: 'ferrari.smart-x.smartsenselabs.com'
					},
					issuer: {
						commonName: 'R3',
						organization: "Let's Encrypt",
						country: 'US'
					}
				}
			}
		},
		message: 'Service offering SD signed successfully'
	},
	transparencyCS: {
		'gx:termsAndConditions': {
			'gx:URL': 'https://aws.amazon.com/service-terms/',
			'gx:hash': 'e9aedbf8c9b87ecb285a45c84444c72c69c546beb9457daa0e3543edd9b3b76c' //pragma: allowlist secret
		},
		'gx:policy': ['https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_0Tbi_policy.json'],
		'gx:dataAccountExport': {
			'gx:requestType': 'API',
			'gx:accessType': 'physical',
			'gx:formatType': 'pdf'
		},
		'gx:aggregationOf': [
			{
				id: 'https://wizard-api1.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/resource_86e8a7a9-c341-4049-abc7-dcf20e1736fe.json'
			}
		],
		'gx:dependsOn': [
			{
				id: 'https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_Z5RS.json'
			}
		],
		'gx:dataProtectionRegime': 'GDPR2016',
		type: 'gx:ServiceOffering',
		'gx:labelLevel': ['https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/labelLevel_52faca44-8ee4-4954-ad99-1043542f9bf1.json'],
		'gx:providedBy': {
			id: 'https://ferrari.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/participant.json'
		},
		id: 'https://wizard-api.smart-x.smartsenselabs.com/182af7e9-b10b-42da-95f4-7f8289ec330e/service_0Tbi.json',
		'gx:name': 'Service_soft_level',
		'gx:description': 'test service data'
	},
	x5u: {
		subject: 'CN=ferrari.smart-x.smartsenselabs.com',
		subjectAltName: 'DNS:ferrari.smart-x.smartsenselabs.com',
		issuer: "C=US\nO=Let's Encrypt\nCN=R3",
		infoAccess: 'OCSP - URI:http://r3.o.lencr.org\nCA Issuers - URI:http://r3.i.lencr.org/\n',
		validFrom: 'Aug 22 13:39:54 2023 GMT',
		validTo: 'Nov 20 13:39:53 2023 GMT',
		fingerprint: 'B9:06:F9:81:01:87:B7:AB:9C:E2:2C:DB:66:D1:3D:00:38:87:1A:2A',
		fingerprint256: '9C:70:44:CE:74:C7:B0:13:2A:06:FB:C0:BC:4C:0A:DF:FE:3F:4F:EC:61:07:AA:92:F7:B5:D0:EC:46:55:88:7B',
		keyUsage: ['1.3.6.1.5.5.7.3.1', '1.3.6.1.5.5.7.3.2'],
		serialNumber: '036DF9E324D9C4BC85836AF4E8F33C676CA5' //pragma: allowlist secret
	}
}

export const legalParticipantTestJSON = {
	invalidIssuerJSON: {
		privateKey: 'Base64 -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----' //pragma: allowlist secret
	},
	invalidVerificationMethodJSON: {
		issuer: 'did:web:casio34.smart-x.smartsenselabs.com',
		privateKey: 'Base64 -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----' //pragma: allowlist secret
	},
	invalidLegalParticipant: {
		issuer: 'did:web:casio34.smart-x.smartsenselabs.com',
		verificationMethod: 'did:web:casio34.smart-x.smartsenselabs.com',
		privateKey: 'Base64 -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----' //pragma: allowlist secret
	},
	invalidLegalRegistrationNumber: {
		issuer: 'did:web:casio34.smart-x.smartsenselabs.com',
		verificationMethod: 'did:web:casio34.smart-x.smartsenselabs.com',
		privateKey: 'Base64 -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----', //pragma: allowlist secret
		vcs: {
			legalParticipant: {}
		}
	},
	invalidGaiaXTermsAndConditions: {
		issuer: 'did:web:casio34.smart-x.smartsenselabs.com',
		verificationMethod: 'did:web:casio34.smart-x.smartsenselabs.com',
		privateKey: 'Base64 -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----', //pragma: allowlist secret
		vcs: {
			legalParticipant: {},
			legalRegistrationNumber: {}
		}
	},
	validReqJSON: {
		issuer: 'did:web:casio50.smart-x.smartsenselabs.com',
		verificationMethod: 'did:web:casio50.smart-x.smartsenselabs.com',
		privateKey: 'Base64 Encoded -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----', //pragma: allowlist secret
		vcs: {
			legalParticipant: {
				'@context': [
					'https://www.w3.org/2018/credentials/v1',
					'https://w3id.org/security/suites/jws-2020/v1',
					'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
				],
				type: ['VerifiableCredential'],
				id: 'did:web:casio50.smart-x.smartsenselabs.com',
				issuer: 'did:web:casio50.smart-x.smartsenselabs.com',
				issuanceDate: '2023-07-28T11:13:53.734Z',
				credentialSubject: {
					id: 'https://casio50.smart-x.smartsenselabs.com/d3ef8323-5a75-4a88-a97b-730deb535405/participant.json#0',
					type: 'gx:LegalParticipant',
					'gx:legalName': 'Green World',
					'gx:legalRegistrationNumber': {
						id: 'https://casio50.smart-x.smartsenselabs.com/d3ef8323-5a75-4a88-a97b-730deb535405/participant.json#1'
					},
					'gx:headquarterAddress': {
						'gx:countrySubdivisionCode': 'BE-BRU'
					},
					'gx:legalAddress': {
						'gx:countrySubdivisionCode': 'BE-BRU'
					},
					'gx:parentOrganization': [
						{
							id: 'https://wizard-api.smart-x.smartsenselabs.com/195f8f7a-e0b9-4105-a94f-911455ff88ac/participant.json#0'
						}
					],
					'gx:subOrganization': [
						{
							id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#0'
						}
					]
				}
			},
			legalRegistrationNumber: {
				'@context': ['https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/participant'],
				type: 'gx:legalRegistrationNumber',
				id: 'https://casio50.smart-x.smartsenselabs.com/d3ef8323-5a75-4a88-a97b-730deb535405/participant.json#1',
				'gx:leiCode': '9695007586GCAKPYJ703'
			},
			gaiaXTermsAndConditions: {
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
					id: 'https://casio50.smart-x.smartsenselabs.com/d3ef8323-5a75-4a88-a97b-730deb535405/participant.json#2'
				},
				issuer: 'did:web:casio50.smart-x.smartsenselabs.com',
				id: 'did:web:casio50.smart-x.smartsenselabs.com'
			}
		}
	},
	validComplianceResponse: {
		'@context': [
			'https://www.w3.org/2018/credentials/v1',
			'https://w3id.org/security/suites/jws-2020/v1',
			'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
		],
		type: ['VerifiableCredential'],
		id: 'https://compliance.lab.gaia-x.eu/development/credential-offers/20d616a0-c183-453f-9791-c1ef0a867ac2',
		issuer: 'did:web:compliance.lab.gaia-x.eu:development',
		issuanceDate: '2023-08-19T11:07:50.481Z',
		expirationDate: '2023-11-17T11:07:50.481Z',
		credentialSubject: [
			{
				type: 'gx:compliance',
				id: 'https://casio34.smart-x.smartsenselabs.com/d3ef8323-5a75-4a88-a97b-730deb535405/participant.json#0',
				'gx:integrity': 'sha256-fe58e48d11e9b139279e4ec5dc857ad77a058d7ec6161cad778ee550d76a32e4',
				version: '22.10'
			},
			{
				type: 'gx:compliance',
				id: 'https://casio34.smart-x.smartsenselabs.com/d3ef8323-5a75-4a88-a97b-730deb535405/participant.json#1',
				'gx:integrity': 'sha256-2d98944c67ca015ccde5b7a2e7d6b4455fda5861c825a15a4a6ed5751ed6eac8',
				version: '22.10'
			},
			{
				type: 'gx:compliance',
				id: 'https://casio34.smart-x.smartsenselabs.com/d3ef8323-5a75-4a88-a97b-730deb535405/participant.json#2',
				'gx:integrity': 'sha256-cebaffa21ad2f6be9678205f3bba48c04a9ac6f499abd8d465954a38e3504aae',
				version: '22.10'
			},
			{
				type: 'gx:compliance',
				id: 'https://wizard-api.smart-x.smartsenselabs.com/195f8f7a-e0b9-4105-a94f-911455ff88ac/participant.json#0',
				'gx:integrity': 'sha256-be934a813e7c02883d5f7b33fccc9329c97a907bca2af6917d09623122f9736b',
				version: '22.10'
			},
			{
				type: 'gx:compliance',
				id: 'https://wizard-api.smart-x.smartsenselabs.com/195f8f7a-e0b9-4105-a94f-911455ff88ac/participant.json#1',
				'gx:integrity': 'sha256-16542149ded3da8068ea927bf786fe88d9d0ed7521d90504410994b7495f6993',
				version: '22.10'
			},
			{
				type: 'gx:compliance',
				id: 'https://wizard-api.smart-x.smartsenselabs.com/195f8f7a-e0b9-4105-a94f-911455ff88ac/participant.json#2',
				'gx:integrity': 'sha256-7c5dff5936f583077f2a2aa2723103ad6cbbbd045adbf701da5c13828ce9de91',
				version: '22.10'
			},
			{
				type: 'gx:compliance',
				id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#0',
				'gx:integrity': 'sha256-372994ed4b18b7f4252626a48c510aa170cb3a04717d2501ccf1982ed85a9b12',
				version: '22.10'
			},
			{
				type: 'gx:compliance',
				id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#1',
				'gx:integrity': 'sha256-20059a7a182d8a840ee25f8773446aa2f0564c0ff82d359b8a1b194bf1f98045',
				version: '22.10'
			},
			{
				type: 'gx:compliance',
				id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#2',
				'gx:integrity': 'sha256-f897639cb8a0236874ec395a3b0443986fcf5e3b1ac4ac1f3978e72e685dea2f',
				version: '22.10'
			}
		],
		proof: {
			type: 'JsonWebSignature2020',
			created: '2023-08-19T11:07:51.250Z',
			proofPurpose: 'assertionMethod',
			jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..MUYt66-dF-G-3cWvkdsCo052Pfsq16QTR0mDCVmuzixziA74iM80phUsUO5xU2uxStZMpk-2QeCFdFBK5VTqeM8Rw312C851BJMD0szq5iMm14CtoJqAX9f5jp5RR7SxKUbJn4Qa67VnSJ5_SeSNYJBkkSBKGOwmxeDTSbXd6kml4yS6jOhler8NGz3i154DtFhr8C25FeMdX7NgTfbyQfEw0gHieBt1M9dHGCCzHHKz16Sn_rUzPWdy_tPgG_VvycqrtA8mITq5lsjSPiU_E-6fezEmKoQW_uYy-6gZN_BCqJX-BGwhMwqMB-RwdRDlZmCBm_PfknhWtAc_vNH0lA',
			verificationMethod: 'did:web:compliance.lab.gaia-x.eu:development#X509-JWK2020'
		}
	},
	successResponse: {
		data: {
			completeSD: {
				selfDescriptionCredential: {
					'@context': 'https://www.w3.org/2018/credentials/v1',
					type: ['VerifiablePresentation'],
					verifiableCredential: [
						{
							credentialSubject: {
								'gx:legalName': 'Green World',
								'gx:headquarterAddress': {
									'gx:countrySubdivisionCode': 'BE-BRU'
								},
								'gx:legalAddress': {
									'gx:countrySubdivisionCode': 'BE-BRU'
								},
								id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#0',
								type: 'gx:LegalParticipant',
								'gx:legalRegistrationNumber': {
									id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#1'
								}
							},
							'@context': [
								'https://www.w3.org/2018/credentials/v1',
								'https://w3id.org/security/suites/jws-2020/v1',
								'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
							],
							type: ['VerifiableCredential'],
							id: 'did:web:casio50.smart-x.smartsenselabs.com',
							issuer: 'did:web:casio50.smart-x.smartsenselabs.com',
							issuanceDate: '2023-08-07T16:04:30.307219451Z',
							proof: {
								type: 'JsonWebSignature2020',
								created: '2023-08-07T10:34:33.838Z',
								proofPurpose: 'assertionMethod',
								verificationMethod: 'did:web:casio50.smart-x.smartsenselabs.com',
								jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..btTzZ3J0O-DcSe8rumxVLBF1jIrHFmonLQ8FWgvrl0ueQGt9VOnRZF5RFN6fHm7Sgx2N4O9EdTFwvV5II-l4nLKK6qHd_f97zNsonL7BRxQ0RB4GpbE6m0pR_XljCzKIQG6RZVyZTAeOdsyWBzGm1M_2hnmTLkBMB33GAJW8fI1d_ou4KbxUfkPiFCfnTUPM3uP5WXGuqC2XqUInL5NJKFZGD6Ld1l6PzPqEGYn-m1UCGQyh6w7l-2NVRT-FHpo3_HHY-xU7RX2F7tDZffCOTbOeiV15xktZWj233BFrcvhBHZ0a14IfifTVFUH0GYmwUPMF1BSS7LCNldFetkcCWQ'
							}
						},
						{
							'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
							type: 'VerifiableCredential',
							id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#1',
							issuer: 'did:web:registration.lab.gaia-x.eu:development',
							issuanceDate: '2023-08-07T10:34:32.101Z',
							credentialSubject: {
								'@context': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
								type: 'gx:legalRegistrationNumber',
								id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#1',
								'gx:leiCode': '9695007586GCAKPYJ703',
								'gx:leiCode-countryCode': 'FR'
							},
							evidence: [
								{
									'gx:evidenceURL': 'https://api.gleif.org/api/v1/lei-records/',
									'gx:executionDate': '2023-08-07T10:34:32.101Z',
									'gx:evidenceOf': 'gx:leiCode'
								}
							],
							proof: {
								type: 'JsonWebSignature2020',
								created: '2023-08-07T10:34:33.102Z',
								proofPurpose: 'assertionMethod',
								verificationMethod: 'did:web:registration.lab.gaia-x.eu:development#X509-JWK2020',
								jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..Jdx7tQNdCdFc5Gnp1gx8SJ5rqKYAqGXzqEhOJgMnXpmn4MFZvwG97UdnGwgmcqYHsjdqFxEysZDoDnkrmBV-_B1zy2oEcZ9P2I95LS6_H8EfgB6wWdlxyAjg5Hnp-QFoR0N8p6n-hKwEkF1R3e1pVHE2txcTfiGQOfqQGd4EwZAu9Ph6YBdAuYrgBmr4zSEEYNQ5LQRSMvljHSG-h_KHhR4-Fcc-YI_ZUtdPuXbH7IiAo9gAdtPFAW6KDzVKsN1klEzJxp5rVkHYwjsLFCn7wNrYw6u7pbLsSXWRKKypw4gTcdVP6jft4orbLOOWE4gadfkv7AXh8Egk9yIlx_VLBQ'
							}
						},
						{
							'@context': [
								'https://www.w3.org/2018/credentials/v1',
								'https://w3id.org/security/suites/jws-2020/v1',
								'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
							],
							credentialSubject: {
								'@Context': [
									'https://www.w3.org/2018/credentials/v1',
									'https://w3id.org/security/suites/jws-2020/v1',
									'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
								],
								'gx:termsAndConditions':
									'The PARTICIPANT signing the Self-Description agrees as follows:\n- to update its descriptions about any changes, be it technical, organizational, or legal - especially but not limited to contractual in regards to the indicated attributes present in the descriptions.\n\nThe keypair used to sign Verifiable Credentials will be revoked where Gaia-X Association becomes aware of any inaccurate statements in regards to the claims which result in a non-compliance with the Trust Framework and policy rules defined in the Policy Rules and Labelling Document (PRLD).',
								id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#2',
								type: 'gx:GaiaXTermsAndConditions'
							},
							id: 'did:web:casio50.smart-x.smartsenselabs.com',
							issuanceDate: '2023-08-07T16:04:30.307219451Z',
							issuer: 'did:web:casio50.smart-x.smartsenselabs.com',
							type: ['VerifiableCredential'],
							proof: {
								type: 'JsonWebSignature2020',
								created: '2023-08-07T10:34:34.513Z',
								proofPurpose: 'assertionMethod',
								verificationMethod: 'did:web:casio50.smart-x.smartsenselabs.com',
								jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..SWXsvdPCdnLCnVIkO1cYRca1JMGk0qLVvyW8-cqeHBHn7PbAL0grpW3X0ZyMekncWgJ0-vXBaSdre1OfLSbBXZgpxgqha8OKaCMGqqbSC4IYMmuUeUOvZ_pIAyabFy6OHc45Sm3YT3os7xezF6rl5Kbwn-_nPSZE0izAv269at9Gs_aYUE79UTLyX-_Its4gadRuDdcAhznsrHx4rbNpX9kNh_389zB_lu1lTlt2VqjXBYnbMbknW9-k3lVZZm6giVFxa3fNEAh-1x30-ZdmOs8KNS8mWNl_8SFSE0bmN4BB-3J91bG2aZ8G9GWzu4x3lI-1WmlnEDj5WhaE69Dq0A'
							}
						}
					]
				},
				complianceCredential: {
					'@context': [
						'https://www.w3.org/2018/credentials/v1',
						'https://w3id.org/security/suites/jws-2020/v1',
						'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
					],
					type: ['VerifiableCredential'],
					issuer: 'did:web:compliance.lab.gaia-x.eu:development',
					expirationDate: '2023-11-07T11:11:43.551Z',
					id: 'https://compliance.lab.gaia-x.eu/development/credential-offers/0d8948ed-ddb8-4285-bf93-275d70c6f659',
					issuanceDate: '2023-08-09T11:11:43.551Z',
					credentialSubject: [
						{
							type: 'gx:compliance',
							id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#0',
							'gx:integrity': 'sha256-372994ed4b18b7f4252626a48c510aa170cb3a04717d2501ccf1982ed85a9b12',
							version: '22.10'
						},
						{
							type: 'gx:compliance',
							id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#1',
							'gx:integrity': 'sha256-20059a7a182d8a840ee25f8773446aa2f0564c0ff82d359b8a1b194bf1f98045',
							version: '22.10'
						},
						{
							type: 'gx:compliance',
							id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#2',
							'gx:integrity': 'sha256-f897639cb8a0236874ec395a3b0443986fcf5e3b1ac4ac1f3978e72e685dea2f',
							version: '22.10'
						}
					],
					proof: {
						created: '2023-08-09T11:11:44.286Z',
						jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..MSQjozv_WMQk6CCe2XssIFSUzsUkbS_vC8TlwG3F4j6ZcudOdcySwBflN4qyUdVA5Z5WZDFnkUL7IS2h3XwHCKmtQFX99b1wBlrGaf7mt9y--9-XVx_EDg_LmNbeNSjxUdyJFf_xh2lYx5wNstuyQeC2-CjyAuwPXwBKiOS2NkcTokwTdyLAekgeSU01LyrYyGJwFn39pGXkB1Dn8EiMNhU58cHtRVXUy8J4xmx4RGUDRBaASVVO1rNqAcBsfHAh_8CGpr-HxWD1gqnBm4-kILv_3R7gmpNDlFjH4vu-mYEDJtKvdHZWP-mwYtEt37IA3JZ1aRzeQVtzIU7A7yUphg',
						proofPurpose: 'assertionMethod',
						type: 'JsonWebSignature2020',
						verificationMethod: 'did:web:compliance.lab.gaia-x.eu:development#X509-JWK2020'
					}
				}
			}
		},
		message: 'VP created successfully.'
	}
}

export const resourceTestJSON = {
	invalidIssuerJSON: {
		privateKey: 'Base64 -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----' //pragma: allowlist secret
	},
	invalidVerificationMethodJSON: {
		issuer: 'did:web:casio34.smart-x.smartsenselabs.com',
		privateKey: 'Base64 -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----' //pragma: allowlist secret
	},
	invalidResource: {
		issuer: 'did:web:casio34.smart-x.smartsenselabs.com',
		verificationMethod: 'did:web:casio34.smart-x.smartsenselabs.com',
		privateKey: 'Base64 -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----' //pragma: allowlist secret
	},
	invalidCredentialSubjectResource: {
		issuer: 'did:web:casio34.smart-x.smartsenselabs.com',
		verificationMethod: 'did:web:casio34.smart-x.smartsenselabs.com',
		privateKey: 'Base64 -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----', //pragma: allowlist secret
		vcs: {
			resource: {}
		}
	},
	invalidResourceType: {
		privateKey: 'Base64 Encoded -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----', //pragma: allowlist secret
		issuer: 'did:web:casio34.smart-x.smartsenselabs.com',
		verificationMethod: 'did:web:casio34.smart-x.smartsenselabs.com',
		vcs: {
			resource: {
				credentialSubject: {
					type: 'gx:invalid'
				}
			}
		}
	},
	validVirtualDataResourceReqJSON: {
		privateKey: 'Base64 Encoded -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----', //pragma: allowlist secret
		issuer: 'did:web:casio34.smart-x.smartsenselabs.com',
		verificationMethod: 'did:web:casio34.smart-x.smartsenselabs.com',
		vcs: {
			resource: {
				'@context': ['https://www.w3.org/2018/credentials/v1', 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'],
				type: ['VerifiableCredential'],
				id: 'did:web:casio34.smart-x.smartsenselabs.com',
				issuer: 'did:web:casio34.smart-x.smartsenselabs.com',
				issuanceDate: '2023-08-07T16:04:30.307219451Z',
				credentialSubject: {
					'@context': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
					id: 'https://wizard-api.smart-x.smartsenselabs.com/uuid/test-resource-2.json',
					type: 'gx:DataResource',
					'gx:name': 'Test Resource 2',
					'gx:description': 'Test Resource 2 description',
					'gx:aggregationOf': [
						{
							id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/resource_f288e078-c580-4cfe-9c25-2013174c4324.json'
						}
					],
					'gx:copyrightOwnedBy': [
						{
							id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#0'
						}
					],
					'gx:license': ['http://smartproof.in/.well-known/license'],
					'gx:policy': ['https://example.com'],
					'gx:producedBy': {
						id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#0'
					},
					'gx:exposedThrough': ['https://wizard-api.smart-x.smartsenselabs.com/uuid/test-resource-2'],
					'gx:containsPII': false
				}
			}
		}
	},
	validPhysicalResourceReqJSON: {
		privateKey: 'Base64 Encoded -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----', //pragma: allowlist secret
		issuer: 'did:web:casio34.smart-x.smartsenselabs.com',
		verificationMethod: 'did:web:casio34.smart-x.smartsenselabs.com',
		vcs: {
			resource: {
				'@context': ['https://www.w3.org/2018/credentials/v1', 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'],
				type: ['VerifiableCredential'],
				id: 'did:web:casio50.smart-x.smartsenselabs.com',
				issuer: 'did:web:casio50.smart-x.smartsenselabs.com',
				issuanceDate: '2023-08-07T16:04:30.307219451Z',
				credentialSubject: {
					'@context': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
					id: 'https://wizard-api.smart-x.smartsenselabs.com/uuid/test-resource-2.json',
					type: 'gx:PhysicalResource',
					'gx:name': 'Test Resource 2',
					'gx:description': 'Test Resource 2 description',
					'gx:aggregationOf': [
						{
							id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/resource_f288e078-c580-4cfe-9c25-2013174c4324.json'
						}
					],
					'gx:maintainedBy': [
						{
							id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#0'
						}
					],
					'gx:ownedBy': [
						{
							id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#0'
						}
					],
					'gx:manufacturedBy': [
						{
							id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#0'
						}
					],
					'gx:locationAddress': [
						{
							'gx:countryCode': 'FR-DE'
						},
						{
							'gx:countryCode': 'AA-DE'
						}
					],
					'gx:location': [
						{
							'gx:gps': '35.89421911 139.94637467'
						},
						{
							'gx:gps': '31.89421911 133.94637467'
						}
					]
				}
			}
		}
	},
	validVirtualSoftwareResourceReqJSON: {
		privateKey: 'Base64 Encoded -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----', //pragma: allowlist secret
		issuer: 'did:web:casio34.smart-x.smartsenselabs.com',
		verificationMethod: 'did:web:casio34.smart-x.smartsenselabs.com',
		vcs: {
			resource: {
				'@context': ['https://www.w3.org/2018/credentials/v1', 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'],
				type: ['VerifiableCredential'],
				id: 'did:web:casio50.smart-x.smartsenselabs.com',
				issuer: 'did:web:casio50.smart-x.smartsenselabs.com',
				issuanceDate: '2023-08-07T16:04:30.307219451Z',
				credentialSubject: {
					'@context': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
					id: 'https://wizard-api.smart-x.smartsenselabs.com/uuid/test-resource-2.json',
					type: 'gx:SoftwareResource',
					'gx:name': 'Test Resource 2',
					'gx:description': 'Test Resource 2 description',
					'gx:aggregationOf': [
						{
							id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/resource_f288e078-c580-4cfe-9c25-2013174c4324.json'
						}
					],
					'gx:copyrightOwnedBy': [
						{
							id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#0'
						}
					],
					'gx:license': ['https://wizard-api.smart-x.smartsenselabs.com/license'],
					'gx:policy': ['https://example.com']
				}
			}
		}
	},
	successResponse: {
		data: {
			completeSD: {
				selfDescriptionCredential: {
					'@context': 'https://www.w3.org/2018/credentials/v1',
					type: ['VerifiablePresentation'],
					verifiableCredential: [
						{
							'@context': ['https://www.w3.org/2018/credentials/v1', 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'],
							type: ['VerifiableCredential'],
							id: 'did:web:casio34.smart-x.smartsenselabs.com',
							issuer: 'did:web:casio34.smart-x.smartsenselabs.com',
							issuanceDate: '2023-08-07T16:04:30.307219451Z',
							credentialSubject: {
								'@context': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
								id: 'https://wizard-api.smart-x.smartsenselabs.com/uuid/test-resource-2.json',
								type: 'gx:DataResource',
								'gx:name': 'Test Resource 2',
								'gx:description': 'Test Resource 2 description',
								'gx:aggregationOf': [
									{
										id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/resource_f288e078-c580-4cfe-9c25-2013174c4324.json'
									}
								],
								'gx:copyrightOwnedBy': [
									{
										id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#0'
									}
								],
								'gx:license': ['http://smartproof.in/.well-known/license'],
								'gx:policy': ['https://example.com'],
								'gx:producedBy': {
									id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#0'
								},
								'gx:exposedThrough': ['https://wizard-api.smart-x.smartsenselabs.com/uuid/test-resource-2'],
								'gx:containsPII': false
							},
							proof: {
								type: 'JsonWebSignature2020',
								created: '2023-08-19T11:12:58.984Z',
								proofPurpose: 'assertionMethod',
								verificationMethod: 'did:web:casio34.smart-x.smartsenselabs.com',
								jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..ZrXhSmUDGhAIBfSYQdpOe2lfkKue_U_d2cORJtKH-q_yE8v5DC8-_zsP-YS0hSz2Etl4MM1zMZJkZqBA4NOx6HNQEsJYPz_sh_ghy1uy1iHQEo78potnZOqea1cuGKLxmfA5xukHYvlAzQmXIGZrb5XlREdtn0Jv50Vb_XUPvCxk2-e4BlvfmFtDuRmkZE3dLo4Dx6fzW15aXoS328gw25pR2A0NzaMBrUJu1VL3sapcvB2gjwX-irDHHh423KVuzgPIBpru1eA1rPJxLd6nCs2Y9HrlXf_656DM00cM1bv7WkG_3IxjOUvJmfGPbxRXOyYCXPOjIzkSMFoFm2JB7g'
							}
						},
						{
							credentialSubject: {
								'gx:legalName': 'Green World',
								'gx:headquarterAddress': {
									'gx:countrySubdivisionCode': 'BE-BRU'
								},
								'gx:legalAddress': {
									'gx:countrySubdivisionCode': 'BE-BRU'
								},
								id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#0',
								type: 'gx:LegalParticipant',
								'gx:legalRegistrationNumber': {
									id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#1'
								}
							},
							'@context': [
								'https://www.w3.org/2018/credentials/v1',
								'https://w3id.org/security/suites/jws-2020/v1',
								'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
							],
							type: ['VerifiableCredential'],
							id: 'did:web:casio50.smart-x.smartsenselabs.com',
							issuer: 'did:web:casio50.smart-x.smartsenselabs.com',
							issuanceDate: '2023-08-07T16:04:30.307219451Z',
							proof: {
								type: 'JsonWebSignature2020',
								created: '2023-08-07T10:34:33.838Z',
								proofPurpose: 'assertionMethod',
								verificationMethod: 'did:web:casio50.smart-x.smartsenselabs.com',
								jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..btTzZ3J0O-DcSe8rumxVLBF1jIrHFmonLQ8FWgvrl0ueQGt9VOnRZF5RFN6fHm7Sgx2N4O9EdTFwvV5II-l4nLKK6qHd_f97zNsonL7BRxQ0RB4GpbE6m0pR_XljCzKIQG6RZVyZTAeOdsyWBzGm1M_2hnmTLkBMB33GAJW8fI1d_ou4KbxUfkPiFCfnTUPM3uP5WXGuqC2XqUInL5NJKFZGD6Ld1l6PzPqEGYn-m1UCGQyh6w7l-2NVRT-FHpo3_HHY-xU7RX2F7tDZffCOTbOeiV15xktZWj233BFrcvhBHZ0a14IfifTVFUH0GYmwUPMF1BSS7LCNldFetkcCWQ'
							}
						},
						{
							'@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
							type: 'VerifiableCredential',
							id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#1',
							issuer: 'did:web:registration.lab.gaia-x.eu:development',
							issuanceDate: '2023-08-07T10:34:32.101Z',
							credentialSubject: {
								'@context': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
								type: 'gx:legalRegistrationNumber',
								id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#1',
								'gx:leiCode': '9695007586GCAKPYJ703',
								'gx:leiCode-countryCode': 'FR'
							},
							evidence: [
								{
									'gx:evidenceURL': 'https://api.gleif.org/api/v1/lei-records/',
									'gx:executionDate': '2023-08-07T10:34:32.101Z',
									'gx:evidenceOf': 'gx:leiCode'
								}
							],
							proof: {
								type: 'JsonWebSignature2020',
								created: '2023-08-07T10:34:33.102Z',
								proofPurpose: 'assertionMethod',
								verificationMethod: 'did:web:registration.lab.gaia-x.eu:development#X509-JWK2020',
								jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..Jdx7tQNdCdFc5Gnp1gx8SJ5rqKYAqGXzqEhOJgMnXpmn4MFZvwG97UdnGwgmcqYHsjdqFxEysZDoDnkrmBV-_B1zy2oEcZ9P2I95LS6_H8EfgB6wWdlxyAjg5Hnp-QFoR0N8p6n-hKwEkF1R3e1pVHE2txcTfiGQOfqQGd4EwZAu9Ph6YBdAuYrgBmr4zSEEYNQ5LQRSMvljHSG-h_KHhR4-Fcc-YI_ZUtdPuXbH7IiAo9gAdtPFAW6KDzVKsN1klEzJxp5rVkHYwjsLFCn7wNrYw6u7pbLsSXWRKKypw4gTcdVP6jft4orbLOOWE4gadfkv7AXh8Egk9yIlx_VLBQ'
							}
						},
						{
							'@context': [
								'https://www.w3.org/2018/credentials/v1',
								'https://w3id.org/security/suites/jws-2020/v1',
								'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
							],
							credentialSubject: {
								'@Context': [
									'https://www.w3.org/2018/credentials/v1',
									'https://w3id.org/security/suites/jws-2020/v1',
									'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
								],
								'gx:termsAndConditions':
									'The PARTICIPANT signing the Self-Description agrees as follows:\n- to update its descriptions about any changes, be it technical, organizational, or legal - especially but not limited to contractual in regards to the indicated attributes present in the descriptions.\n\nThe keypair used to sign Verifiable Credentials will be revoked where Gaia-X Association becomes aware of any inaccurate statements in regards to the claims which result in a non-compliance with the Trust Framework and policy rules defined in the Policy Rules and Labelling Document (PRLD).',
								id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#2',
								type: 'gx:GaiaXTermsAndConditions'
							},
							id: 'did:web:casio50.smart-x.smartsenselabs.com',
							issuanceDate: '2023-08-07T16:04:30.307219451Z',
							issuer: 'did:web:casio50.smart-x.smartsenselabs.com',
							type: ['VerifiableCredential'],
							proof: {
								type: 'JsonWebSignature2020',
								created: '2023-08-07T10:34:34.513Z',
								proofPurpose: 'assertionMethod',
								verificationMethod: 'did:web:casio50.smart-x.smartsenselabs.com',
								jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..SWXsvdPCdnLCnVIkO1cYRca1JMGk0qLVvyW8-cqeHBHn7PbAL0grpW3X0ZyMekncWgJ0-vXBaSdre1OfLSbBXZgpxgqha8OKaCMGqqbSC4IYMmuUeUOvZ_pIAyabFy6OHc45Sm3YT3os7xezF6rl5Kbwn-_nPSZE0izAv269at9Gs_aYUE79UTLyX-_Its4gadRuDdcAhznsrHx4rbNpX9kNh_389zB_lu1lTlt2VqjXBYnbMbknW9-k3lVZZm6giVFxa3fNEAh-1x30-ZdmOs8KNS8mWNl_8SFSE0bmN4BB-3J91bG2aZ8G9GWzu4x3lI-1WmlnEDj5WhaE69Dq0A'
							}
						},
						{
							'@context': ['https://www.w3.org/2018/credentials/v1', 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'],
							type: ['VerifiableCredential'],
							id: 'did:web:casio34.smart-x.smartsenselabs.com',
							issuer: 'did:web:casio34.smart-x.smartsenselabs.com',
							issuanceDate: '2023-08-07T16:04:30.307219451Z',
							credentialSubject: {
								'@context': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
								id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/resource_f288e078-c580-4cfe-9c25-2013174c4324.json',
								type: 'gx:DataResource',
								'gx:name': 'Test Resource 2',
								'gx:description': 'Test Resource 2 description',
								'gx:copyrightOwnedBy': [
									{
										id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#0'
									}
								],
								'gx:license': ['http://smartproof.in/.well-known/license'],
								'gx:policy': ['https://example.com'],
								'gx:producedBy': {
									id: 'https://wizard-api.smart-x.smartsenselabs.com/12081064-8878-477e-8092-564a240c69e2/participant.json#0'
								},
								'gx:exposedThrough': ['https://wizard-api.smart-x.smartsenselabs.com/uuid/test-resource-2'],
								'gx:containsPII': false
							},
							proof: {
								type: 'JsonWebSignature2020',
								created: '2023-08-18T06:32:44.671Z',
								proofPurpose: 'assertionMethod',
								verificationMethod: 'did:web:casio34.smart-x.smartsenselabs.com',
								jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..pHopKLDdKeTFLwPDAHk9S54JJyl-4EaUWJL1BtEVCIbmLbTAX33UbYYiBAVwJIteZrDKPLeh4t3Rx2V2EWtlchBiMDT_8so24EBoo-iUiDehBgLeA6ugGFizBF5ZvCleL2EDmRqW7VqKWHwsjA3z33DCb5TSChi9WLO6iOrZU_lntJr-d_fn_ATUy1Ij4DddhZSMGvnoc-OEhWk9PmDEFhiL8pm0RYMIX46BEYfbW_CWbgHOTDsXJk67G6Rgj-xv7rcQpZ56WBbX96Y6fZYGeFIK6NMeaOFB6S13v42FLV0qQUTToWb3GyhRfe4AelUD8Semiiix0QrWeeLmBIX0qA'
							}
						}
					]
				},
				complianceCredential: {}
			}
		},
		message: 'VP created successfully.'
	}
}

export const verifyDIDTestJSON = {
	invalidDidJSON: {
		privateKey: 'Base64 -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----' //pragma: allowlist secret
	},
	invalidVerificationMethodJSON: {
		did: 'did:web:casio34.smart-x.smartsenselabs.com',
		privateKey: 'Base64 -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----' //pragma: allowlist secret
	},
	invalidReq: {
		did: 'did:web:greenworld.proofsense.in',
		verificationMethod: 'did:web:casio34.smart-x.smartsenselabs.com',
		privateKey: 'Base64 Encoded -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----' //pragma: allowlist secret
	},
	validReq: {
		did: 'did:web:greenworld.proofsense.in',
		verificationMethod: 'did:web:greenworld.proofsense.in',
		privateKey: 'Base64 Encoded -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----' //pragma: allowlist secret
	}
}

export const labelLevelTestJSON = {
	invalidIssuerJSON: {
		privateKey: 'Base64 -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----' //pragma: allowlist secret
	},
	invalidVerificationMethodJSON: {
		issuer: 'did:web:ferrari.smart-x.smartsenselabs.com',
		privateKey: 'Base64 -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----' //pragma: allowlist secret
	},
	invalidLabelLevel: {
		issuer: 'did:web:ferrari.smart-x.smartsenselabs.com',
		verificationMethod: 'did:web:ferrari.smart-x.smartsenselabs.com',
		privateKey: 'Base64 -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----' //pragma: allowlist secret
	},
	holderDid: {
		assertionMethod: ['did:web:ferrari.smart-x.smartsenselabs.com#JWK2020-RSA'],
		id: 'did:web:ferrari.smart-x.smartsenselabs.com',
		verificationMethod: [
			{
				controller: 'did:web:ferrari.smart-x.smartsenselabs.com',
				publicKeyJwk: {
					kty: 'RSA',
					e: 'AQAB',
					x5u: 'https://ferrari.smart-x.smartsenselabs.com/.well-known/x509CertificateChain.pem',
					alg: 'PS256',
					n: 'n7HP5FAgJ1YP3ffiw8AU1a0c5qpy4UQD2EsSxDe8EVXmda3bnXUHbKqp7g0Fq_fI52sWdxH1h6THShZwVQkL8N-uuj8m2lB-DzTEXJ9Q2Z2GEUN-3un7O2Sj6ipCsorSGFAwX0rk8Q2eblf5b6Oz5Nc8HL9uxLWY-u5J6GwBZU1xUpnoBXd81WE6tRSmIHlhD3_2iSgfOByrJjAsWoMBLJyiqvVNo5kch10ZQ04FRxK7jY4BwgUjnIHTp_MOzy2DNN8ix9QAIgKTaDzXSJJZinEfNndoNmnjOmrEPJwnVYAyj4wgczdR3ktFfh3uLYr__sZv2z681AztZflWCeNafw' //pragma: allowlist secret
				},
				id: 'did:web:ferrari.smart-x.smartsenselabs.com',
				type: 'JsonWebKey2020',
				'@context': 'https://w3c-ccg.github.io/lds-jws2020/contexts/v1/'
			}
		],
		'@context': ['https://www.w3.org/ns/did/v1']
	},
	validReqJSON: {
		privateKey: 'Base64 Encoded -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----', //pragma: allowlist secret
		vcs: {
			labelLevel: {
				'@context': [
					'https://www.w3.org/2018/credentials/v1',
					'https://w3id.org/security/suites/jws-2020/v1',
					'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
				],
				issuanceDate: '2023-08-25T09:12:08.974938894Z',
				credentialSubject: {
					'gx:criteria': {
						'P1.1.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.1.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.1.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.1.4': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.4': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.5': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.6': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.7': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.8': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.9': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.10': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.3.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.3.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.3.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.3.4': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.3.5': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.1.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.1.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.1.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.2.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.2.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.2.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.2.4': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.2.5': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.2.6': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.2.7': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.3.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.3.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.3.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.4': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.5': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.6': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.7': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.8': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.9': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.10': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.11': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.12': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.13': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.14': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.15': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.16': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.17': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.18': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.19': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.20': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P4.1.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P4.1.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.1.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.1.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.1.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.1.4': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.1.5': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.1.6': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.1.7': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.2.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						}
					},
					'gx:assignedTo': 'https://wizard-api.smart-x.smartsenselabs.com182af7e9-b10b-42da-95f4-7f8289ec330e/service_FTh1.json',
					id: 'https://wizard-api.smart-x.smartsenselabs.com182af7e9-b10b-42da-95f4-7f8289ec330e/labelLevel_185087b6-eb3c-4464-9cd0-c2fcef716c28.json',
					type: 'gx:ServiceOfferingLabel'
				},
				id: 'https://wizard-api.smart-x.smartsenselabs.com182af7e9-b10b-42da-95f4-7f8289ec330e/labelLevel_185087b6-eb3c-4464-9cd0-c2fcef716c28.json',
				type: ['VerifiableCredential'],
				issuer: 'did:web:ferrari.smart-x.smartsenselabs.com'
			}
		},
		verificationMethod: 'did:web:ferrari.smart-x.smartsenselabs.com',
		issuer: 'did:web:ferrari.smart-x.smartsenselabs.com'
	},
	invalidReqJSON: {
		privateKey: 'Base64 Encoded -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----', //pragma: allowlist secret
		vcs: {
			labelLevel: {
				'@context': [
					'https://www.w3.org/2018/credentials/v1',
					'https://w3id.org/security/suites/jws-2020/v1',
					'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
				],
				issuanceDate: '2023-08-25T09:12:08.974938894Z',
				credentialSubject: {
					'gx:criteria': {
						'P1.1.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.1.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.1.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.1.4': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.4': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.5': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.6': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.7': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.8': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.9': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.10': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.3.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.3.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.3.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.3.4': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.3.5': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.1.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.1.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.1.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.2.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.2.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.2.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.2.4': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.2.5': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.2.6': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.2.7': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.3.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.3.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.3.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.4': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.5': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.6': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.7': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.8': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.9': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.10': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.11': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.12': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.13': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.14': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.15': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.16': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.17': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.18': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.19': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.20': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P4.1.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P4.1.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.1.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.1.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.1.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.1.4': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.1.5': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.1.6': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.1.7': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.2.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						}
					},
					'gx:assignedTo': 'https://wizard-api.smart-x.smartsenselabs.com182af7e9-b10b-42da-95f4-7f8289ec330e/service_FTh1.json',
					id: 'https://wizard-api.smart-x.smartsenselabs.com182af7e9-b10b-42da-95f4-7f8289ec330e/labelLevel_185087b6-eb3c-4464-9cd0-c2fcef716c28.json',
					type: 'gx:ServiceOfferingLabel'
				},
				id: 'https://wizard-api.smart-x.smartsenselabs.com182af7e9-b10b-42da-95f4-7f8289ec330e/labelLevel_185087b6-eb3c-4464-9cd0-c2fcef716c28.json',
				type: ['VerifiableCredential'],
				issuer: 'did:web:ferrari.smart-x.smartsenselabs.com'
			}
		},
		verificationMethod: 'did:web:suzuki.smart-x.smartsenselabs.com',
		issuer: 'did:web:suzuki.smart-x.smartsenselabs.com'
	},
	emptyCSReqJSON: {
		privateKey: 'Base64 Encoded -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----', //pragma: allowlist secret
		vcs: {
			labelLevel: {
				'@context': [
					'https://www.w3.org/2018/credentials/v1',
					'https://w3id.org/security/suites/jws-2020/v1',
					'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
				],
				issuanceDate: '2023-08-25T09:12:08.974938894Z',
				id: 'https://wizard-api.smart-x.smartsenselabs.com182af7e9-b10b-42da-95f4-7f8289ec330e/labelLevel_185087b6-eb3c-4464-9cd0-c2fcef716c28.json',
				type: ['VerifiableCredential'],
				issuer: 'did:web:ferrari.smart-x.smartsenselabs.com'
			}
		},
		verificationMethod: 'did:web:ferrari.smart-x.smartsenselabs.com',
		issuer: 'did:web:ferrari.smart-x.smartsenselabs.com'
	},
	successResponse: {
		data: {
			selfDescriptionCredential: {
				'@context': [
					'https://www.w3.org/2018/credentials/v1',
					'https://w3id.org/security/suites/jws-2020/v1',
					'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#'
				],
				issuanceDate: '2023-08-25T09:12:08.974938894Z',
				credentialSubject: {
					'gx:criteria': {
						'P1.1.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.1.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.1.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.1.4': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.4': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.5': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.6': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.7': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.8': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.9': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.2.10': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.3.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.3.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.3.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.3.4': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P1.3.5': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.1.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.1.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.1.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.2.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.2.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.2.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.2.4': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.2.5': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.2.6': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.2.7': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.3.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.3.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P2.3.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.4': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.5': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.6': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.7': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.8': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.9': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.10': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.11': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.12': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.13': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.14': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.15': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.16': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.17': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.18': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.19': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P3.1.20': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P4.1.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P4.1.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.1.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.1.2': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.1.3': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.1.4': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.1.5': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.1.6': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.1.7': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						},
						'P5.2.1': {
							evidence: {
								website: '',
								pdf: {},
								vc: {}
							},
							response: 'Confirm',
							reason: ''
						}
					},
					'gx:assignedTo': 'https://wizard-api.smart-x.smartsenselabs.com182af7e9-b10b-42da-95f4-7f8289ec330e/service_FTh1.json',
					id: 'https://wizard-api.smart-x.smartsenselabs.com182af7e9-b10b-42da-95f4-7f8289ec330e/labelLevel_185087b6-eb3c-4464-9cd0-c2fcef716c28.json',
					type: 'gx:ServiceOfferingLabel',
					'gx:labelLevel': 'L1'
				},
				id: 'https://wizard-api.smart-x.smartsenselabs.com182af7e9-b10b-42da-95f4-7f8289ec330e/labelLevel_185087b6-eb3c-4464-9cd0-c2fcef716c28.json',
				type: ['VerifiableCredential'],
				issuer: 'did:web:ferrari.smart-x.smartsenselabs.com',
				proof: {
					type: 'JsonWebSignature2020',
					created: '2023-08-25T12:46:55.876Z',
					proofPurpose: 'assertionMethod',
					verificationMethod: 'did:web:ferrari.smart-x.smartsenselabs.com',
					jws: 'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..R9KRgGUYzI6HGIwLeyshlD_Jc6n0NHvZZ7LT0fkjWVlITt-yQXmX_Uab6nAXgfXF-3VClmBqg2R9F6GRB9xSl_CutHv6H4RCG5t7mW_13QY3EQuqph7hPh_O8Cs2byuY5YtOpGZ2lLyU1svb-LdS4q3GO3rdUolDFf_s2Qds_iDKYJVR1ydEo8va-iQhKZXQF6CbSU0wZU0z0se4X1CFMtM6kmvdZjQgI--7UjjUDOyhiAbBXof2_MvCyxKULpe6d1qhmScueS_kXZvwrechl_oN54U-3bEAisc73br2LKcbtndT2qS9L23p1XuAc50BdlSLtQaH_qIw91D9oozX0w'
				}
			},
			complianceCredential: {}
		},
		message: 'Label Level SD signed successfully'
	},
	labelLevelCS: {
		'gx:criteria': {
			'gx:P1.1.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.1.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.1.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.1.4': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.4': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.5': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.6': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.7': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.8': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.9': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.10': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.3.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.3.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.3.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.3.4': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.3.5': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.1.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.1.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.1.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.2.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.2.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.2.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.2.4': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.2.5': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.2.6': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.2.7': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.3.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.3.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.3.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.4': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.5': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.6': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.7': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.8': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.9': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.10': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.11': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.12': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.13': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.14': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.15': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.16': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.17': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.18': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.19': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.20': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P4.1.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P4.1.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P5.1.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P5.1.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P5.1.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P5.1.4': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P5.1.5': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P5.1.6': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P5.1.7': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P5.2.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			}
		},
		'gx:assignedTo': 'https://wizard-api.smart-x.smartsenselabs.com182af7e9-b10b-42da-95f4-7f8289ec330e/service_FTh1.json',
		id: 'https://wizard-api.smart-x.smartsenselabs.com182af7e9-b10b-42da-95f4-7f8289ec330e/labelLevel_185087b6-eb3c-4464-9cd0-c2fcef716c28.json',
		type: 'gx:ServiceOfferingLabel'
	},
	invalidLabelLevelCS: {
		'gx:criteria': {
			'gx:P1.1.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.1.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.1.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.1.4': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.4': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.5': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.6': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.7': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.8': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.9': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.10': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.3.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.3.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.3.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.3.4': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.3.5': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.1.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.1.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.1.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.2.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.2.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.2.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.2.4': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.2.5': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.2.6': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.2.7': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.3.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.3.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.3.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.4': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.5': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.6': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.7': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.8': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.9': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.10': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.11': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.12': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.13': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.14': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.15': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.16': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.17': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.18': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.19': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.20': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P4.1.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P4.1.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P5.1.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P5.1.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P5.1.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P5.1.4': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P5.1.5': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P5.1.6': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P5.1.7': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'5.2.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			}
		},
		'gx:assignedTo': 'https://wizard-api.smart-x.smartsenselabs.com182af7e9-b10b-42da-95f4-7f8289ec330e/service_FTh1.json',
		id: 'https://wizard-api.smart-x.smartsenselabs.com182af7e9-b10b-42da-95f4-7f8289ec330e/labelLevel_185087b6-eb3c-4464-9cd0-c2fcef716c28.json',
		type: 'gx:ServiceOfferingLabel'
	},
	labelLevelBC: {
		'gx:criteria': {
			'gx:P1.1.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.1.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Deny',
				reason: ''
			},
			'gx:P1.1.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.1.4': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.4': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.5': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.6': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.7': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.8': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.9': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.2.10': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.3.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.3.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.3.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.3.4': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P1.3.5': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.1.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.1.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.1.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.2.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.2.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.2.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.2.4': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.2.5': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.2.6': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.2.7': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.3.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.3.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P2.3.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.4': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.5': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.6': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.7': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.8': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.9': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.10': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.11': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.12': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.13': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.14': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.15': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.16': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.17': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.18': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.19': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P3.1.20': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P4.1.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P4.1.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P5.1.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P5.1.2': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P5.1.3': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P5.1.4': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P5.1.5': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P5.1.6': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P5.1.7': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			},
			'gx:P5.2.1': {
				evidence: {
					website: '',
					pdf: {},
					vc: {}
				},
				'gx:response': 'Confirm',
				reason: ''
			}
		},
		'gx:assignedTo': 'https://wizard-api.smart-x.smartsenselabs.com182af7e9-b10b-42da-95f4-7f8289ec330e/service_FTh1.json',
		id: 'https://wizard-api.smart-x.smartsenselabs.com182af7e9-b10b-42da-95f4-7f8289ec330e/labelLevel_185087b6-eb3c-4464-9cd0-c2fcef716c28.json',
		type: 'gx:ServiceOfferingLabel'
	}
}

export const mockCertificate = `
-----BEGIN CERTIFICATE-----
MIIC8DCCAdigAwIBAgIUL75VSaYzw5PTPVmo0V3e70KncpgwDQYJKoZIhvcNAQEL
BQAwFDESMBAGA1UEAwwJbG9jYWxob3N0MB4XDTI0MDIyMTA0MjM0NloXDTI0MDMy
MjA0MjM0NlowFDESMBAGA1UEAwwJbG9jYWxob3N0MIIBIjANBgkqhkiG9w0BAQEF
AAOCAQ8AMIIBCgKCAQEAqnP5hZ2ChVrRg8bou9VVjyJX0QhgRcYfXQPpJBZl6wF8
HYneuKZL/IzbmuV2OJfyIzJx77GJmTzO7TrpYX5b8D7Gfu1Fegpp5lD05a6z/VVc
m7TEUQ4prysj7AHRWGQxVbx8rz/3W48GXCX5Q8HaC9mqPRgn8tAgoDOpqhpp6/1h
onJi8Di2WwGQIhsmDILJL4rDDqnqLiV+VQlhXQptUODzl43Bp4BDih/bjP9tqEB7
9WIy4RKg9uvJ7RYO4wL0hh4iIS7A3KGstS26B1D/ssKIf6dchJLkpRGBhxKXtlEj
XJl07wVXh4uYJluQbWuAXHVxKSlRajX33cQReLVThQIDAQABozowODAUBgNVHREE
DTALgglsb2NhbGhvc3QwCwYDVR0PBAQDAgeAMBMGA1UdJQQMMAoGCCsGAQUFBwMB
MA0GCSqGSIb3DQEBCwUAA4IBAQA6oq07EQtfemLaw0JdkdaMv51pgsQ3goN8KTMA
Z0RXhGGk7AZBBBxA3sIxb5ZonWIOyzWP3A9xw1Myvn0z1N2r3nyYZ2nh+sdKKFXw
UqpxkPTa0h34+Cfi93JRUzgXHnI8shoSxVqe5iTIcJn2wNaG60oFCQxv0bkbdolD
WHj2QpoQeOVL8Ti1tcuwgBA4xiGQSmEVEk6RpT1ADUiociKgWRcM4Ni/rFXFprGi
SYQ3tgnr90zCSqL9C+qIBHjabUOXUAGgUHDnf4uy0RzockxRcqbQa9AroD9/Ura9
OjGl6sHce3jSQiNi9LhwK2dkKGSA7Vh8K69rrgUoMQkIQfcU
-----END CERTIFICATE-----`
