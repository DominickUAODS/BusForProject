import React, { useState, useContext } from "react";
import { AuthContext } from "../../helpers/AuthProvider";
import { useNavigate } from "react-router-dom";
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
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
		<div className={styles.loginComp}>
			<div className={styles.loginCont}>
				<div className={styles.loginForm}>
					<h2>Вход</h2>
					<form onSubmit={handleLogin}>
						<div className={styles.formGroup}>
							<label htmlFor="username">Логин</label>
							<input required
								type="text"
								id="username"
								name="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className={styles.authInput}
								placeholder="Логин"
							/>
						</div>
						<div className={styles.formGroup}>
							<label htmlFor="password">Пароль</label>
							<input required
								type="password"
								id="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className={styles.authInput}
								placeholder="Пароль"
							/>
						</div>
						<button type="submit" className={styles.btn}>
							Войти
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;