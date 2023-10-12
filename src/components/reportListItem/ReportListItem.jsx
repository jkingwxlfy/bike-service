import {NavLink} from "react-router-dom";
import {MyButton} from "../UI";

const ReportListItem = ({licenseNumber, ownerFullName, type, status, id, onDelete}) => {

    switch (status) {
        case "new":
            status = "Новый";
            break;
        case "in_progress":
            status = "Рассматривается";
            break;
        case "done":
            status = "Завершено";
            break;
    }

    switch (type) {
        case "sport":
            type = "Спортивный";
            break;
        case "general":
            type = "Обычный";
            break;
    }

    return (
        <div className="report-list_item">
            <div className="report-list_item_one">
                <div className="report-list_item_info">Номер лицензии</div>
                <div>{licenseNumber}</div>
            </div>
            <div className="report-list_item_one fullname">
                <div className="report-list_item_info">ФИО клиента</div>
                <div>{ownerFullName}</div>
            </div>
            <div className="report-list_item_one">
                <div className="report-list_item_info">Тип велосипеда</div>
                <div>{type}</div>
            </div>
            <div className="report-list_item_one">
                <div className="report-list_item_info">Статус</div>
                <div>{status}</div>
            </div>
            <div className="report-list_item_buttons">
                <NavLink to={`/report-list/${id}`} className="report-list_item_link"><MyButton>Подробнее</MyButton></NavLink>
                <MyButton onClick={() => onDelete(id)}>Удалить</MyButton>
            </div>
        </div>
    )
}

export default ReportListItem;