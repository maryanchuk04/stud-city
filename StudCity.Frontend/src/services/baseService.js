import axios from 'axios';
import { TokenService } from './tokenService';

const tokenService = new TokenService();

export class BaseService {
	constructor() {
		this.axios = axios.create({
			baseURL: process.env.REACT_APP_BASE_API_URL,
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${tokenService.getToken() || ''}`,
			},
		});
	}

	post(url, data) {
		return this.axios.post(url, data);
	}

	get(url) {
		return this.axios.get(url);
	}

	put(url, data) {
		return this.axios.put(url, data);
	}

	delete(url) {
		return this.axios.delete(url);
	}

	patch(url, data) {
		return this.axios.patch(url, data);
	}
}
