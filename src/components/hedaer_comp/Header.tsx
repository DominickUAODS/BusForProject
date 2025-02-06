import "./Header.css";
import PreHeader from "./PreHeader";
import logo from "../../assets/images/redirection-logo-bbc.svg";




export default function Header() {

	return (
		<div className="header">
           <PreHeader/>
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
					<div className="ticket-form">
						<div className="field-from">
							<div>
								<div className="field-from-v1">
									<div className="field-from-info"> {/*from for form*/}
										<label className="field-from-info-label">Звідки</label> 
										<span className="span-input-field-from">
											<input type="text" id="from" value=""/>
										</span>
									</div>
									<div></div>
								</div>
							</div>
							<div className="button-switch">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(249, 37, 63)" className="bi bi-arrow-left-right" viewBox="0 0 16 16">
  									<path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5"/>
								</svg>
							</div>
						</div>
						<div className="field-to">
							<div>
								<div className="field-to-v1">
									<div className="field-to-info"> {/*to for form*/}
									<label className="field-to-info-label">Куди</label>
									<span className="span-input-field-to">
										<input type="text"  id="to" value=""/>
									</span>
									</div>
								<div></div>
								</div>
							</div>
						</div>
						<div className="field-date">
							<div className="field-date-v1">
								<span>
									<span className="field-date-span">
										<div className="field-date-info"> {/*date for form*/}
											<label className="field-date-info-label">Дата поїздки</label>
											<span className="span-input-field-date">
												<input type="text"  id="on" className="form-field--datepicker"  value="4 лютого"/>
												<div>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(249, 37, 63)" className="calendar-icon bi bi-calendar-heart" viewBox="0 0 16 16">
  														<path fill-rule="evenodd" d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM1 14V4h14v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1m7-6.507c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
													</svg>
												</div>
											</span>
										</div>
									</span>
								</span>
								<div className="overlay">
									<button type="button" className="buttom-tommorow">Завтра</button>
									<button type="button" className="button-tommorowX2">Післязавтра</button>
									<button type="button" className="button-all-days">Всі дні</button>
								</div>
							</div>
						</div>
						<div className="field-psngrs">
							<div>
								<div>
									<div className="field-psngrs-info"> {/*passengers for form*/}
										<label className="field-psngrs-info-label">Пасажири</label>
										<span className="span-input-field-psngrs">
											<input type="text" id="passengers" value="1 дорослий"/>
										</span>
									</div>
									<label className="label-for-psngrs">
										<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="rgb(249, 37, 63)" className="psngrs-i bi bi-person" viewBox="0 0 16 16">
  											<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
										</svg>
									</label>
								</div>
							</div>
						</div>
						<div className="btn-search">
							<button className="button-to-search" role="button" id="submit">
								<span className="">Знайти квиток</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}