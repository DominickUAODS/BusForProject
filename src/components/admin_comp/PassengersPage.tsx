import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Passenger {
	_id: string;
	name: string;
	age: number;
	race: string;
}

const PassengersPage = () => {
	const [passengers, setPassengers] = useState<Passenger[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		axios
			.get("/api/passengers")
			.then((response) => {
				setPassengers(response.data);
				setLoading(false);
			})
			.catch((error) => {
				setError("Failed to load passengers.");
				setLoading(false);
			});
	}, []);

	if (loading) return <div>Loading passengers...</div>;
	if (error) return <div style={{ color: "red" }}>{error}</div>;

	return (
		<div>
			<h2>Passengers</h2>
			<Link to="/passengers/new">Create New Passenger</Link>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Age</th>
						<th>Race</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{passengers.map((passenger) => (
						<tr key={passenger._id}>
							<td>{passenger.name}</td>
							<td>{passenger.age}</td>
							<td>{passenger.race}</td>
							<td>
								<Link to={`/passengers/edit/${passenger._id}`}>Edit</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default PassengersPage;
