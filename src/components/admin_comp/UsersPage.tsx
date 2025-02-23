import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface User {
	_id: string;
	name: string;
	email: string;
	role: string;
}

const UsersPage = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		axios
			.get("/api/users")
			.then((response) => {
				setUsers(response.data);
				setLoading(false);
			})
			.catch((error) => {
				setError("Failed to load users.");
				setLoading(false);
			});
	}, []);

	if (loading) return <div>Loading users...</div>;
	if (error) return <div style={{ color: "red" }}>{error}</div>;

	return (
		<div>
			<h2>Users</h2>
			<Link to="/users/new">Create New User</Link>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Role</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user._id}>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>{user.role}</td>
							<td>
								<Link to={`/users/edit/${user._id}`}>Edit</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UsersPage;
