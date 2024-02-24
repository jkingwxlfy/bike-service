import { NavLink } from "react-router-dom";

import { MyButton } from "../UI";

const StaffListItem = ({
    firstName,
    lastName,
    status,
    email,
    id,
    onDelete,
}) => {
    const userId = localStorage.getItem("userId");

    return (
        <div className="staff-list_item">
            <div className="staff-list_field">
                <div className="staff-list_name">Имя</div>
                {!firstName ? <div>Не указано</div> : <div>{firstName}</div>}
            </div>
            <div className="staff-list_field">
                <div className="staff-list_name">Фамилия</div>
                {!lastName ? <div>Не указано</div> : <div>{lastName}</div>}
            </div>
            <div className="staff-list_field">
                <div className="staff-list_name">Статус сотрудника</div>
                <div>{status ? "Одобренный" : "Новый"}</div>
            </div>
            <div className="staff-list_field email">
                <div className="staff-list_name">Email сотрудника</div>
                <div>{email}</div>
            </div>
            <div className="staff-list_buttons">
                <NavLink to={`/staff/${id}`}>
                    <MyButton>Подробнее</MyButton>
                </NavLink>
                {userId === id ? null : (
                    <MyButton onClick={() => onDelete(id)}>Удалить</MyButton>
                )}
            </div>
        </div>
    );
};

export default StaffListItem;
