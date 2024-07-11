import { ReactElement, Ref, forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { userService } from "../../../Services/UserService";
import { TransitionProps } from "@mui/material/transitions";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props}/>
});

export function LogoutButton(): JSX.Element {
    
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const logout = () => {
        userService.logout();
        navigate("/home");
    }

    return (
        <>
            <Button onClick={handleClickOpen}>Logout</Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Logout"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to log out?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="primary" fullWidth>Cancel</Button>
                    <Button onClick={logout} variant="contained" color="primary" fullWidth>Logout</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
