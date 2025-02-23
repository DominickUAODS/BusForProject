import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";

// Типизация данных для гонки
interface Race {
	name: string;
	date: string;
	city: string;
}

function RaceForm() {
	const navigate = useNavigate();
	const { id } = useParams<{ id?: string }>();  // id может быть строкой или undefined для нового элемента
	const [race, setRace] = useState<Race>({
		name: "",
		date: "",
		city: "",
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// Fetch race data if editing an existing race
	useEffect(() => {
		if (id) {
			setLoading(true);
			axios
				.get(`/api/races/${id}`)
				.then((response) => {
					setRace(response.data);
					setLoading(false);
				})
				.catch((error: AxiosError) => {  // Типизация ошибки
					setError(error.response ? error.response.data.message : error.message);
					setLoading(false);
				});
		}
	}, [id]);

	// Handle input changes
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setRace((prevRace) => ({
			...prevRace,
			[name]: value,
		}));
	};

	// Handle form submission
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (id) {
				// Update race if id exists
				await axios.put(`/api/races/${id}`, race);
			} else {
				// Create new race
				await axios.post("/api/races", race);
			}
			navigate("/races");  // Redirect after submit
		} catch (error: AxiosError) {  // Типизация ошибки
			setError(error.response ? error.response.data.message : error.message);
			setLoading(false);
		}
	};

	// Handle race deletion
	const handleDelete = async () => {
		if (id) {
			setLoading(true);
			try {
				await axios.delete(`/api/races/${id}`);
				navigate("/races");  // Redirect after deletion
			} catch (error: AxiosError) {  // Типизация ошибки
				setError(error.response ? error.response.data.message : error.message);
				setLoading(false);
			}
		}
	};

	if (loading) return <div>Loading...</div>;

	return (
		<div>
			<h2>{id ? "Edit Race" : "Create Race"}</h2>
			{error && <div style={{ color: "red" }}>{error}</div>}
			<form onSubmit={handleSubmit}>
				<div>
					<label>Name</label>
					<input
						type="text"
						name="name"
						value={race.name}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Date</label>
					<input
						type="date"
						name="date"
						value={race.date}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>City</label>
					<input
						type="text"
						name="city"
						value={race.city}
						onChange={handleChange}
						required
					/>
				</div>
				<button type="submit" disabled={loading}>
					{id ? "Update Race" : "Create Race"}
				</button>
			</form>
			{id && (
				<button
					onClick={handleDelete}
					style={{ marginTop: "10px", backgroundColor: "red", color: "white" }}
					disabled={loading}
				>
					Delete Race
				</button>
			)}
		</div>
	);
}

export default RaceForm;
