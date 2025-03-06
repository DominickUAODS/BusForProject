import "./RacesComp.css";
import { useEffect, useState } from "react";
import Page from "../../models/Page";
import Race from "../../models/Race";
import { useLocation, useSearchParams } from "react-router-dom";
import RaceTicket from "./RaceTicket";
import uaMonthNames from "../../ua_localize/uaMonthNames";
import City from "../../models/City";

export default function RacesComp() {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    
    const city_from: string = searchParams.get("city_from") ?? "";
    const city_to: string = searchParams.get("city_to") ?? "";
    
    const date_str: string = searchParams.get("date") ?? "";
    const date: Date = new Date(date_str);
    const time_from: Date = new Date(date);
    time_from.setHours(0, 0, 0, 0);
    const time_to: Date = new Date(date);
    time_to.setHours(23, 59, 59, 999);
    const passengers: string = searchParams.get("passengers") ?? "";

    const [races, setRaces] = useState<Race[]>([]);
    const [city1, setCity1] = useState<City>();
    const [city2, setCity2] = useState<City>();

    const fetchRaces = async () => {
        try{
            const response: Response = await fetch(`${import.meta.env.VITE_API_SERVER}/races/?${new URLSearchParams({city_from, city_to, time_start_after: time_from.toISOString(), time_start_until: time_to.toISOString(), min_places: passengers})}`);
            if (!response.ok) {
                const error: Error = await response.json();
                throw error;
            }
            const page: Page<Race> = await response.json();
            const newRaces: Race[] = page.results;
            setRaces(newRaces);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCities = async () => {
        try{
            const response: Response = await fetch(`${import.meta.env.VITE_API_SERVER}/cities/${city_from}`);
            if (!response.ok) {
                const error: Error = await response.json();
                throw error;
            }
            const city_from_as_obj: City = await response.json();
            setCity1(city_from_as_obj);
        } catch (error) {
            console.log(error);
        }
        try{
            const response: Response = await fetch(`${import.meta.env.VITE_API_SERVER}/cities/${city_to}`);
            if (!response.ok) {
                const error: Error = await response.json();
                throw error;
            }
            const city_to_as_obj: City = await response.json();
            setCity2(city_to_as_obj);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCities();
        fetchRaces();
    }, [location]);

    return (
        <div className="races-wrapper">
            <div className="races-content">
                <span className="races-note-1">Квитки на автобус</span>
                <span className="races-direction">{city1?.name_ua} - {city2?.name_ua}</span>
                <span className="races-note-2">Виїзд та прибуття за місцевим часом</span>
                <span className="races-description">Розклад автобусів {city1?.name_ua} - {city2?.name_ua} на {date.getDate()} {uaMonthNames[date.getMonth()]}</span>
                {city1 && city2 && races.map((race) => (
                    <RaceTicket
                        key={race.id}
                        city_from={city1}
                        city_to={city2}
                        time_start={race.time_start}
                        time_end={race.time_end}
                        cost={race.cost}
                    />
                ))}
            </div>
        </div>
    );
}
