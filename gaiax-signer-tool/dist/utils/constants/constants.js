"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.W3C_CONTEXT = exports.LABEL_LEVEL_RULE = exports.ROUTES = exports.AppMessages = exports.AppConst = void 0;
const credential_json_1 = __importDefault(require("../../assets/credential.json"));
const jws_2020_json_1 = __importDefault(require("../../assets/jws-2020.json"));
class AppConst {
}
exports.AppConst = AppConst;
AppConst.RSA_ALGO = 'PS256';
AppConst.LEGAL_PARTICIPANT = 'LegalParticipant';
AppConst.SERVICE_OFFER = 'ServiceOffering';
AppConst.FLATTEN_ENCRYPT_ALGORITHM = 'RSA-OAEP-256';
AppConst.FLATTEN_ENCRYPT_ENCODING = 'A256GCM';
AppConst.VERIFY_POLICIES = ['checkSignature', 'gxCompliance'];
AppConst.REQUEST_TYPES = ['API', 'email', 'webform', 'unregisteredLetter', 'registeredLetter', 'supportCenter'];
AppConst.ACCESS_TYPES = ['digital', 'physical'];
AppConst.VERIFY_LP_POLICIES = ['integrityCheck', 'holderSignature', 'complianceSignature', 'complianceCheck'];
class AppMessages {
}
exports.AppMessages = AppMessages;
AppMessages.CLAIM_SIG_VERIFY_FAILED = 'Claim signature verification failed';
AppMessages.DID_SUCCESS = 'DID created successfully.';
AppMessages.DID_VERIFY = 'DID verified successfully.';
AppMessages.RN_VERIFY = 'Registration number verified successfully.';
AppMessages.DID_VERIFY_FAILED = 'DID verification failed.';
AppMessages.RN_VERIFY_FAILED = 'Registration number verification failed.';
AppMessages.DID_FAILED = 'DID creation failed.';
AppMessages.DID_VALIDATION = 'DID validation failed.';
AppMessages.KEYPAIR_VALIDATION = 'Key pair validation failed';
AppMessages.VC_SUCCESS = 'VC created successfully.';
AppMessages.VC_VALIDATION = 'VC validation failed.';
AppMessages.VC_FAILED = 'VC creation failed.';
AppMessages.VP_SUCCESS = 'VP created successfully.';
AppMessages.VP_FAILED = 'VP creation failed.';
AppMessages.VP_VALIDATION = 'VP validation failed.';
AppMessages.SIG_VERIFY_VALIDATION = 'Signature verification api validation failed.';
AppMessages.SIG_VERIFY_SUCCESS = 'Policy verification successful';
AppMessages.SIG_VERIFY_FAILED = 'Policy verification failed';
AppMessages.CERT_VALIDATION_FAILED = 'Certificates verification failed against the Gaia-x Registry';
AppMessages.PUB_KEY_MISMATCH = 'Public Key from did and SSL certificates do not match';
AppMessages.ONLY_JWS2020 = 'Only JsonWebSignature2020 is supported';
AppMessages.PARTICIPANT_DID_FETCH_FAILED = 'Participant DID fetching failed';
AppMessages.PARTICIPANT_VC_FOUND_FAILED = 'Participant VC not found';
AppMessages.SO_SD_FETCH_FAILED = 'Service offering self description fetching failed';
AppMessages.BAD_DATA = 'Bad data';
AppMessages.TRUST_INDEX_CALC_FAILED = 'Trust index calculation failed';
AppMessages.SD_SIGN_SUCCESS = 'Service offering SD signed successfully';
AppMessages.LL_SIGN_SUCCESS = 'Label Level SD signed successfully';
AppMessages.SD_SIGN_FAILED = 'Service offering SD signing failed';
AppMessages.LL_SIGN_FAILED = 'Label Level SD signing failed';
AppMessages.X5U_NOT_FOUND = 'X5U not found from the holder DID';
AppMessages.INVALID_DEPENDS_ON = 'Service offering vc not found in depends on';
AppMessages.CS_EMPTY = 'Credential subject not found';
AppMessages.LABEL_LEVEL_CALC_FAILED = `Basic conformity criteria's can not be marked as deny`;
AppMessages.LABEL_LEVEL_CALC_FAILED_INVALID_KEY = 'Rule point key not found in criteria json - ';
AppMessages.PK_DECRYPT_FAIL = 'Fail to decrypt primary key';
AppMessages.SD_SIGN_VALIDATION_FAILED = 'Service offering SD validation failed';
AppMessages.COMPLIANCE_CRED_FOUND_FAILED = 'Compliance Credential not found';
AppMessages.PARTICIPANT_VC_INVALID = 'Verifiable Credential not valid';
AppMessages.VALIDATION_ERROR = 'Validation Error, please provide valid req.body';
exports.ROUTES = {
    APP_NAME: '',
    API: '',
    V1: '/v1',
    V1_APIS: {
        LEGAL_PARTICIPANT: '/gaia-x/legal-participant',
        SERVICE_OFFERING: '/gaia-x/service-offering',
        RESOURCE: '/gaia-x/resource',
        LABEL_LEVEL: '/gaia-x/label-level',
        VERIFY: '/gaia-x/verify',
        CREATE_WEB_DID: '/create-web-did',
        VERIFY_WEB_DID: '/verify-web-did',
        GET_TRUST_INDEX: '/get/trust-index',
        REGISTRATION_NUMBER: '/gaia-x/validate-registration-number',
        UPDATE_LOG: '/update-log'
    },
    HEALTH: '/health'
};
exports.LABEL_LEVEL_RULE = {
    BC: [
        'gx:P1.1.1',
        'gx:P1.1.3',
        'gx:P1.1.4',
        'gx:P1.2.1',
        'gx:P1.2.2',
        'gx:P1.2.3',
        'gx:P1.2.4',
        'gx:P1.2.5',
        'gx:P1.2.6',
        'gx:P1.2.7',
        'gx:P1.2.8',
        'gx:P1.2.9',
        'gx:P1.2.10',
        'gx:P1.3.1',
        'gx:P1.3.2',
        'gx:P1.3.3',
        'gx:P1.3.4',
        'gx:P1.3.5',
        'gx:P2.1.2',
        'gx:P2.1.3',
        'gx:P2.2.1',
        'gx:P2.2.2',
        'gx:P2.2.3',
        'gx:P2.2.5',
        'gx:P2.2.6',
        'gx:P2.2.7',
        'gx:P2.3.2',
        'gx:P2.3.3',
        'gx:P3.1.1',
        'gx:P3.1.2',
        'gx:P3.1.3',
        'gx:P3.1.4',
        'gx:P3.1.5',
        'gx:P3.1.6',
        'gx:P3.1.7',
        'gx:P3.1.8',
        'gx:P3.1.9',
        'gx:P3.1.10',
        'gx:P3.1.11',
        'gx:P3.1.12',
        'gx:P3.1.13',
        'gx:P3.1.14',
        'gx:P3.1.15',
        'gx:P3.1.16',
        'gx:P3.1.17',
        'gx:P3.1.18',
        'gx:P3.1.19',
        'gx:P3.1.20',
        'gx:P4.1.1',
        'gx:P4.1.2',
        'gx:P5.2.1'
    ],
    L1: ['gx:P1.1.2', 'gx:P2.1.1', 'gx:P2.2.4', 'gx:P2.3.1']
    // L2: ['gx:P5.1.1'],
    // L3: ['gx:P5.1.2', 'gx:P5.1.3', 'gx:P5.1.4', 'gx:P5.1.5', 'gx:P5.1.6', 'gx:P5.1.7']
};
exports.W3C_CONTEXT = {
    'https://www.w3.org/2018/credentials/v1': credential_json_1.default,
    'https://w3id.org/security/suites/jws-2020/v1': jws_2020_json_1.default
};
