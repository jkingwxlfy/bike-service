import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { fetchReports } from "../../components/reportList/reportListSlice";
import useApprovedStaff from "../../hooks/useApprovedStaff";
import { useDispatch } from "react-redux";

import {
	ErrorMessage,
	MyButton,
	MySelect,
	MyTextArea,
	Spinner,
} from "../../components/UI";

import cl from "./reportitempage.module.sass";

const ReportItemPage = () => {
	const { reportId } = useParams();
	const { request } = useHttp();
	const [report, setReport] = useState({});
	const [changedData, setChangedData] = useState({});
	const [status, setStatus] = useState({
		loading: true,
		error: false,
		errorUpdate: false,
	});
	const dispatch = useDispatch();

	const getReport = () => {
		request(
			`https://sf-final-project-be.herokuapp.com/api/cases/${reportId}`,
		)
			.then((data) => {
				setReport(transformReport(data.data));
				setStatus({ ...status, loading: false, errorUpdate: false });
			})
			.catch((error) => {
				console.log(error);
				setStatus({ ...status, error: true, loading: false });
			});
	};

	const updateReport = () => {
		if (changedData.status === "done" && !changedData.resolution) {
			setStatus({ ...status, errorUpdate: true });
			return null;
		}

		request(
			`https://sf-final-project-be.herokuapp.com/api/cases/${reportId}`,
			"PUT",
			JSON.stringify(changedData),
		)
			.then(() => {
				setStatus({ ...status, loading: true });
				getReport();
				dispatch(fetchReports());
			})
			.catch((error) => {
				console.log(error);
				setStatus({ ...status, errorUpdate: true });
			});
	};

	const transformReport = (report) => {
		const editStatus = (status) => {
			switch (status) {
				case "new":
					return "Новое";
				case "in_progress":
					return "На рассмотрении";
				case "done":
					return "Завершено";
				default:
					return;
			}
		};
		const editType = (type) => {
			switch (type) {
				case "sport":
					return "Спортивный";
				case "general":
					return "Обычный";
				default:
					return;
			}
		};
		return {
			id: report._id,
			status: editStatus(report.status),
			type: editType(report.type),
			licenseNumber: report.licenseNumber,
			ownerFullName: report.ownerFullName,
			clientId: report.clientId,
			createdAt: report.createdAt.replace(/[a-zA-T].*/, ""),
			updatedAt: report.updatedAt
				? report.updatedAt.replace(/[a-zA-T].*/, "")
				: "Не обновлялось",
			color: report.color ? report.color : "Не указан",
			date: report.date
				? report.date.replace(/[a-zA-T].*/, "")
				: "Не указана",
			officer: report.officer ? report.officer : "Не указан",
			description: report.description ? report.description : "Не указан",
			resolution: report.resolution,
		};
	};

	const typeOptions = [
		{ name: "Обычный", value: "general" },
		{ name: "Спортивный", value: "sport" },
	];

	const statusOptions = [
		{ name: "Новое", value: "new" },
		{ name: "На рассмотрении", value: "in_progress" },
		{ name: "Завершено", value: "done" },
	];

	const staffOptions = useApprovedStaff();

	useEffect(() => {
		getReport();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reportId]);

	if (status.loading) {
		return <Spinner />;
	}
	if (status.error) {
		return (
			<div className={cl.container}>
				<NavLink className={cl.link} to="/report-list">
					<MyButton>Вернуться</MyButton>
				</NavLink>
				<ErrorMessage />
			</div>
		);
	}

	return (
		<section>
			<div className={cl.container}>
				<NavLink className={cl.link} to="/report-list">
					<MyButton>Вернуться</MyButton>
				</NavLink>
				<div className={cl.wrapper}>
					<div className={cl.item}>
						<div className={cl.name}>ФИО клиента</div>
						<input
							type="text"
							className={cl.value}
							value={report.ownerFullName}
							onChange={(event) => {
								setReport({
									...report,
									ownerFullName: event.target.value,
								});
								setChangedData({
									...changedData,
									ownerFullName: event.target.value,
								});
							}}
						/>
					</div>
					<div className={cl.item}>
						<div className={cl.name}>Номер лицензии</div>
						<input
							type="text"
							className={cl.value}
							value={report.licenseNumber}
							onChange={(event) => {
								setReport({
									...report,
									licenseNumber: event.target.value,
								});
								setChangedData({
									...changedData,
									licenseNumber: event.target.value,
								});
							}}
						/>
					</div>
					<div className={cl.item}>
						<div className={cl.name}>Цвет велосипеда</div>
						<input
							type="text"
							className={cl.value}
							value={report.color}
							onChange={(event) => {
								setReport({
									...report,
									color: event.target.value,
								});
								setChangedData({
									...changedData,
									color: event.target.value,
								});
							}}
						/>
					</div>
					<div className={cl.item}>
						<div className={cl.name}>Айди клиента</div>
						<input
							type="text"
							className={cl.value}
							value={report.clientId}
							onChange={(event) => {
								setReport({
									...report,
									clientId: event.target.value,
								});
								setChangedData({
									...changedData,
									clientId: event.target.value,
								});
							}}
						/>
					</div>
					<div className={cl.item}>
						<div className={cl.name}>Дата кражи</div>
						<input
							type="text"
							className={cl.value}
							value={report.date}
							onChange={(event) => {
								setReport({
									...report,
									date: event.target.value,
								});
								setChangedData({
									...changedData,
									date: event.target.value,
								});
							}}
						/>
					</div>
					<div className={cl.item}>
						<div className={cl.name}>Дата создания сообщения</div>
						<input
							type="text"
							className={cl.value}
							value={report.createdAt}
							onChange={(event) => {
								setReport({
									...report,
									createdAt: event.target.value,
								});
								setChangedData({
									...changedData,
									createdAt: event.target.value,
								});
							}}
						/>
					</div>
					<div className={cl.item}>
						<div className={cl.name}>
							Дата последнего обновления сообщения
						</div>
						<input
							type="text"
							className={cl.value}
							value={report.updatedAt}
							onChange={(event) => {
								setReport({
									...report,
									updatedAt: event.target.value,
								});
								setChangedData({
									...changedData,
									updatedAt: event.target.value,
								});
							}}
						/>
					</div>
					<div className={cl.item}>
						<div className={cl.name}>Комментарий</div>
						<MyTextArea
							type="text"
							value={report.description}
							callback={(event) => {
								setReport({
									...report,
									description: event.target.value,
								});
								setChangedData({
									...changedData,
									description: event.target.value,
								});
							}}
						/>
					</div>
					<div className={cl.item}>
						<div className={cl.name}>Завершающий комментарий</div>
						<MyTextArea
							type="text"
							value={report.resolution}
							callback={(event) => {
								setReport({
									...report,
									resolution: event.target.value,
								});
								setChangedData({
									...changedData,
									resolution: event.target.value,
								});
							}}
						/>
					</div>
					<div className={cl.item}>
						<div className={cl.name}>Ответственный сотрудник</div>
						<MySelect
							selectOptions={staffOptions}
							defaultValue={report.officer}
							onChange={(event) => {
								setReport({
									...report,
									officer: event.target.value,
								});
								setChangedData({
									...changedData,
									officer: event.target.value,
								});
							}}
						/>
					</div>
					<div className={cl.item}>
						<div className={cl.name}>Статус сообщения</div>
						<MySelect
							selectOptions={statusOptions}
							defaultValue={report.status}
							onChange={(event) => {
								setReport({
									...report,
									status: event.target.value,
								});
								setChangedData({
									...changedData,
									status: event.target.value,
								});
							}}
						/>
					</div>
					<div className={cl.item}>
						<div className={cl.name}>Тип велосипеда</div>
						<MySelect
							selectOptions={typeOptions}
							type="text"
							defaultValue={report.type}
							onChange={(event) => {
								setReport({
									...report,
									type: event.target.value,
								});
								setChangedData({
									...changedData,
									type: event.target.value,
								});
							}}
						/>
					</div>
				</div>
				<MyButton
					onClick={() => {
						updateReport();
					}}
				>
					Сохранить
				</MyButton>
				<MyButton
					onClick={() => {
						getReport();
					}}
				>
					Сбросить изменения
				</MyButton>
				<div className={status.errorUpdate ? cl.active : cl.hidden}>
					Ошибка отправки данных
				</div>
			</div>
		</section>
	);
};

export default ReportItemPage;
