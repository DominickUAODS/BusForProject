import React, { useState, useContext } from "react";
import { AuthContext } from "../../helpers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const auth = useContext(AuthContext);
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// Проверяем, что контекст доступен
	if (!auth) {
		throw new Error("Login must be used within an AuthProvider");
	}

	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();
		const response = await fetch(`${API_SERVER}/token-access/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password }),
		});

		if (response.ok) {
			const data = await response.json();
			auth.login(data.access, data.refresh, data.is_staff);
			navigate("/admin/dashboard");
		} else {
			alert("Ошибка входа");
		}
	};

	return (
		<form onSubmit={handleLogin}>
			<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Логин" />
			<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
			<button type="submit">Войти</button>
		</form>
	);
};

export default Login;
