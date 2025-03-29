import TcktPreHeader from "./TcktPreHeader";
import "./TcktOnGmail.css"
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../helpers/AuthProvider";
const API_SERVER = import.meta.env.VITE_API_SERVER;

export default function TcktOnGmail() {
	const { ticketId } = useParams();
	const ticket_id = Number(ticketId);
	const authContext = useContext(AuthContext);
	const accessToken = authContext?.accessToken;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [, setTicket] = useState<any>(null);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [raceId, setRaceId] = useState<any>(null);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [passId, setPassId] = useState<any>(null);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [race, setRace] = useState<any>(null);
	const [cityFrom, setCityFrom] = useState<string | null>(null);
	const [cityTo, setCityTo] = useState<string | null>(null);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [psngr, setPsngr] = useState<any>(null);
	const navigate = useNavigate();


	useEffect(() => {
		if (!accessToken) return;

		const fetchData = async () => {
			try {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const decodedToken: any = jwtDecode(accessToken);
				const userId = decodedToken.user_id;

				if (!userId) {
					console.error("userId не найден в токене");
					return;
				}

				// 1. Загружаем билет
				const responseTicket = await fetch(`${API_SERVER}/tickets/${ticket_id}/`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
				});

				if (!responseTicket.ok) throw new Error("Ошибка при получении билета");

				const ticketData = await responseTicket.json();
				console.log("Ticket Data: ", ticketData);

				setTicket(ticketData);
				setRaceId(ticketData.race);
				setPassId(ticketData.passenger);

			} catch (error) {
				console.error("Ошибка при получении данных:", error);
			}
		};

		fetchData();
	}, [accessToken, ticket_id]);

	useEffect(() => {
		if (!raceId) return;

		const fetchRace = async () => {
			try {
				const response = await fetch(`${API_SERVER}/races/${raceId}/`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) throw new Error("Ошибка при получении рейса");

				const raceData = await response.json();
				console.log("Race Data: ", raceData);

				setRace(raceData);
				fetchCityName(raceData.city_from, setCityFrom);
				fetchCityName(raceData.city_to, setCityTo);
			} catch (error) {
				console.error("Ошибка при получении рейса:", error);
			}
		};

		fetchRace();
	}, [raceId]);

	useEffect(() => {
		if (!passId) return;

		const fetchPassenger = async () => {
			try {
				const response = await fetch(`${API_SERVER}/passengers/${passId}/`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) throw new Error("Ошибка при получении пассажира");

				const passengerData = await response.json();
				console.log("Passenger Data: ", passengerData);

				setPsngr(passengerData);
			} catch (error) {
				console.error("Ошибка при получении passenger:", error);
			}
		};

		fetchPassenger();
	}, [passId]);

	const fetchCityName = async (cityId: number, setter: (name: string) => void) => {
		try {
			const response = await fetch(`${API_SERVER}/cities/${cityId}/`, {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error('Ошибка при получении данных о городе');
			}

			const cityData = await response.json();
			setter(cityData.name_ua);
		} catch (error) {
			console.error(`Ошибка при загрузке города ${cityId}:`, error);
		}
	};

	const formatDate = (isoString: string): string => {
		const date = new Date(isoString);

		const months = [
			"січня", "лютого", "березня", "квітня", "травня", "червня",
			"липня", "серпня", "вересня", "жовтня", "листопада", "грудня"
		];

		const day = date.getUTCDate();
		const month = months[date.getUTCMonth()];
		const hours = date.getUTCHours().toString().padStart(2, "0");
		const minutes = date.getUTCMinutes().toString().padStart(2, "0");

		return `${day} ${month} У ${hours}:${minutes}  `;
	};


	const sendTicketByEmail = async () => {

		const userEmail = localStorage.getItem("userEmail");

		if (!userEmail) {
			alert("Не знайдено e-mail користувача");

			return;
		}

		try {
			const response = await fetch(`${API_SERVER}/send-ticket/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: userEmail,
					passenger: `${psngr?.last_name} ${psngr?.first_name}`,
					route: cityFrom && cityTo ? `${cityFrom} — ${cityTo}` : "Загрузка...",
					departure_time: race ? formatDate(race.time_start) : "Загрузка...",
					arrival_time: race ? formatDate(race.time_end) : "Загрузка...",
				}),
			});

			const data = await response.json();

			if (response.ok) {
				navigate("/");
			} else {
				alert(data.error || "Помилка відправки квитка");
			}
		} catch (error) {
			console.error("Помилка з'єднання:", error);
			alert("Сталася помилка, спробуйте ще раз.");
		}
	};

	return (
		<div>
			<TcktPreHeader />
			<div className="responsive-container fittable">
				<div className="row">
					<div className="col-xs-12"></div>
					<h5 className="h5-gmail-ticket">Вперед до нових подорожей!</h5>
					<h3>Ваш квиток:</h3>
					<div className="preorder__wrapper-cust">
						<div className="ticket-container">
							<div>
								<span>ПІ: <strong>{psngr?.last_name} {psngr?.first_name}</strong></span>
							</div>
							<div>
								<span>Напрямок: {cityFrom && cityTo ? `${cityFrom} — ${cityTo}` : 'Загрузка...'}</span>
							</div>
							<div>
								<span>Час відправки: {race ? formatDate(race.time_start) : "Загрузка..."}</span>
							</div>
							<div>
								<span>Планований час прибуття: {race ? formatDate(race.time_end) : "Загрузка..."}</span>
							</div>
							<div>
								<span>Квиток надійде на пошту: <strong>{localStorage.getItem("userEmail")}</strong></span>
							</div>
						</div>
						<div className="Style__SeatMapButtonWrapper-sc-1ggx3ju-0 cwhlwq">
							<button onClick={sendTicketByEmail} className="Styled__ResettedButton-sc-1dxewfu-0 Styled__ColoredButton-sc-1dxewfu-1 Styled__SizedButton-sc-1dxewfu-2 Styled__StyledButton-sc-1dxewfu-3 fehIwU preorder__submit preorder__submit--fixed" aria-disabled="false" role="button">
								<span className="">Все вірно</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}