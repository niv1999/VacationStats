import { useTitle } from "../../../Utils/UseTitle";
import { AboutContent } from "../AboutContent/AboutContent";
import "./About.css";

export function About(): JSX.Element {

    useTitle("VacationStats | About");
    
    return (
        <div className="About">
			<div className="blob"></div>
            <div className="aboutContent">
                <AboutContent />
            </div>
        </div>
    );
}
