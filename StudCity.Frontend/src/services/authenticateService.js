import { BaseService } from "./baseService";
import { showAlert } from "./showAlert";
import { TokenService } from "./tokenService";
import { NETWORK_ERROR, STATUS_OK, NETWORK_ERROR_MESSAGE, STATUS_NOT_AUTHORIZE } from "../utils/apiConstants";

export class AuthenticateService {
	authUrl = '/authenticate';

	constructor() {
		this.service = new BaseService();
		this.tokenService = new TokenService();
	}

	async authenticate({ email, password }) {
		try {
			const { data } = await this.service.post(this.authUrl, { email, password });
			
			if (data.token) {
				this.tokenService.setToken(data.token);
				return true;
			}
		}
		catch (err) {
			showAlert(err.response.data.error, "error");
			return false;
		}
	}

	async registration({ email, password }) {
		try {
			const registrationResponse = await this.service.post(`${this.authUrl}/registration`, { email, password });
			if (registrationResponse.status === STATUS_OK)
				return registrationResponse.data.accountId;
		}
		catch (err) {
			showAlert(err.response.data.error, "error")
			return;
		}
	}

	async verifyRegistration({ accountId, verificationToken }) {
		try {
			const verificationResponse = await this.service.put(`${this.authUrl}/verify-token/${accountId}/${verificationToken}`);
			if (verificationResponse.status === STATUS_OK) {
				this.tokenService.setToken(verificationResponse.data.token);
			}

			return true;
		}
		catch (err) {
			showAlert(err.response.data.error, "error");
		}
		return false;
	}

	// params { firtsName, lastName, userName, gender, phoneNumber, avatar, birthday, role, groups }
	async registrationComplete(userData) {
		try {
			const { status, data } = await this.service.post(`${this.authUrl}/registration-complete`, {
				...userData,
				birthday: new Date(userData.birthday),
				groups: []
			});

			if (status === STATUS_OK) {
				showAlert("Your account successfuly created!", "success");
				this.tokenService.setToken(data.token);
				return true;
			}
		}
		catch (err) {
			if (err.status === STATUS_NOT_AUTHORIZE) {
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
			const { status } = await this.service.get(`${this.authUrl}/forgot-password/${email}`);
			if (status === STATUS_OK) {
				showAlert("An email with a link to reset your password has been sent to your email", "success");
			}
		}
		catch (err) {
			if (err.code === NETWORK_ERROR) {
				showAlert(NETWORK_ERROR_MESSAGE, "error");
				return;
			}
			showAlert(err.response.data.error, "error");
		}
	}

	async recoveryPassword({ id, password }) {
		try {
			const { status } = await this.service.get(`${this.authUrl}/recovery-password/${id}/${password}`);

			if (status === STATUS_OK) {
				showAlert("Your password was successfuly changed", "success");
				return true;
			}
		}
		catch (err) {
			if (err.code === NETWORK_ERROR) {
				showAlert(NETWORK_ERROR_MESSAGE, "error");
				return;
			}
			showAlert(err.response.data.error, "error");
		}
	}

	async logOut() {
		try {
			const { status } = await this.service.get(`${this.authUrl}/logout`);
			if (status === STATUS_OK) {
				this.tokenService.removeToken();
				window.location.reload();
			}
		} catch (error) {
			showAlert("Something went wrong", "error");
		}
	}

}