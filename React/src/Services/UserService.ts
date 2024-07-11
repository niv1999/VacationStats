import axios from "axios";
import { CredentialsModel } from "../Models/CredentialsModel";
import { appConfig } from "../Utils/AppConfig";
import { jwtDecode } from "jwt-decode";
import { UserModel } from "../Models/UserModel";
import { store, userActions } from "../Redux/State";
import { notify } from "../Utils/Notify";

class UserService {

    public constructor() {
        const token = localStorage.getItem("token");
        if(!token) return;
        const dbUser = jwtDecode<{ user: UserModel }>(token).user;
        const action = userActions.login(dbUser);
        store.dispatch(action);
    }
	
    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(appConfig.loginUrl, credentials, {withCredentials: true});
        const token = response.data;
        const dbUser = jwtDecode<{ user: UserModel }>(token).user;
        const action = userActions.login(dbUser);
        store.dispatch(action);
        localStorage.setItem("token", token);
    }

    public async logout(): Promise<void> {
        const response = await axios.post<string>(appConfig.logoutUrl, null, {withCredentials: true});
        notify.success(response.data)
        const action = userActions.logout();
        store.dispatch(action);
        localStorage.removeItem("token");
    }
}

export const userService = new UserService();
