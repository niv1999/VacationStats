import { Button, Card, CardActionArea, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography, styled } from "@mui/material";
import paradiseVacationsImg from "../../../Assets/Images/undraw_relaxation_re_ohkx.svg"
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { appConfig } from "../../../Utils/AppConfig";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export function OriginalWebsiteCard(): JSX.Element {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleNavigate = () => {
        setOpen(false);
        window.open(appConfig.paradiseVacationsUrl, "_blank");
    };

    return (
        <div className="OriginalWebsiteCard">
            <Button onClick={handleClickOpen}>
                <Card sx={{ width: "360px"}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="240"
                            image={paradiseVacationsImg}
                            alt="sunset"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                                Paradise Vacations
                            </Typography>
                            <Divider />
                            <Typography sx={{ marginTop: "6px", fontSize: "1rem" }}>
                                Explore destinations on Paradise Vacations.
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
                    Paradise Vacations
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
                        Welcome to Paradise Vacations, your ultimate destination for dream getaways.
                        Users can explore a diverse array of vacation options, sorting them by various categories to find their perfect escape.
                    </Typography>
                    <Typography gutterBottom padding={"8px"}>
                        Paradise Vacations offers a seamless experience for users to discover and plan their dream vacations.
                        With intuitive sorting options and a wide selection of destinations, finding the perfect spot is effortless.
                    </Typography>
                    <Typography gutterBottom padding={"8px"}>
                        Administrators at Paradise Vacations enjoy powerful tools to ensure a smooth user experience,
                        making it a hub for vacation enthusiasts worldwide.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus variant="contained" onClick={handleNavigate}>
                        Go To Website
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
