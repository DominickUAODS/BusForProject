import React, { useState, useContext } from "react";
import { AuthContext } from "../../helpers/AuthProvider";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';

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
		<div className="login-comp"> {/* Контейнер для логина */}
			<div className="login-cont"> {/* Контейнер для формы */}
				<div className="login-form">
					<h2>Вход</h2>
					<form onSubmit={handleLogin}>
						<div className="form-group">
							<label htmlFor="username">Логин</label>
							<input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="auth__input"	placeholder="Логин" />
						</div>
						<div className="form-group">
							<label htmlFor="password">Пароль</label>
							<input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="auth__input" placeholder="Пароль" />
						</div>
						<button type="submit" className="lk-login__form-action">Войти</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
