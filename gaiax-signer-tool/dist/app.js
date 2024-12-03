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
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const middleware_1 = __importDefault(require("./middleware"));
const routes_1 = __importDefault(require("./routes"));
const swaggerDocument = __importStar(require("./swagger/swagger.json"));
const logger_1 = require("./utils/logger");
const validators_1 = require("./utils/validators");
const commonValidation_1 = require("./utils/validators/commonValidation");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const app = (0, express_1.default)();
const port = process.env.PORT;
swaggerDocument.servers[0].url = process.env.HOST || `http://localhost:${port}`;
app.get('/health', (req, res) => {
    return res.status(http_status_codes_1.default.OK).send('healthy');
});
(0, middleware_1.default)(app);
// body-parser
app.use(body_parser_1.default.json({ limit: '50mb', type: 'application/json' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
(0, routes_1.default)(app);
// order : error , warn , info,  verbose, debug, silly
app.post('/v1/update-log', validators_1.AppValidation.Log, commonValidation_1.checkResults, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.setConsoleLevel(req.body.logLevel);
    logger_1.logger.setFileLevel(req.body.logLevel);
    return res.status(http_status_codes_1.default.OK).json({
        message: 'Log Updated'
    });
}));
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.all('/*', (req, res) => {
    if (req.path == '/') {
        res.redirect('/docs');
    }
    else {
        logger_1.logger.error(__filename, 'Invalid Route Handler ', 'Invalid Route Fired : ' + req.path, req.custom.uuid);
        return res.status(http_status_codes_1.default.BAD_REQUEST).json({
            status: http_status_codes_1.default.BAD_REQUEST,
            message: 'Bad Request'
        });
    }
});
exports.default = app;
