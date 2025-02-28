import { useState } from "react";
import "./PreHeader.css";
import "./BurgerMenu.css"
import logo from "../../assets/images/mainLogo-dark.png"; 
import { useNavigate } from "react-router-dom";


export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const navigate = useNavigate();
  return(
    <div className="burger-menu" onClick={() => setIsOpen(!isOpen)}>
        <div className="burger-menu2">
            <svg height="16" viewBox="0 0 25 16" width="25" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 1a1 1 0 0 1 1-1h23a1 1 0 0 1 0 2H1a1 1 0 0 1-1-1zm0 7a1 1 0 0 0 1 1h23a1 1 0 0 0 0-2H1a1 1 0 0 0-1 1zm0 7a1 1 0 0 0 1 1h23a1 1 0 0 0 0-2H1a1 1 0 0 0-1 1z" />
            </svg>
        </div>
        <div className={`menu ${isOpen ? "open" : ""}`}>
            <div className="burger-menu-comp">
                <div className="b-m-c-v0">
                    <div className="b-m-c-v0-v1">
                        <div className="burger-menu-header">
                            <div className="burger-menu-header-info">
                                <div className="b-m-h-i-img">
                                    <img src={logo} alt="header"/>
                                </div>
                                <div className="b-m-h-i-svg" onClick={() => setIsOpen(false)}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="Style__CrossImg-d8v3q6-5 ffAWor">
                                        <path d="M6 5.107L10.922.185a.632.632 0 0 1 .893.893L6.893 6l4.922 4.922a.631.631 0 1 1-.893.893L6 6.893l-4.922 4.922a.631.631 0 1 1-.893-.893L5.107 6 .185 1.078a.632.632 0 1 1 .893-.893L6 5.107z" fill="#F9253F"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="b-m-c-info">
                            <div className="b-m-c-i-0">
                            <a href="/" className="Style__LinkItem-ctbghn-9 eCQlBU" onClick={(e) => {
                                    e.stopPropagation(); // Останавливаем всплытие, чтобы не закрывалось всё меню
                                }}>
                                <div className="Style__LinkItemIcon-ctbghn-8 byOqhw">
                                    <div className="Style__BackgroundIcon-mn97w4-0 fqMibr"></div>
                                </div>Пошук квитків
                            </a>
                            <a 
                                className="Style__LinkItem-ctbghn-9 support-a" 
                                onClick={(e) => {
                                    e.stopPropagation(); // Останавливаем всплытие, чтобы не закрывалось всё меню
                                    setIsSupportOpen(!isSupportOpen);
                                }}
                            >
                                <div className="Style__LinkItemIcon-ctbghn-8 byOqhw">
                                    <div className="Style__BackgroundIcon-mn97w4-0 cyGrlG"></div>
                                </div>Служба підтримки
                                <div className="Style__Arrow-ctbghn-0 kzVjtg"></div>
                            </a>
                            <div className={`ReactCollapse--collapse ${isSupportOpen ? 'open' : 'closed'}`}>
                                <div className="ReactCollapse--content">
                                    <div className="Style__SupportDropdown-ctbghn-7 czFZVj">
                                        <a href="tel:+380445028889" className="Style__SupportPhone-ctbghn-5 iygtxu">
                                            <div className="section-header__dropdown-container__content-block__image">
                                                <img src="https://busfor.ua/assets/phone_logos/default-f6a0a0619e525a0baabff59cad62834decfd98652cd04ef8b669000f1fbe7d5e.svg" role="presentation" alt=""/>
                                            </div>+380 (44) 502-88-89
                                        </a>
                                        <a href="tel:+380504506578" className="Style__SupportPhone-ctbghn-5 iygtxu">
                                            <div className="section-header__dropdown-container__content-block__image">
                                                <img src="https://busfor.ua/assets/phone_logos/vodafone-2910c1552f97d490ba0cd325dbd5256449fea26076916a65225b88b52cd560bd.svg" role="presentation" alt=""/>
                                            </div>+380 (50) 450-65-78
                                        </a>
                                        <a href="tel:+380673513734" className="Style__SupportPhone-ctbghn-5 iygtxu">
                                            <div className="section-header__dropdown-container__content-block__image">
                                                <img src="https://busfor.ua/assets/phone_logos/kyivstar-01b810f0fac52c062101f09b9eed5aa44edbdc897573fd1b57d24efd3cbbbd7f.svg" role="presentation" alt=""/>
                                            </div>+380 (67) 351-37-34
                                        </a>
                                        <a href="tel:+380931701657" className="Style__SupportPhone-ctbghn-5 iygtxu">
                                            <div className="section-header__dropdown-container__content-block__image">
                                                <img src="https://busfor.ua/assets/phone_logos/lifecell-f2a4142bc782b285df653c2cd025f6562e5d5bb329b77a554c8adfb01788f6f7.svg" role="presentation" alt=""/>
                                            </div>+380 (93) 170-16-57
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <a  className="Style__LinkItem-ctbghn-9 eCQlBU" onClick={(e) => {
                                    e.stopPropagation(); 
                                    navigate("/new/account")
                                }}>
                                <div className="Style__LinkItemIcon-ctbghn-8 byOqhw">
                                    <div className="Style__BackgroundIcon-mn97w4-0 iaTXLO"></div>
                                </div>Особистий кабінет
                            </a>
                            </div>
                            <div className="Style__Section-ctbghn-3 hyGwuC">
                                <a href="/uk/faq" className="Style__Link-ctbghn-2 bAHAae" onClick={(e) => {
                                    e.stopPropagation(); // Останавливаем всплытие, чтобы не закрывалось всё меню
                                }}>Питання та відповіді</a>
                                <a href="/uk/press" className="Style__Link-ctbghn-2 bAHAae" onClick={(e) => {
                                    e.stopPropagation(); // Останавливаем всплытие, чтобы не закрывалось всё меню
                                }}>Співпраця</a>
                                <a href="/uk/about" className="Style__Link-ctbghn-2 bAHAae">Про нас</a>
                                <a href="/uk/blog" className="Style__Link-ctbghn-2 bAHAae">Блог</a>
                            </div>
                            <div className="Style__Section-ctbghn-3 hyGwuC">
                                <a href="#locale" className="Style__LocaleMenuLink-ctbghn-4 HiCWR"onClick={(e) => {
                                    e.stopPropagation(); // Останавливаем всплытие, чтобы не закрывалось всё меню
                                }}>Українська мова (UK)
                                    <div className="Style__Arrow-ctbghn-0 kzVjtg"></div>
                                </a>
                            </div>
                        </div>
                    </div>                        
                </div>
            </div>
        </div>
    </div>
  );

}