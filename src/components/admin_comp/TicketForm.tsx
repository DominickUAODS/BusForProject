import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetAuthTokensFromLocalStorage } from "../../helpers/GetAuthTokensFromLocalStorage";
import { ITicket } from "../../interfaces/ITicket";
import styles from "./TicketForm.module.css";

// Типизация данных для билета
// interface Ticket {
// 	raceId: string;
// 	passengerId: string;
// 	seatNumber: string;
// }

function TicketForm() {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const navigate = useNavigate();
	const { id } = useParams<{ id?: string }>(); // id может быть строкой или undefined для нового элемента
	const [ticket, setTicket] = useState<ITicket>();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const { accessToken } = GetAuthTokensFromLocalStorage();

	// Fetch ticket data if editing an existing ticket
	useEffect(() => {
		if (id) {
			setLoading(true);
			fetch(`${API_SERVER}/tickets/${id}`)
				.then((response) => {
					if (!response.ok) {
						throw new Error("Failed to fetch ticket data");
					}
					return response.json();
				})
				.then((data) => {
					setTicket(data);
					setLoading(false);
				})
				.catch((error) => {
					setError(error.message);
					setLoading(false);
				});
		}
	}, [API_SERVER, id]);

	// Handle input changes
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setTicket((prevTicket) => ({
			...prevTicket!,
			[name]: value,
		}));
	};

	// Handle form submission
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await fetch(id ? `${API_SERVER}/tickets/${id}/` : `${API_SERVER}/tickets/`, {
				method: id ? "PUT" : "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${accessToken}`,
				},
				body: JSON.stringify(ticket),
			});
			console.log(response);
			if (!response.ok) {
				throw new Error("Failed to save ticket");
			}

			navigate("/tickets");
		} catch (error) {
			setError(error instanceof Error ? error.message : "An unexpected error occurred");
			setLoading(false);
		}
	};

	// Handle ticket deletion
	const handleDelete = async () => {
		if (id) {
			setLoading(true);
			try {
				const response = await fetch(`${API_SERVER}/tickets/${id}/`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${accessToken}`,
					},
				});
				if (!response.ok) {
					throw new Error("Failed to delete city");
				}
				navigate("/tickets");
			} catch (error) {
				setError(error instanceof Error ? error.message : "An unexpected error occurred");
				setLoading(false);
			}
		}
	};

	if (loading) return <div>Loading...</div>;

	return (
		<div className={styles.comp}>
			<div className={styles.cont}>
				<h2>{id ? "Edit Ticket" : "Create Ticket"}</h2>

				{error && <div className={styles.error}>{error}</div>}

				<form onSubmit={handleSubmit}>
					<div className={styles.formGroup}>
						<label>Is User</label>
						<input
							type="text"
							name="is_used"
							value={ticket?.is_used}
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.formGroup}>
						<label>Passenger ID</label>
						<input
							type="text"
							name="passenger_id"
							value={ticket?.passenger_id}
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.formGroup}>
						<label>Race ID</label>
						<input
							type="text"
							name="race_id"
							value={ticket?.race_id}
							onChange={handleChange}
							required
						/>
					</div>

					<button
						type="submit"
						className={styles.submitBtn}
						disabled={loading}
					>
						{id ? "Update Ticket" : "Create Ticket"}
					</button>
				</form>

				{id && (
					<button
						onClick={handleDelete}
						className={styles.deleteBtn}
						disabled={loading}
					>
						Delete Ticket
					</button>
				)}
			</div>
		</div>
	);
}

export default TicketForm;