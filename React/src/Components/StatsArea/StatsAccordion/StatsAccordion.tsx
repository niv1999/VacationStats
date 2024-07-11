import { useEffect, useState } from "react";
import "./StatsAccordion.css";
import { Accordion, AccordionDetails, AccordionSlots, AccordionSummary, Button, Collapse, Divider, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { statsService } from "../../../Services/StatsService";
import { notify } from "../../../Utils/Notify";
import { StatsModel } from "../../../Models/StatsModels";
import { LikesDistributionTable } from "../LikesDistributionTable/LikesDistributionTable"
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import HolidayVillageTwoToneIcon from '@mui/icons-material/HolidayVillageTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FlagTwoToneIcon from '@mui/icons-material/FlagTwoTone';
import { VacationsPieChart } from "../VacationsPieChart/VacationsPieChart";
import usersIcon from "../../../Assets/Icons/users-icon.png"
import likesIcon from "../../../Assets/Icons/likes-icon.png"

export function StatsAccordion(): JSX.Element {

    const [stats, setStats] = useState<StatsModel>()

    useEffect(() => {
        statsService.getAllStats()
            .then(dbStats => {
                setStats(dbStats);
            })
            .catch(err => notify.error("Some error occurred while fetching data."));
    }, []);

    const [expanded, setExpanded] = useState(false);

    function handleExpansion() {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    async function refreshData() {
        try {
            const refreshedStats = await statsService.getAllStats(true);
            setStats(refreshedStats);
            notify.success("Data is up to date!");
        } catch (error) {
            notify.error("Some error occurred while fetching data.");
        }
    }

    const lastUpdateString = new Date(stats?.lastUpdate).toLocaleString();

    return (
        <div className="StatsAccordion">
            <Accordion
                expanded={expanded}
                onChange={handleExpansion}
                slots={{ transition: Collapse as AccordionSlots['transition'] }}
                slotProps={{ transition: { timeout: 300 } }}
                sx={{
                    '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
                    '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <PeopleAltTwoToneIcon />
                    <Typography fontWeight={"bold"} fontSize={"1rem"} align="left" paddingLeft={"6px"}>
                        Total Registered Users
                    </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <Typography textAlign={"left"} fontWeight={"bold"} fontSize={"1.2rem"} className="totalUsers">
                        Users Count: {stats?.usersCount?.users_count}
                        <span><img src={usersIcon} className="usersIcon" /></span>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <HolidayVillageTwoToneIcon />
                    <Typography fontWeight={"bold"} fontSize={"1rem"} align="left" paddingLeft={"6px"}>
                        Vacations Status
                    </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <VacationsPieChart vacationsStatus={stats?.vacationsStatus} />
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <FavoriteTwoToneIcon />
                    <Typography fontWeight={"bold"} fontSize={"1rem"} align="left" paddingLeft={"6px"}>
                        Total Registered Likes
                    </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <Typography textAlign={"left"} fontWeight={"bold"} fontSize={"1.2rem"} className="totalLikes">
                        Likes Count: {stats?.likesCount?.likes_count}
                        <span><img src={likesIcon} className="likesIcon" /></span>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <FlagTwoToneIcon />
                    <Typography fontWeight={"bold"} fontSize={"1rem"} align="left" paddingLeft={"6px"}>
                        Likes Distribution Per Country
                    </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <Typography textAlign={"center"}>
                        <LikesDistributionTable likesDistribution={stats?.likesDistribution} />
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <div className="accordionFooter">
                <Typography fontSize={"0.9rem"} align="left" fontFamily={"Raleway"} color={"white"} fontWeight={"light"}>
                    {
                        lastUpdateString === "Invalid Date" ?
                            "Error with loading data." :
                            `📍 Last update at ${lastUpdateString}`
                    }
                </Typography>
                <Button
                    onClick={refreshData}
                    variant="contained"
                    color="success"
                    size="small"
                >
                    <Typography fontWeight={"light"} color="black" fontSize={"0.9rem"}>
                        Refresh Data
                    </Typography>
                </Button>
            </div>

        </div>
    );
}
