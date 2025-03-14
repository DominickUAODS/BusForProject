import { useContext, useEffect, useState } from "react";
import PreviousTickets from "../tickets_comp/PreviousTickets";
import "./UserPageHistoryComp.css"
import UserPgPreHeader from "./UserPgPreHeader";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../helpers/AuthProvider";
const API_SERVER = import.meta.env.VITE_API_SERVER;

export default function UserPageHistoryComp(){
    const [tickets, setTickets] = useState([]);
    const authContext = useContext(AuthContext);
    const accessToken = authContext?.accessToken;

    useEffect(() => {
        if (accessToken) {
            try {
                const decodedToken: any = jwtDecode(accessToken);
                const userId = decodedToken.user_id;
    
                if (!userId) {
                    console.error('userId не найден в токене');
                    return;
                }
    
                const fetchTicketsByPassengerId = async () => {
                    try {
                        const response = await fetch(`${API_SERVER}/tickets/`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${accessToken}`,
                                'Content-Type': 'application/json',
                            },
                        });
    
                        if (!response.ok) {
                            throw new Error('Ошибка авторизации');
                        }
    
                        const data = await response.json();
                        console.log("Data from API: ", data); 
    
                        if (data.results) { 
                            setTickets(data.results); 
                        }
                    } catch (error) {
                        console.error("Ошибка при получении билетов:", error);
                    }
                };
    
                fetchTicketsByPassengerId();
            } catch (error) {
                console.error("Ошибка декодирования токена:", error);
            }
        }
    }, [accessToken]);
return(
    <div className="u-p-f">
            <UserPgPreHeader/>
            <div className="Grid__GridContainer-qcjdad-0 frLZaI">
                <div className="Styled__Title-sc-1bdw08h-2 hHjola">
                    Історія поїздок
                </div>
                <div>
                <div>
                {tickets.map((ticket:any) => (
                    <PreviousTickets key={ticket.id} ticket_id={ticket.id} />
                ))}
</div>

                </div>
            </div>
    </div>
    );
}