import { TokenService } from "../services/tokenService"

const tokenService = new TokenService();

export const tokenProtection = () => tokenService.getToken() === null;