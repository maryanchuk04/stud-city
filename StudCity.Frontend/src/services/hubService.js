import * as signalR from "@microsoft/signalr";
import { LogLevel } from "@microsoft/signalr";
import { TokenService } from "./tokenService";

export class HubService {
	#tokenService = new TokenService();
	#hubConnection;
	
	constructor() {
		this.#hubConnection = new signalR.HubConnectionBuilder()
		.withUrl(process.env.REACT_APP_CHAT_HUB_URL, {
			accessTokenFactory: () => this.#tokenService.getToken()
		})
		.configureLogging(LogLevel.Information).build();
	}

	/**
	 * 
	 * @param string ids 
	 */
	connectToUserRooms(ids) {
		this.#hubConnection.invoke("JoinToUsersRooms", ids);
	}

	startConnection() {
		this.#hubConnection.on("JoinToRoom", res => {
			console.log("Join", res);
		});
	
		this.#hubConnection.on("ReceiveMessage", (message) => {
			console.log(message);
		});

		return this.#hubConnection.start();
	}

	async disconnect() {
		await this.#hubConnection.stop();
	}

	sendMessage(chatId, message) {
		this.#hubConnection.invoke("SendMessage", chatId, message);
	}
}