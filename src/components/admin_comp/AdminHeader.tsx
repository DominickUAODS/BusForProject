import { useContext } from "react";
import { AuthContext } from "../../helpers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AdminHeader.module.css";
import logo from "../../assets/images/redirection-logo-bbc.svg";

const Header = () => {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	if (!authContext?.isAuthenticated) return null;

	const { logout } = authContext;

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	const username = "admin";

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<img className={styles.logo} src={logo} alt="redirection-logo"/>
				<div className={styles.userInfo}>
					<Link to="/admin/dashboard" className={styles.welcome}>Dashboard</Link>
					<span className={styles.welcome}>Welcome, {username}</span>
					<Link to="/" onClick={handleLogout} className={styles.logout}>Logout</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
