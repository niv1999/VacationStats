import { useSelector } from "react-redux";
import "./Header.css";
import { AppState } from "../../../Redux/State";
import { UserModel } from "../../../Models/UserModel";
import { UserMenu } from "../../AuthArea/UserMenu/UserMenu";
import { NavLink } from "react-router-dom";


export function Header(): JSX.Element {

    const user = useSelector<AppState, UserModel>(store =>  store.user);

    return (
        <div className="Header">
            <NavLink to="/home" className="mainHeader">
                <h1>VacationStats</h1>
            </NavLink>
            <div className="authContainer">
                {
                    !user && 
                    <span className="greeting">Hello Guest</span>
                }
                {
                    user &&
                    <span className="greeting">Hello {user.first_name}</span>
                }
                <UserMenu />
            </div>

        </div>
    );
}
