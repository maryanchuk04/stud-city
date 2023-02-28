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
			if(err.status === 401) {
				showAlert("You are not autorized!", "error");
				window.location = "/authenticate";
				return false;
			}
			
			showAlert(err.response.data.error, "error");
			return false;
		}
	}

	async forgotPassword(email) {
		try {
			const response = await this.service.get(`${this.authUrl}/forgot-password/${email}`);
			response.status === 200 && showAlert("An email with a link to reset your password has been sent to your email", "success");
		}
		catch(err) {
			showAlert(err.response.data.error, "error");
		}
	}

	async recoveryPassword({ id, password }) {
		try {
			const response = await this.service.get(`${this.authUrl}/recovery-password/${id}/${password}`);

			if (response.status === 200) {
				showAlert("Your password was successfuly changed", "success");
				return true;
			}
		} 
		catch (err) {
			showAlert(err.response.data.error, "error");
			return false;
		}
	}
}