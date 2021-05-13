import React, {useState, useEffect} from "react";
import {Redirect} from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import {Container, TextField, Button, Avatar, Backdrop, CircularProgress} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from "react-redux";
import { authActions } from "../../actions";
import { bindActionCreators } from "redux";

import * as API from "../../apis";
import Footer from "../../components/Footer";

const useStyle = makeStyles((theme) => ({
        paper: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: theme.spacing(7),
        },
        avatar: {
            marginBottom: theme.spacing(1),
            marginTop: theme.spacing(5),
            width: theme.spacing(7),
            height: theme.spacing(7),
            backgroundColor: theme.palette.secondary.main
        },
        form: {
            width: "100%",
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        backdrop: {
            zIndex : theme.zIndex.drawer + 1,
            color: "#fff",
        }
    }),
);

const Login = (props) => {

    const classes = useStyle();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadingState, setLoadingState] = useState(false);
    const [message, setMessage] = useState("");

    const login = async () => {
        setLoadingState(true);
        await API.login(email,password)
            .then((response) => {
                console.log("login_response", response.data);
                const {res,message} = response.data;
                if (res === 0){
                    console.log("register failed");
                    setMessage(message);
                }else if (res === 1){
                    const {user} = response.data;
                    const nUser = {
                        firstName: user.first_name,
                        lastName: user.last_name,
                        name : user.name,
                        email: user.email,
                        phoneNumber: user.phone_number,
                        token: user.token,
                        role: user.role
                    };
                    props.authActions.login(nUser);
                    gotoHomepage(user.role);
                }
            });
        setLoadingState(false);
    };

    const gotoRegister = () => {
        window.location.pathname = "/register";
    };

    const gotoHomepage= (role) => {
        if (role == 0){
            window.location.pathname = "/homepage";

        } else  if (role == 1){
            window.location.pathname = "/supervisorhomepage";

        }
    };

    return(
        <div>
            <AppBar position="fixed">
                <Container maxWidth="md">
                    <Toolbar>
                        <div style={{flex: 1}}/>
                        <Button color="inherit" onClick={gotoRegister} style={{"textTransform": "none"}}>Register</Button>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container maxWidth="sm">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                </div>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            console.log("login_password", e.target.value);
                        }}
                    />
                    <div style={{ color: "red" }}>{message}</div>

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        style={{"textTransform": "none"}}
                        onClick={login}
                        disabled={email === "" || password === ""}
                    >
                        Login
                    </Button>
                </form>
            </Container>

            {/*for loading*/}
            <Backdrop className={classes.backdrop} open={loadingState}>
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Footer/>
        </div>
    );

};


const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);