import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Ticket {
	_id: string;
	raceId: string;
	passengerId: string;
	seatNumber: string;
}

const TicketsPage = () => {
	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch("/api/tickets")
			.then((response) => {
				if (!response.ok) {
					// If the response status is not OK (200-299), throw an error
					throw new Error("Failed to load tickets.");
				}
				return response.json();  // Parse the JSON data from the response
			})
			.then((data) => {
				setTickets(data);  // Set the tickets data
				setLoading(false);  // Turn off loading
			})
			.catch((error) => {
				setError(error instanceof Error ? error.message : "An unexpected error occurred");
				setLoading(false);  // Turn off loading even if there's an error
			});
	}, []); // Empty dependency array to run the effect only once on component mount

	if (loading) return <div>Loading tickets...</div>;
	if (error) return <div style={{ color: "red" }}>{error}</div>;

	return (
		<div>
			<h2>Tickets</h2>
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
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TicketsPage;
