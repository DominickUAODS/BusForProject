import { useContext, useEffect, useState } from "react";
import "./PreviousTickets.css"
const API_SERVER = import.meta.env.VITE_API_SERVER;
import { AuthContext } from "../../helpers/AuthProvider";
import { jwtDecode } from "jwt-decode";
type PreviousTicketsProps={
    ticket_id:number
}

export default function PreviousTickets({ticket_id}:PreviousTicketsProps){
    const authContext = useContext(AuthContext);
    const [ticket,setTicket] = useState<any>(null);
    const [race,setRace] = useState<any>(null);
    const isAuthenticated = authContext?.isAuthenticated;
    const [cities, setCities] = useState<{ id: number; name_ua: string }[]>([]);
    const accessToken = authContext?.accessToken;
    useEffect(() => {
        if (accessToken) {
            try {
                const decodedToken: any = jwtDecode(accessToken);
                const userId = decodedToken.user_id;

                if (!userId) {
                    console.error("userId не найден в токене ticket");
                    return;
                }

                const fetchTicket = async () => {
                    try {
                        const response = await fetch(`${API_SERVER}/tickets/${ticket_id}`, {
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
                        console.log("Data from API Ticket: ", data);

                        if (data) {
                            setTicket(data);
                            fetchRace(data.race); 
                        }
                    } catch (error) {
                        console.error("Ошибка при получении билетов:", error);
                    }
                };

                const fetchRace = async (race_id: string) => {
                    try {
                        const response = await fetch(`${API_SERVER}/races/${race_id}`, {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                                "Content-Type": "application/json",
                            },
                        });

                        if (!response.ok) {
                            throw new Error("Ошибка получения рейса");
                        }

                        const data = await response.json();
                        console.log("Data from API Race: ", data);

                        setRace(data);
                    } catch (error) {
                        console.error("Ошибка при получении рейса:", error);
                    }
                };

                fetchTicket();
            } catch (error) {
                console.error("Ошибка декодирования токена:", error);
            }
            const fetchAllCities = async () => {
                try {
                    let allCities: { id: number; name_ua: string }[] = [];
                    let page = 1;
                    let hasNextPage = true;
            
                    while (hasNextPage) {
                        const response = await fetch(`${API_SERVER}/cities?page=${page}`, {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                                "Content-Type": "application/json",
                            },
                        });
            
                        if (!response.ok) {
                            throw new Error("Ошибка получения городов");
                        }
            
                        const data = await response.json();
                        allCities = [...allCities, ...data.results]; 
            
                        if (data.next) {
                            page++;
                        } else {
                            hasNextPage = false; 
                        }
                    }
            
                    console.log("Все города:", allCities);
                    setCities(allCities);
                } catch (error) {
                    console.error("Ошибка при получении городов:", error);
                }
            };
            


                if (accessToken) {
                    fetchAllCities();
                }
        }
    }, [accessToken, ticket_id]);

    const getCityName = (cityId: number | undefined) => {
        if (!Array.isArray(cities)) return "Неизвестно"; 
        return cities.find(city => city.id === cityId)?.name_ua || "Неизвестно";
    };
    
    return(
        <div className="new-account__order">
            <div className="order-info">
                <div className="flex-1-1">
                    <div className="order-info__header">
                        <div className="direction">  {getCityName(race?.city_from)} - {getCityName(race?.city_to)}</div>
                            <div className="status">
                            {!ticket?.is_used ? (
                            <div className="status__item">
                                <div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#32c453" className="icon icon-ticket bi bi-check2-circle" viewBox="0 0 16 16">
                                            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                                            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                                        </svg>
                                    </div>
                                        Поїздка незабаром
                                </div>
                            </div>
                            ) : (
                                <div className="status__item">
                                <div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#32c453" className="icon icon-ticket bi bi-check2-circle" viewBox="0 0 16 16">
                                            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                                            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                                        </svg>
                                    </div>
                                        Поїздка завершена
                                </div>
                                </div>
                            )}
                        <div>
                            <div className="status__item">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f9253f" className="icon bi bi-ticket-perforated" viewBox="0 0 16 16">
                                        <path d="M4 4.85v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9z"/>
                                        <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3zM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9z"/>
                                    </svg>
                                </div>
                                <div>№ {ticket?.id}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-info__footer"></div>
                </div>
            </div>
            <div className="order-actions order-actions--triple">
                <div>
                    <a className="return btn btn-primary btn-link btn-return with-icon btn-square" href="/uk/new/account/orders/52830896/refund">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#f9253f" className="back-icon bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                            </svg>
                        </span>
                        <span>Повернути квиток</span>
                    </a>
                </div>
                <div>
                    <a className="review btn btn-primary btn-link btn-return with-icon btn-square" href="/uk/new/account/orders/52830896/comment">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#f9253f" className="review-i bi bi-chat" viewBox="0 0 16 16">
                                <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
                            </svg>
                        </span>
                        <span>Залишити відгук</span>
                    </a>
                </div>
                <div>
                    <a className="btn-again" href="/%D0%B0%D0%B2%D1%82%D0%BE%D0%B1%D1%83%D1%81%D0%B8/%D0%A5%D0%B5%D1%80%D1%81%D0%BE%D0%BD/%D0%9E%D0%B4%D0%B5%D1%81%D0%B0?from_id=4761&amp;on=2025-03-04&amp;passengers=1&amp;to_id=4252">
                        <button className="Styled__ResettedButton-sc-1dxewfu-0 Styled__ColoredButton-sc-1dxewfu-1 Styled__SizedButton-sc-1dxewfu-2 Styled__StyledButton-sc-1dxewfu-3 gMInnu" role="button">
                            <span className="">Шукати схожий квиток</span>
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}