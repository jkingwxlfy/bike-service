import {
    MainPage,
    ReportPage,
    ReportListPage,
    ReportItemPage,
    StaffListPage,
    StaffItemPage,
    Page404,
} from "../components/pages";

export const publicRoutes = [
    {path: "*", component: <Page404/>},
    {path: "/", component: <MainPage/>},
    {path: "report", component: <ReportPage/>}
];

export const privateRoutes = [
    {path: "report-list", component: <ReportListPage/>},
    {path: "report-list/:reportId", component: <ReportItemPage/>},
    {path: "staff", component: <StaffListPage/>},
    {path: "staff/:staffId", component: <StaffItemPage/>}
];