import { PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";
import { StatsModel } from "../Models/StatsModels";

// Function for setting the logged-in user into the global state:
export function login(currentState: UserModel, action: PayloadAction<UserModel>): UserModel {
    const newState = action.payload; // The payload is the user that logged-in
    return newState;
}

// Function for deleting the logged-in user from the global state:
export function logout(currentState: UserModel, action: PayloadAction): UserModel {
    return null;
}

// Function for initializing all stats in the global state:
export function init(currentState: StatsModel, action: PayloadAction<StatsModel>): StatsModel {
    const newState = action.payload; // The payload is an object containing the 4 different stats
    return newState;
}