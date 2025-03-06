import PreHeader from "../hedaer_comp/PreHeader";
import customLogo from "../../assets/images/mainLogoHistory.png";
import { useLocation, useNavigate } from "react-router-dom";
import "./UserPgPreHeader.css"


export default function UserPgPreHeader(){
    const navigate = useNavigate();
    const location = useLocation();
    return(
        <div>
         <PreHeader logoSrc={customLogo} backgroundColor="rgb(255, 255, 255)" textColor="black" iconColorBurger = "rgb(249, 37, 63)" iconColor="rgb(249, 37, 63)" />
                <div className="account-div">
                    <div className="account-tabs-cont">
                        <div className="account-tabs">
                            <div className="grid-cont">
                                <div className="tab-list">
                                    <div className="Styled__TabWrapper-sc-1qjf3d7-2 eXYpNB" onClick={() => navigate("/new/account/future")}>
                                        <a aria-current="page" className="account__tab account__tab_active">Майбутні поїздки</a>
                                    </div>
                                    <div className="Styled__TabWrapper-sc-1qjf3d7-2 eXYpNB" onClick={() => navigate("/new/account/history")}>
                                        <a className="account__tab" href="/new/account/history">Історія поїздок</a>
                                    </div>
                                    <div className="Styled__TabWrapper-sc-1qjf3d7-2 eXYpNB" onClick={() => navigate("/new/account/contact")}>
                                        <a className="account__tab" href="/new/account/contact">Контактна інформація</a>
                                    </div>
                                    <div className="Styled__TabWrapper-sc-1qjf3d7-2 eXYpNB" onClick={() => navigate("/new/account/future")}>
                                        <a className="account__tab" href="/new/account/future">Відгуки</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}