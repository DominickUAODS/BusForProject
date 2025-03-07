import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAuthTokensFromLocalStorage } from "../../helpers/GetAuthTokensFromLocalStorage";
import { ITicket } from "../../interfaces/ITicket";
import styles from "./TicketsPage.module.css";

const TicketsPage = () => {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const [tickets, setTickets] = useState<ITicket[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [nextPage, setNextPage] = useState<string | null>(null); // Ссылка на следующую страницу
	const [previousPage, setPreviousPage] = useState<string | null>(null); // Ссылка на предыдущую страницу
	const { accessToken } = GetAuthTokensFromLocalStorage();

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
		} catch (error) {
			setError(error instanceof Error ? error.message : "An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTickets(`${API_SERVER}/tickets`);
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

	if (loading) return <div>Loading tickets...</div>;
	if (error) return <div style={{ color: "red" }}>{error}</div>;

	return (
		<div className={styles.comp}>
			<div className={styles.cont}>
				<div className={styles.title}>Tickets</div>
				<Link to="/tickets/new" className={styles.createLink}>Create New Ticket</Link>

				<table className={styles.table}>
					<thead>
						<tr>
							<th>Is Used</th>
							<th>Passenger ID</th>
							<th>Race ID</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{tickets.map((ticket) => (
							<tr key={ticket.id}>
								<td>{ticket.is_used}</td>
								<td>{ticket.passenger_id}</td>
								<td>{ticket.race_id}</td>
								<td><Link to={`/tickets/edit/${ticket.id}`} className={styles.editLink}>Edit</Link></td>
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
	);
};

export default TicketsPage;