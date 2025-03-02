import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetAuthTokensFromLocalStorage } from "../../helpers/GetAuthTokensFromLocalStorage";
import { ICity } from "../../interfaces/ICity";

export default function CityForm() {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const navigate = useNavigate();
	const { id } = useParams<{ id?: string }>();
	const [city, setCity] = useState<ICity>();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const { accessToken } = GetAuthTokensFromLocalStorage();

	useEffect(() => {
		if (id) {
			setLoading(true);
			fetch(`${API_SERVER}/cities/${id}`)
				.then((response) => {
					if (!response.ok) {
						throw new Error("Failed to fetch city");
					}
					return response.json();
				})
				.then((data) => {
					setCity(data);
					setLoading(false);
				})
				.catch((error) => {
					setError(error.message);
					setLoading(false);
				});
		}
	}, [API_SERVER, id]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
			setCity((prevCity) => ({
				...prevCity!,
				[name]: value,
			}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		console.log(JSON.stringify(city));
		try {
			const response = await fetch(id ? `${API_SERVER}/cities/${id}/` : `${API_SERVER}/cities/`, {
				method: id ? "PUT" : "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${accessToken}`,
				},
				body: JSON.stringify(city),
			});
			console.log(response);
			if (!response.ok) {
				throw new Error("Failed to save city");
			}

			navigate("/cities");
		} catch (error) {
			setError(error instanceof Error ? error.message : "An unexpected error occurred");
			setLoading(false);
		}
	};

	const handleDelete = async () => {
		if (id) {
			setLoading(true);
			try {
				const response = await fetch(`${API_SERVER}/cities/${id}/`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${accessToken}`,
					},
				});
				if (!response.ok) {
					throw new Error("Failed to delete city");
				}
				navigate("/cities");
			} catch (error) {
				setError(error instanceof Error ? error.message : "An unexpected error occurred");
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
					<label>Name EN</label>
					<input
						type="text"
						name="name_en"
						value={city?.name_en}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Name UA</label>
					<input
						type="text"
						name="name_ua"
						value={city?.name_ua}
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
};