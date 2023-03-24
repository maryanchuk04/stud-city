import * as signalR from "@microsoft/signalr";
import { LogLevel } from "@microsoft/signalr";
import { TokenService } from "./tokenService";
import { store } from "../app/store";
import { addMessageAction } from "../app/features/chatsSlice";

const tokenService = new TokenService();

export const connectToHub = () => {
	if(tokenService.getToken()) {
		const signalR = new HubService();
		signalR.startConnection(() => console.log("START_CONNECTION"));
		return signalR;
	}
}


export class HubService {
	#hubConnection = new signalR.HubConnectionBuilder()
	.withUrl(process.env.REACT_APP_CHAT_HUB_URL, {
		accessTokenFactory: () => tokenService.getToken()
	})
	.configureLogging(LogLevel.Information)
	.build();
	
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
			store.dispatch(addMessageAction(message));
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