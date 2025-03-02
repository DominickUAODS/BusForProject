import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ICity } from "../../interfaces/ICity";

const CitiesPage = () => {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const [cities, setCities] = useState<ICity[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [nextPage, setNextPage] = useState<string | null>(null); // Ссылка на следующую страницу
	const [previousPage, setPreviousPage] = useState<string | null>(null); // Ссылка на предыдущую страницу

	const fetchCities = async (url: string) => {
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
			setCities(data.results);
			setNextPage(data.next); // Сохраняем ссылку на следующую страницу
			setPreviousPage(data.previous); // Сохраняем ссылку на предыдущую страницу
		} catch (error) {
			setError(error instanceof Error ? error.message : "An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	};

	// Загружаем города при первом рендере
	useEffect(() => {
		fetchCities(`${API_SERVER}/cities/`);
	}, [API_SERVER]);

	const handleNextPage = () => {
		if (nextPage) {
			setLoading(true);
			fetchCities(nextPage);
		}
	};

	const handlePreviousPage = () => {
		if (previousPage) {
			setLoading(true);
			fetchCities(previousPage);
		}
	};

	if (loading) return <div>Loading cities...</div>;
	if (error) return <div style={{ color: "red" }}>{error}</div>;

	return (
		<div>
			<h2>Cities</h2>
			<Link to="/cities/new">Create New City</Link>
			<table>
				<thead>
					<tr>
						<th>Name EN</th>
						<th>Name UA</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{cities.map((city) => (
						<tr key={city.id}>
							<td>{city.name_en}</td>
							<td>{city.name_ua}</td>
							<td>
								<Link to={`/cities/edit/${city.id}`}>Edit</Link>
							</td>
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

export default CitiesPage;
