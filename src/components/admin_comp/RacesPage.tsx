import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Race {
	_id: string;
	name: string;
	date: string;
	city: string;
}

const RacesPage = () => {
	const [races, setRaces] = useState<Race[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch("/api/races")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to load races.");
				}
				return response.json();
			})
			.then((data) => {
				setRaces(data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});
	}, []);

	if (loading) return <div>Loading races...</div>;
	if (error) return <div style={{ color: "red" }}>{error}</div>;

	return (
		<div>
			<h2>Races</h2>
			<Link to="/races/new">Create New Race</Link>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Date</th>
						<th>City</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{races.map((race) => (
						<tr key={race._id}>
							<td>{race.name}</td>
							<td>{race.date}</td>
							<td>{race.city}</td>
							<td>
								<Link to={`/races/edit/${race._id}`}>Edit</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default RacesPage;
