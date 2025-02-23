import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Типизация для данных пользователя
interface User {
	name: string;
	email: string;
	role: string;
}

function UserForm() {
	const navigate = useNavigate();
	const { id } = useParams<{ id?: string }>();  // id может быть строкой или undefined для нового пользователя
	const [user, setUser] = useState<User>({
		name: "",
		email: "",
		role: "",
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// Fetch user data if editing an existing user
	useEffect(() => {
		if (id) {
			setLoading(true);
			axios
				.get(`/api/users/${id}`)
				.then((response) => {
					setUser(response.data);
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
		setUser((prevUser) => ({
			...prevUser,
			[name]: value,
		}));
	};

	// Handle form submission
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (id) {
				// Update user if id exists
				await axios.put(`/api/users/${id}`, user);
			} else {
				// Create new user
				await axios.post("/api/users", user);
			}
			navigate("/users");  // Redirect after submit
		} catch (error) {
			setError(error.response ? error.response.data.message : error.message);
			setLoading(false);
		}
	};

	if (loading) return <div>Loading...</div>;

	return (
		<div>
			<h2>{id ? "Edit User" : "Create User"}</h2>
			{error && <div style={{ color: "red" }}>{error}</div>}
			<form onSubmit={handleSubmit}>
				<div>
					<label>Name</label>
					<input
						type="text"
						name="name"
						value={user.name}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Email</label>
					<input
						type="email"
						name="email"
						value={user.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Role</label>
					<input
						type="text"
						name="role"
						value={user.role}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<button type="submit" disabled={loading}>
						{id ? "Update User" : "Create User"}
					</button>
				</div>
			</form>
		</div>
	);
}

export default UserForm;
