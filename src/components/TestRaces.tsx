import { useEffect, useState } from "react"
import Page from "../models/Page";
import Race from "../models/Race";

export default function TicketForm() {
    const [races, setRaces] = useState<Race[]>([]);

    const fetchRaces = async () => {
        try{
            const response: Response = await fetch(`${import.meta.env.VITE_API_SERVER}/races/`);
            if (!response.ok) {
                const error: Error = await response.json();
                throw error;
            }
            const page: Page<Race> = await response.json();
            const newCities: Race[] = page.results;
            setRaces(newCities);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchRaces();
    }, [])

    return (
        <div style={{backgroundColor: "darkgray"}}>
            <span>First page: {JSON.stringify(races)}</span>
        </div>
    );
}
