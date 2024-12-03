"use strict";
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
const crypto_1 = require("crypto");
const did_resolver_1 = require("did-resolver");
const dotenv_1 = __importDefault(require("dotenv"));
const web_did_resolver_1 = __importDefault(require("web-did-resolver"));
const assets_1 = require("../../assets");
const common_functions_1 = __importDefault(require("./common-functions"));
dotenv_1.default.config();
const webResolver = web_did_resolver_1.default.getResolver();
const resolver = new did_resolver_1.Resolver(webResolver);
const exampleCertificate = 'Sample Certificate';
describe('commonFunction Testing', () => {
    describe('verification', () => {
        it('proof is not JSONWebSignature2020', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockParticipantJson = JSON.parse(JSON.stringify(assets_1.participantJson));
            mockParticipantJson.selfDescriptionCredential.verifiableCredential[0].proof.type = 'JsonWebSignature2021';
            const complianceCred = JSON.parse(JSON.stringify(mockParticipantJson.selfDescriptionCredential.verifiableCredential[0]));
            const complianceProof = JSON.parse(JSON.stringify(complianceCred.proof));
            delete complianceCred.proof;
            let isError = false;
            try {
                yield common_functions_1.default.verification(complianceCred, complianceProof, false, resolver);
            }
            catch (error) {
                isError = true;
                expect(error.message).toEqual(`signature type: 'JsonWebSignature2021' not supported`);
            }
            expect(isError).toBe(true);
        }));
        it('empty ddo', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockResolvedValue({});
            const mockParticipantJson = JSON.parse(JSON.stringify(assets_1.participantJson));
            const complianceCred = JSON.parse(JSON.stringify(mockParticipantJson.complianceCredential));
            const complianceProof = JSON.parse(JSON.stringify(complianceCred.proof));
            delete complianceCred.proof;
            let isError = false;
            try {
                yield common_functions_1.default.verification(complianceCred, complianceProof, false, resolver);
            }
            catch (error) {
                isError = true;
                expect(error.message).toBe(`publicKeyJwk not found in ddo`);
            }
            expect(isError).toBe(true);
            jest.resetAllMocks();
        }));
        it('undefined ddo', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockResolvedValue(undefined);
            const mockParticipantJson = JSON.parse(JSON.stringify(assets_1.participantJson));
            const complianceCred = JSON.parse(JSON.stringify(mockParticipantJson.complianceCredential));
            const complianceProof = JSON.parse(JSON.stringify(complianceCred.proof));
            delete complianceCred.proof;
            let isError = false;
            try {
                yield common_functions_1.default.verification(complianceCred, complianceProof, false, resolver);
            }
            catch (error) {
                isError = true;
                expect(error.message).toBe(`DDO not found for given did: 'did:web:compliance.lab.gaia-x.eu:development#X509-JWK2020' in proof`);
            }
            expect(isError).toBe(true);
            jest.resetAllMocks();
        }));
        it('verification method not matched with DDO', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockResolvedValue(Object.assign({}, assets_1.holderDdoJson2));
            const mockParticipantJson = JSON.parse(JSON.stringify(assets_1.participantJson));
            const complianceCred = JSON.parse(JSON.stringify(mockParticipantJson.complianceCredential));
            const complianceProof = JSON.parse(JSON.stringify(complianceCred.proof));
            delete complianceCred.proof;
            let isError = false;
            try {
                yield common_functions_1.default.verification(complianceCred, complianceProof, false, resolver);
            }
            catch (error) {
                isError = true;
                expect(error.message).toBe(`publicKeyJwk not found in ddo`);
            }
            expect(isError).toBe(true);
            jest.resetAllMocks();
        }));
        it('publicKeyJwk not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockHolderDDO = JSON.parse(JSON.stringify(assets_1.holderDdoJson2));
            delete mockHolderDDO.didDocument.verificationMethod[0].publicKeyJwk;
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockResolvedValue(Object.assign({}, mockHolderDDO));
            const mockParticipantJson = JSON.parse(JSON.stringify(assets_1.participantJson));
            const complianceCred = JSON.parse(JSON.stringify(mockParticipantJson.complianceCredential));
            const complianceProof = JSON.parse(JSON.stringify(complianceCred.proof));
            delete complianceCred.proof;
            let isError = false;
            try {
                yield common_functions_1.default.verification(complianceCred, complianceProof, false, resolver);
            }
            catch (error) {
                isError = true;
                expect(error.message).toBe(`publicKeyJwk not found in ddo`);
            }
            expect(isError).toBe(true);
            jest.resetAllMocks();
        }));
        it('x5u not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockHolderDDO = JSON.parse(JSON.stringify(assets_1.holderDdoJson2));
            delete mockHolderDDO.didDocument.verificationMethod[0].publicKeyJwk.x5u;
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockResolvedValue(Object.assign({}, mockHolderDDO));
            const mockParticipantJson = JSON.parse(JSON.stringify(assets_1.participantJson));
            const holderCred = JSON.parse(JSON.stringify(mockParticipantJson.selfDescriptionCredential.verifiableCredential[0]));
            const proof = JSON.parse(JSON.stringify(holderCred.proof));
            delete holderCred.proof;
            let isError = false;
            try {
                yield common_functions_1.default.verification(holderCred, proof, false, resolver);
            }
            catch (error) {
                isError = true;
                expect(error.message).toBe(`x5u not found in ddo`);
            }
            expect(isError).toBe(true);
            jest.resetAllMocks();
        }));
        it('error in axios while fetching certificate', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockHolderDDO = JSON.parse(JSON.stringify(assets_1.holderDdoJson2));
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockResolvedValue(Object.assign({}, mockHolderDDO));
            jest.spyOn(axios_1.default, 'get').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                throw new Error('Fail to fetch certificate');
            }));
            const mockParticipantJson = JSON.parse(JSON.stringify(assets_1.participantJson));
            const holderCred = JSON.parse(JSON.stringify(mockParticipantJson.selfDescriptionCredential.verifiableCredential[0]));
            const proof = JSON.parse(JSON.stringify(holderCred.proof));
            let isError = false;
            try {
                yield common_functions_1.default.verification(holderCred, proof, false, resolver);
            }
            catch (error) {
                isError = true;
                expect(error.message).toBe(`fail to fetch x5u certificate`);
            }
            expect(isError).toBe(true);
            jest.resetAllMocks();
        }));
        it('certificate not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockHolderDDO = JSON.parse(JSON.stringify(assets_1.holderDdoJson2));
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockResolvedValue(Object.assign({}, mockHolderDDO));
            jest.spyOn(axios_1.default, 'get').mockResolvedValue(undefined);
            const mockParticipantJson = JSON.parse(JSON.stringify(assets_1.participantJson));
            const holderCred = JSON.parse(JSON.stringify(mockParticipantJson.selfDescriptionCredential.verifiableCredential[0]));
            const proof = JSON.parse(JSON.stringify(holderCred.proof));
            let isError = false;
            try {
                yield common_functions_1.default.verification(holderCred, proof, false, resolver);
            }
            catch (error) {
                isError = true;
                expect(error.message).toBe(`ssl certificate not found`);
            }
            expect(isError).toBe(true);
            jest.resetAllMocks();
        }));
        it('sslRegistry responds false', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockHolderDDO = JSON.parse(JSON.stringify(assets_1.holderDdoJson2));
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockResolvedValue(Object.assign({}, mockHolderDDO));
            jest.spyOn(common_functions_1.default, 'validateSslFromRegistryWithUri').mockResolvedValue(false);
            jest.spyOn(axios_1.default, 'get').mockResolvedValue({ data: exampleCertificate });
            const mockParticipantJson = JSON.parse(JSON.stringify(assets_1.participantJson));
            const holderCred = JSON.parse(JSON.stringify(mockParticipantJson.selfDescriptionCredential.verifiableCredential[0]));
            const proof = JSON.parse(JSON.stringify(holderCred.proof));
            let isError = false;
            try {
                yield common_functions_1.default.verification(holderCred, proof, true, resolver);
            }
            catch (error) {
                isError = true;
                expect(error.message).toBe(`Certificate validation failed`);
            }
            expect(isError).toBe(true);
            jest.resetAllMocks();
        }));
        it('comparePub key fails', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockHolderDDO = JSON.parse(JSON.stringify(assets_1.holderDdoJson2));
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockResolvedValue(Object.assign({}, mockHolderDDO));
            jest.spyOn(axios_1.default, 'get').mockResolvedValue({ data: exampleCertificate });
            jest.spyOn(common_functions_1.default, 'comparePubKeys').mockResolvedValue(false);
            const mockParticipantJson = JSON.parse(JSON.stringify(assets_1.participantJson));
            const holderCred = JSON.parse(JSON.stringify(mockParticipantJson.selfDescriptionCredential.verifiableCredential[0]));
            const proof = JSON.parse(JSON.stringify(holderCred.proof));
            let isError = false;
            try {
                yield common_functions_1.default.verification(holderCred, proof, false, resolver);
            }
            catch (error) {
                isError = true;
                expect(error.message).toBe(`Public Key Mismatched`);
            }
            expect(isError).toBe(true);
            jest.resetAllMocks();
        }));
        it('normalize fails', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockHolderDDO = JSON.parse(JSON.stringify(assets_1.holderDdoJson2));
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockResolvedValue(Object.assign({}, mockHolderDDO));
            jest.spyOn(axios_1.default, 'get').mockResolvedValue({ data: exampleCertificate });
            jest.spyOn(common_functions_1.default, 'comparePubKeys').mockResolvedValue(true);
            jest.spyOn(common_functions_1.default, 'normalize').mockResolvedValue(undefined);
            const mockParticipantJson = JSON.parse(JSON.stringify(assets_1.participantJson));
            const holderCred = JSON.parse(JSON.stringify(mockParticipantJson.selfDescriptionCredential.verifiableCredential[0]));
            const proof = JSON.parse(JSON.stringify(holderCred.proof));
            let isError = false;
            try {
                yield common_functions_1.default.verification(holderCred, proof, false, resolver);
            }
            catch (error) {
                isError = true;
                expect(error.message).toBe(`Normalizing Credential Failed`);
            }
            expect(isError).toBe(true);
            jest.resetAllMocks();
        }));
        it('normalize fails', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockHolderDDO = JSON.parse(JSON.stringify(assets_1.holderDdoJson2));
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockResolvedValue(Object.assign({}, mockHolderDDO));
            jest.spyOn(axios_1.default, 'get').mockResolvedValue({ data: exampleCertificate });
            jest.spyOn(common_functions_1.default, 'comparePubKeys').mockResolvedValue(true);
            jest.spyOn(common_functions_1.default, 'normalize').mockResolvedValue(undefined);
            const mockParticipantJson = JSON.parse(JSON.stringify(assets_1.participantJson));
            const holderCred = JSON.parse(JSON.stringify(mockParticipantJson.selfDescriptionCredential.verifiableCredential[0]));
            const proof = JSON.parse(JSON.stringify(holderCred.proof));
            let isError = false;
            try {
                yield common_functions_1.default.verification(holderCred, proof, false, resolver);
            }
            catch (error) {
                isError = true;
                expect(error.message).toBe(`Normalizing Credential Failed`);
            }
            expect(isError).toBe(true);
            jest.resetAllMocks();
        }));
        it('hash verification fails', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockHolderDDO = JSON.parse(JSON.stringify(assets_1.holderDdoJson2));
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockResolvedValue(Object.assign({}, mockHolderDDO));
            jest.spyOn(axios_1.default, 'get').mockResolvedValue({ data: exampleCertificate });
            jest.spyOn(common_functions_1.default, 'comparePubKeys').mockResolvedValue(true);
            jest.spyOn(common_functions_1.default, 'normalize').mockResolvedValue('abc');
            const mockParticipantJson = JSON.parse(JSON.stringify(assets_1.participantJson));
            const holderCred = JSON.parse(JSON.stringify(mockParticipantJson.selfDescriptionCredential.verifiableCredential[0]));
            const proof = JSON.parse(JSON.stringify(holderCred.proof));
            let isError = false;
            try {
                yield common_functions_1.default.verification(holderCred, proof, false, resolver);
            }
            catch (error) {
                isError = true;
                // expect(error).toBeInstanceOf(Error)
            }
            expect(isError).toBe(true);
            jest.resetAllMocks();
        }));
        it('hash verification successful', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockHolderDDO = JSON.parse(JSON.stringify(assets_1.holderDdoJson2));
            jest.spyOn(common_functions_1.default, 'getDDOfromDID').mockResolvedValue(Object.assign({}, mockHolderDDO));
            jest.spyOn(axios_1.default, 'get').mockResolvedValue({ data: exampleCertificate });
            jest.spyOn(common_functions_1.default, 'comparePubKeys').mockResolvedValue(true);
            jest.spyOn(common_functions_1.default, 'normalize').mockResolvedValue('abc');
            jest.spyOn(common_functions_1.default, 'verify').mockResolvedValue(true);
            const mockParticipantJson = JSON.parse(JSON.stringify(assets_1.participantJson));
            const holderCred = JSON.parse(JSON.stringify(mockParticipantJson.selfDescriptionCredential.verifiableCredential[0]));
            const proof = JSON.parse(JSON.stringify(holderCred.proof));
            let isError = false;
            try {
                const response = yield common_functions_1.default.verification(holderCred, proof, false, resolver);
                expect(response).toBe(true);
            }
            catch (error) {
                isError = true;
            }
            expect(isError).toBe(false);
            jest.resetAllMocks();
        }));
        it('Veracity calculated successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            let isError = false;
            try {
                const { validLPJSON: { selfDescriptionCredential: { verifiableCredential } }, veracityResponse } = assets_1.serviceOfferingTestJSON;
                jest.spyOn(common_functions_1.default, 'calcVeracity').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                    return veracityResponse;
                }));
                const resolver = new did_resolver_1.Resolver(webResolver);
                const response = yield common_functions_1.default.calcVeracity(verifiableCredential, resolver);
                expect(response).toEqual(veracityResponse);
            }
            catch (error) {
                isError = true;
            }
            expect(isError).toBe(false);
            jest.resetAllMocks();
        }));
        it('Certificate parsed successfully', () => __awaiter(void 0, void 0, void 0, function* () {
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
            };
            // jest.spyOn(Utils, 'parseCertificate').mockImplementation(() => {
            // 	return x5uResp
            // })
            let isError = false;
            try {
                // const certificates = (await axios.get(x5u)).data as string
                // getting object of a PEM encoded X509 Certificate.
                const certificates = assets_1.mockCertificate;
                const certificate = new crypto_1.X509Certificate(certificates);
                const response = yield common_functions_1.default.parseCertificate(certificate);
                expect(response).toEqual(x5uResp);
            }
            catch (error) {
                isError = true;
            }
            expect(isError).toBe(false);
            jest.resetAllMocks();
        }));
        it('Duplicates removed', () => __awaiter(void 0, void 0, void 0, function* () {
            let isError = false;
            try {
                const { uniqueVC } = assets_1.serviceOfferingTestJSON;
                const uniqueVC1 = JSON.parse(JSON.stringify(uniqueVC));
                const response = yield common_functions_1.default.removeDuplicates(uniqueVC1, 'id');
                expect(response).toEqual(uniqueVC);
            }
            catch (error) {
                isError = true;
            }
            expect(isError).toBe(false);
            jest.resetAllMocks();
        }));
        it('ServiceOffering Compliance API called successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(common_functions_1.default, 'callServiceOfferingCompliance').mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                return {};
            }));
            let isError = false;
            try {
                let { validSOComplianceReq } = assets_1.serviceOfferingTestJSON;
                validSOComplianceReq = JSON.parse(JSON.stringify(validSOComplianceReq));
                yield common_functions_1.default.callServiceOfferingCompliance(validSOComplianceReq);
            }
            catch (error) {
                isError = true;
            }
            expect(isError).toBe(false);
            jest.resetAllMocks();
        }));
        it('Transparency calculation successful', () => __awaiter(void 0, void 0, void 0, function* () {
            let isError = false;
            try {
                let { transparencyCS } = assets_1.serviceOfferingTestJSON;
                transparencyCS = JSON.parse(JSON.stringify(transparencyCS));
                const response = yield common_functions_1.default.calcTransparency(transparencyCS);
                expect(response).toBe(1.6);
            }
            catch (error) {
                isError = true;
            }
            expect(isError).toBe(false);
            jest.resetAllMocks();
        }));
        it('Trust index calculation successful', () => __awaiter(void 0, void 0, void 0, function* () {
            let isError = false;
            try {
                const response = yield common_functions_1.default.calcTrustIndex(1, 1);
                expect(response).toBe(1);
            }
            catch (error) {
                isError = true;
            }
            expect(isError).toBe(false);
            jest.resetAllMocks();
        }));
        it('Label Level calculation successful', () => __awaiter(void 0, void 0, void 0, function* () {
            let isError = false;
            try {
                let { labelLevelCS } = assets_1.labelLevelTestJSON;
                labelLevelCS = JSON.parse(JSON.stringify(labelLevelCS));
                const response = yield common_functions_1.default.calcLabelLevel(labelLevelCS);
                expect(response).toBe('L1');
            }
            catch (error) {
                isError = true;
            }
            expect(isError).toBe(false);
            jest.resetAllMocks();
        }));
        it('Rule point key not found in criteria json - P5.2.1', () => __awaiter(void 0, void 0, void 0, function* () {
            let errorMsg = '';
            try {
                let { invalidLabelLevelCS } = assets_1.labelLevelTestJSON;
                invalidLabelLevelCS = JSON.parse(JSON.stringify(invalidLabelLevelCS));
                yield common_functions_1.default.calcLabelLevel(invalidLabelLevelCS);
            }
            catch (error) {
                errorMsg = error.message;
            }
            expect(errorMsg).toBe('Rule point key not found in criteria json - gx:P5.2.1');
            jest.resetAllMocks();
        }));
        it('LabelLevel Calculated BC', () => __awaiter(void 0, void 0, void 0, function* () {
            let isError = false;
            try {
                let { labelLevelBC } = assets_1.labelLevelTestJSON;
                labelLevelBC = JSON.parse(JSON.stringify(labelLevelBC));
                const response = yield common_functions_1.default.calcLabelLevel(labelLevelBC);
                expect(response).toBe('BC');
            }
            catch (error) {
                isError = true;
            }
            expect(isError).toBe(false);
            jest.resetAllMocks();
        }));
    });
});
