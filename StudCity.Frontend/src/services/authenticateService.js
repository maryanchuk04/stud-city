import { BaseService } from "./baseService";
import { TokenService } from "./tokenService";

export class AuthenticateService {
	// Inject alert provider service.
	constructor() {
		this.service = new BaseService();
		this.tokenService = new TokenService();
	}

	async authenticate({ email, password }) {
		try {
			const authenticateResult = await this.service.post("/authenticate", { email, password });
			this.tokenService.setToken(authenticateResult.data.token);

			return true;
		}
		catch(err) {
			alert(err.response.data.error);
			return false;
		}
	}
}