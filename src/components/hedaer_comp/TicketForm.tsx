import "./TicketForm.css";
import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import Page from "../../models/Page";
import City from "../../models/City";

export default function TicketForm() {
    const day = 1000 * 60 * 60 * 24;
    const uaMonthNames: string[] = [
        "січня",
        "лютого",
        "березня",
        "квітня",
        "травня",
        "червня",
        "липня",
        "серпня",
        "вересня",
        "жовтня",
        "листопада",
        "грудня",
    ]

    const [cities, setCities] = useState<City[]>([]);
    const [date, setDate] = useState<Date>(new Date(Date.now() + day));
    const [openDatepicker, setOpenDatepicker] = useState<boolean>(false);

    const fromRef = useRef(null);
    const toRef = useRef(null);

    const updateCities = async () => {
        const response: Response = await fetch(`${import.meta.env.VITE_API_SERVER}/cities/?page_size=100`);
        if (!response.ok) {
            const error: Error = await response.json();
            throw error;
        }
        const page: Page<City> = await response.json();
        const newCities: City[] = page.results;
        setCities(newCities);
        fromRef.current!.value = newCities.find(city => city.name_ua === "Київ")?.id.toString() ?? "1";
        toRef.current!.value = newCities.find(city => city.name_ua === "Одеса")?.id.toString() ?? "1";
    }

    useEffect(() => {
        updateCities();
    }, [])

    return (
        <div className="ticket-form">
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
                        <div></div>
                    </div>
                </div>
                <div className="button-switch" onClick={() => {[fromRef.current!.value, toRef.current!.value] = [toRef.current!.value, fromRef.current!.value]}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(249, 37, 63)" className="bi bi-arrow-left-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5" />
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
                                    <input type="text" id="on" className="form-field--datepicker" value={date.getDate() + " " + uaMonthNames[date.getMonth()]} onClick={() => setOpenDatepicker(true)} />
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(249, 37, 63)" className="calendar-icon bi bi-calendar-heart" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM1 14V4h14v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1m7-6.507c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
                                        </svg>
                                    </div>
                                </span>
                            </div>
                        </span>
                    </span>
                    <div className="overlay">
                        <button type="button" onClick={() => setDate(new Date(Date.now() + day))} className="buttom-tommorow">Завтра</button>
                        <button type="button" onClick={() => setDate(new Date(Date.now() + day * 2))} className="button-tommorowX2">Післязавтра</button>
                        <button type="button" onClick={() => setOpenDatepicker(true)} className="button-all-days">Всі дні</button>
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
                            minDate={new Date()}
                        />
                        <button className="date-picker-close-button"  onClick={() => setOpenDatepicker(false)}>Cancel</button>
                    </div>
                )}
            </div>
            <div className="field-psngrs">
                <div>
                    <div>
                        <div className="field-psngrs-info"> {/*passengers for form*/}
                            <label className="field-psngrs-info-label">Пасажири</label>
                            <span className="span-input-field-psngrs">
                                <input type="text" id="passengers" value="1 дорослий" />
                            </span>
                        </div>
                        <label className="label-for-psngrs">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="rgb(249, 37, 63)" className="psngrs-i bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                            </svg>
                        </label>
                    </div>
                </div>
            </div>
            <div className="btn-search">
                <button className="button-to-search" role="button" id="submit">
                    <span>Знайти квиток</span>
                </button>
            </div>
        </div>
    );
}