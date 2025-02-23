import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Импортируем хук для использования контекста аутентификации

const LoginPage = () => {
	const { login } = useAuth(); // Получаем функцию login из контекста
	const navigate = useNavigate(); // Для перенаправления пользователя после успешного входа
	const [role, setRole] = useState<'admin' | 'user'>('user'); // Состояние для выбора роли (по умолчанию 'user')
	const [username, setUsername] = useState(''); // Имя пользователя
	const [password, setPassword] = useState(''); // Пароль
	const [error, setError] = useState<string>(''); // Для ошибок при входе

	// Функция для обработки отправки формы
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Проверка данных (можно добавить вашу логику валидации или подключение к API)
		if (username && password) {
			// Пример успешной аутентификации
			login(role);
			navigate('/'); // Перенаправляем на главную страницу после успешного входа
		} else {
			setError('Пожалуйста, заполните все поля');
		}
	};

	return (
		<div className="login-container">
			<h2>Вход в систему</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="username">Имя пользователя</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						placeholder="Введите имя пользователя"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="password">Пароль</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder="Введите пароль"
					/>
				</div>

				<div className="form-group">
					<label>
						<input
							type="radio"
							name="role"
							value="user"
							checked={role === 'user'}
							onChange={() => setRole('user')}
						/>
						Пользователь
					</label>
					<label>
						<input
							type="radio"
							name="role"
							value="admin"
							checked={role === 'admin'}
							onChange={() => setRole('admin')}
						/>
						Администратор
					</label>
				</div>

				{error && <div className="error-message">{error}</div>}

				<button type="submit">Войти</button>
			</form>
		</div>
	);
};

export default LoginPage;
