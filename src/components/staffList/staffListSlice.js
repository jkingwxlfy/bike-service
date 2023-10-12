import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";

export const fetchStaff = createAsyncThunk(
    "staffList/fetchStaff",
    () => {
        const {request} = useHttp();
        return request("https://sf-final-project-be.herokuapp.com/api/officers/");
    }
)

const initialState = {
    staffLoadingStatus: "idle",
    staff: []
};

const staffListSlice = createSlice({
    name: "staffList",
    initialState,
    reducers: {
        deleteEmployee: (state, action) => {
            state.staff = state.staff.filter(employee => {
                return employee._id !== action.payload;
            })
        },
        createEmployee: (state, action) => {
            state.staff = [...state.staff, action.payload];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStaff.pending, (state) => {state.staffLoadingStatus = "loading";})
            .addCase(fetchStaff.fulfilled, (state, action) => {
                state.staffLoadingStatus = "idle";
                state.staff = [...action.payload.officers];
            })
            .addCase(fetchStaff.rejected, (state) => {state.staffLoadingStatus = "error";})
            .addDefaultCase(() => {});
    }
});

const {actions, reducer} = staffListSlice;
export const {
    deleteEmployee,
    createEmployee
} = actions;
export default reducer;