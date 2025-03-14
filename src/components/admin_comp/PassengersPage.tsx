import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAuthTokensFromLocalStorage } from "../../helpers/GetAuthTokensFromLocalStorage";
import { IPassenger } from "../../interfaces/IPassenger";
import styles from "./PassengersPage.module.css";
import AdminHeader from "./AdminHeader";


const PassengersPage = () => {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const [passengers, setPassengers] = useState<IPassenger[]>([]);
	const [users, setUsers] = useState<{userId: string, userName: string}[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [nextPage, setNextPage] = useState<string | null>(null); // Ссылка на следующую страницу
	const [previousPage, setPreviousPage] = useState<string | null>(null); // Ссылка на предыдущую страницу
	const { accessToken } = GetAuthTokensFromLocalStorage();

	const fetchPassengers = async (url: string) => {
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
			setPassengers(data.results);
			setNextPage(data.next); // Сохраняем ссылку на следующую страницу
			setPreviousPage(data.previous); // Сохраняем ссылку на предыдущую страницу

			const userIds = data.results.map((passenger: IPassenger) => passenger.user);

			await fetchUsers(userIds);

		} catch (error) {
			setError(error instanceof Error ? error.message : "An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	};

	const fetchUsers = async (userIds: string[]) => {
		try {
			const usersData = await Promise.all(userIds.map(async (userId) => {
				const userResponse = await fetch(`${API_SERVER}/users/${userId}/`, {
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${accessToken}`,
					},
				});
	
				if (!userResponse.ok) {
					throw new Error(`Failed to fetch user with ID ${userId}`);
				}
	
				const userData = await userResponse.json();
				return { userId, userName: userData.username }; // Возвращаем ID пользователя и его имя
			}));
	
			// Теперь у вас есть имена пользователей для каждого ID, обновляем состояние
			setUsers(usersData);
		} catch (error) {
			setError(error instanceof Error ? error.message : "An unexpected error occurred while fetching users");
		}
	};

	useEffect(() => {
		fetchPassengers(`${API_SERVER}/passengers/`);
	}, [API_SERVER]);

	const handleNextPage = () => {
		if (nextPage) {
			setLoading(true);
			fetchPassengers(nextPage);
		}
	};

	const handlePreviousPage = () => {
		if (previousPage) {
			setLoading(true);
			fetchPassengers(previousPage);
		}
	};

	if (loading) return <div>Loading passengers...</div>;
	if (error) return <div style={{ color: "red" }}>{error}</div>;

	return (
		<>
			<AdminHeader />
			<div className={styles.comp}>
				<div className={styles.cont}>
					<h2 className={styles.title}>Passengers</h2>
					<Link to="/passengers/new" className={styles.createLink}>Create New Passenger</Link>

					<table className={styles.table}>
						<thead>
							<tr>
								<th>First name</th>
								<th>Last name</th>
								<th>User ID</th>
								<th>User Name</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{passengers.map((passenger) => (
								<tr key={passenger.id}>
									<td>{passenger.first_name}</td>
									<td>{passenger.last_name}</td>
									<td>{passenger.user}</td>
									<td>{users.find((user) => user.userId === passenger.user)?.userName || 'Unknown'}</td>
									<td><Link to={`/passengers/edit/${passenger.id}`} className={styles.editLink}>Edit</Link></td>
								</tr>
							))}
						</tbody>
					</table>

					<div className={styles.pagination}>
						<button
							onClick={handlePreviousPage}
							disabled={!previousPage}
							className={styles.pageBtn}
						>
							Previous
						</button>
						<button
							onClick={handleNextPage}
							disabled={!nextPage}
							className={styles.pageBtn}
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default PassengersPage;