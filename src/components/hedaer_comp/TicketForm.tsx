import "./TicketForm.css";
import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import Page from "../../models/Page";
import City from "../../models/City";
import { useNavigate } from "react-router-dom";
import uaMonthNames from "../../ua_localize/uaMonthNames";
import getUaPassengersCountName from "../../ua_localize/getUaPassengersCountName";

type TicketFormProps = {
	customClass?: string;
};

export default function TicketForm({ customClass }: TicketFormProps) {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const day = 1000 * 60 * 60 * 24;
	const minAdults = 1;
	const minChildren = 0;

	const [cities, setCities] = useState<City[]>([]);
	const [date, setDate] = useState<Date>(new Date(Date.now() + day));
	const [openDatepicker, setOpenDatepicker] = useState<boolean>(false);
	const [adults, setAdults] = useState<number>(1);
	const [children, setChildren] = useState<number>(0);
	const [openPassengersModal, setOpenPassengersModal] = useState<boolean>(false);

	const navigate = useNavigate();

	const closeAllModals = () => {
		setOpenDatepicker(false);
		setOpenPassengersModal(false);
	};

	const fromRef = useRef<any>(null);
	const toRef = useRef<any>(null);

	const fetchCities = async () => {
		try {
			const response: Response = await fetch(`${API_SERVER}/cities/?page_size=100`);
			if (!response.ok) {
				const error: Error = await response.json();
				throw error;
			}
			const page: Page<City> = await response.json();
			const newCities: City[] = page.results;
			setCities(newCities);
			fromRef.current!.value = newCities.find(city => city.name_ua === "Київ")?.id.toString() ?? "1";
			toRef.current!.value = newCities.find(city => city.name_ua === "Одеса")?.id.toString() ?? "1";
		} catch {
			const errorCity: City = {
				id: 0,
				name_en: "Error",
				name_ua: "Помилка"
			}
			setCities([errorCity]);
		}
	};

	useEffect(() => {
		fetchCities();
	}, []);

	return (
		<div className={`ticket-form ${customClass || ""}`}>
			<div className="field-from">
				<div>
					<div className="field-from-v1">
						<div className="field-from-info"> {/*from for form*/}
							<label className="field-from-info-label">Звідки</label>
							<span className="span-input-field-from">
								<select ref={fromRef}>
									{cities.map(city => (
										<option key={city.id} value={city.id}>{city.name_ua}</option>
									))}
								</select>
							</span>
						</div>
					</div>
				</div>
				<div className="button-switch" onClick={() => { [fromRef.current!.value, toRef.current!.value] = [toRef.current!.value, fromRef.current!.value] }}>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(249, 37, 63)" className="bi bi-arrow-left-right" viewBox="0 0 16 16">
						<path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5" />
					</svg>
				</div>
			</div>
			<div className="field-to">
				<div>
					<div className="field-to-v1">
						<div className="field-to-info"> {/*to for form*/}
							<label className="field-to-info-label">Куди</label>
							<span className="span-input-field-to">
								<select ref={toRef}>
									{cities.map(city => (
										<option key={city.id} value={city.id}>{city.name_ua}</option>
									))}
								</select>
							</span>
						</div>
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
									<input type="text" id="on" className="form-field--datepicker" value={date.getDate() + " " + uaMonthNames[date.getMonth()]} onClick={() => { closeAllModals(); setOpenDatepicker(true); }} />
									<div>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(249, 37, 63)" className="calendar-icon bi bi-calendar-heart" viewBox="0 0 16 16">
											<path fillRule="evenodd" d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM1 14V4h14v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1m7-6.507c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
										</svg>
									</div>
								</span>
							</div>
						</span>
					</span>
					<div className="overlay">
						<button type="button" onClick={() => setDate(new Date(Date.now() + day))} className="buttom-tommorow">Завтра</button>
						<button type="button" onClick={() => setDate(new Date(Date.now() + day * 2))} className="button-tommorowX2">Післязавтра</button>
						<button type="button" onClick={() => { closeAllModals(); setOpenDatepicker(true); }} className="button-all-days">Всі дні</button>
					</div>
				</div>
				{openDatepicker && (
					<div className="date-picker-modal">
						<Calendar
							onChange={(value: any) => {
								setDate(value);
								setOpenDatepicker(false);
							}}
							value={date}
							minDate={new Date(Date.now())}
						/>
						<button className="date-picker-close-button" onClick={() => setOpenDatepicker(false)}>Cancel</button>
					</div>
				)}
			</div>
			<div className="field-psngrs">
				<div>
					<div>
						<div className="field-psngrs-info"> {/*passengers for form*/}
							<label className="field-psngrs-info-label">Пасажири</label>
							<span className="span-input-field-psngrs">
								<input type="text" id="passengers" value={(adults + children) + " " + getUaPassengersCountName(adults + children)} onClick={() => { closeAllModals(); setOpenPassengersModal(true); }} />
							</span>
						</div>
						<label className="label-for-psngrs">
							<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="rgb(249, 37, 63)" className="psngrs-i bi bi-person" viewBox="0 0 16 16">
								<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
							</svg>
						</label>
					</div>
				</div>
				{openPassengersModal && (
					<div className="passengers-modal">
						<div className="passengers-field">
							<span>Дорослий</span>
							<label className="label-for-adults-field">
								<svg aria-disabled={adults === minAdults} onClick={() => setAdults(adults - 1)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="adults-remove-i bi bi-dash-lg" viewBox="0 0 16 16">
									<path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
								</svg>
								<span>{adults}</span>
								<svg onClick={() => setAdults(adults + 1)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="adults-add-i bi bi-plus-lg" viewBox="0 0 16 16">
									<path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
								</svg>
							</label>
						</div>
						<hr />
						<div className="passengers-field">
							<span>Дитячий</span>
							<label className="label-for-children-field">
								<svg aria-disabled={children === minChildren} onClick={() => setChildren(children - 1)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="children-remove-i bi bi-dash-lg" viewBox="0 0 16 16">
									<path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
								</svg>
								<span>{children}</span>
								<svg onClick={() => setChildren(children + 1)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="children-add-i bi bi-plus-lg" viewBox="0 0 16 16">
									<path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
								</svg>
							</label>
						</div>
						<button className="passengers-modal-close-button" onClick={() => setOpenPassengersModal(false)}>Close</button>
					</div>
				)}
			</div>
			<div className="btn-search">
				<button className="button-to-search" role="button" id="submit" onClick={() => navigate(`/races?${new URLSearchParams({ city_from: fromRef.current!.value, city_to: toRef.current!.value, date: date.toISOString(), passengers: (adults + children).toString() })}`)}>
					<span>Знайти квиток</span>
				</button>
			</div>
		</div>
	);
}