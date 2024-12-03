"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class AppValidation {
    constructor() {
        this.Log = [(0, express_validator_1.body)('logLevel').isString().isIn(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])];
    }
}
exports.default = new AppValidation();
