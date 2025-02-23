import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";

// Типизация для данных города
interface City {
	name: string;
	country: string;
}

function CityForm() {
	const navigate = useNavigate();
	const { id } = useParams<{ id?: string }>();  // id может быть строкой или undefined для нового города
	const [city, setCity] = useState<City>({
		name: "",
		country: "",
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// Fetch city data if editing an existing city
	useEffect(() => {
		if (id) {
			setLoading(true);
			axios
				.get(`/api/cities/${id}`)
				.then((response) => {
					setCity(response.data);
					setLoading(false);
				})
				.catch((error) => {
					setError(error.response ? error.response.data.message : error.message);
					setLoading(false);
				});
		}
	}, [id]);

	// Handle input changes
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCity((prevCity) => ({
			...prevCity,
			[name]: value,
		}));
	};

	// Handle form submission
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (id) {
				// Update city if id exists
				await axios.put(`/api/cities/${id}`, city);
			} else {
				// Create new city
				await axios.post("/api/cities", city);
			}
			navigate("/cities");  // Redirect after submit
		} catch (error: AxiosError) {
			setError(error.response ? error.response.data.message : error.message);
			setLoading(false);
		}
	};

	// Handle city deletion
	const handleDelete = async () => {
		if (id) {
			setLoading(true);
			try {
				await axios.delete(`/api/cities/${id}`);
				navigate("/cities");  // Redirect after deletion
			} catch (error: AxiosError) {
				setError(error.response ? error.response.data.message : error.message);
				setLoading(false);
			}
		}
	};

	if (loading) return <div>Loading...</div>;

	return (
		<div>
			<h2>{id ? "Edit City" : "Create City"}</h2>
			{error && <div style={{ color: "red" }}>{error}</div>}
			<form onSubmit={handleSubmit}>
				<div>
					<label>Name</label>
					<input
						type="text"
						name="name"
						value={city.name}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Country</label>
					<input
						type="text"
						name="country"
						value={city.country}
						onChange={handleChange}
						required
					/>
				</div>
				<button type="submit" disabled={loading}>
					{id ? "Update City" : "Create City"}
				</button>
			</form>
			{id && (
				<button
					onClick={handleDelete}
					style={{ marginTop: "10px", backgroundColor: "red", color: "white" }}
					disabled={loading}
				>
					Delete City
				</button>
			)}
		</div>
	);
}

export default CityForm;
