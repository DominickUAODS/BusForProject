import "./Header.css";
import PreHeader from "./PreHeader";
import logo from "../../assets/images/redirection-logo-bbc.svg";
import TicketForm from "./TicketForm";

export default function Header() {
	return (
		<div className="header">
           <PreHeader backgroundColor=" rgb(45, 209, 255)"/>
			<div className="header-data">
				<div className="header-info">
					<div className="header-info-title">
						<span className="redirection-info-title">Busfor приєднується до BlaBlaCar</span>
						<span className="redirection-info-subtitle">Такий самий широкий вибір автобусних поїздок.</span>
						<span className="redirection-info-subtitle">Тепер доступний на BlaBlaCar</span>
					</div>
					<div className="redirection-logo">
						<a href="https://www.blablacar.com.ua/bus">
							<img src={logo} alt="redirection-logo"/>
						</a>
					</div>
				</div>
				<div className="form-wrapper"> {/*form*/}
					<TicketForm />
				</div>
			</div>
		</div>
	);
}