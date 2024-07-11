import { useTitle } from "../../../Utils/UseTitle";
import { AboutCard } from "../AboutCard/AboutCard";
import { GeneralCard } from "../GeneralCard/GeneralCard";
import { OriginalWebsiteCard } from "../OriginalWebsiteCard/OriginalWebsiteCard";
import "./Home.css";

export function Home(): JSX.Element {

    useTitle("VacationStats | Home");

    return (
        <div className="Home">
            <div className="homeCard"><GeneralCard /></div>
            <div className="homeCard"><OriginalWebsiteCard /></div>
            <div className="homeCard"><AboutCard /></div>
        </div>
    );
}
