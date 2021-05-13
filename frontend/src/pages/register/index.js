import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import {
    Container,
    TextField,
    Button,
    Avatar,
    Box,
    Grid,
    Backdrop,
    CircularProgress,
    InputLabel
} from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import MenuItem from '@material-ui/core/MenuItem';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import Footer from "../../components/Footer";
import * as API from "../../apis";
import * as authActions from "../../actions/auth";


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
            zIndex: theme.zIndex.drawer + 1,
            color: "#fff",
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 250,
        },
        selectEmpty: {
            marginTop: theme.spacing(1),
        },
    })
);

const Register = (props) => {
    const classes = useStyle();

    const [loadingState, setLoadingState] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [department, setDepartment] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [role, setRole] = useState(0);

    console.log("sss", role);
    const handleChange = (event) => {
        const val = event.target.value;
        setRole(val);
        console.log("register", val);
    };

    const handleDepartment = (event) => {
        setDepartment(event.target.value);
    }

    const goLogin = () => {
        window.location.pathname = "/login";
    };
    const gotoHome = (roles) => {
        if (roles == 0) {
            window.location.pathname = "/homepage";

        } else if (roles == 1) {
            window.location.pathname = "/supervisorhomepage";

        }
    };
    const departmentList = [
        {
            value: 'Math',
            label: 'Math',
        },
        {
            value: 'Physics',
            label: 'Physics',
        },
        {
            value: 'Chemistry',
            label: 'Chemistry',
        },
        {
            value: 'Computer',
            label: 'Computer',
        },
    ];

    const register = async () => {
        setLoadingState(true);
        await API.register(firstName, lastName, email, phoneNumber, department, password, role)
            .then((response) => {
                console.log("register_response", response.data);
                const {res, message} = response.data;
                if (res === 1) {    //0:fail, 1:success
                    console.log("register success");
                    const {user} = response.data;
                    const nUser = {
                        firstName: user.first_name,
                        lastName: user.last_name,
                        email: user.email,
                        name: user.name,
                        phoneNumber: user.phone_number,
                        token: user.token,
                        role: user.role
                    };
                    props.authActions.register(nUser);
                    gotoHome(role);
                } else if (res === 0) {
                    console.log("register failed");
                    setMessage(message);
                }
            });
        setLoadingState(false);

    }

    return (
        <div>
            <AppBar position="fixed">
                <Container maxWidth="md">
                    <Toolbar>
                        <div style={{flex: 1}}/>
                        <Button color="inherit" style={{"textTransform": "none"}} onClick={goLogin}>Login</Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container maxWidth="xs" style={{marginBottom: "40px"}}>
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
                        label="First Name"
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                            console.log("register_firstName", e.target.value);
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                    />
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
                        label="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                        }}
                    />
                    <FormControl variant="outlined" className={classes.form}>
                        <InputLabel id="demo-simple-select-outlined-label">Department</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={handleDepartment}
                            label="Department"
                        >
                            {
                                departmentList.map((item) => (
                                    <MenuItem value={item.value}>{item.value}</MenuItem>
                                ))
                            }

                        </Select>
                    </FormControl>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />

                    {/*<span className="d-block my-auto">Role</span>*/}
                    <FormControl variant="outlined" className={classes.form}>
                        <InputLabel htmlFor="grouped-native-select">Role</InputLabel>
                        {/*<NativeSelect*/}
                        {/*value={role.age}*/}
                        {/*onChange={handleChange}*/}
                        {/*name="age"*/}
                        {/*className={classes.selectEmpty}*/}
                        {/*inputProps={{'aria-label': 'age'}}*/}
                        {/*>*/}
                        {/*<option value={0}>Student</option>*/}
                        {/*<option value={1}>Supervisor</option>*/}

                        {/*</NativeSelect>*/}
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={handleChange}
                            label="Age"
                        >

                            <MenuItem value={0}>Student</MenuItem>
                            <MenuItem value={1}>Supervisor</MenuItem>
                        </Select>
                    </FormControl>

                    <div style={{color: "red"}}>{message}</div>

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{"textTransform": "none"}}
                        className={classes.submit}
                        onClick={register}
                        disabled={email === "" || password === "" || phoneNumber === "" || department === "" || firstName === "" || lastName === ""}
                    >
                        Register
                    </Button>
                </form>
            </Container>

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

export default connect(mapStateToProps, mapDispatchToProps)(Register);