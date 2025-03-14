import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetAuthTokensFromLocalStorage } from "../../helpers/GetAuthTokensFromLocalStorage";
import { ITicket } from "../../interfaces/ITicket";
import Select from 'react-select';
import styles from "./TicketForm.module.css";
import AdminHeader from "./AdminHeader";
import { IPassenger } from "../../interfaces/IPassenger";
import { IRace } from "../../interfaces/IRace";

// Типизация данных для билета
// interface Ticket {
// 	raceId: string;
// 	passengerId: string;
// 	seatNumber: string;
// }

interface Option {
	value: string | number;  // Пример: может быть строкой или числом
	label: string;           // Обычно также присутствует label
}

function TicketForm() {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const navigate = useNavigate();
	const { id } = useParams<{ id?: string }>(); // id может быть строкой или undefined для нового элемента
	const [ticket, setTicket] = useState<ITicket>();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [passengers, setPassengers] = useState<IPassenger[]>([]);
	const [races, setRaces] = useState<IRace[]>([]);
	const { accessToken } = GetAuthTokensFromLocalStorage();

	// Fetch ticket data if editing an existing ticket
	useEffect(() => {
		if (id) {
			setLoading(true);
			fetch(`${API_SERVER}/tickets/${id}`,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${accessToken}`,
					},
				})
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
	}, [API_SERVER, accessToken, id]);

	// Fetch all passengers
	useEffect(() => {
		const fetchAllPassengers = async () => {
			setLoading(true);
			let allPassengers: IPassenger[] = [];
			let page = 1;

			try {
				while (true) {
					// Fetch passengers from the current page
					const response = await fetch(`${API_SERVER}/passengers?page=${page}`, {
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${accessToken}`,
						},
					});

					if (!response.ok) {
						throw new Error("Failed to fetch passengers");
					}

					const data = await response.json();

					// Add passengers from the current page to the list
					allPassengers = [...allPassengers, ...data.results];

					// If there are no more passengers, exit the loop
					if (data.results.length < 10) {
						break;
					}

					// Move to the next page
					page++;
				}

				setPassengers(allPassengers); // Update the state with all fetched passengers
			} catch (error) {
				setError(error instanceof Error ? error.message : "An unexpected error occurred");
			} finally {
				setLoading(false);
			}
		};

		fetchAllPassengers();
	}, [API_SERVER, accessToken]);

	// Fetch all races
	useEffect(() => {
		const fetchAllRaces = async () => {
			setLoading(true);
			let allRaces: IRace[] = [];
			let page = 1;

			try {
				while (true) {
					// Fetch races from the current page
					const response = await fetch(`${API_SERVER}/races?page=${page}`, {
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${accessToken}`,
						},
					});

					if (!response.ok) {
						throw new Error("Failed to fetch races");
					}

					const data = await response.json();

					// Add races from the current page to the list
					allRaces = [...allRaces, ...data.results];

					// If there are no more races, exit the loop
					if (data.results.length < 10) {
						break;
					}

					// Move to the next page
					page++;
				}

				setRaces(allRaces); // Update the state with all fetched races
			} catch (error) {
				setError(error instanceof Error ? error.message : "An unexpected error occurred");
			} finally {
				setLoading(false);
			}
		};

		fetchAllRaces();
	}, [API_SERVER, accessToken]);

	// Handle input changes
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setTicket((prevTicket) => ({
			...prevTicket!,
			[name]: value,
		}));
	};

	const handleSelectChange = (selectedOption: Option | null, name: string) => {
		setTicket((prevTicket) => ({
			...prevTicket!,
			[name]: selectedOption ? selectedOption.value : null,
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

	const passengerOptions = passengers.map((passenger) => ({
		value: passenger.id,
		label: `${passenger.first_name} ${passenger.last_name}`,
	}));

	const raceOptions = races.map((race) => ({
		value: race.id,
		label: `${race.time_start} - ${race.city_from}`,
	}));

	return (
		<>
			<AdminHeader />
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
								name="passenger"
								value={ticket?.passenger}
								onChange={handleChange}
								required
							/>
						</div>

						<div className={styles.formGroup}>
							<label htmlFor="passenger">Passenger</label>
							<Select
								name="passenger"
								options={passengerOptions}
								value={passengerOptions.find((option) => option.value === ticket?.passenger)}
								onChange={(selectedOption) => handleSelectChange(selectedOption, "passenger")}
								isLoading={loading}
								placeholder="Select Passenger"
								required
							/>
						</div>

						<div className={styles.formGroup}>
							<label>Race ID</label>
							<input
								type="text"
								name="race"
								value={ticket?.race}
								onChange={handleChange}
								required
							/>
						</div>

						<div className={styles.formGroup}>
							<label htmlFor="race">Race</label>
							<Select
								name="race"
								options={raceOptions}
								value={raceOptions.find((option) => option.value === ticket?.race)}
								onChange={(selectedOption) => handleSelectChange(selectedOption, "race")}
								isLoading={loading}
								placeholder="Select Race"
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
		</>
	);
}

export default TicketForm;