import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
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
import IndexComp from './main_components/Index';
import RacesComp from "./components/races_comp/RacesComp";
import RegisterComp from './components/userpg_comp/RegisterComp';
import UserPageFutureComp from './components/userpg_comp/UserPageFutureComp';
import UserPageHistoryComp from "./components/userpg_comp/UserPageHistoryComp";
import UserPageContactComp from "./components/userpg_comp/UserPageContactComp";
import { AuthProvider, useAuth } from "./helpers/AuthProvider";
import './App.css';
import PlacesOnRaceComp from "./components/ticketing_comp/PlacesOnRaceComp";
import TicketingComp from "./components/ticketing_comp/TicketingComp";
import TcktOnGmail from "./components/ticketing_comp/TcktOnGmail";

const queryClient = new QueryClient();

function PrivateRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: "admin" }) {
	const auth = useAuth();
	if (!auth.isAuthenticated) {
		return <Navigate to="/login" />;
	}
	if (requiredRole && auth.role !== requiredRole) {
		return <Navigate to="/" />;
	}
	return <>{children}</>;
}


function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Router>
					<Routes>
						<Route path="/" element={<IndexComp />} />
						<Route path="/races" element={<RacesComp />} />

						<Route path="/new/account" element={<RegisterComp />} />
						<Route path="/new/account/future" element={<UserPageFutureComp />} />
						<Route path="/new/account/history" element={<UserPageHistoryComp />} />
						<Route path="/new/account/contact" element={<UserPageContactComp/>} />
						<Route path="/preloaders/seats/:id" element={<PlacesOnRaceComp/>}/>
						<Route path = "/new/checkout/:id/:raceId" element={<TicketingComp/>}/>
						<Route path = "/new/done/ticket/:ticketId" element={<TcktOnGmail/>}/>

						<Route path="/admin/login" element={<LoginPage />} />

						{/* Основные страницы */}
						<Route path="/admin/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
						<Route path="/cities" element={<PrivateRoute><CitiesPage /></PrivateRoute>} />
						<Route path="/racess" element={<PrivateRoute><RacesPage /></PrivateRoute>} />
						<Route path="/passengers" element={<PrivateRoute><PassengersPage /></PrivateRoute>} />
						<Route path="/tickets" element={<PrivateRoute><TicketsPage /></PrivateRoute>} />

						{/* Страницы для администратора */}
						<Route path="/users" element={<PrivateRoute requiredRole="admin"><UsersPage /></PrivateRoute>} />
						<Route path="/users/new" element={<PrivateRoute requiredRole="admin"><UserForm /></PrivateRoute>} />
						<Route path="/users/edit/:id" element={<PrivateRoute requiredRole="admin"><UserForm /></PrivateRoute>} />
						<Route path="/cities/new" element={<PrivateRoute requiredRole="admin"><CityForm /></PrivateRoute>} />
						<Route path="/cities/edit/:id" element={<PrivateRoute requiredRole="admin"><CityForm /></PrivateRoute>} />
						<Route path="/racess/new" element={<PrivateRoute requiredRole="admin"><RaceForm /></PrivateRoute>} />
						<Route path="/racess/edit/:id" element={<PrivateRoute requiredRole="admin"><RaceForm /></PrivateRoute>} />
						<Route path="/passengers/new" element={<PrivateRoute requiredRole="admin"><PassengerForm /></PrivateRoute>} />
						<Route path="/passengers/edit/:id" element={<PrivateRoute requiredRole="admin"><PassengerForm /></PrivateRoute>} />
						<Route path="/tickets/new" element={<PrivateRoute requiredRole="admin"><TicketForm /></PrivateRoute>} />
						<Route path="/tickets/edit/:id" element={<PrivateRoute requiredRole="admin"><TicketForm /></PrivateRoute>} />
					</Routes>

				</Router>
			</AuthProvider>
		</QueryClientProvider>
	);
};

export default App;