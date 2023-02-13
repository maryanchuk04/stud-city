import axios from 'axios';
import { TokenService } from './tokenService';

export class BaseService {
	constructor() {
		const tokenService = new TokenService();
		this.axios = axios.create({
			baseURL: process.env.REACT_APP_BASE_API_URL,
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${tokenService.getToken() || ""}`
			}
		}) 
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
}