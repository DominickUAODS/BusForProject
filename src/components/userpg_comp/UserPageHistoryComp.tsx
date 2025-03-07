import PreviousTickets from "../tickets_comp/PreviousTickets";
import "./UserPageHistoryComp.css"
import UserPgPreHeader from "./UserPgPreHeader";
export default function UserPageHistoryComp(){
return(
    <div className="u-p-f">
            <UserPgPreHeader/>
            <div className="Grid__GridContainer-qcjdad-0 frLZaI">
                <div className="Styled__Title-sc-1bdw08h-2 hHjola">
                    Історія поїздок
                </div>
                <div>
                    <div>
                        <PreviousTickets/>
                    </div>
                </div>
            </div>
    </div>
    );
}