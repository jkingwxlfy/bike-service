import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";

export const fetchReports = createAsyncThunk(
    "reportList/fetchReports",
    () => {
        const {request} = useHttp();
        return request(`https://sf-final-project-be.herokuapp.com/api/cases/`);
    }
)

const initialState = {
    reportsLoadingStatus: "idle",
    reports: []
};

const reportListSlice = createSlice({
    name: "reportList",
    initialState,
    reducers: {
        deleteReport: (state, action) => {
            state.reports = state.reports.filter(report => {
                return report._id !== action.payload;
            })
        },
        createReport: (state, action) => {
            state.reports = [...state.reports, action.payload];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReports.pending, (state) => {state.reportsLoadingStatus = "loading";})
            .addCase(fetchReports.fulfilled, (state, action) => {
                state.reportsLoadingStatus = "idle";
                state.reports = [...action.payload.data];
            })
            .addCase(fetchReports.rejected, (state) => {state.reportsLoadingStatus = "error"})
            .addDefaultCase(() => {});
    }
});

const {actions, reducer} = reportListSlice;
export const {
    deleteReport,
    createReport
} = actions;
export default reducer;