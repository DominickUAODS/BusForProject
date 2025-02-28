import { BrowserRouter as Router, Routes, Route, Navigate,  } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import LoginPage from "./components/admin_comp/LoginPage";
import Dashboard from "./components/admin_comp/Dashboard";
import UsersPage from "./components/admin_comp/UsersPage";
import CitiesPage from "./components/admin_comp/CitiesPage";
import RacesPage from "./components/admin_comp/RacesPage";
import PassengersPage from "./components/admin_comp/PassengersPage";
import TicketsPage from "./components/admin_comp/TicketsPage";
import UserForm from "./components/admin_comp/UserForm";
import CityForm from "./components/admin_comp/CityForm";
import RaceForm from "./components/admin_comp/RaceForm";
import PassengerForm from "./components/admin_comp/PassengerForm";
import TicketForm from "./components/admin_comp/TicketForm";
import FooterComp from './components/footer_comp/FooterComp';
import Header from './components/hedaer_comp/Header';
import IndexComp from './components/index_comp/IndexComp';
import { AuthProvider, useAuth } from "./helpers/AuthProvider";

// // Типизация для контекста аутентификации
// interface AuthContextType {
// 	isAuthenticated: boolean;
// 	role: "admin" | "user" | null;
// 	login: (role: "admin" | "user") => void;
// 	logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Хук для использования контекста аутентификации
// export function useAuth(): AuthContextType {
// 	const context = useContext(AuthContext);
// 	if (!context) {
// 		throw new Error("useAuth must be used within an AuthProvider");
// 	}
// 	return context;
// };

// Типы для маршрутов
// interface PrivateRouteProps {
// 	children: ReactNode;
// 	requiredRole?: "admin"; // Необязательный параметр для роли администратора
// };

// // Компонент для защиты маршрутов
// function PrivateRoute({ children, requiredRole }: PrivateRouteProps) {
// 	const { isAuthenticated, role } = useAuth();

// 	if (!isAuthenticated) {
// 		return <Navigate to="/loginAdmin" />;
// 	}

// 	if (requiredRole && role !== requiredRole) {
// 		return <Navigate to="/" />;
// 	}

// 	return <>{children}</>;
// };

const queryClient = new QueryClient();

function PrivateRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: "admin" }) {
	const auth = useAuth();
	if (!auth.isAuthenticated) {
		return <Navigate to="/loginadmin" />;
	}
	if (requiredRole && auth.role !== requiredRole) {
		return <Navigate to="/" />;
	}
	return <>{children}</>;
}

function App() {
	// const location = useLocation();

	// // Условие для скрытия Header и Footer на определенных страницах
	// const showHeaderFooter = !(
	// 	location.pathname === '/dashboard' ||
	// 	location.pathname.startsWith('/races') ||
	// 	location.pathname.startsWith('/cities') ||
	// 	location.pathname.startsWith('/passengers') ||
	// 	location.pathname.startsWith('/tickets')
	// );

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Router>
					{/* Условное отображение Header */}
					{<Header />}

					<Routes>
						<Route path="/loginAdmin" element={<LoginPage />} />

						{/* Основные страницы */}
						<Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
						<Route path="/cities" element={<PrivateRoute><CitiesPage /></PrivateRoute>} />
						<Route path="/races" element={<PrivateRoute><RacesPage /></PrivateRoute>} />
						<Route path="/passengers" element={<PrivateRoute><PassengersPage /></PrivateRoute>} />
						<Route path="/tickets" element={<PrivateRoute><TicketsPage /></PrivateRoute>} />

						{/* Страницы для администратора */}
						<Route path="/users" element={<PrivateRoute requiredRole="admin"><UsersPage /></PrivateRoute>} />
						<Route path="/users/new" element={<PrivateRoute requiredRole="admin"><UserForm /></PrivateRoute>} />
						<Route path="/users/edit/:id" element={<PrivateRoute requiredRole="admin"><UserForm /></PrivateRoute>} />
						<Route path="/cities/new" element={<PrivateRoute requiredRole="admin"><CityForm /></PrivateRoute>} />
						<Route path="/cities/edit/:id" element={<PrivateRoute requiredRole="admin"><CityForm /></PrivateRoute>} />
						<Route path="/races/new" element={<PrivateRoute requiredRole="admin"><RaceForm /></PrivateRoute>} />
						<Route path="/races/edit/:id" element={<PrivateRoute requiredRole="admin"><RaceForm /></PrivateRoute>} />
						<Route path="/passengers/new" element={<PrivateRoute requiredRole="admin"><PassengerForm /></PrivateRoute>} />
						<Route path="/passengers/edit/:id" element={<PrivateRoute requiredRole="admin"><PassengerForm /></PrivateRoute>} />
						<Route path="/tickets/new" element={<PrivateRoute requiredRole="admin"><TicketForm /></PrivateRoute>} />
						<Route path="/tickets/edit/:id" element={<PrivateRoute requiredRole="admin"><TicketForm /></PrivateRoute>} />
					</Routes>

					{/* Условное отображение IndexComp */}
					{<IndexComp />}

					{/* Условное отображение Footer */}
					{<FooterComp />}
				</Router>
			</AuthProvider>
		</QueryClientProvider>
	);
}

export default App;