import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

// Типы данных
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
	const [users, setUsers] = useState<User[]>([]);
	const [cities, setCities] = useState<City[]>([]);
	const [races, setRaces] = useState<Race[]>([]);
	const [passengers, setPassengers] = useState<Passenger[]>([]);
	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async <T,>(endpoint: string, setState: React.Dispatch<React.SetStateAction<T[]>>) => {
		try {
			const response = await fetch(`/api/${endpoint}`);
			if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
			const data = await response.json();
			setState(data);
		} catch (err) {
			setError(err instanceof Error ? err.message : `Error loading ${endpoint}. Please try again.`);
		}
	};

	useEffect(() => { fetchData("users", setUsers); }, []);
	useEffect(() => { fetchData("cities", setCities); }, []);
	useEffect(() => { fetchData("races", setRaces); }, []);
	useEffect(() => { fetchData("passengers", setPassengers); }, []);
	useEffect(() => { fetchData("tickets", setTickets); }, []);

	const handleDelete = async (type: string, id: string) => {
		if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;

		try {
			const response = await fetch(`/api/${type}/${id}`, { method: "DELETE" });
			if (!response.ok) throw new Error(`Failed to delete ${type}`);

			switch (type) {
				case "users": setUsers(users.filter((user) => user._id !== id)); break;
				case "cities": setCities(cities.filter((city) => city._id !== id)); break;
				case "races": setRaces(races.filter((race) => race._id !== id)); break;
				case "passengers": setPassengers(passengers.filter((passenger) => passenger._id !== id)); break;
				case "tickets": setTickets(tickets.filter((ticket) => ticket._id !== id)); break;
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Error deleting the item. Please try again.");
		}
	};

	return (
		<div style={styles}>
			<h2>Dashboard</h2>
			{error && <div style={{ color: "red" }}>{error}</div>}

			{[{ title: "Users", data: users, path: "users", columns: ["name", "email", "role"] },
			{ title: "Cities", data: cities, path: "cities", columns: ["name", "country"] },
			{ title: "Races", data: races, path: "races", columns: ["name", "date", "city"] },
			{ title: "Passengers", data: passengers, path: "passengers", columns: ["name", "age", "race"] },
			{ title: "Tickets", data: tickets, path: "tickets", columns: ["raceId", "passengerId", "seatNumber"] }]
				.map(({ title, data, path, columns }) => (
					<div key={path}>
						<h3>{title}</h3>
						<Link to={`/${path}/new`}>Create New {title.slice(0, -1)}</Link>
						<table>
							<thead>
								<tr>
									{columns.map((col) => <th key={col}>{col}</th>)}
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{data.map((item) => {
									const typedItem = item as User | City | Race | Passenger | Ticket;
									return (
										<tr key={typedItem._id}>
											{columns.map((col) => <td key={col}>{typedItem[col as keyof typeof typedItem]}</td>)}
											<td>
												<Link to={`/${path}/edit/${typedItem._id}`}>Edit</Link>
												<button onClick={() => handleDelete(path, typedItem._id)}>Delete</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				))}
		</div>
	);
}

export default Dashboard;
