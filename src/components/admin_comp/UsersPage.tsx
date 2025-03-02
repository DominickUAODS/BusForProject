import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../interfaces/IUser";

// interface User {
// 	_id: string;
// 	name: string;
// 	email: string;
// 	role: string;
// }

const UsersPage = () => {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const [users, setUsers] = useState<IUser[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [nextPage, setNextPage] = useState<string | null>(null); // Ссылка на следующую страницу
	const [previousPage, setPreviousPage] = useState<string | null>(null); // Ссылка на предыдущую страницу

	const fetchUsers = async (url: string) => {
		try {
			const response = await fetch(url);

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
		fetchUsers(`${API_SERVER}/auth-user`);
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
		<div>
			<h2>Users</h2>
			<Link to="/users/new">Create New User</Link>
			<table>
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
							<td>{user.email}</td>
							<td>{user.first_name}</td>
							<td>{user.last_name}</td>
							<td>{user.is_staff}</td>
							<td>{user.is_superuser}</td>
							<td>{user.is_active}</td>
							<td>{user.last_login}</td>
							<td><Link to={`/users/edit/${user.id}`}>Edit</Link></td>
						</tr>
					))}
				</tbody>
			</table>
			<div>
				<button onClick={handlePreviousPage} disabled={!previousPage}>Previous</button>
				<button onClick={handleNextPage} disabled={!nextPage}>Next</button>
			</div>
		</div>
	);
};

export default UsersPage;