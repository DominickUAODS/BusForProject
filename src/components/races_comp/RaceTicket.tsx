import "./RaceTicket.css";
import City from "../../models/City";
import uaMonthNames from "../../ua_localize/uaMonthNames";

type RaceProps = {
    city_from: City;
    city_to: City;
    time_start: Date;
    time_end: Date;
    cost: number;
}

export default function RaceTicket(race: RaceProps) {
    const timeStart: Date = new Date(race.time_start);
    const timeEnd: Date = new Date(race.time_end);
    const totalTime: Date = new Date(timeEnd.getTime() - timeStart.getTime());

    return (
        <div className="race-ticket-wrapper">
            <span className="no-print-chip">Без роздруковування</span>
            <div className="race-ticket">
                <div className="race-ticket-column">
                    <div className="race-ticket-row">
                        <span className="race-ticket-time">{timeStart.getHours()}:{timeStart.getMinutes().toString().padStart(2, "0")}</span>
                        <span className="race-ticket-date-chip">{timeStart.getDate()} {uaMonthNames[timeStart.getMonth()].slice(0, 3)}.</span>
                        <span className="race-ticket-total-time">{totalTime.getHours()} год. {totalTime.getMinutes()} хв в дорозі</span>
                    </div>
                    <div className="race-ticket-row">
                        <span className="race-ticket-city">{race.city_from.name_ua}</span>
                    </div>
                </div>
                <div className="race-ticket-column">
                    <div className="race-ticket-row">
                        <span className="race-ticket-time">{timeEnd.getHours()}:{timeEnd.getMinutes().toString().padStart(2, "0")}</span>
                        <span className="race-ticket-date-chip">{timeEnd.getDate()} {uaMonthNames[timeEnd.getMonth()].slice(0, 3)}.</span>
                    </div>
                    <div className="race-ticket-row">
                        <span className="race-ticket-city">{race.city_to.name_ua}</span>
                    </div>
                </div>
                <div className="race-ticket-column-cost">
                    <div  className="race-ticket-row-cost">
                        <button className="race-ticket-book-button">
                            <span className="race-ticket-book-title">Забронювати на Busfor</span>
                            <span className="race-ticket-book-cost">{race.cost}
                                <span className="race-ticket-book-currency">грн</span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
