import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetAuthTokensFromLocalStorage } from "../../helpers/GetAuthTokensFromLocalStorage";
import { IPassenger } from "../../interfaces/IPassenger";

// Типизация данных для пассажира
// interface Passenger {
// 	name: string;
// 	age: string;
// 	race: string;
// }

function PassengerForm() {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const navigate = useNavigate();
	const { id } = useParams<{ id?: string }>();  // id может быть строкой или undefined для нового элемента
	const [passenger, setPassenger] = useState<IPassenger>();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const { accessToken } = GetAuthTokensFromLocalStorage();

	// Fetch passenger data if editing an existing passenger
	useEffect(() => {
		if (id) {
			setLoading(true);
			fetch(`${API_SERVER}/passengers/${id}`)
				.then((response) => {
					if (!response.ok) {
						throw new Error(`Error: ${response.statusText}`);
					}
					return response.json();
				})
				.then((data) => {
					setPassenger(data);
					setLoading(false);
				})
				.catch((error) => {
					setError(error instanceof Error ? error.message : "An unexpected error occurred");
					setLoading(false);
				});
		}
	}, [API_SERVER, id]);

	// Handle input changes
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setPassenger((prevPassenger) => ({
			...prevPassenger!,
			[name]: value,
		}));
	};

	// Handle form submission
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await fetch(id ? `${API_SERVER}/passengers/${id}/` : `${API_SERVER}/passengers/`, {
				method: id ? "PUT" : "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${accessToken}`,
				},
				body: JSON.stringify(passenger),
			});
			console.log(response);
			if (!response.ok) {
				throw new Error("Failed to save city");
			}

			navigate("/passengers"); // Redirect after submit
		} catch (error) {
			setError(error instanceof Error ? error.message : "An unexpected error occurred");
			setLoading(false);
		}
	};

	// Handle passenger deletion
	const handleDelete = async () => {
		if (id) {
			setLoading(true);
			try {
				const response = await fetch(`${API_SERVER}/passengers/${id}/`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${accessToken}`,
					},
				});
				if (!response.ok) {
					throw new Error("Failed to delete city");
				}
				navigate("/passengers"); // Redirect after deletion
			} catch (error) {
				setError(error instanceof Error ? error.message : "An unexpected error occurred");
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
					<label>First name</label>
					<input type="text" name="first_name" value={passenger?.first_name} onChange={handleChange} required />
				</div>
				<div>
					<label>Last name</label>
					<input type="text" name="last_name" value={passenger?.last_name} onChange={handleChange} required />
				</div>
				<div>
					<label>User ID</label>
					<input type="text" name="user_id" value={passenger?.user_id} onChange={handleChange} required />
				</div>
				<button type="submit" disabled={loading}>{id ? "Update Passenger" : "Create Passenger"}</button>
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