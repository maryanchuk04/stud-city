import * as signalR from '@microsoft/signalr';
import { LogLevel } from '@microsoft/signalr';
import { TokenService } from './tokenService';
import { store } from '../app/store';
import {
	addMessageAction,
	addMessageNotification,
	removeMessageNotification,
	changeLastMessage,
	handleTyping,
	restoreHandleTyping,
} from '../app/features/chatsSlice';
import { showNotification } from './NotificationService';

const tokenService = new TokenService();

export const connectToHub = () => {
	if (tokenService.getToken()) {
		const signalR = new HubService();
		signalR.startConnection(() => console.log('START_CONNECTION'));
		return signalR;
	}
};

export class HubService {
	#hubConnection;

	configure() {
		this.#hubConnection = new signalR.HubConnectionBuilder()
			.withUrl(process.env.REACT_APP_CHAT_HUB_URL, {
				accessTokenFactory: () => tokenService.getToken(),
			})
			.configureLogging(LogLevel.Information)
			.build();
	}

	async startConnection() {
		this.#hubConnection.on('JoinToRoom', () => {});

		this.#hubConnection.on('ReceiveMessage', (message) => {
			if (window.location.href.includes(message.roomId)) {
				store.dispatch(addMessageAction(message));
			} else {
				// show desktop notification
				if (!window.location.href.includes(process.env.REACT_APP_FRONTEND_PATH)) {
					showNotification(message?.user?.fullName, message?.content);
					return;
				}

				// show studcity notification
				store.dispatch(addMessageNotification(message));
				setTimeout(() => {
					store.dispatch(removeMessageNotification(message.id));
				}, 5000);
			}
			store.dispatch(changeLastMessage(message));
		});

		this.#hubConnection.on('UsersInRoom', () => {});

		this.#hubConnection.on('UserTyping', (data) => {
			store.dispatch(handleTyping(data));
		});

		this.#hubConnection.on('UserStopTyping', () => {
			store.dispatch(restoreHandleTyping());
		});

		await this.#hubConnection.start();
		return this.#hubConnection;
	}

	async disconnect() {
		await this.#hubConnection.stop();
	}
}
