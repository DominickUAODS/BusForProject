import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import { IUser } from "../../interfaces/IUser";
import { GetAuthTokensFromLocalStorage } from "../../helpers/GetAuthTokensFromLocalStorage";
import styles from "./UsersPage.module.css";

const UsersPage = () => {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const [users, setUsers] = useState<IUser[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [nextPage, setNextPage] = useState<string | null>(null); // Ссылка на следующую страницу
	const [previousPage, setPreviousPage] = useState<string | null>(null); // Ссылка на предыдущую страницу
	const { accessToken } = GetAuthTokensFromLocalStorage();

	const fetchUsers = async (url: string) => {
		try {
			const response = await fetch(url, {
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${accessToken}`,
				},
			});

			// Проверяем статус ответа
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			// Проверяем, что ответ - JSON
			const contentType = response.headers.get("content-type");
			if (!contentType || !contentType.includes("application/json")) {
				throw new Error("Received non-JSON response");
			}

			const data = await response.json();
			console.log(data);
			setUsers(data.results);
			setNextPage(data.next); // Сохраняем ссылку на следующую страницу
			setPreviousPage(data.previous); // Сохраняем ссылку на предыдущую страницу
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("An unknown error occurred.");
			}
		} finally {
			setLoading(false);
		}
	};

	// Загружаем города при первом рендере
	useEffect(() => {
		fetchUsers(`${API_SERVER}/users`);
	}, [API_SERVER]);

	const handleNextPage = () => {
		if (nextPage) {
			setLoading(true);
			fetchUsers(nextPage);
		}
	};

	const handlePreviousPage = () => {
		if (previousPage) {
			setLoading(true);
			fetchUsers(previousPage);
		}
	};

	if (loading) return <div>Loading users...</div>;
	if (error) return <div style={{ color: "red" }}>{error}</div>;

	return (
		<div className={styles.comp}>
			<div className={styles.cont}>
				<h2 className={styles.title}>Users</h2>
				<Link to="/users/new" className={styles.createLink}>Create New User</Link>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>User name</th>
							<th>Email</th>
							<th>First name</th>
							<th>Last name</th>
							<th>Is staff?</th>
							<th>Is superuser?</th>
							<th>Is active?</th>
							<th>Last login</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.id}>
								<td>{user.username}</td>
								<td>{user.email || 'N/A'}</td>
								<td>{user.first_name || 'N/A'}</td>
								<td>{user.last_name || 'N/A'}</td>
								<td>{user.is_staff ? 'Yes' : 'No'}</td>
								<td>{user.is_superuser ? 'Yes' : 'No'}</td>
								<td>{user.is_active ? 'Yes' : 'No'}</td>
								<td>{format(new Date(user.last_login), 'dd.MM.yyyy HH:mm') || 'Never logged in'}</td>
								<td><Link to={`/users/edit/${user.id}`} className={styles.editLink}>Edit</Link></td>
							</tr>
						))}
					</tbody>
				</table>

				<div className={styles.pagination}>
					<button onClick={handlePreviousPage} disabled={!previousPage} className={styles.pageBtn}>Previous</button>
					<button onClick={handleNextPage} disabled={!nextPage} className={styles.pageBtn}>Next</button>
				</div>
			</div>
		</div>
	);
};

export default UsersPage;