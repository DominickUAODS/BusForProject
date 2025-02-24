import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
		fetch("/api/users")
			.then((response) => {
				if (!response.ok) {
					// If the response is not OK, throw an error
					throw new Error("Failed to load users.");
				}
				return response.json(); // Parse the response as JSON
			})
			.then((data) => {
				setUsers(data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error instanceof Error ? error.message : "An error occurred");
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
