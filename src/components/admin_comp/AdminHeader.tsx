import React, { useContext } from "react";
import { AuthContext } from "../../helpers/AuthProvider";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
	const authContext = useContext(AuthContext);

	if (!authContext?.isAuthenticated) return null;

	const username  = "admin";

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<h1 className={styles.logo}>Your Logo</h1>
				<div className={styles.userInfo}>
					<span className={styles.welcome}>Welcome, {username}</span>
					<Link to="/logout" className={styles.logout}>Logout</Link> {/* Здесь можно заменить на правильный путь для выхода */}
				</div>
			</div>
		</header>
	);
};

export default Header;
