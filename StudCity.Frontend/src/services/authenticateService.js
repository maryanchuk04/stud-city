import { BaseService } from "./baseService";
import { TokenService } from "./tokenService";

export class AuthenticateService {
	authUrl = '/authenticate';

	// Inject alert provider service.
	constructor() {
		this.service = new BaseService();
		this.tokenService = new TokenService();
	}

	async authenticate({ email, password }) {
		try {
			const authenticateResult = await this.service.post(this.authUrl, { email, password });
			this.tokenService.setToken(authenticateResult.data.token);

			return true;
		}
		catch(err) {
			alert(err.response.data.error);
			return false;
		}
	}

	async registration({ email, password }) {
		try{
			const registrationResponse = await this.service.post(`${this.authUrl}/registration`, { email, password });
			if (registrationResponse.status === 200)
				return registrationResponse.data.accountId;
		}
		catch(err) {
			alert(err.response.data.error);
			return;
		}
	}

	async verifyRegistration({ accoutnId, verificationToken }) {
		try{
			const verificationResponse = await this.service.put(`${this.authUrl}/verify-token/${accoutnId}/${verificationToken}`);
			if (verificationResponse.status === 200)
				this.tokenService.setToken(verificationResponse.data.token);
		}
		catch(err) {
			alert(err.response.data.error);
			return false;
		}
	} 
}