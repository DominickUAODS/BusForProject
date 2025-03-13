import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthProvider";
import styles from "./Dashboard.module.css";
import { IUser } from "../../interfaces/IUser";
import { ICity } from "../../interfaces/ICity";
import { IRace } from "../../interfaces/IRace";
import { IPassenger } from "../../interfaces/IPassenger";
import { ITicket } from "../../interfaces/ITicket";

function Dashboard() {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();
	const [users, setUsers] = useState<IUser[]>([]);
	const [cities, setCities] = useState<ICity[]>([]);
	const [races, setRaces] = useState<IRace[]>([]);
	const [passengers, setPassengers] = useState<IPassenger[]>([]);
	const [tickets, setTickets] = useState<ITicket[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!authContext?.isAuthenticated || authContext.role !== "admin") {
			navigate("/admin/login");
		}
	}, [authContext, navigate]);

	useEffect(() => {
		const fetchData = async <T,>(endpoint: string, setState: React.Dispatch<React.SetStateAction<T[]>>) => {
			if (!authContext?.accessToken) return;
			try {
				const response = await fetch(`${endpoint}`, {
					headers: { Authorization: `Bearer ${authContext.accessToken}` },
				});
				if (response.status === 401) {
					await authContext.refreshAccessToken();
					return fetchData(endpoint, setState);
				}
				if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
				const data = await response.json();
				setState(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : `Error loading ${endpoint}.`);
			}
		};

		if (authContext?.accessToken) {
			fetchData("users", setUsers);
			fetchData("cities", setCities);
			fetchData("races", setRaces);
			fetchData("passengers", setPassengers);
			fetchData("tickets", setTickets);
		}
	}, [authContext]);

	const handleDelete = async (type: string, id: string) => {
		if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
		if (!authContext?.accessToken) return;
		try {
			const response = await fetch(`/${type}/${id}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${authContext.accessToken}` },
			});
			if (response.status === 401) {
				await authContext.refreshAccessToken();
				return handleDelete(type, id);
			}
			if (!response.ok) throw new Error(`Failed to delete ${type}`);
			setUsers(users.filter((user) => user.id !== id));
			setCities(cities.filter((city) => city.id !== id));
			setRaces(races.filter((race) => race.id !== id));
			setPassengers(passengers.filter((passenger) => passenger.id !== id));
			setTickets(tickets.filter((ticket) => ticket.id !== id));
		} catch (err) {
			setError(err instanceof Error ? err.message : "Error deleting the item.");
		}
	};

	if (!authContext?.isAuthenticated || authContext.role !== "admin") return <p>Access Denied</p>;

	return (
		<div className={styles.dashboard}>
			<h2>Dashboard</h2>
			{error && <div className={styles.error}>{error}</div>}
			{[{ title: "Users", data: users, path: "users", columns: ["username", "email", "first_name", "last_name", "email", "is_staff", "is_superuser", "is_active", "last_login", "date_joined"] },
			{ title: "Cities", data: cities, path: "cities", columns: ["name_en", "name_ua"] },
			{ title: "Races", data: races, path: "racess", columns: ["time_start", "time_end", "cost", "places", "city_from", "city_to"] },
			{ title: "Passengers", data: passengers, path: "passengers", columns: ["first_name", "last_name", "user_id"] },
			{ title: "Tickets", data: tickets, path: "tickets", columns: ["is_used", "passenger_id", "race_id"] },
			].map(({ title, data, path, columns }) => (
				<div key={path} className={styles.tableContainer}>
					<h3>
						<Link to={`/${path}`} className={styles.sectionLink}>{title}</Link>
					</h3>
					<Link to={`/${path}/new`} className={styles.createLink}>Create New {title.slice(0, -1)}</Link>
					<table className={styles.table}>
						<thead>
							<tr>
								{columns.map((col) => (
									<th key={col}>{col}</th>
								))}
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{data.map((item) => (
								<tr key={item.id}>
									{columns.map((col) => (
										<td key={col}>{item[col as keyof typeof item]}</td>
									))}
									<td>
										<button className={styles.deleteBtn} onClick={() => handleDelete(path, item.id)}>Delete</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			))}
		</div>
	);
}

export default Dashboard;