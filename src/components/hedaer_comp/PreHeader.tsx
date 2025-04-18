
import "./PreHeader.css";
import logo from "../../assets/images/mainLogo.svg";
import { useContext, useEffect, useState } from "react";
import BurgerMenu from "./BurgerMenu";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthProvider";
const API_SERVER = import.meta.env.VITE_API_SERVER;
import { jwtDecode } from "jwt-decode";

interface PreHeaderProps {
	logoSrc?: string;
	backgroundColor?: string;
	textColor?: string
	iconColor?: string
	iconColorBurger?: string
}

export default function PreHeader({ logoSrc, backgroundColor, textColor, iconColor, iconColorBurger }: PreHeaderProps) {
	const [isSupportOpen, setIsSupportOpen] = useState(false);
	const navigate = useNavigate();
	const authContext = useContext(AuthContext);
	const isAuthenticated = authContext?.isAuthenticated;
	const [email, setEmail] = useState<string | null>(null);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const accessToken = authContext?.accessToken;

	const toggleDropdown = () => {
		setIsDropdownVisible(!isDropdownVisible);
		setIsSupportOpen(false);
	};

	useEffect(() => {
		if (accessToken) {
			try {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const decodedToken: any = jwtDecode(accessToken);
				const userId = decodedToken.user_id;
				console.log('Decoded userId:', userId);

				if (!userId) {
					console.error('userId не найден в токене');
					return;
				}

				const fetchEmailByUserId = async () => {
					try {
						const response = await fetch(`${API_SERVER}/users/${userId}`, {
							method: 'GET',
							headers: {
								'Authorization': `Bearer ${accessToken}`,
							},
						});

						if (!response.ok) {
							throw new Error('Ошибка авторизации');
						}

						const data = await response.json();

						if (data && data.email) {
							const userEmail = data.email;
							setEmail(userEmail);
							localStorage.setItem("userEmail", userEmail);
						}
					} catch (error) {
						console.error("Ошибка при получении email:", error);
					}
				};


				fetchEmailByUserId();
			} catch (error) {
				console.error("Ошибка декодирования токена:", error);
			}
		}
	}, [accessToken]);



	return (
		<div className="pre-header"
			style={{
				backgroundColor: backgroundColor || 'defaultColor',
			}}>
			<img onClick={() => navigate("/")} className="logo-img" src={logoSrc || logo} alt="logo" />

			{/* Бургер-меню */}
			<BurgerMenu iconColorBurger={iconColorBurger} />

			{/* Меню (скрывается на мобильных устройствах) */}
			<div className="menu">
				<div className="support" style={{
					color: textColor || 'defaultTextColor',
				}} onClick={(e) => {
					e.stopPropagation();
					setIsSupportOpen(!isSupportOpen);
					setIsDropdownVisible(false);
				}}>
					<div className="support-img">
						<svg width="16" height="16" viewBox="0 0 16 16" fill={iconColor}>
							<path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5" />
						</svg>
					</div>
					<span className="support-span">Служба підтримки</span>
					<div className={`drop-sup Style__Dropdown-sc-1dw2ijm-3 etmmWV fade-enter-done ${isSupportOpen ? 'open' : 'closed'}`}>
						<div className="Style__Item-sc-1dw2ijm-2 cvgauG">
							<div className="Style__Icon-sc-1dw2ijm-1 gBoMEe">
								<div className="Style__BackgroundIcon-mn97w4-0 cpizZW"></div>
							</div>
							<span className="Style__Title-sc-1dw2ijm-0 kFslWY">+380 (44) 502-88-89</span>
						</div>
						<div className="Style__Item-sc-1dw2ijm-2 cvgauG">
							<div className="Style__Icon-sc-1dw2ijm-1 gBoMEe">
								<div className="Style__BackgroundIcon-mn97w4-0 dxKBSf"></div>
							</div>
							<span className="Style__Title-sc-1dw2ijm-0 kFslWY">+380 (50) 450-65-78</span>
						</div>
						<div className="Style__Item-sc-1dw2ijm-2 cvgauG">
							<div className="Style__Icon-sc-1dw2ijm-1 gBoMEe">
								<div className="Style__BackgroundIcon-mn97w4-0 liwZWI"></div>
							</div>
							<span className="Style__Title-sc-1dw2ijm-0 kFslWY">+380 (67) 351-37-34</span>
						</div>
						<div className="Style__Item-sc-1dw2ijm-2 cvgauG">
							<div className="Style__Icon-sc-1dw2ijm-1 gBoMEe">
								<div className="Style__BackgroundIcon-mn97w4-0 jiQNfo"></div>
							</div>
							<span className="Style__Title-sc-1dw2ijm-0 kFslWY">+380 (93) 170-16-57</span>
						</div>
						<div className="Style__Item-sc-1dw2ijm-2 cvgauG">
							<div className="Style__Icon-sc-1dw2ijm-1 gBoMEe">
								<div className="Style__BackgroundIcon-mn97w4-0 dtYNbo"></div>
							</div>
							<span className="Style__Title-sc-1dw2ijm-0 kFslWY">Питання та відповіді</span>
						</div>
					</div>
				</div>

				<div className="account" style={{
					color: textColor || 'defaultTextColor',
				}}
					onClick={() => {
						if (!isAuthenticated) {
							navigate("/new/account");
						} else {
							toggleDropdown();
						}
					}}>
					<div className="account-img">
						<svg width="16" height="16" viewBox="0 0 16 16" fill={iconColor}>
							<path fillRule="evenodd" d="M8 7.78c2.095 0 3.793-1.742 3.793-3.89C11.793 1.74 10.095 0 8 0S4.207 1.741 4.207 3.89c0 2.148 1.698 3.89 3.793 3.89zm0-1.203c-1.447 0-2.62-1.203-2.62-2.687 0-1.485 1.173-2.688 2.62-2.688s2.62 1.203 2.62 2.688c0 1.484-1.173 2.687-2.62 2.687z"></path>
							<path d="M15 13.755v1.644a.594.594 0 0 1-.586.601.594.594 0 0 1-.586-.601v-1.644c0-1.485-1.174-2.688-2.621-2.688H4.793c-1.447 0-2.62 1.204-2.62 2.688v1.644a.594.594 0 0 1-.587.601.594.594 0 0 1-.586-.601v-1.644c0-2.149 1.698-3.89 3.793-3.89h6.414c2.095 0 3.793 1.742 3.793 3.89z"></path>
						</svg>
					</div>
					{isAuthenticated ? (<span>{email}</span>) : (<span className="account-span">Особистий кабінет</span>)}

				</div>

				{isAuthenticated && isDropdownVisible && (
					<div className="drop-acc Style__Dropdown-sc-1dw2ijm-3 etmmWV fade-enter-done">
						<div className="Style__Item-sc-1dw2ijm-2 cvgauG">
							<div className="Style__Icon-sc-1dw2ijm-1 gBoMEe">
								<div className="Style__BackgroundIcon-mn97w4-0 ieFIjF"></div>
							</div>
							<span onClick={() => navigate("/new/account/history")} className="Style__Title-sc-1dw2ijm-0 kFslWY">Мої поїздки</span>
						</div>
						<div className="Style__Item-sc-1dw2ijm-2 cvgauG">
							<div className="Style__Icon-sc-1dw2ijm-1 gBoMEe">
								<div className="Style__BackgroundIcon-mn97w4-0 nefpq"></div>
							</div>
							<span onClick={() => authContext.logout()} className="Style__Title-sc-1dw2ijm-0 kFslWY">Вийти з аккаунту</span>
						</div>
					</div>
				)}

				<div className="language-switch">
					<div className="language-switch-box" style={{ borderColor: iconColor }}>
						<span style={{
							color: textColor || 'defaultTextColor'
						}}>Укр</span>
						<div className="switcher-img">
							<svg width="16" height="16" viewBox="0 0 16 16" fill={iconColor}>
								<path d="M8 9.19l3.78-3.97a.69.69 0 0 1 1.01 0 .777.777 0 0 1 0 1.06l-4.285 4.5a.69.69 0 0 1-1.01 0l-4.286-4.5a.777.777 0 0 1 0-1.06.69.69 0 0 1 1.01 0L8 9.19z"></path>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}


