import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthProvider";
import styles from "./Dashboard.module.css";

interface User {
	_id: string;
	name: string;
	email: string;
	role: string;
}

interface City {
	_id: string;
	name: string;
	country: string;
}

interface Race {
	_id: string;
	name: string;
	date: string;
	city: string;
}

interface Passenger {
	_id: string;
	name: string;
	age: number;
	race: string;
}

interface Ticket {
	_id: string;
	raceId: string;
	passengerId: string;
	seatNumber: string;
}

function Dashboard() {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();
	const [users, setUsers] = useState<User[]>([]);
	const [cities, setCities] = useState<City[]>([]);
	const [races, setRaces] = useState<Race[]>([]);
	const [passengers, setPassengers] = useState<Passenger[]>([]);
	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!authContext?.isAuthenticated || authContext.role !== "admin") {
			navigate("/loginAdmin");
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
			const response = await fetch(`/api/${type}/${id}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${authContext.accessToken}` },
			});
			if (response.status === 401) {
				await authContext.refreshAccessToken();
				return handleDelete(type, id);
			}
			if (!response.ok) throw new Error(`Failed to delete ${type}`);
			setUsers(users.filter((user) => user._id !== id));
			setCities(cities.filter((city) => city._id !== id));
			setRaces(races.filter((race) => race._id !== id));
			setPassengers(passengers.filter((passenger) => passenger._id !== id));
			setTickets(tickets.filter((ticket) => ticket._id !== id));
		} catch (err) {
			setError(err instanceof Error ? err.message : "Error deleting the item.");
		}
	};

	if (!authContext?.isAuthenticated || authContext.role !== "admin") return <p>Access Denied</p>;

	return (
		<div className={styles.dashboard}>
			<h2>Dashboard</h2>
			{error && <div style={{ color: "red" }}>{error}</div>}
			{[
				/* eslint-disable */
				{ title: "Users", data: users as Record<string, any>[], path: "users", columns: ["name", "email", "role"] },
				{ title: "Cities", data: cities as Record<string, any>[], path: "cities", columns: ["name", "country"] },
				{ title: "Races", data: races as Record<string, any>[], path: "races", columns: ["name", "date", "city"] },
				{ title: "Passengers", data: passengers as Record<string, any>[], path: "passengers", columns: ["name", "age", "race"] },
				{ title: "Tickets", data: tickets as Record<string, any>[], path: "tickets", columns: ["raceId", "passengerId", "seatNumber"] },
				/* eslint-enable */
			].map(({ title, data, path, columns }) => (
				<div key={path}>
					<h3>{title}</h3>
					<Link to={`/${path}/new`}>Create New {title.slice(0, -1)}</Link>
					<table>
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
								<tr key={item._id}>
									{columns.map((col) => (
										<td key={col}>{item[col as keyof typeof item]}</td>
									))}
									<td>
										<button onClick={() => handleDelete(path, item._id)}>Delete</button>
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
