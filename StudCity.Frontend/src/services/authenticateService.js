import { BaseService } from "./baseService";

export class AuthenticateService {
	constructor() {
		this.service = new BaseService();
	}

	async authenticate({ email, password }) {
		const authenticateResult = await this.service.post("/authenticate", { email, password })
		if(authenticateResult.status === 200) {
			return authenticateResult.data;
		}
		else alert(authenticateResult)
	}
}