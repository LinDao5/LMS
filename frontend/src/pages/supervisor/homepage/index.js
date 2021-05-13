import React, {useState, useEffect} from "react";
import {makeStyles, fade} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import {Container, TextField, Button, Avatar, Box, Grid, Backdrop, CircularProgress} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {connect} from "react-redux";
import {authActions} from "../../../actions";
import {bindActionCreators} from "redux";

import * as API from "../../../apis";
import Footer from "../../../components/Footer";
import PrimarySearchAppBar from "../../../components/appbar";
// import Table  from "../../../components/table";
import InputBase from "@material-ui/core/InputBase/InputBase";
import IdeaSupervisor from "../../../components/ideas";
import Upcomming from "../../../components/upcomming";

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


    })
);

const SupervisorHomePage = (props) => {
    const classes = useStyle();
    const [loadingState, setLoadingState] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [latestSubmissions, setLatestSubmission] = useState([]);
    const [ideas, setIdeas] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [state, setState] = React.useState({
        age: '',
        name: 'hai',
    });

    const [students, setStudents] = React.useState([]);
    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };
    const goRequest = () => {
        window.location.pathname = "/request";
    };

    const [personName, setPersonName] = React.useState([]);

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

    React.useEffect(() => {
        getStudents();
        getLatestSubmission();
        getIdeasWithSupervisor();
    }, []);


    const getStudents = async () => {
        setLoadingState(true);
        const token = props.auth.user.token;
        await API.getStudnets(token)
            .then((response) => {
                console.log("get_student", response.data);
                const {res} = response.data;
                if (res === 1) {
                    const {students} = response.data;
                    console.log("get_student length", students.length);
                    setStudents(students);
                }
            });
        setLoadingState(false);
    };

    const getLatestSubmission = async () => {
        // setLoadingState(true);
        const token = props.auth.user.token;
        await API.getLatestSubmission(token)
            .then((response) => {
                console.log("getLatestSubmission", response.data);
                const {res} = response.data;
                if (res === 1) {
                    const {latestSubmissions} = response.data;
                    console.log("getLatestSubmissionSuccess:", latestSubmissions);
                    setLatestSubmission(latestSubmissions);
                }
            });
        setLoadingState(false);

    };

    const getIdeasWithSupervisor = async () => {
        const token = props.auth.user.token;
        console.log("getIdeasToken", token);

        await API.getIdeasWithSupervisor(token)
            .then((response) => {
                console.log("getIdeasWithSupervisor", response.data);
                const {res, message} = response.data;
                if (res === 1) {
                    const {ideas} = response.data;
                    console.log("getIdeasSuccess", ideas);
                    setIdeas(ideas);
                } else {
                    console.log("getIdeasFail", message);
                }
            })
            .catch((error) => {
                console.log("getIdeasError", error);
            });
    };


    return (
        <div>
            <PrimarySearchAppBar {...props}/>
            <Container style={{marginBottom: "40px"}}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                </div>

                <form className={classes.form} noValidate>
                    <Grid container spacing={2} justify='space-around'>
                        <Grid item xs={3} className="p-0"
                              style={{height: "400px", border: '1px solid black', borderRadius: "20px"}}>
                            <Container className="text-center h-100 px-0" style={{paddingBottom: "30px"}}>
                                <h3 className="m-3">Students</h3>
                                <div style={{overflowX: 'hidden', overflowY: 'auto', height: 'calc(100% - 50px)'}}
                                     className="m-1">
                                    <div className="row p-0 m-0 text-left">
                                        {
                                            [...students].map((item, index) => (
                                                <div className="col-12 p-0 m-0 border-top border-bottom" key={index}>
                                                    {item.first_name + " " + item.last_name}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </Container>
                        </Grid>
                        <Grid item xs={3} className="p-0"
                              style={{height: "400px", border: '1px solid black', borderRadius: "20px"}}>
                            <Container className="h-100 text-center px-0 mt-3">
                                <h3>Latest Submission</h3>
                                <div style={{overflowX: 'hidden', overflowY: 'auto', height: 'calc(100% - 90px)'}}
                                     className="m-1">
                                    <div className="row p-0 m-0 text-left">
                                        {
                                            [...latestSubmissions].map((item, index) => (
                                                <div className="col-12 p-0 m-0 border-top border-bottom" key={index}>
                                                    {item.title}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </Container>
                        </Grid>
                        <Grid item xs={3} style={{
                            height: "400px",
                            border: '1px solid black',
                            borderRadius: "20px",
                            textAlign: "center"
                        }}>
                            <Container className="text-center h-100 px-0 position-relative"
                                       style={{textAlign: "center"}}>
                                <h3>Ideal Pool</h3>

                                <IdeaSupervisor token={props.auth.user.token} data={ideas}/>
                            </Container>

                            {/*<Button*/}
                            {/*variant="contained"*/}
                            {/*color="primary"*/}
                            {/*style={{"textTransform": "none"}}*/}
                            {/*className={classes.submit}*/}
                            {/*// onClick={goRequest}*/}
                            {/*>*/}
                            {/*Edit*/}
                            {/*</Button>*/}
                        </Grid>

                    </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(SupervisorHomePage);