import {useEffect} from "react";
import {NavLink, useNavigate, Outlet} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {fetchStaff} from "../staffList/staffListSlice";
import {fetchReports} from "../reportList/reportListSlice";
import {
    headerSetModal,
    headerSetRegisterForm,
    headerLeaveAccount,
    headerSetAuth,
    headerSetLoading,
    headerSetStaffForm,
    headerSetApproved
} from './headerSlice';

import {MyModal} from "../UI";
import AuthForm from "../authForm/AuthForm";
import RegisterForm from "../registerForm/RegisterForm";
import StaffForm from "../staffForm/StaffForm";

import './header.sass';

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isRegisterForm, isAuth, isStaffForm, isLoading} = useSelector(state => state.header);

    useEffect(() => {
        if(localStorage.getItem("auth")) {
            dispatch(headerSetAuth(true));

            if (localStorage.getItem("isApproved") === "true") {
                dispatch(headerSetApproved(true));
            }

            dispatch(fetchReports());
            dispatch(fetchStaff());
        }
        dispatch(headerSetLoading(false));
    }, [isAuth]);

    const onOpenForm = () => {
        dispatch(headerSetModal(true));
        dispatch(headerSetRegisterForm(false));
    }

    const onLeaveAccount = () => {
        dispatch(headerSetStaffForm(false));
        dispatch(headerLeaveAccount(false));
        navigate("/");
    }

    if (isLoading) {return null}

    return (
        <>
            <header className="header">
                <div className="header_wrapper">
                    {isAuth
                        ?
                        <>
                            <NavLink to="/" className={(navData) => navData.isActive ? "header_link active" : "header_link"}>Главная</NavLink>
                            <NavLink to="/report-list" className={(navData) => navData.isActive ? "header_link active" : "header_link"}>Список краж</NavLink>
                            <NavLink to="/staff" className={(navData) => navData.isActive ? "header_link active" : "header_link"}>Ответственные сотрудники</NavLink>
                            <NavLink to="/report" className={(navData) => navData.isActive ? "header_link active" : "header_link"}>Сообщить о краже</NavLink>
                            <div className="header_link" onClick={onLeaveAccount}>Выйти</div>
                        </>
                        :
                        <>
                            <NavLink to="/" className={(navData) => navData.isActive ? "header_link active" : "header_link"}>Главная</NavLink>
                            <NavLink to="/report" className={(navData) => navData.isActive ? "header_link active" : "header_link"}>Сообщить о краже</NavLink>
                            <div className="header_link" onClick={onOpenForm}>Войти</div>
                        </>
                    }
                </div>
                <MyModal>
                    {!isRegisterForm && !isStaffForm ? <AuthForm/> : null }
                    {isRegisterForm ? <RegisterForm/> : null}
                    {isStaffForm ? <StaffForm/> : null}
                </MyModal>
            </header>
            <Outlet/>
        </>
    )
}

export default Header;