import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAuthTokensFromLocalStorage } from "../../helpers/GetAuthTokensFromLocalStorage";
import { ITicket } from "../../interfaces/ITicket";
import styles from "./TicketsPage.module.css";
import AdminHeader from "./AdminHeader";
import { IRace } from "../../interfaces/IRace";
import { IPassenger } from "../../interfaces/IPassenger";
import CustomLoading from "../CustomLoading";

const TicketsPage = () => {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const [tickets, setTickets] = useState<ITicket[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [nextPage, setNextPage] = useState<string | null>(null); // Ссылка на следующую страницу
	const [previousPage, setPreviousPage] = useState<string | null>(null); // Ссылка на предыдущую страницу
	//const [passengers, setPassengers] = useState<{ [key: number]: IPassenger }>({});
	//const [races, setRaces] = useState<{ [key: number]: IRace }>({});
	const { accessToken } = GetAuthTokensFromLocalStorage();

	const [passengers, setPassengers] = useState<Record<string, IPassenger>>({});
	const [races, setRaces] = useState<Record<string, IRace>>({});

	const fetchTickets = async (url: string) => {
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
			setTickets(data.results);
			setNextPage(data.next); // Сохраняем ссылку на следующую страницу
			setPreviousPage(data.previous); // Сохраняем ссылку на предыдущую страницу

			await fetchPassengerData(data.results);
			await fetchRaceData(data.results);

		} catch (error) {
			setError(error instanceof Error ? error.message : "An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	};

	// Fetch passenger data by ID
	const fetchPassengerData = async (tickets: ITicket[]) => {
		const passengerIds = Array.from(new Set(tickets.map((ticket) => ticket.passenger)));
		for (const passengerId of passengerIds) {
			if (passengerId) {
				const response = await fetch(`${API_SERVER}/passengers/${passengerId}`, {
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${accessToken}`,
					},
				});

				if (response.ok) {
					const passengerData = await response.json();
					setPassengers((prev) => ({ ...prev, [passengerData.id]: passengerData }));
				}
			}
		}
	};

	// Fetch race data by ID
	const fetchRaceData = async (tickets: ITicket[]) => {
		const raceIds = Array.from(new Set(tickets.map((ticket) => ticket.race)));
		for (const raceId of raceIds) {
			if (raceId) {
				const response = await fetch(`${API_SERVER}/races/${raceId}`, {
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${accessToken}`,
					},
				});

				if (response.ok) {
					const raceData = await response.json();
					setRaces((prev) => ({ ...prev, [raceData.id]: raceData }));
				}
			}
		}
	};

	useEffect(() => {
		fetchTickets(`${API_SERVER}/tickets`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [API_SERVER]);

	const handleNextPage = () => {
		if (nextPage) {
			setLoading(true);
			fetchTickets(nextPage);
		}
	};

	const handlePreviousPage = () => {
		if (previousPage) {
			setLoading(true);
			fetchTickets(previousPage);
		}
	};

	//if (loading) return <div>Loading tickets...</div>;
	if (error) return <div style={{ color: "red" }}>{error}</div>;

	return (
		<>
			<AdminHeader />
			<div className={styles.comp}>
				{loading ? (<CustomLoading />) : (
					<div className={styles.cont}>
						<div className={styles.title}>Tickets</div>
						<Link to="/tickets/new" className={styles.createLink}>Create New Ticket</Link>

						<table className={styles.table}>
							<thead>
								<tr>
									<th>Is Used</th>
									<th>Passenger</th>
									<th>Race</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{tickets.map((ticket) => (
									<tr key={ticket.id}>
										<td>{ticket.is_used ? 'Yes' : 'No'}</td>
										<td>{passengers[ticket.passenger]?.first_name} {passengers[ticket.passenger]?.last_name}</td>
										<td>{races[ticket.race]?.time_start}</td>
										<td><Link to={`/tickets/edit/${ticket.id}`} className={styles.editLink}>Edit</Link></td>
									</tr>
								))}
							</tbody>
						</table>

						<div className={styles.pagination}>
							<button onClick={handlePreviousPage} disabled={!previousPage} className={styles.pageBtn}>Previous</button>
							<button onClick={handleNextPage} disabled={!nextPage} className={styles.pageBtn}>Next</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default TicketsPage;