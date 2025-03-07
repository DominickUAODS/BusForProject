import { jwtDecode } from "jwt-decode";
import { useAuth } from "./AuthProvider";

export const useRefreshAuth = () => {
	const { accessToken, refreshAccessToken } = useAuth();

	const refreshAuth = async () => {
		if (!accessToken) {
			throw new Error("No access token found");
		}

		let decoded;
		
		try {
			decoded = jwtDecode(accessToken);
		} catch (error) {
			console.error("Ошибка декодирования токена", error);
			throw new Error("Ошибка декодирования токена");
		}

		if (!decoded.exp) {
			throw new Error("No expiration date found in access token");
		}

		if (decoded.exp < Date.now() / 1000) {
			await refreshAccessToken();
		}
	};

	return refreshAuth;
};
