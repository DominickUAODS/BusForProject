import PreHeader from "../hedaer_comp/PreHeader";
import "./UserPageHistoryComp.css";
import customLogo from "../../assets/images/mainLogoHistory.png";

export default function UserPageHistoryComp()
{
    return(
        <div className="u-p-h">
        <PreHeader logoSrc={customLogo} backgroundColor="rgb(255, 255, 255)" />
        <div className="account-div">
            <div className="account-tabs-cont">
                <div className="account-tabs">
                    <div className="grid-cont">
                        <div className="tab-list">
                            <div className="Styled__TabWrapper-sc-1qjf3d7-2 eXYpNB">
                                <a aria-current="page" className="account__tab account__tab_active" href="/uk/new/account">Майбутні поїздки</a>
                            </div>
                            <div className="Styled__TabWrapper-sc-1qjf3d7-2 eXYpNB">
                                <a className="account__tab" href="/uk/new/account/history">Історія поїздок</a>
                            </div>
                            <div className="Styled__TabWrapper-sc-1qjf3d7-2 eXYpNB">
                                <a className="account__tab" href="/uk/new/account/customer">Контактна інформація</a>
                            </div>
                            <div className="Styled__TabWrapper-sc-1qjf3d7-2 eXYpNB">
                                <a className="account__tab" href="/uk/new/account/reviews">Відгуки</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Grid__GridContainer-qcjdad-0 frLZaI">
                <div className="search-block">
                    <div className="Styled__Title-sc-1vg1nn2-0 iEAUJq">У вас поки немає майбутніх поїздок</div>
                    <div className="Styled__Caption-sc-1vg1nn2-1 lbrxpO">Щоб знайти квитки на автобус, виберіть напрямок, дату поїздки та кількість пасажирів</div>
                    
                </div>
            </div>
        </div>
    </div>
    
    );

}