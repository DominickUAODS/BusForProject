import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetAuthTokensFromLocalStorage } from "../../helpers/GetAuthTokensFromLocalStorage";
import Select from "react-select"; // Импортируем компонент Select
import { IRace } from "../../interfaces/IRace";
import { ICity } from "../../interfaces/ICity";
import styles from "./RaceForm.module.css";
import AdminHeader from "./AdminHeader";
import CustomLoading from "../CustomLoading";
//import { parseISO, format } from 'date-fns';

// Типизация данных для гонки
interface Option {
	value: string | number;  // Пример: может быть строкой или числом
	label: string;           // Обычно также присутствует label
}

function RaceForm() {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const navigate = useNavigate();
	const { id } = useParams<{ id?: string }>(); // id может быть строкой или undefined для нового элемента
	const [race, setRace] = useState<IRace>();
	const [cities, setCities] = useState<ICity[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const { accessToken } = GetAuthTokensFromLocalStorage();

	// Загрузка списка городов
	useEffect(() => {
		const fetchAllCities = async () => {
			setLoading(true);
			let allCities: ICity[] = [];
			let page = 1;

			try {
				// // Запрашиваем города с текущей страницы
				// const response = await fetch(`${API_SERVER}/cities?page_size=100`);

				// if (!response.ok) {
				// 	throw new Error("Failed to fetch cities");
				// }

				// const data = await response.json();

				// // Добавляем города текущей страницы в общий список
				// allCities = [...allCities, ...data.results];

				while (true) {
					// Запрашиваем города с текущей страницы
					const response = await fetch(`${API_SERVER}/cities?page=${page}`);

					if (!response.ok) {
						throw new Error("Failed to fetch cities");
					}

					const data = await response.json();

					// Добавляем города текущей страницы в общий список
					allCities = [...allCities, ...data.results];

					// Если на этой странице нет городов, выходим из цикла
					if (data.results.length < 10) {
						break;
					}

					// Переходим к следующей странице
					page++;
				}

				setCities(allCities); // Обновляем состояние с городами
			} catch (error) {
				setError(error instanceof Error ? error.message : "An unexpected error occurred");
			} finally {
				setLoading(false);
			}
		};

		fetchAllCities();
	}, [API_SERVER]);

	// Fetch race data if editing an existing race
	useEffect(() => {
		if (id) {
			setLoading(true);
			fetch(`${API_SERVER}/races/${id}`)
				.then((response) => {
					if (!response.ok) {
						throw new Error("Failed to fetch race");
					}
					return response.json();
				})
				.then((data) => {
					setRace({
						...data,
						city_from: data.city_from, // Устанавливаем cityFrom
						city_to: data.city_to, // Устанавливаем cityTo
					});
					setLoading(false);
				})
				.catch((error) => {
					setError(error.message);
					setLoading(false);
				});
		}
	}, [API_SERVER, id]);

	// Handle input changes
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setRace((prevRace) => ({
			...prevRace!,
			[name]: value,
		}));
	};



	// Handle form submission
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		console.log(JSON.stringify(race))
		try {
			console.log(JSON.stringify(race))
			const response = await fetch(id ? `${API_SERVER}/races/${id}/` : `${API_SERVER}/races/`, {
				method: id ? "PUT" : "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${accessToken}`,
				},
				body: JSON.stringify(race),
			});

			if (!response.ok) {
				throw new Error("Failed to save race");
			}

			navigate("/races"); // Redirect after submit
		} catch (error) {
			setError(error instanceof Error ? error.message : "Unknown error");
			setLoading(false);
		}
	};

	// Handle race deletion
	const handleDelete = async () => {
		if (id) {
			setLoading(true);
			try {
				const response = await fetch(`${API_SERVER}/races/${id}/`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${accessToken}`,
					},
				});
				if (!response.ok) {
					throw new Error("Failed to delete race");
				}
				navigate("/races"); // Redirect after deletion
			} catch (error) {
				setError(error instanceof Error ? error.message : "Unknown error");
				setLoading(false);
			}
		}
	};

	//if (loading) return <div>Loading...</div>;

	// Маппим города в формат, который ожидает react-select
	const cityOptions = cities.map((city) => ({
		value: city.id, // Предположим, что city.id — это уникальный идентификатор города
		label: `${city.name_ua} - ${city.name_en}` // Предположим, что city.name — это название города
	}));

	// Функция для обработки изменения выбора города
	const handleCityChange = (selectedOption: Option | null, field: string) => {
		if (race) {
			setRace((prevRace) => ({
				...prevRace!,
				[field]: selectedOption ? selectedOption.value : null,
			}));
		}
	};

	// const parseDateTime = (datetime: string | undefined): string => {
	// 	if (!datetime) {
	// 		throw new Error('Invalid date');
	// 	}
	// 	const parsedDate = parseISO(datetime);
	// 	const formattedDate = format(parsedDate, 'yyyy-MM-dd HH:mm');
	// 	return formattedDate;
	// };

	return (
		<>
			<AdminHeader />
			<div className={styles.comp}>
				{loading ? (<CustomLoading />) : (
					<div className={styles.cont}>
						<h2 className={styles.title}>{id ? "Edit Race" : "Create Race"}</h2>

						{error && <div className={styles.error}>{error}</div>}

						<form onSubmit={handleSubmit}>
							<div className={styles.formGroup}>
								<label htmlFor="time_start">Start time</label>
								<input
									type="datetime-local"
									name="time_start"
									value={race?.time_start}
									onChange={handleChange}
									required
								/>
							</div>

							<div className={styles.formGroup}>
								<label htmlFor="time_end">End time</label>
								<input
									type="datetime-local"
									name="time_end"
									value={race?.time_end}
									onChange={handleChange}
									required
								/>
							</div>

							<div className={styles.formGroup}>
								<label htmlFor="cost">Cost</label>
								<input
									type="number"
									name="cost"
									value={race?.cost}
									min="0.01"
									step="0.01"
									onChange={handleChange}
									required
								/>
							</div>

							<div className={styles.formGroup}>
								<label htmlFor="places">Places</label>
								<input
									type="number"
									name="places"
									value={race?.places}
									min="10"
									max="50"
									onChange={handleChange}
									required
								/>
							</div>

							{/* City From - выпадающий список с поиском */}
							<div className={styles.formGroup}>
								<label htmlFor="city_from">City From</label>
								<Select
									name="city_from"
									options={cityOptions}
									value={cityOptions.find((city) => city.value === race?.city_from)}
									onChange={(selectedOption) => handleCityChange(selectedOption, "city_from")}
									isLoading={loading}
									placeholder="Select City From"
									required
								/>
							</div>

							{/* City To - выпадающий список с поиском */}
							<div className={styles.formGroup}>
								<label htmlFor="city_to">City To</label>
								<Select
									name="city_to"
									options={cityOptions}
									value={cityOptions.find((city) => city.value === race?.city_to)}
									onChange={(selectedOption) => handleCityChange(selectedOption, "city_to")}
									isLoading={loading}
									placeholder="Select City To"
									required
								/>
							</div>

							<button type="submit" disabled={loading}>
								{id ? "Update Race" : "Create Race"}
							</button>
						</form>

						{id && (
							<button
								onClick={handleDelete}
								className={styles.deleteBtn}
								disabled={loading}
							>
								Delete Race
							</button>
						)}
					</div>
				)}
			</div>
		</>
	);
}

export default RaceForm;