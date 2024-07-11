import { Card, CardActionArea, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import "./AboutCard.css";
import aboutMeImg from "../../../Assets/Images/undraw_profile_re_4a55.svg"
import { NavLink } from "react-router-dom";

export function AboutCard(): JSX.Element {
    return (
        <div className="AboutCard">
            <NavLink to="/about">
                <Card sx={{ width: "360px" }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="240"
                            image={aboutMeImg}
                            alt="sunset"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                                About Me
                            </Typography>
                            <Divider />
                            <Typography variant="body1" sx={{ marginTop: "6px", fontSize: "1rem" }}>
                                Meet the creator, Niv Shteingart.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </NavLink>
        </div>
    );
}
