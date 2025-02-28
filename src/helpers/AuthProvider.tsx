import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";

const API_SERVER = import.meta.env.VITE_API_SERVER;

// Интерфейс контекста
interface AuthContextType {
	isAuthenticated: boolean;
	role: "admin" | "user" | null;
	accessToken: string | null;
	refreshToken: string | null;
	login: (accessToken: string, refreshToken: string, isStaff: boolean) => void;
	logout: () => void;
	refreshAccessToken: () => Promise<void>;
}

// Создаём контекст
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Провайдер аутентификации
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("accessToken"));
	const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem("refreshToken"));
	const [role, setRole] = useState<"admin" | "user" | null>(localStorage.getItem("role") as "admin" | "user" | null);
	const isAuthenticated = !!accessToken;

	// Функция входа
	const login = (accessToken: string, refreshToken: string, isStaff: boolean) => {
		const role = isStaff ? "admin" : "user";
		setAccessToken(accessToken);
		setRefreshToken(refreshToken);
		setRole(role);

		localStorage.setItem("accessToken", accessToken);
		localStorage.setItem("refreshToken", refreshToken);
		localStorage.setItem("role", role);
	};

	// Функция выхода
	const logout = () => {
		setAccessToken(null);
		setRefreshToken(null);
		setRole(null);

		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("role");
	};

	// Функция обновления токена
	const refreshAccessToken = async () => {
		if (!refreshToken) {
			logout();
			return;
		}

		try {
			const response = await fetch(`${API_SERVER}/token-refresh/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ refresh: refreshToken }),
			});

			if (response.ok) {
				const data = await response.json();
				setAccessToken(data.access);
				localStorage.setItem("accessToken", data.access);
			} else {
				logout();
			}
		} catch (error) {
			console.error("Ошибка обновления токена:", error);
			logout();
		}
	};

	// Проверка истечения токена (например, раз в 29 минут)
	useEffect(() => {
		const interval = setInterval(refreshAccessToken, 29 * 60 * 1000);
		return () => clearInterval(interval);
	}, [refreshToken]);

	return (
		<AuthContext.Provider value={{ isAuthenticated, role, accessToken, refreshToken, login, logout, refreshAccessToken }}>
			{children}
		</AuthContext.Provider>
	);
};


export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth должен быть использован внутри AuthProvider");
	}
	return context;
}
