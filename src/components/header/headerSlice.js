import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
    isModal: false,
    isRegisterForm: false,
    isStaffForm: false,
    isAuth: false,
    isApproved: false,
};

const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        headerSetModal: (state, action) => {
            state.isModal = action.payload;
        },
        headerSetRegisterForm: (state, action) => {
            state.isRegisterForm = action.payload;
        },
        headerSetStaffForm: (state, action) => {
            state.isStaffForm = action.payload;
        },
        headerLeaveAccount: (state) => {
            localStorage.removeItem("token");
            localStorage.removeItem("auth");
            localStorage.removeItem("userId");
            localStorage.removeItem("isApproved");
            state.isAuth = false;
            state.isApproved = false;
        },
        headerSetAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        headerSignIn: (state, action) => {
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("auth", "true");
            localStorage.setItem("userId", action.payload.user.id);
            localStorage.setItem("isApproved", action.payload.user.approved);
            state.isApproved = action.payload.user.approved;
            state.isModal = false;
            state.isAuth = true;
        },
        headerSetLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        headerSetToken: (state, action) => {
            state.userToken = action.payload;
        },
        headerSetApproved: (state, action) => {
            state.isApproved = action.payload;
        },
    },
});

const { actions, reducer } = headerSlice;
export const {
    headerSetModal,
    headerSetRegisterForm,
    headerLeaveAccount,
    headerSignIn,
    headerSetAuth,
    headerSetLoading,
    headerSetStaffForm,
    headerSetApproved,
} = actions;
export default reducer;
