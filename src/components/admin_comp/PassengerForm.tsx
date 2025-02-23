import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";

// Типизация данных для пассажира
interface Passenger {
	name: string;
	age: string;
	race: string;
}

function PassengerForm() {
	const navigate = useNavigate();
	const { id } = useParams<{ id?: string }>();  // id может быть строкой или undefined для нового элемента
	const [passenger, setPassenger] = useState<Passenger>({
		name: "",
		age: "",
		race: "",
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// Fetch passenger data if editing an existing passenger
	useEffect(() => {
		if (id) {
			setLoading(true);
			axios
				.get(`/api/passengers/${id}`)
				.then((response) => {
					setPassenger(response.data);
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
		setPassenger((prevPassenger) => ({
			...prevPassenger,
			[name]: value,
		}));
	};

	// Handle form submission
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (id) {
				// Update passenger if id exists
				await axios.put(`/api/passengers/${id}`, passenger);
			} else {
				// Create new passenger
				await axios.post("/api/passengers", passenger);
			}
			navigate("/passengers");  // Redirect after submit
		} catch (error: AxiosError) {
			setError(error.response ? error.response.data.message : error.message);
			setLoading(false);
		}
	};

	// Handle passenger deletion
	const handleDelete = async () => {
		if (id) {
			setLoading(true);
			try {
				await axios.delete(`/api/passengers/${id}`);
				navigate("/passengers");  // Redirect after deletion
			} catch (error: AxiosError) {
				setError(error.response ? error.response.data.message : error.message);
				setLoading(false);
			}
		}
	};

	if (loading) return <div>Loading...</div>;

	return (
		<div>
			<h2>{id ? "Edit Passenger" : "Create Passenger"}</h2>
			{error && <div style={{ color: "red" }}>{error}</div>}
			<form onSubmit={handleSubmit}>
				<div>
					<label>Name</label>
					<input
						type="text"
						name="name"
						value={passenger.name}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Age</label>
					<input
						type="number"
						name="age"
						value={passenger.age}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Race</label>
					<input
						type="text"
						name="race"
						value={passenger.race}
						onChange={handleChange}
						required
					/>
				</div>
				<button type="submit" disabled={loading}>
					{id ? "Update Passenger" : "Create Passenger"}
				</button>
			</form>
			{id && (
				<button
					onClick={handleDelete}
					style={{ marginTop: "10px", backgroundColor: "red", color: "white" }}
					disabled={loading}
				>
					Delete Passenger
				</button>
			)}
		</div>
	);
}

export default PassengerForm;
