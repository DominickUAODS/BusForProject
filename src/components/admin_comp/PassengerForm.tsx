import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetAuthTokensFromLocalStorage } from "../../helpers/GetAuthTokensFromLocalStorage";
import { IPassenger } from "../../interfaces/IPassenger";
import styles from "./PassengerForm.module.css";
import AdminHeader from "./AdminHeader";
import { IUser } from "../../interfaces/IUser";
import Select from "react-select";
import CustomLoading from "../CustomLoading";

interface Option {
	value: string | number;  // Пример: может быть строкой или числом
	label: string;           // Обычно также присутствует label
}

function PassengerForm() {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const navigate = useNavigate();
	const { id } = useParams<{ id?: string }>();  // id может быть строкой или undefined для нового элемента
	const [passenger, setPassenger] = useState<IPassenger>();
	const [users, setUsers] = useState<IUser[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const { accessToken } = GetAuthTokensFromLocalStorage();

	useEffect(() => {
		const fetchUsers = async () => {
			setLoading(true);
			try {
				const response = await fetch(`${API_SERVER}/users/`, {
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${accessToken}`,
					},
				});
				if (!response.ok) {
					throw new Error("Failed to fetch users");
				}
				const data = await response.json();
				setUsers(data.results); // Сохраняем пользователей в состоянии
			} catch (error) {
				setError(error instanceof Error ? error.message : "An unexpected error occurred");
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, [API_SERVER, accessToken]);

	// Fetch passenger data if editing an existing passenger
	useEffect(() => {
		if (id) {
			setLoading(true);
			fetch(`${API_SERVER}/passengers/${id}`,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${accessToken}`,
					},
				})
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
	}, [API_SERVER, accessToken, id]);

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

	const userOptions = users.map((user) => ({
		value: user.id,
		label: `${user.username}`,
	}));

	const handleUserChange = (selectedOption: Option | null, field: string) => {
		if (passenger) {
			setPassenger({
				...passenger,
				user: selectedOption ? selectedOption.value : null, // Обновляем поле user_id
			});
		}
	};

	//if (loading) return <div>Loading...</div>;

	return (
		<>
			<AdminHeader />
			<div className={styles.comp}>
				{loading ? (<CustomLoading />) : (
					<div className={styles.cont}>
						<h2 className={styles.title}>{id ? "Edit Passenger" : "Create Passenger"}</h2>
						{error && <div className={styles.error}>{error}</div>}
						<form onSubmit={handleSubmit}>
							<div className={styles.formGroup}>
								<label>First name</label>
								<input
									type="text"
									name="first_name"
									value={passenger?.first_name || ''}
									onChange={handleChange}
									required
									className={styles.input}
								/>
							</div>
							<div className={styles.formGroup}>
								<label>Last name</label>
								<input
									type="text"
									name="last_name"
									value={passenger?.last_name || ''}
									onChange={handleChange}
									required
									className={styles.input}
								/>
							</div>
							<div className={styles.formGroup}>
								<label>User ID</label>
								<input
									type="text"
									name="user"
									value={passenger?.user || ''}
									onChange={handleChange}
									className={styles.input}
									readOnly
								/>
							</div>
							{/* City To - выпадающий список с поиском */}
							<div className={styles.formGroup}>
								<label htmlFor="userName">User Name</label>
								<Select
									name="userName"
									options={userOptions}
									value={userOptions.find((user) => user.value === passenger?.user)}
									onChange={(selectedOption) => handleUserChange(selectedOption, "userName")}
									isLoading={loading}
									placeholder="Select User Name"
									required
								/>
							</div>
							<button
								type="submit"
								disabled={loading}
								className={styles.submitBtn}
							>
								{id ? "Update Passenger" : "Create Passenger"}
							</button>
						</form>
						{id && (
							<button
								onClick={handleDelete}
								className={styles.deleteBtn}
								disabled={loading}
							>
								Delete Passenger
							</button>
						)}
					</div>
				)}
			</div>
		</>
	);
}

export default PassengerForm;