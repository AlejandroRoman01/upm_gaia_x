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
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importStar(require("crypto"));
const jose = __importStar(require("jose"));
const jsonld_1 = __importDefault(require("jsonld"));
const constants_1 = require("../constants");
const logger_1 = require("../logger");
class Utils {
    constructor() {
        this.IsValidURL = (str) => {
            const urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
            const url = new RegExp(urlRegex, 'i');
            const result = str.length < 2083 && url.test(str);
            return result;
        };
        /**
         * @dev Helps to parse and format x509Certificate data to return in response
         * @param certificate X509Certificate object
         * @returns X509CertificateDetail - Formatted X509Certificate object
         */
        this.parseCertificate = (certificate) => {
            const issuerFieldsString = certificate.issuer;
            const issuerFieldsArray = issuerFieldsString.split('\n');
            const extractFieldValue = (fieldArray, fieldName) => {
                const field = fieldArray.find((line) => line.startsWith(`${fieldName}=`));
                if (field) {
                    return field.slice(fieldName.length + 1);
                }
                return null;
            };
            // Extract individual fields from the subject string
            const subjectFieldsString = certificate.subject;
            const subjectFieldsArray = subjectFieldsString.split('\n');
            const certificateDetails = {
                validFrom: certificate.validFrom,
                validTo: certificate.validTo,
                subject: {
                    jurisdictionCountry: extractFieldValue(subjectFieldsArray, 'jurisdictionC'),
                    jurisdictionSate: extractFieldValue(subjectFieldsArray, 'jurisdictionST'),
                    jurisdictionLocality: extractFieldValue(subjectFieldsArray, 'jurisdictionL'),
                    businessCategory: extractFieldValue(subjectFieldsArray, 'businessCategory'),
                    serialNumber: extractFieldValue(subjectFieldsArray, 'serialNumber'),
                    country: extractFieldValue(subjectFieldsArray, 'C'),
                    state: extractFieldValue(subjectFieldsArray, 'ST'),
                    locality: extractFieldValue(subjectFieldsArray, 'L'),
                    organization: extractFieldValue(subjectFieldsArray, 'O'),
                    commonName: extractFieldValue(subjectFieldsArray, 'CN')
                },
                issuer: {
                    commonName: extractFieldValue(issuerFieldsArray, 'CN'),
                    organization: extractFieldValue(issuerFieldsArray, 'O'),
                    country: extractFieldValue(issuerFieldsArray, 'C')
                }
            };
            return certificateDetails;
        };
        /**
         *	@Formula count(properties) / count(mandatoryproperties)
         *	Provided By 			Mandatory	(gx:providedBy)
         *	Aggregation Of	 		Mandatory	(gx:aggregationOf)
         *	Terms and Conditions 	Mandatory	(gx:termsAndConditions)
         *	Policy	 				Mandatory	(gx:policy)
         *	Data Account Export 	Mandatory	(gx:dataAccountExport)
         *	Name 					Optional	(gx:name)
         *	Depends On	 			Optional  	(gx:dependsOn)
         *	Data Protection Regime	Optional	(gx:dataProtectionRegime)
         * @dev Takes service offering self description as input and calculates transparency
         * @param credentialSubject service offering self description credentialSubject
         * @returns Number | undefined - undefined if bad data else returns the transparency value
         */
        this.calcTransparency = (credentialSubject) => __awaiter(this, void 0, void 0, function* () {
            const optionalProps = ['gx:name', 'gx:dependsOn', 'gx:dataProtectionRegime'];
            const totalMandatoryProps = 5;
            let availOptProps = 0;
            for (const optionalProp of optionalProps) {
                // eslint-disable-next-line no-prototype-builtins
                if (optionalProp in credentialSubject && credentialSubject[optionalProp]) {
                    availOptProps++;
                }
            }
            const transparency = (totalMandatoryProps + availOptProps) / totalMandatoryProps;
            return transparency;
        });
        /**
         * @formula trust_index = mean(veracity, transparency)
         * @dev takes the veracity and transparency as input and calculates trust index
         * @param veracity Veracity value
         * @param transparency Transparency value
         * @returns number - Trust index value
         */
        this.calcTrustIndex = (veracity, transparency) => {
            const trustIndex = (veracity + transparency) / 2;
            return trustIndex;
        };
        /**
         * @dev - common function to fetch ParticipantJson from url
         *
         */
        this.fetchParticipantJson = (url) => __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line no-useless-catch
            try {
                const participantJson = (yield axios_1.default.get(url)).data;
                return participantJson;
            }
            catch (error) {
                throw error;
            }
        });
        /**
         * @dev - common function to fetch Service Offering JSON from url
         *
         */
        this.fetchServiceOfferingJson = (url) => __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line no-useless-catch
            try {
                const serviceOfferingJson = (yield axios_1.default.get(url)).data;
                return serviceOfferingJson;
            }
            catch (error) {
                throw error;
            }
        });
        /**
         *
         * @param array Array containing duplicate objects
         * @param key Identifier for comparing duplicate objects
         * @returns Array with unique objects
         */
        this.removeDuplicates = (array, key) => {
            const uniqueArray = array.filter((parentObj, index) => {
                const { credentialSubject: parentCredentialSubject } = parentObj;
                return (index ===
                    array.findIndex((childObj) => {
                        const { credentialSubject: childCredentialSubject } = childObj;
                        return parentCredentialSubject[key] === childCredentialSubject[key];
                    }));
            });
            return uniqueArray;
        };
        /**
         * @dev - common function to fetch ParticipantJson from url
         */
        this.callServiceOfferingCompliance = (reqData) => __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.debug(__filename, 'callServiceOfferingCompliance', `📈 Calling ServiceOffering Compliance with request data : `, JSON.stringify(reqData));
            // eslint-disable-next-line no-useless-catch
            try {
                const endpoint = process.env.COMPLIANCE_SERVICE;
                const { data } = yield axios_1.default.post(endpoint, reqData);
                return data;
            }
            catch (error) {
                const { data } = error['response'];
                logger_1.logger.error(__filename, 'callServiceOfferingCompliance', 'error while calling service compliance', '');
                throw data;
            }
        });
        this.getInnerVCs = (vc, key, types, vcsMap) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            for (let i = 0; i < vc.credentialSubject[key].length; i++) {
                const response = (yield axios_1.default.get(vc.credentialSubject[key][i].id)).data;
                const verifiableCredential = (_a = response === null || response === void 0 ? void 0 : response.selfDescriptionCredential) === null || _a === void 0 ? void 0 : _a.verifiableCredential;
                const type = verifiableCredential && (yield this.getVcType(verifiableCredential, vc.credentialSubject[key][i].id));
                if (!types.includes(type)) {
                    throw new Error(`${key} VC ID not found or required vc type not found`);
                }
                for (const vc of verifiableCredential) {
                    const lpId = vc.credentialSubject.id;
                    if (!vcsMap.has(lpId)) {
                        vcsMap.set(lpId, vc);
                    }
                }
            }
        });
        this.getInnerVC = (vc, key, types, vcsMap) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            const response = (yield axios_1.default.get(vc.credentialSubject[key].id)).data;
            const verifiableCredential = (_b = response === null || response === void 0 ? void 0 : response.selfDescriptionCredential) === null || _b === void 0 ? void 0 : _b.verifiableCredential;
            const type = verifiableCredential && (yield this.getVcType(verifiableCredential, vc.credentialSubject[key].id));
            if (!types.includes(type)) {
                throw new Error(`${key} VC ID not found or required vc type not found`);
            }
            for (const vc of verifiableCredential) {
                const lpId = vc.credentialSubject.id;
                if (!vcsMap.has(lpId)) {
                    vcsMap.set(lpId, vc);
                }
            }
        });
        this.getVcType = (verifiableCredential, vcId) => __awaiter(this, void 0, void 0, function* () {
            let credentialType = '';
            verifiableCredential.forEach((e) => {
                if (Array.isArray(e.credentialSubject)) {
                    return e.credentialSubject.some((subject) => {
                        if (subject.id === vcId) {
                            credentialType = subject.type ? subject.type : '';
                        }
                        return subject.id === vcId;
                    });
                }
                else {
                    if (e.credentialSubject.id === vcId) {
                        credentialType = e.credentialSubject.type ? e.credentialSubject.type : '';
                    }
                    return e.credentialSubject.id === vcId;
                }
            });
            return credentialType;
        });
        /**
         * @dev This function will calculate label level using credencial
         * @param veracity Veracity value
         * @param transparency Transparency value
         * @returns number - Trust index value
         */
        this.calcLabelLevel = (credentialSubject) => {
            let resultLabelLevel = '';
            // Label level response by user
            const criteria = credentialSubject['gx:criteria'];
            // Constant Rules
            for (const labelLevel in constants_1.LABEL_LEVEL_RULE) {
                // Rule of Specific label level
                const levelRules = constants_1.LABEL_LEVEL_RULE[labelLevel];
                // Iterate level rules
                for (const rulePoint of levelRules) {
                    // eslint-disable-next-line no-prototype-builtins
                    if (criteria.hasOwnProperty(rulePoint)) {
                        const gxResponseObj = criteria[rulePoint];
                        const response = gxResponseObj['gx:response'];
                        // Loop will break if any single response found not confirmed and will return last label level
                        if (response !== 'Confirm') {
                            return resultLabelLevel;
                        }
                    }
                    else {
                        logger_1.logger.error(__filename, 'LabelLevel', constants_1.AppMessages.LABEL_LEVEL_CALC_FAILED_INVALID_KEY + rulePoint, '');
                        throw new Error(constants_1.AppMessages.LABEL_LEVEL_CALC_FAILED_INVALID_KEY + rulePoint);
                    }
                }
                resultLabelLevel = labelLevel;
            }
            return resultLabelLevel;
        };
    }
    generateDID(didId, publicKeyJwk, services) {
        var _a;
        const did = {
            '@context': ['https://www.w3.org/ns/did/v1'],
            id: didId,
            verificationMethod: [
                {
                    '@context': 'https://w3c-ccg.github.io/lds-jws2020/contexts/v1/',
                    id: `${didId}#JWK2020-RSA`,
                    type: 'JsonWebKey2020',
                    controller: didId,
                    publicKeyJwk: publicKeyJwk
                }
            ],
            assertionMethod: [`${didId}#JWK2020-RSA`]
        };
        if (services) {
            for (let index = 0; index < services.length; index++) {
                // eslint-disable-next-line no-prototype-builtins
                if (!did.hasOwnProperty('service')) {
                    did['service'] = [];
                }
                const service = services[index];
                service['id'] = `${didId}#${services[index].type.toLocaleLowerCase()}`;
                (_a = did.service) === null || _a === void 0 ? void 0 : _a.push(service);
            }
        }
        // const data = JSON.stringify(did, null, 2);
        return did;
    }
    generatePublicJWK(jose, algorithm, certificate, x5uURL) {
        return __awaiter(this, void 0, void 0, function* () {
            const x509 = yield jose.importX509(certificate, algorithm);
            const publicKeyJwk = yield jose.exportJWK(x509);
            publicKeyJwk.alg = algorithm;
            publicKeyJwk.x5u = x5uURL;
            return publicKeyJwk;
        });
    }
    normalize(jsonld, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nodeDocumentLoader = jsonld.documentLoaders.node();
                const customLoader = (url) => __awaiter(this, void 0, void 0, function* () {
                    if (url in constants_1.W3C_CONTEXT) {
                        return {
                            contextUrl: null,
                            document: constants_1.W3C_CONTEXT[url],
                            documentUrl: url // this is the actual context URL after redirects
                        };
                    }
                    // call the default documentLoader
                    return nodeDocumentLoader(url);
                });
                jsonld.documentLoader = customLoader;
                const canonized = yield jsonld.canonize(payload, {
                    algorithm: 'URDNA2015',
                    format: 'application/n-quads'
                }, { nodeDocumentLoader: customLoader });
                if (canonized === '')
                    throw new Error('Canonized SD is empty');
                return canonized;
            }
            catch (error) {
                logger_1.logger.error(__filename, 'normalize', `❌ Canonizing failed | Error: ${error}`, '', error);
                return undefined;
            }
        });
    }
    sha256(crypto, input) {
        return crypto.createHash('sha256').update(input).digest('hex');
    }
    createProof(jose, verificationMethod, algorithm, hash, privateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const proof = {
                type: 'JsonWebSignature2020',
                created: new Date().toISOString(),
                proofPurpose: 'assertionMethod',
                verificationMethod: verificationMethod + `#JWK2020-RSA`,
                jws: yield this.sign(jose, algorithm, hash, privateKey)
            };
            return proof;
        });
    }
    sign(jose, algorithm, hash, privateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const rsaPrivateKey = yield jose.importPKCS8(privateKey, algorithm);
            const txtEncoder = new TextEncoder().encode(hash);
            const jws = yield new jose.CompactSign(txtEncoder).setProtectedHeader({ alg: algorithm, b64: false, crit: ['b64'] }).sign(rsaPrivateKey);
            return jws;
        });
    }
    verify(jose, jws, algorithm, publicKeyJwk, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pubkey = yield jose.importJWK(publicKeyJwk, algorithm);
                const result = yield jose.compactVerify(jws, pubkey);
                // const protectedHeader = result.protectedHeader
                const content = new TextDecoder().decode(result.payload);
                return content === hash;
            }
            catch (error) {
                logger_1.logger.error(__filename, 'verify', `❌ Signature Verification Failed | error: ${error}`, '');
                throw error;
            }
        });
    }
    getDDOfromDID(did, resolver) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ddo = yield resolver.resolve(did);
                if (!ddo.didDocument.verificationMethod || ddo.didDocument === null || ddo.didResolutionMetadata.error) {
                    return undefined;
                }
                return ddo;
            }
            catch (error) {
                logger_1.logger.error(__filename, 'getDDOfromDID', `❌ Fetching DDO failed for did: ${did}`, '');
                return undefined;
            }
        });
    }
    validateSslFromRegistryWithUri(uri, axios) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registryRes = yield axios.post(`${process.env.REGISTRY_TRUST_ANCHOR_URL}/trustAnchor/chain/file`, { uri: uri });
                const result = (_a = registryRes === null || registryRes === void 0 ? void 0 : registryRes.data) === null || _a === void 0 ? void 0 : _a.result;
                return result;
            }
            catch (error) {
                logger_1.logger.error(__filename, 'validateSslFromRegistryWithUri', `❌ Validation from registry failed for certificates | error: ${error}`, '');
                return false;
            }
        });
    }
    comparePubKeys(certificates, publicKeyJwk, jose) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pk = yield jose.importJWK(publicKeyJwk);
                const spki = yield jose.exportSPKI(pk);
                const x509 = yield jose.importX509(certificates, 'PS256');
                const spkiX509 = yield jose.exportSPKI(x509);
                return spki === spkiX509;
            }
            catch (error) {
                logger_1.logger.error(__filename, 'comparePubKeys', `❌ Comparing publicKeyJwk and pub key from certificates failed | error: ${error}`, '');
                return false;
            }
        });
    }
    issueRegistrationNumberVC(axios, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = request.id.replace('#', '%23');
                // request.id = request.id.replace('#', '%23')
                const url = `${process.env.REGISTRATION_SERVICE}?vcid=${id}`;
                const regVC = yield axios.post(url, request);
                return regVC.data;
            }
            catch (error) {
                logger_1.logger.error(__filename, 'issueRegistrationNumberVC', `❌ RegistrationNumber failed | Error: ${error}`, '');
                throw new Error(`❌ RegistrationNumber failed | Error: ${error}`);
            }
        });
    }
    addProof(jsonld, axios, jose, crypto, verifiableCredential, privateKey, verificationMethod, rsaAlso, x5uURL) {
        return __awaiter(this, void 0, void 0, function* () {
            const canonizedSD = yield this.normalize(jsonld, 
            // eslint-disable-next-line
            verifiableCredential);
            const hash = this.sha256(crypto, canonizedSD);
            logger_1.logger.info(__filename, 'addProof', `📈 Hashed canonized SD ${hash}`, '');
            const proof = yield this.createProof(jose, verificationMethod, rsaAlso, hash, privateKey);
            logger_1.logger.info(__filename, 'addProof', proof ? '🔒 SD signed successfully' : '❌ SD signing failed', x5uURL);
            const certificate = (yield axios.get(x5uURL)).data;
            const publicKeyJwk = yield this.generatePublicJWK(jose, rsaAlso, certificate, x5uURL);
            const verificationResult = yield this.verify(jose, proof.jws.replace('..', `.${hash}.`), rsaAlso, publicKeyJwk, hash);
            logger_1.logger.info(__filename, 'addProof', verificationResult ? '✅ Verification successful' : '❌ Verification failed', '');
            return proof;
        });
    }
    getPublicKeys(ddo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { verificationMethod, id } = ddo;
            const jwk = verificationMethod.find((method) => method.id.startsWith(id));
            if (!jwk)
                throw new Error(`verificationMethod ${verificationMethod} not found in did document`);
            const { publicKeyJwk } = jwk;
            if (!publicKeyJwk)
                throw new Error(`Could not load JWK for ${verificationMethod}`);
            const { x5u } = publicKeyJwk;
            if (!publicKeyJwk.x5u)
                throw new Error(`The x5u parameter is expected to be set in the JWK for ${verificationMethod}`);
            return { x5u, publicKeyJwk };
        });
    }
    createVP(vcs) {
        return {
            '@context': 'https://www.w3.org/2018/credentials/v1',
            type: ['VerifiablePresentation'],
            verifiableCredential: vcs
        };
    }
    /**
     * @RefLinks
     * DID web with multiple keys https://www.w3.org/TR/did-core/#example-did-document-with-many-different-key-types
     * VC which has verification method pointing to a particular key https://www.w3.org/TR/vc-data-model/#example-a-simple-example-of-a-verifiable-credential
     * @dev Takes holder vc of self description as input and calculate veracity
     * @param verifiableCredential Holder self description url
     * @returns Object | undefined - undefined if bad data else return the veracity value and its certificate details
     */
    calcVeracity(verifiableCredential, resolver) {
        return __awaiter(this, void 0, void 0, function* () {
            if (verifiableCredential.length) {
                const participantSD = verifiableCredential.find((credential) => credential.credentialSubject.type === 'gx:LegalParticipant');
                const { issuer: issuerDID, proof: { verificationMethod: participantVM } } = participantSD;
                const ddo = yield this.getDDOfromDID(issuerDID, resolver);
                if (!ddo) {
                    // Bad Data
                    logger_1.logger.error(__filename, 'calcVeracity', `❌ DDO not found for given did: '${issuerDID}' in proof`, '');
                    throw new Error(`DDO not found for given did: '${issuerDID}' in proof`);
                }
                const { didDocument: { verificationMethod: verificationMethodArray } } = ddo;
                // There can be multiple verification methods in the did document but we have to find the one which has signed the holder vc
                // So verificationMethod mentioned in the proof of holder SD should have to be equal to the id filed in the verification method
                // participantSD.json >> proof >> verificationMethod === did.json >> verificationMethodArray >> verificationMethodObject >> id
                let certificateDetails = null;
                let keypairDepth = 1;
                for (const verificationMethod of verificationMethodArray) {
                    if (verificationMethod.id === participantVM && verificationMethod.publicKeyJwk) {
                        const { x5u } = verificationMethod.publicKeyJwk;
                        // get the SSL certificates from x5u url
                        const certificates = (yield axios_1.default.get(x5u)).data;
                        const certArray = certificates.match(/-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g);
                        if (certArray === null || certArray === void 0 ? void 0 : certArray.length) {
                            keypairDepth += certArray === null || certArray === void 0 ? void 0 : certArray.length; // sum(len(keychain)
                        }
                        // getting object of a PEM encoded X509 Certificate.
                        const certificate = new crypto_1.X509Certificate(certificates);
                        certificateDetails = this.parseCertificate(certificate);
                        break;
                    }
                }
                let veracity = 1;
                if (certificateDetails) {
                    // As per formula(1 / len(keychain)), veracity will be 1 divided by number of signing
                    // keypairs found in the certificate
                    veracity = +(1 / keypairDepth).toFixed(2); //1 / len(keychain)
                    return { veracity, certificateDetails };
                }
                logger_1.logger.error(__filename, 'calcVeracity', `❌ Participant proof verification method and did verification method id not matched`, '');
                throw new Error('Participant proof verification method and did verification method id not matched');
            }
            logger_1.logger.error(__filename, 'calcVeracity', `❌ Verifiable credential array not found in participant self description`, '');
            throw new Error('Verifiable credential array not found in participant self description');
        });
    }
    /**
     * @dev takes the credential and proof, and verifies the signature is valid or not
     * @param credentialContent the credential part which will be hashed for proof
     * @param proof the proof obj
     * @returns boolean - true if the signature is verified
     */
    verification(credentialContent, proof, checkSSLwithRegistry, resolver) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line no-useless-catch
            try {
                // check if proof is of type JsonWebSignature2020
                if (proof.type !== 'JsonWebSignature2020') {
                    logger_1.logger.error(__filename, 'verification', `❌ signature type: '${proof.type}' not supported`, '');
                    throw new Error(`signature type: '${proof.type}' not supported`);
                }
                // get the DID Document
                const ddo = yield this.getDDOfromDID(credentialContent.issuer, resolver);
                if (!ddo) {
                    logger_1.logger.error(__filename, 'verification', `❌ DDO not found for given did: '${proof.verificationMethod}' in proof`, '');
                    throw new Error(`DDO not found for given did: '${proof.verificationMethod}' in proof`);
                }
                // get the public keys from the DID Document
                // eslint-disable-next-line no-unsafe-optional-chaining
                const verMethod = (_b = (_a = ddo === null || ddo === void 0 ? void 0 : ddo.didDocument) === null || _a === void 0 ? void 0 : _a.verificationMethod) === null || _b === void 0 ? void 0 : _b.find((veriMethod) => veriMethod.id == proof.verificationMethod);
                const publicKeyJwk = verMethod === null || verMethod === void 0 ? void 0 : verMethod.publicKeyJwk;
                if (!publicKeyJwk) {
                    throw new Error('publicKeyJwk not found in ddo');
                }
                const x5u = publicKeyJwk === null || publicKeyJwk === void 0 ? void 0 : publicKeyJwk.x5u;
                if (!x5u) {
                    throw new Error('x5u not found in ddo');
                }
                // get the SSL certificates from x5u url
                let certificates;
                try {
                    certificates = (_c = (yield axios_1.default.get(x5u))) === null || _c === void 0 ? void 0 : _c.data;
                }
                catch (error) {
                    logger_1.logger.error(__filename, 'verification', 'error in fetching certificate', '', { error: error });
                    throw new Error('fail to fetch x5u certificate');
                }
                if (!certificates) {
                    throw new Error('ssl certificate not found');
                }
                if (checkSSLwithRegistry) {
                    // signature check against Gaia-x registry
                    const registryRes = yield this.validateSslFromRegistryWithUri(x5u, axios_1.default);
                    if (!registryRes) {
                        throw new Error('Certificate validation failed');
                    }
                }
                //check weather the public key from DDO(which is fetched from did) matches with the certificates of x5u(fetched from ddo)
                const comparePubKey = yield this.comparePubKeys(certificates, publicKeyJwk, jose);
                if (!comparePubKey) {
                    logger_1.logger.error(__filename, 'verification', `❌ Public Keys Mismatched`, '');
                    throw new Error('Public Key Mismatched');
                }
                // // normalize/canonize the credentialContent
                const canonizedCredential = yield this.normalize(jsonld_1.default, 
                // eslint-disable-next-line
                credentialContent);
                if (typeof canonizedCredential === 'undefined') {
                    logger_1.logger.error(__filename, 'verification', `❌ Normalizing Credential Failed`, '');
                    throw new Error('Normalizing Credential Failed');
                }
                // TODO: explore the isValidityCheck here, to include the jws in the hash - GX Compliance check signature
                // hash the normalized credential
                const hash = yield this.sha256(crypto_1.default, canonizedCredential);
                // verify Signature by retrieving the hash and then comparing it
                const verificationResult = yield this.verify(jose, proof.jws.replace('..', `.${hash}.`), constants_1.AppConst.RSA_ALGO, publicKeyJwk, hash);
                logger_1.logger.info(__filename, 'verification', verificationResult ? `✅ ${constants_1.AppMessages.SIG_VERIFY_SUCCESS}` : `❌ ${constants_1.AppMessages.SIG_VERIFY_FAILED}`, '');
                return verificationResult;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new Utils();
