import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { styles } from ".Dashboard.module.css";

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

	// Fetching data for the dashboard
	useEffect(() => {
		// Fetch Users
		axios.get("/api/users").then((response) => setUsers(response.data));

		// Fetch Cities
		axios.get("/api/cities").then((response) => setCities(response.data));

		// Fetch Races
		axios.get("/api/races").then((response) => setRaces(response.data));

		// Fetch Passengers
		axios.get("/api/passengers").then((response) => setPassengers(response.data));

		// Fetch Tickets
		axios.get("/api/tickets").then((response) => setTickets(response.data));
	}, []);

	const handleDelete = async (type: string, id: string) => {
		try {
			if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
				// Send delete request
				await axios.delete(`/api/${type}/${id}`);

				// Remove the deleted item from the corresponding state
				if (type === "users") {
					setUsers(users.filter((user) => user._id !== id));
				} else if (type === "cities") {
					setCities(cities.filter((city) => city._id !== id));
				} else if (type === "races") {
					setRaces(races.filter((race) => race._id !== id));
				} else if (type === "passengers") {
					setPassengers(passengers.filter((passenger) => passenger._id !== id));
				} else if (type === "tickets") {
					setTickets(tickets.filter((ticket) => ticket._id !== id));
				}
			}
		} catch (error: AxiosError) {
			setError("Error deleting the item. Please try again.");
		}
	};

	return (
		<div>
			<h2>Dashboard</h2>

			{error && <div style={{ color: "red" }}>{error}</div>}

			<div>
				<h3>Users</h3>
				<Link to="/users/new">Create New User</Link>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.role}</td>
								<td>
									<Link to={`/users/edit/${user._id}`}>Edit</Link>
									<button onClick={() => handleDelete("users", user._id)}>Delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div>
				<h3>Cities</h3>
				<Link to="/cities/new">Create New City</Link>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Country</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{cities.map((city) => (
							<tr key={city._id}>
								<td>{city.name}</td>
								<td>{city.country}</td>
								<td>
									<Link to={`/cities/edit/${city._id}`}>Edit</Link>
									<button onClick={() => handleDelete("cities", city._id)}>Delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div>
				<h3>Races</h3>
				<Link to="/races/new">Create New Race</Link>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Date</th>
							<th>City</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{races.map((race) => (
							<tr key={race._id}>
								<td>{race.name}</td>
								<td>{race.date}</td>
								<td>{race.city}</td>
								<td>
									<Link to={`/races/edit/${race._id}`}>Edit</Link>
									<button onClick={() => handleDelete("races", race._id)}>Delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div>
				<h3>Passengers</h3>
				<Link to="/passengers/new">Create New Passenger</Link>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Age</th>
							<th>Race</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{passengers.map((passenger) => (
							<tr key={passenger._id}>
								<td>{passenger.name}</td>
								<td>{passenger.age}</td>
								<td>{passenger.race}</td>
								<td>
									<Link to={`/passengers/edit/${passenger._id}`}>Edit</Link>
									<button onClick={() => handleDelete("passengers", passenger._id)}>Delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div>
				<h3>Tickets</h3>
				<Link to="/tickets/new">Create New Ticket</Link>
				<table>
					<thead>
						<tr>
							<th>Race ID</th>
							<th>Passenger ID</th>
							<th>Seat Number</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{tickets.map((ticket) => (
							<tr key={ticket._id}>
								<td>{ticket.raceId}</td>
								<td>{ticket.passengerId}</td>
								<td>{ticket.seatNumber}</td>
								<td>
									<Link to={`/tickets/edit/${ticket._id}`}>Edit</Link>
									<button onClick={() => handleDelete("tickets", ticket._id)}>Delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Dashboard;
