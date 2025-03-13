import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IRace } from "../../interfaces/IRace";
import { format } from 'date-fns';
import { ICity } from "../../interfaces/ICity";
import styles from "./RacesPage.module.css";

const RacesPage = () => {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const [races, setRaces] = useState<IRace[]>([]);
	const [cityFromData, setCityFromData] = useState<{ [key: number | string]: ICity }>({});
	const [cityToData, setCityToData] = useState<{ [key: number | string]: ICity }>({});
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const [nextPage, setNextPage] = useState<string | null>(null);
	const [previousPage, setPreviousPage] = useState<string | null>(null);

	const fetchRaces = async (url: string) => {
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
			setRaces(data.results);
			console.log(data);
			setNextPage(data.next); // Сохраняем ссылку на следующую страницу
			setPreviousPage(data.previous); // Сохраняем ссылку на предыдущую страницу
		} catch (error) {
			setError(error instanceof Error ? error.message : "An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchRaces(`${API_SERVER}/races`);
	}, [API_SERVER]);


	const fetchCityById = async (city_id: string) => {
		try {
			const response = await fetch(`${API_SERVER}/cities/${city_id}`);
			if (!response.ok) {
				throw new Error("Failed to fetch city");
			}
			const data = await response.json();
			return data; // Возвращаем данные города
		} catch (error) {
			setError(error instanceof Error ? error.message : "An unexpected error occurred");
		}
	};

	useEffect(() => {
		// Загружаем города для всех гонок после того, как гонки загружены
		const loadCities = async () => {
			const cityFromMap: { [key: string]: ICity } = {};
			const cityToMap: { [key: string]: ICity } = {};

			// Загружаем информацию о каждом городе из гонок
			for (const race of races) {
				if (!cityFromMap[race.city_from]) {
					const cityFrom = await fetchCityById(race.city_from);
					cityFromMap[race.city_from] = cityFrom;
				}

				if (!cityToMap[race.city_to]) {
					const cityTo = await fetchCityById(race.city_to);
					cityToMap[race.city_to] = cityTo;
				}
			}

			setCityFromData(cityFromMap);
			setCityToData(cityToMap);
		};

		if (races.length > 0) {
			loadCities();
		}
	}, [races]);

	const handleNextPage = () => {
		if (nextPage) {
			setLoading(true);
			fetchRaces(nextPage);
		}
	};

	const handlePreviousPage = () => {
		if (previousPage) {
			setLoading(true);
			fetchRaces(previousPage);
		}
	};

	if (loading) return <div>Loading races...</div>;
	if (error) return <div style={{ color: "red" }}>{error}</div>;

	return (
		<div className={styles.comp}>
			<div className={styles.cont}>
				<div className={styles.title}>Races</div>
				<Link to="/racess/new" className={styles.createLink}>Create New Race</Link>
				<div className={styles.table}>
					<table>
						<thead>
							<tr>
								<th>Start Time</th>
								<th>End Time</th>
								<th>Cost</th>
								<th>Places</th>
								<th>City from</th>
								<th>City to</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{races.map((race) => (
								<tr key={race.id}>
									<td>{format(new Date(race.time_start), 'dd.MM.yyyy HH:mm')}</td>
									<td>{format(new Date(race.time_end), 'dd.MM.yyyy HH:mm')}</td>
									<td>{race.cost}</td>
									<td>{race.places}</td>
									<td>{cityFromData[race.city_from]?.name_ua}</td>
									<td>{cityToData[race.city_to]?.name_ua}</td>
									<td><Link to={`/racess/edit/${race.id}`} className={styles.editLink}>Edit</Link></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className={styles.pagination}>
					<button
						onClick={handlePreviousPage}
						className={styles.pageBtn}
						disabled={!previousPage}
					>
						Previous
					</button>
					<button
						onClick={handleNextPage}
						className={styles.pageBtn}
						disabled={!nextPage}
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default RacesPage;
