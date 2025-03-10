import TcktPreHeader from "./TcktPreHeader";
import "./TicketingComp.css"

export default function TicketingComp(){
    return(
        <div>
            <TcktPreHeader />
            <div className="m-b-4"></div>
            <div className="responsive-container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-grid-reset">
                        <form>
                            <div className="Style__Checkout-sc-1jldyf0-0 krzuFL checkout col-md-8">
                                <div className="m-verify-panel__item checkout-panel">
                                    <div className="row-slim m-verify-panel__item-row">
                                        <div className="col-xs-12">
                                            <h5 className="m-t-0 m-b-0 h4">Оформлення квитка</h5>
                                        </div>
                                    </div>
                                <div className="row-slim">
                                    <div className="col-md-12">
                                        <div className="row-slim">
                                            <div className="col-md-6 col-sm-6 col-xs-6">
                                                <label className="m-verify-panel__form-label">Ім'я</label>
                                                <div className="form-group">
                                                    <div className="">
                                                        <div>
                                                            <div>
                                                                <input id="checkout_passenger1_1021051141151169511097109101" type="text" className="form-control" placeholder="Іван"  name="VNUGIXqXP_" value=""/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6 col-xs-6">
                                                <label className="m-verify-panel__form-label">Прізвище</label>
                                                <div className="form-group">
                                                    <div className="">
                                                        <div>
                                                            <div>
                                                                <input id="checkout_passenger1_108971151169511097109101" type="text" className="form-control" placeholder="Франко"   name="yzFaJ_t3P-_" value=""/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row-slim"></div>
                                <div className="checkout-seatmap__wrapper">
                                    <p>Місце в автобусі</p>
                                    <div className="checkout-seatmap checkout__seatmap">
                                        <div className="checkout-seatmap__item">
                                            <div className="row-slim"><div><div className="verify-panel__picker">
                                                <div className="verify-panel__picker-btn disabled">
                                                    <button type="button" className="btn free">
                                                        <span>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="icon icon-seat-v2 bi bi-luggage" viewBox="0 0 16 16">
                                                                <path d="M2.5 1a.5.5 0 0 0-.5.5V5h-.5A1.5 1.5 0 0 0 0 6.5v7a1.5 1.5 0 0 0 1 1.415v.335a.75.75 0 0 0 1.5 0V15H4v-1H1.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5V7h1v-.5A1.5 1.5 0 0 0 6.5 5H6V1.5a.5.5 0 0 0-.5-.5zM5 5H3V2h2z"/>
                                                                <path d="M3 7.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0zM11 6a1.5 1.5 0 0 1 1.5 1.5V8h2A1.5 1.5 0 0 1 16 9.5v5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 14.5v-5A1.5 1.5 0 0 1 6.5 8h2v-.5A1.5 1.5 0 0 1 10 6zM9.5 7.5V8h2v-.5A.5.5 0 0 0 11 7h-1a.5.5 0 0 0-.5.5M6 9.5v5a.5.5 0 0 0 .5.5H7V9h-.5a.5.5 0 0 0-.5.5m7 5.5V9H8v6zm1.5 0a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5H14v6z"/>
                                                            </svg>
                                                        </span>
                                                        <span className="verify-panel__picker-description">Вільна розсадка</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="checkout-panel checkout__customer">
                        <p className="checkout__customer-title">Інформація про покупця</p>
                        <p className="checkout__customer-text">Вказуйте коректні e-mail та номер телефону, тому що вони необхідні для ідентифікації користувача, отримання квитка, можливості авторизації в особистому кабінеті та можливості повернути квиток</p>
                        <div className="checkout__customer-form">
                            <div className="col-md-6 col-sm-6 col-xs-6">
                                <label className="m-verify-panel__form-label">E-mail</label>
                                <div className="form-group">
                                    <input id="checkout_email" type="email" className="form-control" placeholder="ashevchenko@gmail.com"  name="" value=""/>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-6">
                                <label className="m-verify-panel__form-label">Телефон</label>
                                <div className="form-group">
                                    <div>
                                        <input id="checkout_phone" name="phone" type="tel"    placeholder="380 __ ___ ____" className="auth__input" value=""/>
                                        <span className="auth__plus text-muted">+</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="checkout__customer-promo checkout__custom-checkbox">
                            <div className="subscribe--new flat__form">
                                <div className="checkbox checkbox-primary verify-panel__checkbox">
                                    <input type="checkbox" id="checkbox-8a2088390baa6"/>
                                    <label>
                                        <i className="verify-panel__checkbox-icon"></i>
                                        <span>Надсилайте мені знижки та ідеї бюджетних подорожей</span>
                                    </label>
                                </div>
                            </div>
                            <span>У мене є промокод</span>
                        </div>
                    </div>
                    <div className="checkout-panel checkout__payment">
                        <div className="checkout__payment-header">
                            <span>До сплати</span>
                            <span>
                                <div className="text-center">
                                    <span className="price"><span className="price__ammount">650
                                        <span className="price__fraction">,00 
                                            <span className="Currency__StyledCurrency-sc-1jdgn94-0 kVLNa currency">грн</span>
                                        </span>
                                    </span>
                                </span>
                                </div>
                            </span>
                        </div>
                        <div className="checkout__payment-info">
                            <div className="checkout__payment-info-text">Ваші платіжні та особисті дані надійно захищені відповідно до міжнародних стандартів безпеки.</div>
                            <div className="checkout__payment-info-icons"><div className="filling-info__pay-item filling-info__pay-maestro"></div>
                            <div className="filling-info__pay-item filling-info__pay-mastercard"></div>
                            <div className="filling-info__pay-item filling-info__pay-visa"></div>
                        </div>
                        </div>
                        <div className="checkout__agreement checkout__custom-checkbox flat__form">
                            <div className="m-verify-panel__policy"><div className="checkbox checkbox-primary verify-panel__checkbox">
                                <input type="checkbox" id="checkbox-5572acde85dec"/>
                                <label>
                                    <i className="verify-panel__checkbox-icon"></i>
                                    <span>Я приймаю умови 
                                        <span data-type="agreement" className="interactive-link text-primary">публічної оферти</span>, 
                                        <span data-type="privacyPolicy" className="interactive-link text-primary">політики конфіденційності</span> і 
                                        <span data-type="refundPolicy" className="interactive-link text-primary">повернення</span>.
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="m-verify-panel__policy">
                            <div className="checkbox checkbox-primary verify-panel__checkbox">
                                <input type="checkbox" id="checkbox-eb4a326830f26"/>
                                <label>
                                    <i className="verify-panel__checkbox-icon"></i>
                                    <span>
                                        <span data-type="dataProcessingAgreement" className="interactive-link text-primary">Згода на обробку персональних даних</span>.
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="checkout-submit-btn">
                    <div>
                        <button type="submit" id="checkout_submit" className="btn btn-primary btn-sm disabled btn--checkout">Перейти до оплати
                        </button>
                    </div>
                    </div>
                    <div className="checkout__security">
                        <p className="checkout__security-text">Ваші платіжні та особисті дані надійно захищені.</p>
                        </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}