import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";

// Типизация данных для билета
interface Ticket {
	raceId: string;
	passengerId: string;
	seatNumber: string;
}

function TicketForm() {
	const navigate = useNavigate();
	const { id } = useParams<{ id?: string }>();  // id может быть строкой или undefined для нового элемента
	const [ticket, setTicket] = useState<Ticket>({
		raceId: "",
		passengerId: "",
		seatNumber: "",
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// Fetch ticket data if editing an existing ticket
	useEffect(() => {
		if (id) {
			setLoading(true);
			axios
				.get(`/api/tickets/${id}`)
				.then((response) => {
					setTicket(response.data);
					setLoading(false);
				})
				.catch((error: AxiosError) => {
					setError(error.response ? error.response.data.message : error.message);
					setLoading(false);
				});
		}
	}, [id]);

	// Handle input changes
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setTicket((prevTicket) => ({
			...prevTicket,
			[name]: value,
		}));
	};

	// Handle form submission
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (id) {
				// Update ticket if id exists
				await axios.put(`/api/tickets/${id}`, ticket);
			} else {
				// Create new ticket
				await axios.post("/api/tickets", ticket);
			}
			navigate("/tickets");  // Redirect after submit
		} catch (error: AxiosError) {
			setError(error.response ? error.response.data.message : error.message);
			setLoading(false);
		}
	};

	// Handle ticket deletion
	const handleDelete = async () => {
		if (id) {
			setLoading(true);
			try {
				await axios.delete(`/api/tickets/${id}`);
				navigate("/tickets");  // Redirect after deletion
			} catch (error: AxiosError) {
				setError(error.response ? error.response.data.message : error.message);
				setLoading(false);
			}
		}
	};

	if (loading) return <div>Loading...</div>;

	return (
		<div>
			<h2>{id ? "Edit Ticket" : "Create Ticket"}</h2>
			{error && <div style={{ color: "red" }}>{error}</div>}
			<form onSubmit={handleSubmit}>
				<div>
					<label>Race ID</label>
					<input
						type="text"
						name="raceId"
						value={ticket.raceId}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Passenger ID</label>
					<input
						type="text"
						name="passengerId"
						value={ticket.passengerId}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Seat Number</label>
					<input
						type="text"
						name="seatNumber"
						value={ticket.seatNumber}
						onChange={handleChange}
						required
					/>
				</div>
				<button type="submit" disabled={loading}>
					{id ? "Update Ticket" : "Create Ticket"}
				</button>
			</form>
			{id && (
				<button
					onClick={handleDelete}
					style={{ marginTop: "10px", backgroundColor: "red", color: "white" }}
					disabled={loading}
				>
					Delete Ticket
				</button>
			)}
		</div>
	);
}

export default TicketForm;
