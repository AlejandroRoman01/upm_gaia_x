"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
exports.default = (app) => {
    app.use((req, res, next) => {
        if (req.custom && req.custom.uuid) {
            return next();
        }
        const uuidObj = {
            uuid: (0, uuid_1.v4)()
        };
        req.custom = uuidObj;
        next();
    });
};
