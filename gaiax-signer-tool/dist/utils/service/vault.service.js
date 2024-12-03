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
exports.VaultService = void 0;
const node_vault_1 = __importDefault(require("node-vault"));
class VaultService {
    constructor() {
        this.vault = (0, node_vault_1.default)({
            apiVersion: 'v1',
            endpoint: process.env.WIZARD_VAULT_HOST
        });
    }
    loginByApprole() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.vault.approleLogin({
                role_id: process.env.WIZARD_VAULT_ROLEID,
                secret_id: process.env.WIZARD_VAULT_SECRETID
            });
            this.vault.token = result.auth.client_token;
        });
    }
    getSecrets(path) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loginByApprole();
            try {
                const result = yield this.vault.read(`${process.env.WIZARD_VAULT_SECRETPATH}/data/${path}`);
                return result.data.data['pkcs8.key'];
            }
            catch (ex) {
                if (ex.response.statusCode === 404) {
                    return null;
                }
                throw Error('Retreive Secret Failed: ' + ex);
            }
        });
    }
}
exports.VaultService = VaultService;
