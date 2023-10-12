import {useSelector} from "react-redux";

import ReportList from "../../reportList/ReportList";

const ReportListPage = () => {

    const {isApproved} = useSelector(state => state.header);

    return (
        <section className="report-list">
            <div className="report-list_container">
                {isApproved
                ? <>
                        <h2>Здесь содержится список всех известных случаев краж</h2>
                        <ReportList/>
                    </>
                : <h1>Только для одобренных сотрудников</h1>
                }
            </div>
        </section>
    )
}

export default ReportListPage;