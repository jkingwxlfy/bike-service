import { configureStore } from "@reduxjs/toolkit";
import header from "../components/header/headerSlice";
import reportList from "../components/reportList/reportListSlice";
import staffList from "../components/staffList/staffListSlice";

const store = configureStore({
    reducer: { header, reportList, staffList },
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
