import { BaseService } from "./baseService";


export class UserService {
	constructor() {
		this.service = new BaseService();
		this.apiUrl = "/user"
	}

	async getCurrentUser() {
		try {
			return await this.service.get(this.apiUrl);
		}
		catch(err) {
			throw Error(err);
		}
	}
}