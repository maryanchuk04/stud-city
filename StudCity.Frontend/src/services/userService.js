import { BaseService } from "./baseService";
import { showAlert } from "./showAlert";


export class UserService {
	constructor() {
		this.service = new BaseService();
		this.apiUrl = "/user"
	}

	async getCurrentUser() {
		try {
			return await this.service.get(this.apiUrl);
		}
		catch (err) {
			throw Error(err);
		}
	}

	/**
	 * @param user - user information from profile
	 */
	async editCurrentUser(user) {
		return await this.service.put(this.apiUrl, user);
	}

	async getUserById(id) {
		try {
			const { data } = await this.service.get(`${this.apiUrl}/${id}`)
			return data;
		}
		catch (err) {
			showAlert("User not found", "error");
		}
	}

	// /** I will think about this
	// * @param query - Example "?firstName='maks'"
	// */
	// async getUserByQuery(query) {
	// 	try {
	// 		const { data } = await this.service.get(`${this.apiUrl}/${query}`)
	// 		return data;
	// 	}
	// 	catch (err) {
	// 		showAlert("User not found", "error");
	// 	}
	// }
}