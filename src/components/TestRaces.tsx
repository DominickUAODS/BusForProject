import { useEffect, useState } from "react"
import Page from "../models/Page";
import Race from "../models/Race";
import { useLocation, useSearchParams } from "react-router-dom";

export default function TicketForm() {
	const [searchParams] = useSearchParams();
	const location = useLocation();

	const city_from: string = searchParams.get("city_from") ?? "";
	const city_to: string = searchParams.get("city_to") ?? "";
	const date_str: string = searchParams.get("date") ?? "";
	const date: Date = new Date(date_str);
	const time_from: Date = new Date(date);
	time_from.setHours(0, 0, 0, 0);
	const time_to: Date = new Date(date);
	time_to.setHours(23, 59, 59, 999);
	const passengers: string = searchParams.get("passengers") ?? "";

	const [races, setRaces] = useState<Race[]>([]);
	const [racesFiltered, setRacesFiltered] = useState<Race[]>([]);

	const fetchRaces = async () => {
		try {
			const response: Response = await fetch(`${import.meta.env.VITE_API_SERVER}/api/races/`);
			if (!response.ok) {
				const error: Error = await response.json();
				throw error;
			}
			const page: Page<Race> = await response.json();
			const newRaces: Race[] = page.results;
			setRaces(newRaces);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchRacesFiltered = async () => {
		try {
			const response: Response = await fetch(`${import.meta.env.VITE_API_SERVER}/api/races/?${new URLSearchParams({ city_from, city_to, time_start_after: time_from.toISOString(), time_start_until: time_to.toISOString(), min_places: passengers })}`);
			if (!response.ok) {
				const error: Error = await response.json();
				throw error;
			}
			const page: Page<Race> = await response.json();
			const newRacesFiltered: Race[] = page.results;
			setRacesFiltered(newRacesFiltered);
			console.log(newRacesFiltered);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchRaces();
		fetchRacesFiltered();
	}, [location]);

	return (
		<div style={{ backgroundColor: "gray" }}>
			<span>First page (all): {JSON.stringify(races)}</span>
			<br /><br />
			<span style={{ color: "white" }}>First page (filtered): {JSON.stringify(racesFiltered)}</span>
		</div>
	);
}