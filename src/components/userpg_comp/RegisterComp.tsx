import { useState } from "react";
import "./RegisterComp.css";
import { useNavigate } from "react-router-dom";

export default function RegisterComp() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [isCodeSent, setIsCodeSent] = useState(false);
    const navigate = useNavigate();

    // Функция отправки кода на email
    const sendCode = async () => {
        if (!email) {
            alert("Введіть e-mail");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:8000/send-code/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
                mode: "cors", 
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setIsCodeSent(true);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Помилка з'єднання:", error);
            alert("Сталася помилка, спробуйте ще раз.");
        }
    };
    

    // Функция проверки кода
    const verifyCode = async () => {
        if (!email || !code) {
            alert("Введіть e-mail та код");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/verify-code/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Код введен:", code);
                navigate("/new/account/history");
            } else {
                alert(data.error);
                setCode("");
            }
        } catch (error) {
            console.error("Помилка з'єднання:", error);
            alert("Сталася помилка, спробуйте ще раз.");
        }
    };

    return (
        <div className="register-comp">
            <div className="register-cont">
                <a href="/" className="go-back-a">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f9253f" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                    </svg>
                    <span className="go-back-span">Повернутись назад</span>
                </a>

                <div className="register-form">
                    <div className="register-form-table">
                    <div className="register-info">
                            <p className="lk-login__subtitle">В особистому кабінеті ви можете:</p>
                            <ul className="lk-login__action">
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f9253f" className="bi bi-check2" viewBox="0 0 16 16">
                                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                                    </svg>Викупити заброньований квиток
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f9253f" className="bi bi-check2" viewBox="0 0 16 16">
                                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                                    </svg>Переглянути інформацію про рейс
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f9253f" className="bi bi-check2" viewBox="0 0 16 16">
                                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                                    </svg>Завантажити куплений квиток
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f9253f" className="bi bi-check2" viewBox="0 0 16 16">
                                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                                    </svg>Повернути квитки
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f9253f" className="bi bi-check2" viewBox="0 0 16 16">
                                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                                    </svg>Залишити відгук про поїздку
                                </li>
                            </ul>
                            <p className="Style__Text-sc-12gsvzu-0 gywEcu">Умови 
                                <a className ="info-a" href="/agreement" target="_blank">публічної оферти</a> 
                                та 
                                <a className ="info-a" href="/personal-data" target="_blank">політики конфіденційності</a>.
                            </p>
                        </div>
                        <div className="register-form-gmail">
                            <div className="Style__Title-sc-1yhzwq5-8 eRZnvJ">Увійти або зареєструватися</div>
                            {/* Форма ввода email : Форма ввода кода */}
                            {!isCodeSent ? (
                            
                            <form className="lk-login__form">
                                <div>
                                    <label className="lk-login__subtitle">E-mail</label>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="mygmail@gmail.com"
                                            className="auth__input lk-login__field"
                                        />
                                    </div>
                                    <div className="lk-login__form-action">
                                        <button type="button" onClick={sendCode} className="btn btn-primary btn-block">
                                            Надіслати код на пошту
                                        </button>
                                    </div>
                                </div>
                            </form>
                            ):(

                            
                            <form className="lk-login__form">
                                <div className="Style__TextContainer-sc-1ykzu8y-0 eJiBVI">
                                    <p className="Style__Text-sc-1ykzu8y-1 SIeTo">Введіть код, відправлений на вашу пошту</p>
                                </div>
                                <div>
                                    <label className="lk-login__subtitle">Код підтвердження</label>
                                    <input
                                        type="text"
                                        className="form-control lk-login__field"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                    <div className="lk-login__form-action">
                                        <button type="button" onClick={verifyCode} className="btn btn-primary btn-block">
                                            Підтвердити
                                        </button>
                                    </div>
                                </div>
                            </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
