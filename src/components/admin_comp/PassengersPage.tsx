import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IPassenger } from "../../interfaces/IPassenger";

// interface Passenger {
// 	_id: string;
// 	name: string;
// 	age: number;
// 	race: string;
// }

const PassengersPage = () => {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const [passengers, setPassengers] = useState<IPassenger[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [nextPage, setNextPage] = useState<string | null>(null); // Ссылка на следующую страницу
	const [previousPage, setPreviousPage] = useState<string | null>(null); // Ссылка на предыдущую страницу

	const fetchPassengers = async (url: string) => {
		try {
			const response = await fetch(url);

			// Проверяем статус ответа
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			// Проверяем, что ответ - JSON
			const contentType = response.headers.get("content-type");
			if (!contentType || !contentType.includes("application/json")) {
				throw new Error("Received non-JSON response");
			}

			const data = await response.json();
			setPassengers(data.results);
			setNextPage(data.next); // Сохраняем ссылку на следующую страницу
			setPreviousPage(data.previous); // Сохраняем ссылку на предыдущую страницу
		} catch (error) {
			setError(error instanceof Error ? error.message : "An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPassengers(`${API_SERVER}/passengers/`);
	}, [API_SERVER]);

	const handleNextPage = () => {
		if (nextPage) {
			setLoading(true);
			fetchPassengers(nextPage);
		}
	};

	const handlePreviousPage = () => {
		if (previousPage) {
			setLoading(true);
			fetchPassengers(previousPage);
		}
	};

	if (loading) return <div>Loading passengers...</div>;
	if (error) return <div style={{ color: "red" }}>{error}</div>;

	return (
		<div>
			<h2>Passengers</h2>
			<Link to="/passengers/new">Create New Passenger</Link>
			<table>
				<thead>
					<tr>
						<th>First name</th>
						<th>Last name</th>
						<th>User ID</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{passengers.map((passenger) => (
						<tr key={passenger.id}>
							<td>{passenger.first_name}</td>
							<td>{passenger.last_name}</td>
							<td>{passenger.user_id}</td>
							<td><Link to={`/passengers/edit/${passenger.id}`}>Edit</Link></td>
						</tr>
					))}
				</tbody>
			</table>

			<div>
				<button onClick={handlePreviousPage} disabled={!previousPage}>Previous</button>
				<button onClick={handleNextPage} disabled={!nextPage}>Next</button>
			</div>
		</div>
	);
};

export default PassengersPage;