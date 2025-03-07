import "./PreviousTickets.css"

export default function PreviousTickets(){
    return(
        <div className="new-account__order">
            <div className="order-info">
                <div className="flex-1-1">
                    <div className="order-info__header">
                        <div className="direction">Херсон — Одеса</div>
                            <div className="status">
                                <div className="status__item">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#32c453" className="icon icon-ticket bi bi-check2-circle" viewBox="0 0 16 16">
                                            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                                            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                                        </svg>
                                    </div>
                                <div>
                                    Поїздка завершена
                            </div>
                        </div>
                        <div>
                            <div className="status__item">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f9253f" className="icon bi bi-ticket-perforated" viewBox="0 0 16 16">
                                        <path d="M4 4.85v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9z"/>
                                        <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3zM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9z"/>
                                    </svg>
                                </div>
                                <div>№ 52830896</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-info__footer"></div>
                </div>
            </div>
            <div className="order-actions order-actions--triple">
                <div>
                    <a className="btn btn-primary btn-link btn-return with-icon btn-square" href="/uk/new/account/orders/52830896/refund">
                        <span>
                            <i className="icon icon-arrw"></i>
                        </span>
                        <span>Повернути квиток</span>
                    </a>
                </div>
                <div>
                    <a className="btn btn-primary btn-link btn-return with-icon btn-square" href="/uk/new/account/orders/52830896/comment">
                        <span>
                            <i className="icon icon-bubble-simple-line-icons"></i>
                        </span>
                        <span>Залишити відгук</span>
                    </a>
                </div>
                <div>
                    <a className="btn-again" href="/%D0%B0%D0%B2%D1%82%D0%BE%D0%B1%D1%83%D1%81%D0%B8/%D0%A5%D0%B5%D1%80%D1%81%D0%BE%D0%BD/%D0%9E%D0%B4%D0%B5%D1%81%D0%B0?from_id=4761&amp;on=2025-03-04&amp;passengers=1&amp;to_id=4252">
                        <button className="Styled__ResettedButton-sc-1dxewfu-0 Styled__ColoredButton-sc-1dxewfu-1 Styled__SizedButton-sc-1dxewfu-2 Styled__StyledButton-sc-1dxewfu-3 gMInnu" role="button">
                            <span className="">Шукати схожий квиток</span>
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}