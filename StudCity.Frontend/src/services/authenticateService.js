import { BaseService } from "./baseService";
import { showAlert } from "./showAlert";
import { TokenService } from "./tokenService";

export class AuthenticateService {
	authUrl = '/authenticate';
	

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
			showAlert(err.response.data.error, "error");
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
			showAlert(err.response.data.error, "error")
			return;
		}
	}

	async verifyRegistration({ accountId, verificationToken }) {
		try{
			const verificationResponse = await this.service.put(`${this.authUrl}/verify-token/${accountId}/${verificationToken}`);
			if (verificationResponse.status === 200) {
				this.tokenService.setToken(verificationResponse.data.token);
				return true;
			}
		}
		catch(err) {
			showAlert(err.response.data.error, "error");
			return false;
		}
	} 

	// params { firtsName, lastName, userName, gender, phoneNumber, avatar, birthday, role, groups }
	async registrationComplete(userData) {
		try {
			const registrationCompleteResponse = await this.service.post(`${this.authUrl}/registration-complete`, {
				...userData,
				birthday: new Date(userData.birthday).toISOString(),
				groups: []
			});
			
			if(registrationCompleteResponse.status === 200) {
				showAlert("Your account successfuly created!", "success");
				return true;
			}
		}
		catch(err) {
			showAlert(err.response.data.error, "error");
			return false;
		}
	}
}