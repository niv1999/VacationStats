import { useLocation, useNavigate } from "react-router-dom";
import "./UserMenu.css";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/State";
import { UserModel } from "../../../Models/UserModel";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";


export function UserMenu(): JSX.Element {

    const user = useSelector<AppState, UserModel>(store => store.user);
    const location = useLocation();
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);

    function goToLogin() {
        navigate("/login");
    }

    useEffect(() => {
        // Set isActive to true when user navigates to the login page
        setIsActive(location.pathname === "/login");
    }, [location]);

    return (
        <div className="UserMenu">

            {
                !user &&
                <Button className={isActive ? "active" : ""} onClick={goToLogin}>Login</Button>
            }

            {
                user &&
                <LogoutButton />
            }

        </div>
    );
}
