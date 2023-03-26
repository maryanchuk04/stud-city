import { BaseService } from "./baseService";
import { showAlert } from "./showAlert";

export class RoomService {
	#url = "/room";

	constructor() {
		this.service = new BaseService();
	}

	async getChatById(id) {
		try {
			const { data } = await this.service.get(`${this.#url}/${id}`);

			return data;
		}
		catch(err) {
			if (!err.response) {
				showAlert("Something went wrong!", "error");
				return;
			}

			showAlert(err.response.data.error, "error");
			return;
		}
	}

	async getChats() {
		try {
			const { data } = await this.service.get(this.#url);

			return data;
		}
		catch(err) {
			if (!err.response) {
				showAlert("Something went wrong!", "error");
				return;
			}

			showAlert(err.response.data.error, "error");
			return;
		}
	}
}