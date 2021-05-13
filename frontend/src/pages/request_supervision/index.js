import React, {useState, useEffect} from "react";
import {makeStyles, useTheme} from "@material-ui/core/styles";
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
import FormHelperText from '@material-ui/core/FormHelperText';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {connect} from "react-redux";
import {authActions} from "../../actions";
import {submissionActions} from "../../actions";
import {bindActionCreators} from "redux";
import subItem from "../../reducers/submission";
import PrimarySearchAppBar from "../../components/appbar";

import * as API from "../../apis";
import Footer from "../../components/Footer";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

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
            minWidth: 400,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },

        alert: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },

    })
);


const RequstSupervision = (props) => {
    const classes = useStyle();
    const [loadingState, setLoadingState] = useState(false);
    const [userName, setUsername] = useState("");
    const [department, setDepartment] = useState("");
    const [project, setProject] = useState("");
    const [phone, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [ideas, setIdeas] = useState([]);
    const [selectedIdea, setSelectedIdea] = useState("");
    const [positiveOpen, setPositiveOpen] = useState(false);
    const [negativeOpen, setNegativeOpen] = useState(false);

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

    useEffect(() => {
        console.log("requestsupervisionsubitem", props.submission.subItem);
        setProject(props.submission.subItem[0].title);
        setUsername(props.auth.user.name);
        getIdeas();
    }, []);

    const getIdeas = async () => {
        const token = props.auth.user.token;
        const supervisorId = props.submission.subItem[0].supervisor_id;
        console.log("getIdeasToken", token, ", supervisorId:", supervisorId);

        await API.getIdeas(token, supervisorId)
            .then((response) => {
                console.log("getIdeasResult", response.data);
                const {res, message} = response.data;
                if (res === 1) {
                    const {ideas} = response.data;
                    console.log("getIdeasSuccess", ideas);
                    setIdeas(ideas);
                    setSelectedIdea(ideas[0].idea);
                } else {
                    console.log("getIdeasFail", message);
                }
            })
            .catch((error) => {
                console.log("getIdeasError", error);
            });
    };

    const gotoHomePage = () => {
        window.location.pathname = "/homepage";
    };

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
        window.location.pathname="/homepage";

    };

    const [state, setState] = useState({
        age: '',
        name: 'hai',
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
        setSelectedIdea(event.target.value);
        console.log("handleChange", selectedIdea);
    };

    const requestSupervision = () => {
        // setLoadingState(true);
        const token = props.auth.user.token;
        const supervisorId = props.submission.subItem[0].supervisor_id;
        const projectId = props.submission.subItem[0]._id;
        const selectedIdeas = selectedIdea;
        console.log("requestSupervisiondata", ",selectedIdea: ", selectedIdeas, ", projectId:", projectId);

        API.requestSupervision(token, projectId, selectedIdeas)
            .then((result) => {
                const {res, message} = result.data;
                if (res === 1) {
                    console.log("requestSupervisionSuccess: ", message);
                    handleAlert(1);
                    // gotoHomePage();
                } else {
                    console.log("requestSupervisionFail:", message);
                    handleAlert(0);
                }
            });
        // setLoadingState(false);
    };

    const handleDepartment = (event) => {
        setDepartment(event.target.value);
    }
    //
    const [personName, setPersonName] = useState([]);


    const handleChangeMultiple = (event) => {
        const {options} = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setPersonName(value);
    };

    return (
        <div>
            <PrimarySearchAppBar {...props}/>
            <Container maxWidth="md" style={{marginBottom: "40px"}}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                </div>

                <form className={classes.form} noValidate>
                    <Grid container spacing={10}>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="User Name"
                                value={userName}
                                onChange={(e) => {
                                    // setUsername(e.target.value);
                                    console.log("request_username", e.target.value);
                                }}
                            />
                            <FormControl variant="outlined"  className={classes.form}>
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
                                margin="normal"
                                required
                                fullWidth
                                variant="outlined"
                                label="Preferred Project"
                                value={project}

                                // value={project}
                                onChange={(e) => {
                                    // setProject(e.target.value);
                                }}
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Phone Number"
                                value={phone}
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value);
                                }}
                            />

                            <FormControl variant="outlined"  className={classes.form}>
                                <InputLabel id="demo-simple-select-outlined-label">Ideas</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    onChange={handleChange}
                                    label="Ideas"
                                >
                                    {
                                        [...ideas].map((value, index) => {
                                            return (
                                                <option value={value.idea}>{value.idea}</option>
                                            )
                                        })
                                    }

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{"textTransform": "none"}}
                                className={classes.submit}
                                onClick={requestSupervision}
                                disabled={userName === "" || department === ""}
                            >
                                Request Supervision
                            </Button>
                        </Grid>


                    </Grid>
                </form>


            </Container>


            {/*for loading*/}
            <Backdrop className={classes.backdrop} open={loadingState}>
                <CircularProgress color="inherit"/>
            </Backdrop>

            {/*alert part*/}
            <div className={classes.alert}>
                <Snackbar open={positiveOpen} autoHideDuration={6000} onClose={closeAlert}>
                    <Alert onClose={closeAlert} severity="success">
                        Request Success
                    </Alert>
                </Snackbar>
                <Snackbar open={negativeOpen} autoHideDuration={6000} onClose={closeAlert}>
                    <Alert onClose={closeAlert} severity="error">
                        Request Failed!
                    </Alert>
                </Snackbar>

            </div>

            {/* footer */}
            <Footer/>
        </div>

    );

};


const mapStateToProps = (state) => ({
    auth: state.auth,
    submission: state.submission,
});

const mapDispatchToProps = (dispatch) => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        submissionActions: bindActionCreators(submissionActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequstSupervision);