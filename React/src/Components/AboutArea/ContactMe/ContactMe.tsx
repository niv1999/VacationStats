import "./ContactMe.css";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GoogleIcon from '@mui/icons-material/Google';
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";

export function ContactMe(): JSX.Element {
    const links = [
        { icon: <LinkedInIcon />, name: "LinkedIn", url: "https://www.linkedin.com/in/niv-shteingart-429a762a3" },
        { icon: <GitHubIcon />, name: "GitHub", url: "https://github.com/niv1999" },
        { icon: <FacebookIcon />, name: "Facebook", url: "https://www.facebook.com/niv.shtayngart" },
        { icon: <GoogleIcon />, name: "Gmail", url: "mailto:niv1999@gmail.com" },
        { icon: <WhatsAppIcon />, name: "WhatsApp", url: "https://api.whatsapp.com/send/?phone=972527760989" }
    ];

    function handleClick(url: string) {
        window.open(url, "_blank", "noopener,noreferrer")
    };
    
    return (
        <div className="ContactMe">
            <SpeedDial
                ariaLabel="SpeedDial links"
                sx={{ position: 'absolute', left: 0, top: 0}}
                icon={<ArrowForwardIos />}
                direction="right"
            >
                {links.map((link) => (
                    <SpeedDialAction 
                        key={link.name}
                        icon={link.icon}
                        tooltipTitle={link.name}
                        onClick={() => handleClick(link?.url)}
                    />
                ))}
            </SpeedDial>
        </div>
    );
}
