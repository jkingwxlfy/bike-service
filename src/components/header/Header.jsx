import { useEffect } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaff } from "../staffList/staffListSlice";
import { fetchReports } from "../reportList/reportListSlice";
import {
	headerSetModal,
	headerSetRegisterForm,
	headerLeaveAccount,
	headerSetAuth,
	headerSetLoading,
	headerSetStaffForm,
	headerSetApproved,
} from "./headerSlice";

import { MyModal } from "../UI";
import AuthForm from "../authForm/AuthForm";
import RegisterForm from "../registerForm/RegisterForm";
import StaffForm from "../staffForm/StaffForm";

import "./header.sass";

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isRegisterForm, isAuth, isStaffForm, isLoading } = useSelector(
		(state) => state.header,
	);

	const options = {
		public: [
			{ title: "Главная", href: "/" },
			{ title: "Сообщить о краже", href: "/report" },
		],
		private: [
			{ title: "Главная", href: "/" },
			{ title: "Сообщить о краже", href: "/report" },
			{ title: "Список краж", href: "/report-list" },
			{ title: "Ответственные сотрудники", href: "/staff" },
		],
	};

	useEffect(() => {
		if (localStorage.getItem("auth")) {
			dispatch(headerSetAuth(true));

			if (localStorage.getItem("isApproved") === "true") {
				dispatch(headerSetApproved(true));
			}

			dispatch(fetchReports());
			dispatch(fetchStaff());
		}
		dispatch(headerSetLoading(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuth]);

	const onOpenForm = () => {
		dispatch(headerSetModal(true));
		dispatch(headerSetRegisterForm(false));
	};

	const onLeaveAccount = () => {
		dispatch(headerSetStaffForm(false));
		dispatch(headerLeaveAccount(false));
		navigate("/");
	};

	if (isLoading) {
		return null;
	}

	const unAuthOptions = (
		<>
			{options.public.map((item) => (
				<NavLink
					to={item.href}
					key={item.title}
					className={(navData) =>
						navData.isActive ? "header_link active" : "header_link"
					}
				>
					{item.title}
				</NavLink>
			))}
			<p onClick={onOpenForm} className="header_link">
				Войти
			</p>
		</>
	);

	const authOptions = (
		<>
			{options.private.map((item) => (
				<NavLink
					to={item.href}
					key={item.title}
					className={(navData) =>
						navData.isActive ? "header_link active" : "header_link"
					}
				>
					{item.title}
				</NavLink>
			))}
			<p onClick={onLeaveAccount} className="header_link">
				Выйти
			</p>
		</>
	);

	return (
		<>
			<header className="header">
				<div className="header_wrapper">
					{isAuth ? authOptions : unAuthOptions}
				</div>
				<MyModal>
					{!isRegisterForm && !isStaffForm ? <AuthForm /> : null}
					{isRegisterForm ? <RegisterForm /> : null}
					{isStaffForm ? <StaffForm /> : null}
				</MyModal>
			</header>
			<Outlet />
		</>
	);
};

export default Header;
