import NodeVault from 'node-vault'

export class VaultService {
	private readonly vault: NodeVault.client
	constructor() {
		this.vault = NodeVault({
			apiVersion: 'v1',
			endpoint: process.env.WIZARD_VAULT_HOST as string
		} as NodeVault.Option)
	}

	private async loginByApprole(): Promise<void> {
		const result = await this.vault.approleLogin({
			role_id: process.env.WIZARD_VAULT_ROLEID as string,
			secret_id: process.env.WIZARD_VAULT_SECRETID as string
		})
		this.vault.token = result.auth.client_token
	}

	async getSecrets(path: string): Promise<any> {
		await this.loginByApprole()
		try {
			const result = await this.vault.read(`${process.env.WIZARD_VAULT_SECRETPATH as string}/data/${path}`)
			return result.data.data['pkcs8.key']
		} catch (ex: any) {
			if (ex.response.statusCode === 404) {
				return null
			}
			throw Error('Retreive Secret Failed: ' + ex)
		}
	}
}
