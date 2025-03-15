import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import { format } from 'date-fns';
import { GetAuthTokensFromLocalStorage } from "../../helpers/GetAuthTokensFromLocalStorage";
import { IUser } from "../../interfaces/IUser";
import styles from "./UserForm.module.css";
import AdminHeader from "./AdminHeader";
import CustomLoading from "../CustomLoading";

function UserForm() {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const navigate = useNavigate();
	const { id } = useParams<{ id?: string }>();  // id может быть строкой или undefined для нового пользователя
	const [user, setUser] = useState<IUser>();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const { accessToken } = GetAuthTokensFromLocalStorage();

	// Fetch user data if editing an existing user
	useEffect(() => {
		if (id) {
			setLoading(true);
			fetch(`${API_SERVER}/users/${id}`, {
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${accessToken}`,
				},
			})
				.then((response) => {
					if (!response.ok) {
						// If response is not ok, throw an error
						throw new Error("Failed to fetch user data.");
					}
					return response.json(); // Parse response JSON
				})
				.then((data) => {
					setUser(data);
					setLoading(false);
				})
				.catch((error) => {
					setError(error instanceof Error ? error.message : "An unexpected error occurred");
					setLoading(false);
				});

		}
	}, [API_SERVER, accessToken, id]);

	// Handle input changes
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setUser((prevUser) => ({
			...prevUser!,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	// Handle form submission
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await fetch(id ? `${API_SERVER}/users/${id}/` : `${API_SERVER}/users/`, {
				method: id ? "PUT" : "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${accessToken}`,
				},
				body: JSON.stringify(user),
			});
			console.log(response);
			if (!response.ok) {
				throw new Error("Failed to save city");
			}

			navigate("/users");
		} catch (error) {
			setError(error instanceof Error ? error.message : "An unexpected error occurred");
			setLoading(false);
		}
	};

	const handleDelete = async () => {
		if (id) {
			setLoading(true);
			try {
				const response = await fetch(`${API_SERVER}/users/${id}/`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${accessToken}`,
					},
				});
				if (!response.ok) {
					throw new Error("Failed to delete user");
				}
				navigate("/users");
			} catch (error) {
				setError(error instanceof Error ? error.message : "An unexpected error occurred");
				setLoading(false);
			}
		}
	};

	//if (loading) return <div>Loading...</div>;

	return (
		<>
			<AdminHeader />
			<div className={styles.comp}>
				{loading ? (<CustomLoading />) : (
					<div className={styles.cont}>
						<h2 className={styles.title}>{id ? "Edit User" : "Create User"}</h2>
						{error && <div className={styles.error}>{error}</div>}

						<form onSubmit={handleSubmit}>
							<div className={styles.formGroup}>
								<label>Username</label>
								<input
									type="text"
									name="username"
									value={user?.username}
									onChange={handleChange}
									required
								/>
							</div>

							<div className={styles.formGroup}>
								<label>Email</label>
								<input
									type="email"
									name="email"
									value={user?.email}
									onChange={handleChange}
								/>
							</div>

							<div className={styles.formGroup}>
								<label>First Name</label>
								<input
									type="text"
									name="first_name"
									value={user?.first_name}
									onChange={handleChange}
									required
								/>
							</div>

							<div className={styles.formGroup}>
								<label>Last Name</label>
								<input
									type="text"
									name="last_name"
									value={user?.last_name}
									onChange={handleChange}
									required
								/>
							</div>

							<div className={styles.formGroup}>
								<label>Is Staff?</label>
								<input
									type="checkbox"
									name="is_staff"
									checked={user?.is_staff ?? false}
									onChange={handleChange}
								/>
							</div>

							<div className={styles.formGroup}>
								<label>Is Superuser?</label>
								<input
									type="checkbox"
									name="is_superuser"
									checked={user?.is_superuser ?? false}
									onChange={handleChange}
								/>
							</div>

							<div className={styles.formGroup}>
								<label>Is Active?</label>
								<input
									type="checkbox"
									name="is_active"
									checked={user?.is_active ?? false}
									onChange={handleChange}
								/>
							</div>

							{/* <div className={styles.formGroup}>
								<label>Last Login</label>
								<input
									type="text"
									name="last_login"
									value={user?.last_login}
									readOnly
								/>
							</div>

							<div className={styles.formGroup}>
								<label>Date Joined</label>
								<input
									type="text"
									name="date_joined"
									value={user?.date_joined}
									readOnly
								/>
							</div> */}

							<div className={styles.formGroup}>
								<button type="submit" disabled={loading}>
									{id ? "Update User" : "Create User"}
								</button>
							</div>
						</form>

						{id && (
							<button
								onClick={handleDelete}
								className={styles.deleteBtn}
								disabled={loading}
							>
								Delete User
							</button>
						)}
					</div>
				)}
			</div>
		</>
	);
}

export default UserForm;