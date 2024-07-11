import { Button, Card, CardActionArea, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography, styled } from "@mui/material";
import vacationStatsImg from "../../../Assets/Images/undraw_undraw_undraw_undraw_undraw_undraw_undraw_users_per_minute_1e4q_t22j_-1-_0ngf_-1-_27dv_30ul_legv_-1-_0f3m.svg"
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/State";
import { UserModel } from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export function GeneralCard(): JSX.Element {

    const user = useSelector<AppState, UserModel>(store => store.user)
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleNavigate = () => {
        user ? navigate("/stats") : navigate("/login")
    };

    return (
        <div className="GeneralCard">
            <Button onClick={handleClickOpen}>
                <Card sx={{ width: "360px" }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="240"
                            image={vacationStatsImg}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                                VacationStats
                            </Typography>
                            <Divider />
                            <Typography variant="body1" sx={{ marginTop: "6px", fontSize: "1rem" }}>
                                Track your performance with VacationStats.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2, fontSize: "2rem" }} id="customized-dialog-title">
                    VacationStats
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                    <Typography gutterBottom padding={"8px"}>
                        Welcome to VacationStats, a powerful analytics tool exclusively designed for administrators of Paradise Vacations.
                        Gain deep insights into your website's performance with detailed statistics and analytics.
                    </Typography>
                    <Typography gutterBottom padding={"8px"}>
                        If you're a regular user, we encourage you to explore Paradise Vacations
                        to discover your dream destinations and plan your next adventure!
                    </Typography>
                    <Typography gutterBottom padding={"8px"}>
                        VacationStats provides valuable data and insights tailored to optimize the performance of Paradise Vacations.
                        Dive into the numbers and unlock the full potential of your online presence.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus variant="contained" onClick={handleNavigate}>
                        {user ? "SEE STATS" : "LOGIN"}
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
