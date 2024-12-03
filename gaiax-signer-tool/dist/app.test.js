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
const supertest_1 = __importDefault(require("supertest"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const app_1 = __importDefault(require("./app"));
const constants_1 = require("./utils/constants");
jest.mock('./utils/logger', () => {
    return Object.assign(Object.assign({}, jest.requireActual('./utils/logger')), { setConsoleLevel: () => {
            return true;
        } });
});
describe('health', () => {
    describe('success case', () => {
        it('health check', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default)
                .get(`${constants_1.ROUTES.HEALTH}`)
                .expect((response) => {
                expect(response.status).toBe(http_status_codes_1.default.OK);
            });
        }));
    });
});
describe('', () => {
    describe('success case', () => {
        it('docs', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default)
                .get('/')
                .expect((response) => {
                expect(response.status).toBe(http_status_codes_1.default.MOVED_TEMPORARILY);
            });
        }));
    });
});
describe('xyz', () => {
    describe('success case', () => {
        it('docs', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default)
                .get('/xyz')
                .expect((response) => {
                expect(response.status).toBe(http_status_codes_1.default.BAD_REQUEST);
            });
        }));
    });
});
describe('/v1/update-log', () => {
    const validBody = {
        logLevel: 'silly'
    };
    describe('failing case', () => {
        it('validation error', () => __awaiter(void 0, void 0, void 0, function* () {
            const error = {
                error: "Invalid value of param 'logLevel'",
                message: 'Validation Error, please provide valid req.body'
            };
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.UPDATE_LOG}`)
                .expect((response) => {
                expect(response.status).toBe(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                expect(response.body).toEqual(error);
            });
        }));
    });
    describe('success case', () => {
        it('update log successful', () => __awaiter(void 0, void 0, void 0, function* () {
            const responseData = {
                message: 'Log Updated'
            };
            yield (0, supertest_1.default)(app_1.default)
                .post(`${constants_1.ROUTES.V1}${constants_1.ROUTES.V1_APIS.UPDATE_LOG}`)
                .send(validBody)
                .expect((response) => {
                expect(response.status).toBe(http_status_codes_1.default.OK);
                expect(response.body).toEqual(responseData);
            });
        }));
    });
});
