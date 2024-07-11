import { Divider } from "@mui/material";
import "./AboutContent.css";
import { ContactMe } from "../ContactMe/ContactMe";

export function AboutContent(): JSX.Element {
    return (
        <div className="AboutContent">
			<h1>Hi, I'm Niv Shteingart.</h1>
            <h2>Full-Stack Developer</h2>
            <Divider />
            <p>I'm a passionate full-stack developer with a love for creating elegant websites and writing clean code. I completed an intensive full-stack development course using Python at John Bryce in Tel Aviv, which equipped me with the skills to build robust systems from scratch and tackle challenging problems head-on.</p>
            <p>Beyond coding, I'm a geek at heart. I’ve completed countless escape rooms and love diving into the strategic world of board games. I also enjoy singing and acting in my free time.</p>
            <p>I recently finished two exciting projects: this website, VacationStats, and its partner site, Paradise Vacations. Feel free to reach out to me through the contact links below!</p>
            <ContactMe />
        </div>
    );
}
