"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkResults = void 0;
const express_validator_1 = require("express-validator");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const constants_1 = require("../constants");
const checkResults = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorsArr = errors.array();
        res.status(http_status_codes_1.default.UNPROCESSABLE_ENTITY).json({
            error: `${errorsArr[0].msg} of param '${errorsArr[0].param}'`,
            message: constants_1.AppMessages.VALIDATION_ERROR
        });
    }
    else {
        next();
    }
};
exports.checkResults = checkResults;
