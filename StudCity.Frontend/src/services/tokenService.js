const TOKEN_KEY = "token";

export class TokenService {
	getToken() {
		const token = localStorage.getItem(TOKEN_KEY);
		if (token)
			return token;
			
		throw new Error("Token is not exist");
	}

	setToken(token) {
		localStorage.setItem(TOKEN_KEY, token);
	}
}