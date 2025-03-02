import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ITicket } from "../../interfaces/ITicket";

// interface Ticket {
// 	_id: string;
// 	raceId: string;
// 	passengerId: string;
// 	seatNumber: string;
// }

const TicketsPage = () => {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const [tickets, setTickets] = useState<ITicket[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [nextPage, setNextPage] = useState<string | null>(null); // Ссылка на следующую страницу
	const [previousPage, setPreviousPage] = useState<string | null>(null); // Ссылка на предыдущую страницу

	const fetchTickets = async (url: string) => {
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
		<div>
			<h2>Tickets</h2>
			<Link to="/tickets/new">Create New Ticket</Link>
			<table>
				<thead>
					<tr>
						<th>Is used</th>
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
							<td><Link to={`/tickets/edit/${ticket.id}`}>Edit</Link></td>
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

export default TicketsPage;
