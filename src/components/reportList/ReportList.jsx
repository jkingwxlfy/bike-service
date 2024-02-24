import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { deleteReport } from "./reportListSlice";
import { Spinner } from "../UI";

import ReportListItem from "../reportListItem/ReportListItem";

import "./reportlist.sass";

const ReportList = () => {
    const { reports, reportsLoadingStatus } = useSelector(
        (state) => state.reportList
    );
    const dispatch = useDispatch();
    const { request } = useHttp();

    const onDeleteReport = (id) => {
        request(
            `https://sf-final-project-be.herokuapp.com/api/cases/${id}`,
            "DELETE"
        )
            .then((data) => {
                console.log(data);
                dispatch(deleteReport(id));
            })
            .catch((error) => console.log(error));
    };

    if (!reports.length && reportsLoadingStatus === "idle") {
        return <h1 className="report-list_empty">Сообщений пока нет</h1>;
    }

    if (reportsLoadingStatus === "loading") {
        return <Spinner />;
    }

    return (
        <div className="report-list_wrapper">
            {reports.map((item) => (
                <ReportListItem
                    licenseNumber={item.licenseNumber}
                    ownerFullName={item.ownerFullName}
                    type={item.type}
                    status={item.status}
                    id={item._id}
                    key={item._id}
                    onDelete={onDeleteReport}
                />
            ))}
        </div>
    );
};

export default ReportList;
