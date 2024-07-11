import { configureStore, createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel"
import { init, login, logout } from "./Reducers";
import { StatsModel } from "../Models/StatsModels";

export type AppState = {
    user: UserModel;
    stats: StatsModel;
}

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: { login, logout }
});

const statsSlice = createSlice({
    name: "stats",
    initialState: null,
    reducers: { init }
})

export const userActions = userSlice.actions;
export const statsActions = statsSlice.actions;

export const store = configureStore<AppState>({
    reducer: {
        user: userSlice.reducer,
        stats: statsSlice.reducer
    }
});