import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../helpers/AuthProvider";
import { jwtDecode } from "jwt-decode";
import "./PassengerComponent.css"
const API_SERVER = import.meta.env.VITE_API_SERVER;

type PsngrCompProps={
    psngr_id?:number;
    onDelete?: (id: number) => void;
}

export default function PassengerComponent({psngr_id,onDelete}:PsngrCompProps){
     const authContext = useContext(AuthContext);
     const accessToken = authContext?.accessToken;
     const [psngr,setPsngr] = useState<any>(null);
     const handleDeletePassenger = async () => {
        if (!accessToken) {
            console.error("Нет токена для авторизации");
            return;
        }

        try {
            const response = await fetch(`${API_SERVER}/passengers/${psngr_id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Ошибка удаления пассажира');
            }

            console.log("Пассажир удален успешно");
            if (onDelete) {
                onDelete(psngr_id!); 
              }
            setPsngr(null); 

        } catch (error) {
            console.error("Ошибка при удалении пассажира:", error);
        }
    };
      useEffect(() => {
             if (accessToken) {
                 try {
                     const decodedToken: any = jwtDecode(accessToken);
                     const userId = decodedToken.user_id;
         
                     if (!userId) {
                         console.error('userId не найден в токене');
                         return;
                     }
         
                     const fetchPassengerById = async () => {
                         try {
                             const response = await fetch(`${API_SERVER}/passengers/${psngr_id}`, {
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
         
                             if (data) { 
                                 setPsngr(data); 
                             }
                         } catch (error) {
                             console.error("Ошибка при получении пассажира:", error);
                         }
                     };
         
                     fetchPassengerById();
                 } catch (error) {
                     console.error("Ошибка декодирования токена:", error);
                 }
             }
         }, [accessToken]);
    return(
    <div className="Styled__Passenger-sc-11a7dgc-6 bUqoGt">
        <div className="Styled__Info-sc-11a7dgc-5 dTaPQg">
            <svg width="15" height="16" viewBox="0 0 15 16" fill="rgb(249, 37, 63" xmlns="http://www.w3.org/2000/svg" className="Styled__Person-sc-11a7dgc-0 lgnPAG">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.178 7.78a3.89 3.89 0 1 0 0-7.78 3.89 3.89 0 0 0 0 7.78zm0-1.203a2.687 2.687 0 1 1 0-5.375 2.687 2.687 0 0 1 0 5.375zm7.178 7.178v1.644a.601.601 0 1 1-1.203 0v-1.644a2.687 2.687 0 0 0-2.687-2.688H3.89a2.687 2.687 0 0 0-2.688 2.688v1.644a.601.601 0 1 1-1.202 0v-1.644a3.89 3.89 0 0 1 3.89-3.89h6.576a3.89 3.89 0 0 1 3.89 3.89z"></path>
            </svg>
            <span>{psngr?.first_name} {" "} {psngr?.last_name}</span>
        </div>
        <svg onClick={handleDeletePassenger} 
            style={{ cursor: 'pointer' }}
            width="14" 
            height="16" 
            viewBox="0 0 14 16" 
            fill="rgb(249, 37, 63" 
            xmlns="http://www.w3.org/2000/svg" className="Styled__Delete-sc-11a7dgc-1 HlbTb"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.672 2.495H9.164V1.138c0-.322-.115-.592-.344-.81A1.135 1.135 0 0 0 8.01 0H5.327c-.312 0-.582.11-.81.327a1.076 1.076 0 0 0-.344.811v1.357H.665a.48.48 0 0 0-.351.148.48.48 0 0 0-.148.351c0 .135.049.252.148.351a.48.48 0 0 0 .35.148h.687l1.154 11.54c.03.27.148.5.35.686.203.187.44.281.71.281h6.207c.27 0 .507-.094.71-.28a1.01 1.01 0 0 0 .335-.687l1.17-11.54h.685a.48.48 0 0 0 .351-.148.48.48 0 0 0 .148-.35.48.48 0 0 0-.148-.352.48.48 0 0 0-.35-.148zm-7.5-1.357a.15.15 0 0 1 .046-.109.15.15 0 0 1 .11-.047H8.01a.15.15 0 0 1 .109.047.15.15 0 0 1 .047.11v1.356H5.17V1.138zM9.833 14.94c0 .02-.008.036-.023.046a.075.075 0 0 1-.04.016H3.566c-.01 0-.023-.008-.039-.023-.015-.016-.023-.029-.023-.04L2.364 3.494h8.609L9.834 14.94z"></path>
        </svg>
    </div>
    );
}