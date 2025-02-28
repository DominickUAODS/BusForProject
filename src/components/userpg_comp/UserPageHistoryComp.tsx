import PreHeader from "../hedaer_comp/PreHeader";
import "./UserPageHistoryComp.css";
import customLogo from "../../assets/images/mainLogoHistory.png";

export default function UserPageHistoryComp()
{
    return(
        <div className="u-p-h">
            <PreHeader  logoSrc={customLogo}/>
            <div className="account">
                <div className="account-tabs-cont">
                    <div className="account-tabs">
                        <div className="grid-cont">
                            <div className="tab-list">

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );

}