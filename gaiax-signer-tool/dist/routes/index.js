"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utils/constants");
const v1_1 = __importDefault(require("../components/SignerTool/v1"));
exports.default = (app) => {
    app.use(constants_1.ROUTES.V1, v1_1.default);
};
