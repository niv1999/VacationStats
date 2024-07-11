import { useSelector } from "react-redux";
import { useTitle } from "../../../Utils/UseTitle";
import "./Stats.css";
import { AppState } from "../../../Redux/State";
import { UserModel } from "../../../Models/UserModel";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StatsAccordion } from "../StatsAccordion/StatsAccordion";
import { Typography } from "@mui/material";
import { notify } from "../../../Utils/Notify";

export function Stats(): JSX.Element {

    useTitle("VacationStats | Stats");

    const user = useSelector<AppState, UserModel>(store => store.user);
    const navigate = useNavigate();

    // Block anonymous users:
    useEffect(() => {
        if(!user) {
            notify.error("You are not logged-in!")
            navigate("/login");
        }
    }, [])

    // If no user, do not render anything:
    if (!user) {
        return null;
    }

    return (
        <div className="Stats">
            <Typography 
                fontWeight={"bold"} 
                fontSize={"5vw"} 
                marginBottom={"1vh"} 
                color="#a1c1d6"
                className="allStatsHeader"
            >
                ALL STATISTICS
            </Typography>
			<StatsAccordion />
        </div>
    );
}
