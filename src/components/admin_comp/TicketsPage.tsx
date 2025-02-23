import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
		axios
			.get("/api/tickets")
			.then((response) => {
				setTickets(response.data);
				setLoading(false);
			})
			.catch((error) => {
				setError("Failed to load tickets.");
				setLoading(false);
			});
	}, []);

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
