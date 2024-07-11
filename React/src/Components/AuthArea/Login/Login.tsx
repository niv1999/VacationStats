import { useForm } from "react-hook-form";
import "./Login.css";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { useNavigate } from "react-router-dom";
import { useTitle } from "../../../Utils/UseTitle";
import { notify } from "../../../Utils/Notify";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import { userService } from "../../../Services/UserService";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/State";
import { UserModel } from "../../../Models/UserModel";
import { useEffect } from "react";

export function Login(): JSX.Element {

    useTitle("VacationStats | Login");

    const user = useSelector<AppState, UserModel>(store => store.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            notify.error("You are already logged in!");
            navigate("/home");
        }
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm<CredentialsModel>();

    async function send(credentials: CredentialsModel) {
        try {
            await userService.login(credentials);
            notify.success("Welcome Back!");
            navigate("/home");
        } catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Login">

            <form onSubmit={handleSubmit(send)}>

                <Typography color="primary" variant="h4" width="100%" fontWeight="900">LOGIN</Typography>

                <div className="textFieldContainer">
                    <TextField
                        label="Email" {...register('email', { required: true, minLength: 6 })}
                        type="email"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailTwoToneIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        fullWidth
                    />
                    {errors.email && errors.email.type === "minLength" && <Typography color="error" variant="body2">Too short</Typography>}
                    {errors.email && errors.email.type === "required" && <Typography color="error" variant="body2">Required field</Typography>}
                </div>

                <div className="textFieldContainer">
                    <TextField
                        label="Password" {...register('password', { required: true, minLength: 6 })}
                        type="password"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <VpnKeyTwoToneIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        fullWidth
                    />
                    {errors.password && errors.password.type === "minLength" && <Typography color="error" variant="body2">Too short</Typography>}
                    {errors.password && errors.password.type === "required" && <Typography color="error" variant="body2">Required field</Typography>}
                </div>

                <Button type="submit" color="primary" fullWidth variant="contained">Login</Button>

            </form>

        </div>
    );
}
