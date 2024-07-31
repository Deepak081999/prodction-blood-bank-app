import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
// import { toast } from "react-toastify";

export const userLogin = createAsyncThunk(
    "auth/login",
    async ({ role, email, password }, { rejectWithValue }) => {
        try {
            const { data } = await API.post("/auth/login", { role, email, password });
            //store token
            if (data.success) {
                alert(data.message);
                localStorage.setItem("token", data.token);
                if (role === "donar" || role === "hospital") {
                    window.location.replace("/orgnaisation");
                } else {
                    window.location.replace("/");
                }
            }
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const userRegister = createAsyncThunk(
    "auth/register",
    async ({
        name,
        role,
        email,
        password,
        phone,
        organisationName,
        address,
        hospitalName,
        website }, { rejectWithValue }) => {
        try {
            const { data } = await API.post("/auth/register", {
                name,
                role,
                email,
                password,
                phone,
                organisationName,
                address,
                hospitalName,
                website
            });
            //store token
            if (data?.success) {
                alert(data.message);
                window.location.replace("/login");
            }
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);


//current user
export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async ({ rejectWithValue }) => {
        try {
            const res = await API.get("/auth/current-user");
            if (res.data) {
                return res?.data;
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);