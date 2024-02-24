import { NavLink, useParams } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { useState, useEffect } from "react";
import { fetchStaff } from "../../components/staffList/staffListSlice";
import { useDispatch } from "react-redux";

import {
	ErrorMessage,
	MyButton,
	MyCheckBox,
	Spinner,
} from "../../components/UI";

import "./staffitempage.sass";

const StaffItemPage = () => {
	const { staffId } = useParams();
	const { request } = useHttp();
	const dispatch = useDispatch();
	const userId = localStorage.getItem("userId");
	const [staff, setStaff] = useState({});
	const [changedData, setChangedData] = useState({});
	const [status, setStatus] = useState({ error: false, loading: true });

	const getStaff = () => {
		request(
			`https://sf-final-project-be.herokuapp.com/api/officers/${staffId}`,
		)
			.then((data) => {
				setStaff(data.data);
				setStatus({ ...status, loading: false });
			})
			.catch((error) => {
				console.log(error);
				setStatus({ error: true, loading: false });
			});
	};

	const updateStaff = () => {
		request(
			`https://sf-final-project-be.herokuapp.com/api/officers/${staffId}`,
			"PUT",
			JSON.stringify(changedData),
		)
			.then((data) => {
				setStatus({ ...status, loading: true });
				getStaff();
				dispatch(fetchStaff());
			})
			.catch((error) => {
				console.log(error);
				setStatus({ error: true, loading: false });
			});
	};

	useEffect(() => {
		getStaff();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [staffId]);

	if (status.loading) {
		return <Spinner />;
	}

	if (status.error) {
		return (
			<div className="staff-page-item_container">
				<NavLink className="staff-page-item_link" to="/staff">
					<MyButton>Вернуться</MyButton>
				</NavLink>
				<ErrorMessage />
			</div>
		);
	}

	return (
		<section className="staff-page-item">
			<div className="staff-page-item_container">
				<NavLink className="staff-page-item_link" to="/staff">
					<MyButton>Вернуться</MyButton>
				</NavLink>
				<div className="staff-page-item_wrapper">
					<div className="staff-page-item_field">
						<div className="staff-page-item_name">
							E-mail сотрудника :{" "}
						</div>
						<div className="staff-page-item_input">
							{staff.email}
						</div>
					</div>
					<div className="staff-page-item_field">
						<div className="staff-page-item_name">
							Айди сотрудника :{" "}
						</div>
						<div className="staff-page-item_input">{staff._id}</div>
					</div>
					<div className="staff-page-item_field">
						<div className="staff-page-item_name">Фамилия : </div>
						<input
							className="staff-page-item_input active"
							type="text"
							value={staff.firstName}
							onChange={(event) => {
								setStaff({
									...staff,
									firstName: event.target.value,
								});
								setChangedData({
									...changedData,
									firstName: event.target.value,
								});
							}}
						/>
					</div>
					<div className="staff-page-item_field">
						<div className="staff-page-item_name">Имя : </div>
						<input
							className="staff-page-item_input active"
							type="text"
							value={staff.lastName}
							onChange={(event) => {
								setStaff({
									...staff,
									lastName: event.target.value,
								});
								setChangedData({
									...changedData,
									lastName: event.target.value,
								});
							}}
						/>
					</div>
					<div className="staff-page-item_field">
						<MyCheckBox
							placeholder={
								<div className="staff-page-item_name">
									Одобренный сотрудник :{" "}
								</div>
							}
							checked={staff.approved}
							onChange={
								userId !== staff._id
									? () => {
											setStaff({
												...staff,
												approved: !staff.approved,
											});
											setChangedData({
												...changedData,
												approved: !staff.approved,
											});
										}
									: null
							}
						/>
					</div>
				</div>
				<div>
					<MyButton onClick={updateStaff}>Сохранить</MyButton>
				</div>
			</div>
		</section>
	);
};

export default StaffItemPage;
