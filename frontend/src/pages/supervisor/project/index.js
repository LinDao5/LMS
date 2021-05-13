import React, {useState, useEffect} from "react";
import {makeStyles, fade} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import {Container, TextField, Button, Avatar, Box, Grid, Backdrop, CircularProgress} from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {connect} from "react-redux";
import {authActions} from "../../../actions";
import {bindActionCreators} from "redux";


import * as API from "../../../apis";
import Footer from "../../../components/Footer";
import PrimarySearchAppBar from "../../../components/appbar";
import InputBase from "@material-ui/core/InputBase/InputBase";
import Upcomming from "../../../components/upcomming";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
            marginTop: theme.spacing(4),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: "#fff",
        },

        selectEmpty: {
            marginTop: theme.spacing(2),
        },

        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: "#c9c2c2",
            '&:hover': {
                backgroundColor: "#c9c2c2",
            },
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        alert: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },


    })
);


const CreateProject = (props) => {
    const classes = useStyle();
    const [loadingState, setLoadingState] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [positiveOpen, setPositiveOpen] = useState(false);
    const [negativeOpen, setNegativeOpen] = useState(false);

    const handleAlert = (value) => {
        if (value == 1) {
            setPositiveOpen(true);
        } else {
            setNegativeOpen(true);
        }
    };

    const closeAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setPositiveOpen(false);
        setNegativeOpen(false);
        window.location.pathname = "/supervisorhomepage";

    };

    const createProject = async () => {
        setLoadingState(true);
        const token = props.auth.user.token;
        console.log("create_project", token);
        await API.createProject(token, title)
            .then((response) => {
                console.log("create_project", response.data);
                const {res, message} = response.data;
                if (res === 0) {
                    console.log("create_project failed");
                    handleAlert(0);
                } else if (res === 1) {
                    handleAlert(1);
                }
            });
        setLoadingState(false);
    };

    return (
        <div>
            <PrimarySearchAppBar {...props}/>
            <Container maxWidth="sm" style={{marginBottom: "40px"}}>
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
                        label="Project Title"
                        value={title}
                        onChange={(e) => {
                            setMessage("");
                            setTitle(e.target.value);
                        }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        style={{"textTransform": "none"}}
                        onClick={createProject}
                        disabled={title === ""}
                    >
                        Create Project
                    </Button>
                </form>
            </Container>

            {/*alert part*/}
            <div className={classes.alert}>
                <Snackbar open={positiveOpen} autoHideDuration={6000} onClose={closeAlert}>
                    <Alert onClose={closeAlert} severity="success">
                        Create Success
                    </Alert>
                </Snackbar>
                <Snackbar open={negativeOpen} autoHideDuration={6000} onClose={closeAlert}>
                    <Alert onClose={closeAlert} severity="error">
                        Create Failed!
                    </Alert>
                </Snackbar>

            </div>

            {/*for loading*/}
            <Backdrop className={classes.backdrop} open={loadingState}>
                <CircularProgress color="inherit"/>
            </Backdrop>

            {/* footer */}
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);