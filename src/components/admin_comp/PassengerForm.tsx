import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
			fetch(`/api/passengers/${id}`)
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
					setError(error.message);
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
			const requestOptions: RequestInit = {
				method: id ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(passenger),
			};

			const response = await fetch(`/api/passengers/${id || ""}`, requestOptions);

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			navigate("/passengers");  // Redirect after submit
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
				const response = await fetch(`/api/passengers/${id}`, { method: "DELETE" });

				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}

				navigate("/passengers");  // Redirect after deletion
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
