import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthProvider";
import styles from "./Dashboard.module.css";
import { IUser } from "../../interfaces/IUser";
import { ICity } from "../../interfaces/ICity";
import { IRace } from "../../interfaces/IRace";
import { IPassenger } from "../../interfaces/IPassenger";
import { ITicket } from "../../interfaces/ITicket";
import AdminHeader from "./AdminHeader";
import CustomLoading from "../CustomLoading";

interface PageLinks {
	next: string | null;
	previous: string | null;
}

function Dashboard() {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();
	const [users, setUsers] = useState<IUser[]>([]);
	const [cities, setCities] = useState<ICity[]>([]);
	const [races, setRaces] = useState<IRace[]>([]);
	const [passengers, setPassengers] = useState<IPassenger[]>([]);
	const [tickets, setTickets] = useState<ITicket[]>([]);
	const [error, setError] = useState<string | null>(null);

	const [loading, setLoading] = useState<boolean>(true);

	const [, setPageLinks] = useState<{ [key: string]: PageLinks }>({
		users: { next: null, previous: null },
		cities: { next: null, previous: null },
		races: { next: null, previous: null },
		passengers: { next: null, previous: null },
		tickets: { next: null, previous: null },
	});

	useEffect(() => {
		if (!authContext?.isAuthenticated || authContext.role !== "admin") {
			authContext?.logout();
			navigate("/admin/login");
		}
	}, [authContext, navigate]);

	const fetchData = async <T,>(
		endpoint: string,
		setState: React.Dispatch<React.SetStateAction<T[]>>,
		type: string
	) => {
		if (!authContext?.accessToken) return;
		try {
			const response = await fetch(`${API_SERVER}/${endpoint}`, {
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${authContext.accessToken}`,
				},
			});

			if (response.status === 401) {
				await authContext.refreshAccessToken();
				if (authContext?.isAuthenticated) {
					await fetchData(endpoint, setState, type);
				}

			}

			if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
			const data = await response.json();

			setState(Array.isArray(data.results) ? data.results : []);

			setPageLinks((prev) => ({
				...prev,
				[type]: { next: data.next, previous: data.previous },
			}));

			setLoading(false);

		} catch (err) {
			setError(err instanceof Error ? err.message : `Error loading ${endpoint}.`);
		}
	};

	useEffect(() => {
		if (authContext?.accessToken) {
			fetchData("users", setUsers, "users");
			fetchData("cities", setCities, "cities");
			fetchData("races", setRaces, "races");
			fetchData("passengers", setPassengers, "passengers");
			fetchData("tickets", setTickets, "tickets");
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authContext]);

	const handleDelete = async (type: string, id: string) => {
		if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
		if (!authContext?.accessToken) return;
		try {
			const response = await fetch(`${API_SERVER}/${type}/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${authContext.accessToken}`,
				},
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

	// const handleNextPage = (type: string) => {
	// 	const nextPage = pageLinks[type].next;
	// 	if (nextPage) {
	// 		setLoading(true);
	// 		fetchData(nextPage, getSetterByType(type), type); // Fetch the next page for the specific type
	// 	}
	// };

	// const handlePreviousPage = (type: string) => {
	// 	const previousPage = pageLinks[type].previous;
	// 	if (previousPage) {
	// 		setLoading(true);
	// 		fetchData(previousPage, getSetterByType(type), type); // Fetch the previous page for the specific type
	// 	}
	// };

	// const getSetterByType = (type: string) => {
	// 	switch (type) {
	// 		case "users":
	// 			return setUsers;
	// 		case "cities":
	// 			return setCities;
	// 		case "races":
	// 			return setRaces;
	// 		case "passengers":
	// 			return setPassengers;
	// 		case "tickets":
	// 			return setTickets;
	// 		default:
	// 			return setUsers;
	// 	}
	// };

	if (!authContext?.isAuthenticated || authContext.role !== "admin") return <p>Access Denied</p>;

	return (
		<>
			<AdminHeader />
			<div className={styles.dashboard}>
				{loading ? (<CustomLoading />) : (
					<h2>Dashboard</h2>)}
				{error && <div className={styles.error}>{error}</div>}
				{[{ title: "Users", data: users, path: "users", columns: ["username", "email", "First name", "last_name", "is_staff", "is_superuser", "is_active", "Last login", "date_joined"] },
				{ title: "Cities", data: cities, path: "cities", columns: ["name_en", "name_ua"] },
				{ title: "Races", data: races, path: "racess", columns: ["time_start", "time_end", "cost", "places", "city_from", "city_to"] },
				{ title: "Passengers", data: passengers, path: "passengers", columns: ["first_name", "last_name", "user"] },
				{ title: "Tickets", data: tickets, path: "tickets", columns: ["is_used", "passenger", "race"] },
				].map(({ title, data, path, columns }) => (
					<div key={path} className={styles.tableContainer}>
						<h3><Link to={`/${path}`} className={styles.sectionLink}>{title}</Link></h3>
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
								{data && Array.isArray(data) && data.length > 0 ? (
									data.map((item) => (
										<tr key={item.id}>
											{columns.map((col) => (
												<td key={col}>{item[col as keyof typeof item]}</td>
											))}
											<td className={styles.actions}>
												<button className={styles.deleteBtn} onClick={() => handleDelete(path, item.id)}>Delete</button>
												<button className={styles.deleteBtn} onClick={() => navigate(`/${path}/edit/${item.id}`)}>Edit</button>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan={columns.length + 1}>No data available</td>
									</tr>
								)}
							</tbody>
						</table>
						{/* <div className={styles.pagination}>
							<button onClick={() => handlePreviousPage(path)} disabled={!pageLinks[path]?.previous} className={styles.pageBtn}>Previous</button>
							<button onClick={() => handleNextPage(path)} disabled={!pageLinks[path]?.next} className={styles.pageBtn}>Next</button>
						</div> */}
					</div>
				))}
			</div>
		</>
	);
}

export default Dashboard;