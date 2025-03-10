
import { useNavigate, useParams } from "react-router-dom";
import "./PlacesOnRaceComp.css"
import TcktPreHeader from "./TcktPreHeader";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../helpers/AuthProvider";
import { useContext, useEffect, useState } from "react";
const API_SERVER = import.meta.env.VITE_API_SERVER;


export default function PlacesOnRaceComp() {
    const { id } = useParams();
    const raceId = Number(id);
    const authContext = useContext(AuthContext);
    const accessToken = authContext?.accessToken;
    const [race, setRace] = useState<any>(null);
    const [cityFrom, setCityFrom] = useState<string | null>(null);
    const [cityTo, setCityTo] = useState<string | null>(null);
    const navigate = useNavigate();

    const generateTicketId = () => {
        return Math.floor(100000 + Math.random() * 900000); 
    };
    
    const checkTicketIdExists = async (id: number) => {
        try {
            const response = await fetch(`${API_SERVER}/tickets/${id}/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            return response.ok; 
        } catch (error) {
            console.error("Ошибка проверки ID билета:", error);
            return false;
        }
    };
    
    const handleNavigate = async () => {
        let ticketId = generateTicketId();
        while (await checkTicketIdExists(ticketId)) {
            ticketId = generateTicketId(); 
        }
    
        navigate(`/new/checkout/${ticketId}`);
    };

    useEffect(() => {
        if (accessToken) {
            try {
                const decodedToken: any = jwtDecode(accessToken);
                const userId = decodedToken.user_id;

                if (!userId) {
                    console.error("userId не найден в токене");
                    return;
                }

                const fetchRaceById = async () => {
                    try {
                        const response = await fetch(`${API_SERVER}/races/${raceId}/`, {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                                "Content-Type": "application/json",
                            },
                        });

                        if (!response.ok) {
                            throw new Error("Ошибка авторизации");
                        }

                        const data = await response.json();
                        console.log("Data from API: ", data);

                        if (data && typeof data === "object") {
                            setRace(data);
                            fetchCityName(data.city_from, setCityFrom);
                            fetchCityName(data.city_to, setCityTo);
                        } else if (data.results && Array.isArray(data.results)) {
                            setRace(data.results[0]); 
                        }
                    } catch (error) {
                        console.error("Ошибка при получении рейса:", error);
                    }
                };

                fetchRaceById();
            } catch (error) {
                console.error("Ошибка декодирования токена:", error);
            }
        }
    }, [accessToken, raceId]);

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

    return (
        <div>
            <TcktPreHeader />
            <div className="Style__Details-sc-1auetdh-0 dHEYr">
                <div className="checkout-details">
                    <div className="checkout-details__toggle">
                        <div className="responsive-container">
                            <div className="flex align-center justify-between">
                                <div className="checkout-details__content">
                                <div className="title">
                                        {cityFrom && cityTo ? `${cityFrom} — ${cityTo}` : 'Загрузка...'}
                                    </div>
                                    <div className="text">
                                    {race ? formatDate(race.time_start) : "Загрузка..."} 
                                        <span>
                                            <span className="price__ammount">
                                                {race?.cost} 
                                                <span className="price__fraction">
                                                    <span className="Currency__StyledCurrency-sc-1jdgn94-0 kVLNa currency">
                                                         грн
                                                    </span>
                                                </span>
                                            </span>
                                        </span>
                                        .
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <div className="my-text-primary pointer">
                                        <span>Показати подробиці</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="#f9253f"
                                            className="icon-arr bi bi-arrow-down-circle"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="responsive-container fittable">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="preorder__wrapper">
                            <div className="preorder">
                                <div className="preorder-seatmap__wrapper">
                                    <div className="preorder-seatmap">
                                        <div className="preorder-seatmap__title preorder-seatmap__title--free">
                                            <div className="preorder-seatmap__seat-select">
                                                <span>Вільна розсадка</span>
                                                <span></span>
                                            </div>
                                        <div className="preorder-seatmap__bus-model">
                                            <span>Автобус: </span>
                                            <span>
                                                <span>Neoplan N122</span>
                                                <div className="preorder__tooltip d-inline-block pointer">
                                                    <span>
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#818682" className="icon bi bi-info-circle" viewBox="0 0 16 16">
                                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                                                            </svg>
                                                        </div>
                                                    </span>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                <div className="preorder-seatmap__free">
                                    <p className="preorder-seatmap__free-seat-count">На рейсі всього {race?.places} місць</p>
                                </div>
                            </div>
                        </div>
                    <div className="Style__SeatMapButtonWrapper-sc-1ggx3ju-0 cwhlwq">
                        <button onClick = {handleNavigate}className="Styled__ResettedButton-sc-1dxewfu-0 Styled__ColoredButton-sc-1dxewfu-1 Styled__SizedButton-sc-1dxewfu-2 Styled__StyledButton-sc-1dxewfu-3 fehIwU preorder__submit preorder__submit--fixed" aria-disabled="false" role="button">
                            <span className="">Продовжити</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
    );
}
