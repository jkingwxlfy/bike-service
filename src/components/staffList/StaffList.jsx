import {useDispatch, useSelector} from "react-redux";
import {deleteEmployee} from "./staffListSlice";
import {headerSetModal, headerSetStaffForm} from "../header/headerSlice";
import {useHttp} from "../../hooks/http.hook";

import StaffListItem from "../staffListItem/StaffListItem";
import {MyButton, Spinner, ErrorMessage} from "../UI";

import './stafflist.sass';

const StaffList = () => {

    const {request} = useHttp();
    const dispatch = useDispatch();
    const {staffLoadingStatus, staff} = useSelector(state => state.staffList);

    const onCreateEmployee = () => {
        dispatch(headerSetStaffForm(true));
        dispatch(headerSetModal(true));
    }

    const onDeleteEmployee = (id) => {
        request(`https://sf-final-project-be.herokuapp.com/api/officers/${id}`, "DELETE")
            .then(data => {
                dispatch(deleteEmployee(id));
            })
            .catch(error => console.log(error));
    }

    if (staffLoadingStatus === "loading") {return <Spinner/>}
    if (staffLoadingStatus === "error") {return <ErrorMessage/>}

    return (
        <div className="staff-list">
            <div className="staff-list_link">
                <MyButton onClick={onCreateEmployee}>Создать сотрудника</MyButton>
            </div>
            {staff.map(item =>
                <StaffListItem
                    key={item._id}
                    firstName={item.firstName}
                    lastName={item.lastName}
                    status={item.approved}
                    email={item.email}
                    id={item._id}
                    onDelete={onDeleteEmployee}
                />
            )}
        </div>
    )
}

export default StaffList;