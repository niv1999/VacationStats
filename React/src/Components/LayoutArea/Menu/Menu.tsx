import { NavLink } from "react-router-dom";
import "./Menu.css";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/State";
import { UserModel } from "../../../Models/UserModel";

export function Menu(): JSX.Element {

    const user = useSelector<AppState, UserModel>(store => store.user);

    return (
        <div className="Menu">
			<NavLink to="/home">HOME</NavLink>

            {
                user &&
			    <NavLink to="/stats">STATS</NavLink>
            }

			<NavLink to="/about">ABOUT</NavLink>
        </div>
    );
}
