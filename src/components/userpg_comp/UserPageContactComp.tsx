import UserPgPreHeader from "./UserPgPreHeader";
import "./UserPageContactComp.css"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../helpers/AuthProvider";
import { jwtDecode } from "jwt-decode";
import PassengerComponent from "../tickets_comp/PassengerComponent";
const API_SERVER = import.meta.env.VITE_API_SERVER;


export default function UserPageContactComp(){
     const authContext = useContext(AuthContext);
     const accessToken = authContext?.accessToken;
     const [update,setUpdate] = useState<boolean>(false);
     const [psngrs,setPsngrs] = useState<any[]>([]);
     const [userEmail,setUserEmail] = useState<string>("");
     const [email, setEmail] = useState<string>(userEmail);
     const [error, setError] = useState("");
 
     const validateEmail = (email: string) => {
         if (!email.trim()) {
             return "Рядок e-mail не заповнений";
         }
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailRegex.test(email)) {
             return "Неправильний формат адреси ел. пошти";
         }
         return "";
     };
     const handleDeletePassenger = (deletedPassengerId: number) => {
        setPsngrs(prevPsngrs => prevPsngrs.filter(psngr => psngr.id !== deletedPassengerId));
      };
 
     const handleSave = async () => {
        const validationError = validateEmail(email);
        setError(validationError);
    
        if (!validationError) {
            if (accessToken) {
            try {
                const decodedToken: any = jwtDecode(accessToken);
                const userId = decodedToken.user_id;
    
                if (!userId) {
                    console.error('userId не найден в токене');
                    return;
                }
                const response = await fetch(`${API_SERVER}/users/${userId}/`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email }),
                });
    
                if (!response.ok) {
                    throw new Error('Ошибка при обновлении email');
                }
    
                const data = await response.json();
                console.log("Email обновлен:", data);
                setUpdate(false);

            } catch (error) {
                console.error("Ошибка при сохранении email:", error);
            }
        }
        }
    };
     useEffect(() => {
                  if (accessToken) {
                    
                      try {
                          const decodedToken: any = jwtDecode(accessToken);
                          const userId = decodedToken.user_id;
                          console.log(accessToken);
              
                          if (!userId) {
                              console.error('userId не найден в токене');
                              return;
                          }
              
                          const fetchPassengerByUserId = async () => {
                              try {
                                  const response = await fetch(`${API_SERVER}/passengers/`, {
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
                                      setPsngrs(data.results); 
                                  }
                              } catch (error) {
                                  console.error("Ошибка при получении пассажиров:", error);
                              }
                          };

                          const fetchEmailByUserId = async () => {
                            try {
                                const response = await fetch(`${API_SERVER}/users/${userId}`, {
                                    method: 'GET',
                                    headers: {
                                        'Authorization': `Bearer ${accessToken}`, 
                                    },
                                });
                         
                                if (!response.ok) {
                                    throw new Error('Ошибка авторизации');
                                }
                         
                                const data = await response.json();
                                
                                if (data && data.email) {
                                    const userEmail = data.email;
                                    setUserEmail(userEmail); 
                                    localStorage.setItem("userEmail", userEmail); 
                                }
                            } catch (error) {
                                console.error("Ошибка при получении email:", error);
                            }
                         };
                        

                          fetchEmailByUserId();
                          fetchPassengerByUserId();
                      } catch (error) {
                          console.error("Ошибка декодирования токена:", error);
                      }
                  }
              }, [accessToken]);
    return(
    <div className="u-p-c">
        <UserPgPreHeader/>
        <div className="Grid__GridContainer-qcjdad-0 frLZaI">
            <div className="Styled__Title-sc-1bdw08h-2 hHjola">Контактна інформація</div>
                <div className="Styled__CustomerFormContainer-ykh1ro-0 gZdraz">
                    {!update ? (
                        <div className="Styled__CustomerFormArea-ykh1ro-9 Styled__EmailArea-ykh1ro-10 euUqMb">
                        <div className="Styled__Description-ykh1ro-1 hTeUZH">На електронну пошту надсилаємо маршрутні квитанції</div>
                        <div>
                            <label className="m-verify-panel__form-label">E-mail</label>
                            <div className="form-group">
                                <input  disabled  type="text" className="form-control" placeholder="Не заповнено"  name="HAQlvN_3j_" value={userEmail}/>
                            </div>
                        </div>
                        <div className="Styled__Edit-ykh1ro-2 gegDgZ">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="Styled__Icon-ykh1ro-3 pRYsx">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.367 0L16 3.633l-7.904 7.904H4.463V7.904L12.367 0zM5.393 8.289v2.318h2.318l6.974-6.974-2.318-2.318-6.974 6.974zm7.997 5.758V9.61h.93v4.437A1.953 1.953 0 0 1 12.367 16H1.953A1.953 1.953 0 0 1 0 14.047V3.633C0 2.555.874 1.68 1.953 1.68H6.39v.93H1.953C1.388 2.61.93 3.068.93 3.633v10.414c0 .565.458 1.023 1.023 1.023h10.414c.565 0 1.023-.458 1.023-1.023z" fill="#F9253F"></path>
                            </svg>
                            <span onClick = {()=>setUpdate(true)}className="Styled__Text-ykh1ro-4 ejhQPT">Змінити</span>
                        </div>
                    </div>
                    ) :(
                        <div className="Styled__CustomerFormArea-ykh1ro-9 Styled__EmailArea-ykh1ro-10 euUqMb">
                        <div className="Styled__Description-ykh1ro-1 hTeUZH">
                            На електронну пошту надсилаємо маршрутні квитанції
                        </div>
                        <div>
                            <label className="m-verify-panel__form-label">E-mail</label>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className={!error ? 'form-control' : 'form-control has-error'}
                                    placeholder="Не заповнено"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {error && <label className="error control-label">{error}</label>}
                            </div>
                        </div>
                        <div className="Styled__SaveContainer-ykh1ro-5 fYCmnt">
                            <span onClick={() => setEmail(userEmail)} className="Styled__Button-ykh1ro-6 Styled__Cancel-ykh1ro-8 fMPFug">
                                Відміна
                            </span>
                            <span onClick={handleSave} className="Styled__Button-ykh1ro-6 Styled__Save-ykh1ro-7 iYRtyu">
                                Зберегти
                            </span>
                        </div>
                    </div>
                    )}
                    <div className="Styled__CustomerFormArea-ykh1ro-9 Styled__PhoneArea-ykh1ro-11 NpPKm">
                        <div className="Styled__Description-ykh1ro-1 hTeUZH">Телефоном ми зможемо зв'язатися з вами у разі відміни, перенесення рейсу або в інших критичних випадках</div>
                        <div>
                            <label className="m-verify-panel__form-label">Телефон</label>
                            <div className="form-group">
                                <div>
                                    <input disabled id="phone" name="phone" type="tel"  placeholder="380 __ ___ ____" className="auth__input" value="380938838068"/>
                                    <span className="auth__plus">+</span>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="Styled__Title-sc-1bdw08h-2 gWeyqy">Дані пасажирів</div>
            <div className="passengers-container">
                {psngrs.map((psngr: any) => (
                <PassengerComponent onDelete={handleDeletePassenger} key={psngr.id} psngr_id={psngr.id} />
                ))}
            </div>
        </div>
    </div>);
}