import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface City {
	_id: string;
	name: string;
	country: string;
}

const CitiesPage = () => {
	const [cities, setCities] = useState<City[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch("/api/cities")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to fetch cities");
				}
				return response.json();
			})
			.then((data) => {
				setCities(data);
				setLoading(false);
			})
			.catch(() => {
				setError("Failed to load cities.");
				setLoading(false);
			});
	}, []);

	if (loading) return <div>Loading cities...</div>;
	if (error) return <div style={{ color: "red" }}>{error}</div>;

	return (
		<div>
			<h2>Cities</h2>
			<Link to="/cities/new">Create New City</Link>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Country</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{cities.map((city) => (
						<tr key={city._id}>
							<td>{city.name}</td>
							<td>{city.country}</td>
							<td>
								<Link to={`/cities/edit/${city._id}`}>Edit</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CitiesPage;