import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import { Home } from "../../HomeArea/Home/Home";
import { Stats } from "../../StatsArea/Stats/Stats";
import { About } from "../../AboutArea/About/About";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { Login } from "../../AuthArea/Login/Login";

export function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/" element={<Navigate to="/home" />}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/stats" element={<Stats />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="*" element={<PageNotFound />}/>
            </Routes>
        </div>
    );
}
