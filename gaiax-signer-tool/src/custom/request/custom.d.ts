declare namespace Express {
	interface customArgs {
		uuid: string
	}
	export interface Request {
		custom: customArgs
	}
}
