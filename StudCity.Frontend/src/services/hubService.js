import * as signalR from "@microsoft/signalr";
import { LogLevel } from "@microsoft/signalr";
import { TokenService } from "./tokenService";
import { store } from "../app/store";
import { addMessageAction } from "../app/features/chatsSlice";

const tokenService = new TokenService();

export const connectToHub = () => {
	if (tokenService.getToken()) {
		const signalR = new HubService();
		signalR.startConnection(() => console.log("START_CONNECTION"));
		return signalR;
	}
}


export class HubService {
	#hubConnection;

	configure() {
		this.#hubConnection = new signalR.HubConnectionBuilder()
			.withUrl(process.env.REACT_APP_CHAT_HUB_URL, {
				accessTokenFactory: () => tokenService.getToken()
			})
			.configureLogging(LogLevel.Information)
			.build();
	}

	async startConnection() {
		this.#hubConnection.on("JoinToRoom", res => {
			console.log("Join", res);
		});

		this.#hubConnection.on("ReceiveMessage", (message) => {
			if (window.location.href.includes(message.roomId)) {
				store.dispatch(addMessageAction(message));
			}
			// TODO Add change last message
		});

		await this.#hubConnection.start();
		return this.#hubConnection;
	}

	async disconnect() {
		await this.#hubConnection.stop();
	}
}