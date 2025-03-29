import "./TcktPreHaeder.css";
import PreHeader from "../hedaer_comp/PreHeader";
import customLogo from "../../assets/images/mainLogoHistory.png";
import { useLocation } from "react-router-dom";

export default function TcktPreHeader() {
	const location = useLocation();
	return (
		<div>
			<div>
				<PreHeader logoSrc={customLogo} backgroundColor="rgb(255, 255, 255)" textColor="black" iconColorBurger="rgb(249, 37, 63)" iconColor="rgb(249, 37, 63)" />
				<div className="Style__Root-sc-8or44v-3 bKAMRJ">
					<div className={`Style__Step-sc-8or44v-2 bwDVRZ ${["/preloaders/seats", "/new/checkout", "/new/done/ticket"].some(path => location.pathname.startsWith(path))
						? "bwDVRZ-active"
						: ""
						}`}>
						<div className="Style__StepText-sc-8or44v-1 guEUQo">Вибір рейсу</div>
						<div className="Style__StepArrow-sc-8or44v-0 hPTOik"></div>
					</div>
					<div className={`Style__Step-sc-8or44v-2 cUrbmx ${["/new/checkout", "/new/done/ticket"].some(path => location.pathname.startsWith(path))
						? "cUrbmx-active"
						: ""
						}`}>
						<div className="Style__StepText-sc-8or44v-1 guEUQo">Пасажири</div>
						<div className="Style__StepArrow-sc-8or44v-0 hPTOik"></div>
					</div>
					<div className={`Style__Step-sc-8or44v-2 cUrbmx ${["/new/done/ticket"].some(path => location.pathname.startsWith(path))
						? "cUrbmx-active"
						: ""
						}`}>
						<div className="Style__StepText-sc-8or44v-1 guEUQo">Ваш квиток</div>
					</div>
				</div>
			</div>

		</div>

	);
};