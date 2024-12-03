import { existsSync, mkdirSync } from 'fs'
import { Logger, transports } from 'winston'

class Logging {
	public logger: any

	// define the logs level
	private logLevel = 'silly'

	constructor() {
		this.logger = new Logger({
			transports: this.transportList(),
			exceptionHandlers: this.transportList()
		})
	}
	// public methods for external use
	public error(fileName: string, method: string, msg: string, uuid: string, data: any = {}) {
		this.setLabel(fileName, method)
		this.logger.error(`${uuid} - ${msg}`, data ? data : '', '')
	}

	// public warn(fileName: string, method: string, msg: string, uuid: string, data: any = {}) {
	// 	this.setLabel(fileName, method)
	// 	this.logger.warn(`${uuid} - ${msg}`, data ? data : '', '')
	// }

	public info(fileName: string, method: string, msg: string, uuid: string, data: any = {}) {
		this.setLabel(fileName, method)
		this.logger.info(`${uuid} - ${msg}`, data ? data : '', '')
	}

	// public verbose(fileName: string, method: string, msg: string, uuid: string, data: any = {}) {
	// 	this.setLabel(fileName, method)
	// 	this.logger.verbose(`${uuid} - ${msg}`, data ? data : '', '')
	// }

	public debug(fileName: string, method: string, msg: string, uuid: string, data: any = {}) {
		this.setLabel(fileName, method)
		this.logger.debug(`${uuid} - ${msg}`, data ? data : '', '')
	}

	// public silly(fileName: string, method: string, msg: string, uuid: string, data: any = {}) {
	// 	this.setLabel(fileName, method)
	// 	this.logger.silly(`${uuid} - ${msg}`, data ? data : '', '')
	// }

	public setFileLevel(level: string) {
		this.logger.transports.file.level = level
	}

	public setConsoleLevel(level: string) {
		this.logger.transports.console.level = level
	}

	public setLabel(fileName: string, method: string | null = null) {
		let label = this.getLabel(fileName)
		label += method ? ` ~ ${method}` : ''
		this.logger.transports.console['label'] = label
		this.logger.transports.file['label'] = label
	}

	// return the file name from absolute path for label in logs
	private getLabel = (fileName: string) => {
		const parts = fileName.split('/')
		return parts[parts.length - 2] + '/' + parts.pop()
	}

	// return the file path for log file
	private filePath = () => {
		const dir = __dirname + '/../../logs'
		if (!existsSync(dir)) {
			mkdirSync(dir)
		}
		const time = new Date()
		return dir + `/logs_${time}_.log`
	}
	// set file transport object
	private fileOption = () => {
		return {
			level: this.logLevel,
			filename: this.filePath(),
			maxsize: 16777216, // Maximum size of a log file should be 16MB
			maxFiles: 64, // Maximum 64 file of 16 MB to be stored. i.e Max 1GB of logs can be stored
			handleExceptions: true,
			label: null, // Display file name
			json: false, // write error in json object or plain text
			timestamp: true,
			depth: '',
			colorize: false
			// silent: true    // Uncomment to turn off logging
		}
	}

	// set console transport object
	private consoleOption = () => {
		return {
			level: this.logLevel,
			handleExceptions: true,
			label: null, // Display file name
			json: false, // write error in json object or plain text
			timestamp: true,
			depth: false,
			colorize: true // for colorized error (i.e red for error, green for info)
			// silent: true // Uncomment to turn off logging
		}
	}

	// create transport array
	private transportList = () => {
		return [new transports.Console(this.consoleOption()), new transports.File(this.fileOption())]
	}
}

const logger = new Logging()
export default logger
