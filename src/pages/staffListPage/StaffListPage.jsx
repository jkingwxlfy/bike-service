import { useSelector } from "react-redux";

import StaffList from "../../components/staffList/StaffList";

const StaffListPage = () => {
	const { isApproved } = useSelector((state) => state.header);

	return (
		<section className="staff-list">
			<div className="staff-list_container">
				{isApproved ? (
					<>
						<h2 className="staff-list_title">
							Здесь содержится список всех сотрудников{" "}
						</h2>
						<StaffList />
					</>
				) : (
					<h1>Только для одобренных сотрудников</h1>
				)}
			</div>
		</section>
	);
};

export default StaffListPage;
