
import "./PreHeader.css";
import logo from "../../assets/images/mainLogo.svg"; 
export default function PreHeader() {

	return (
		<div className="pre-header">
            <img className = "logo-img" src={logo} alt="logo"/>
            <div className="menu">
                <div className="support">
                    <div className="support-img">
                    <svg  width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"  fill="#ffffff"  className="bi bi-headset" >
                        <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5"/>
                    </svg>
                    </div>
                    <span className="support-span">Служба підтримки</span>
                </div>
                <div className="account">
                    <div className="account-img">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 7.78c2.095 0 3.793-1.742 3.793-3.89C11.793 1.74 10.095 0 8 0S4.207 1.741 4.207 3.89c0 2.148 1.698 3.89 3.793 3.89zm0-1.203c-1.447 0-2.62-1.203-2.62-2.687 0-1.485 1.173-2.688 2.62-2.688s2.62 1.203 2.62 2.688c0 1.484-1.173 2.687-2.62 2.687z"></path>
                            <path d="M15 13.755v1.644a.594.594 0 0 1-.586.601.594.594 0 0 1-.586-.601v-1.644c0-1.485-1.174-2.688-2.621-2.688H4.793c-1.447 0-2.62 1.204-2.62 2.688v1.644a.594.594 0 0 1-.587.601.594.594 0 0 1-.586-.601v-1.644c0-2.149 1.698-3.89 3.793-3.89h6.414c2.095 0 3.793 1.742 3.793 3.89z">
                            </path>
                        </svg>
                    </div>
                    <span className="account-span">Особистий кабінет</span>
                </div>
                <div className="language-switch">
                    <div className="language-switch-box">
                        <span>Укр</span>
                        <div className="switcher-img">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 9.19l3.78-3.97a.69.69 0 0 1 1.01 0 .777.777 0 0 1 0 1.06l-4.285 4.5a.69.69 0 0 1-1.01 0l-4.286-4.5a.777.777 0 0 1 0-1.06.69.69 0 0 1 1.01 0L8 9.19z">
                            </path>
                        </svg>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	);
}