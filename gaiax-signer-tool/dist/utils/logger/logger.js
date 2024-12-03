"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const winston_1 = require("winston");
class Logging {
    constructor() {
        // define the logs level
        this.logLevel = 'silly';
        // return the file name from absolute path for label in logs
        this.getLabel = (fileName) => {
            const parts = fileName.split('/');
            return parts[parts.length - 2] + '/' + parts.pop();
        };
        // return the file path for log file
        this.filePath = () => {
            const dir = __dirname + '/../../logs';
            if (!(0, fs_1.existsSync)(dir)) {
                (0, fs_1.mkdirSync)(dir);
            }
            const time = new Date();
            return dir + `/logs_${time}_.log`;
        };
        // set file transport object
        this.fileOption = () => {
            return {
                level: this.logLevel,
                filename: this.filePath(),
                maxsize: 16777216,
                maxFiles: 64,
                handleExceptions: true,
                label: null,
                json: false,
                timestamp: true,
                depth: '',
                colorize: false
                // silent: true    // Uncomment to turn off logging
            };
        };
        // set console transport object
        this.consoleOption = () => {
            return {
                level: this.logLevel,
                handleExceptions: true,
                label: null,
                json: false,
                timestamp: true,
                depth: false,
                colorize: true // for colorized error (i.e red for error, green for info)
                // silent: true // Uncomment to turn off logging
            };
        };
        // create transport array
        this.transportList = () => {
            return [new winston_1.transports.Console(this.consoleOption()), new winston_1.transports.File(this.fileOption())];
        };
        this.logger = new winston_1.Logger({
            transports: this.transportList(),
            exceptionHandlers: this.transportList()
        });
    }
    // public methods for external use
    error(fileName, method, msg, uuid, data = {}) {
        this.setLabel(fileName, method);
        this.logger.error(`${uuid} - ${msg}`, data ? data : '', '');
    }
    // public warn(fileName: string, method: string, msg: string, uuid: string, data: any = {}) {
    // 	this.setLabel(fileName, method)
    // 	this.logger.warn(`${uuid} - ${msg}`, data ? data : '', '')
    // }
    info(fileName, method, msg, uuid, data = {}) {
        this.setLabel(fileName, method);
        this.logger.info(`${uuid} - ${msg}`, data ? data : '', '');
    }
    // public verbose(fileName: string, method: string, msg: string, uuid: string, data: any = {}) {
    // 	this.setLabel(fileName, method)
    // 	this.logger.verbose(`${uuid} - ${msg}`, data ? data : '', '')
    // }
    debug(fileName, method, msg, uuid, data = {}) {
        this.setLabel(fileName, method);
        this.logger.debug(`${uuid} - ${msg}`, data ? data : '', '');
    }
    // public silly(fileName: string, method: string, msg: string, uuid: string, data: any = {}) {
    // 	this.setLabel(fileName, method)
    // 	this.logger.silly(`${uuid} - ${msg}`, data ? data : '', '')
    // }
    setFileLevel(level) {
        this.logger.transports.file.level = level;
    }
    setConsoleLevel(level) {
        this.logger.transports.console.level = level;
    }
    setLabel(fileName, method = null) {
        let label = this.getLabel(fileName);
        label += method ? ` ~ ${method}` : '';
        this.logger.transports.console['label'] = label;
        this.logger.transports.file['label'] = label;
    }
}
const logger = new Logging();
exports.default = logger;
