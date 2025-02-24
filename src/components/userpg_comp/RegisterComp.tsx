import "./RegisterComp.css";

export default function RegisterComp(){

    return(
        <div className="register-comp">
            <div className="register-cont">
                <a  href="/" className="go-back-a">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f9253f" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
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
                            <form className="lk-login__form"> {/*форма реєстрації*/}
                                <div>
                                    <label className="lk-login__subtitle">E-mail</label>
                                    <div className="">
                                        <div className="form-group">
                                            <div>
                                                <input type="email" id="auth" name="email" value=""  placeholder="mygmail@gmail.com" className="auth__input lk-login__field"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lk-login__form-action">
                                        <div className="flex-1">
                                            <button className="Styled__ResettedButton-sc-1dxewfu-0 Styled__ColoredButton-sc-1dxewfu-1 Styled__SizedButton-sc-1dxewfu-2 Styled__StyledButton-sc-1dxewfu-3 gMInnu btn btn-primary btn-block" aria-disabled="false" role="button">
                                                <span className="Style__Title-oeifkd-0 dWlEuY">Надіслати код на пошту</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}