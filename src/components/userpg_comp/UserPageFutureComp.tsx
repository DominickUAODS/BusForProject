
import "./UserPageFutureComp.css";
import TicketForm from "../hedaer_comp/TicketForm";
import UserPgPreHeader from "./UserPgPreHeader";

export default function UserPageFutureComp() {
    return (
        <div className="u-p-h">
            <UserPgPreHeader />
            <div className="Grid__GridContainer-qcjdad-0 frLZaI">
                <div className="search-block">
                    <div className="Styled__Title-sc-1vg1nn2-0 iEAUJq">У вас поки немає майбутніх поїздок</div>
                    <div className="Styled__Caption-sc-1vg1nn2-1 lbrxpO">Щоб знайти квитки на автобус, виберіть напрямок, дату поїздки та кількість пасажирів</div>
                    <div className="u-p-h-div-form">
                        <TicketForm customClass="history-page-style" />
                    </div>
                </div>
            </div>
        </div>
    );
};