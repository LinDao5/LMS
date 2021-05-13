import React, {useState, useEffect} from "react";
import {makeStyles, fade} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import {Container, TextField, Button, Avatar, Box, Grid, Backdrop, CircularProgress} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {connect} from "react-redux";
import {authActions} from "../../actions";
import {bindActionCreators} from "redux";


import * as API from "../../apis";
import Footer from "../../components/Footer";
import PrimarySearchAppBar from "../../components/appbar";
import InputBase from "@material-ui/core/InputBase/InputBase";
import Upcomming from "../../components/upcomming";
import RequestSupervisor from "../../components/requestSupervisor";

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


const HomePage = (props) => {
    const classes = useStyle();
    const [loadingState, setLoadingState] = useState(false);
    const [upcomeProject, setUpcomeProject] = useState([]);
    const [previousProject, setPreviousProject] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
    const [filteredSupervisors, setFilteredSupervisors] = useState([]);
    const [searchTxt, setSearchTxt] = useState("");

    useEffect(() => {
        getUpcomingProject();
    }, []);

    const getUpcomingProject = async () => {
        // setLoadingState(true);
        const token = props.auth.user.token;
        await API.getUpcomingProject(token)
            .then((response) => {
                console.log("get_upcoming_project", response.data);
                const {res} = response.data;
                if (res === 1) {
                    const {upcomeProject} = response.data;
                    // console.log("get_upcoming_project_lenght", upcomeProjects.length);
                    setUpcomeProject(upcomeProject)
                }
            });
        setLoadingState(false);

    };

    useEffect(() => {
        getPreviousProjects();
    }, []);

    const getPreviousProjects = async () => {
        const token = props.auth.user.token;
        await API.getPreviouseProject(token)
            .then((response) => {
                console.log("getPreviousProjects", response.data);
                const {previousProject} = response.data;
                console.log("getPreviouseProject", previousProject);
                setPreviousProject(previousProject);
            })
    };

    useEffect(() => {
        getRequestSupervisor();
    }, []);

    const getRequestSupervisor = () => {
        const token = props.auth.user.token;
        API.getRequestSupervisor(token, searchTxt)
            .then((response) => {
                console.log("getRequestSupervisor", response.data);
                const {res, message} = response.data;
                if (res === 1) {
                    console.log("getRequestSupervisor", message);
                    const {requestSupervisor} = response.data;
                    console.log("getRequestSupervisorSuccess", requestSupervisor);
                    setSupervisors(requestSupervisor);
                    setFilteredSupervisors(requestSupervisor);
                } else {
                    console.log("getRequestSupervisor", "failed");
                }
            })
    };

    const handleSearch = (event) => {
        setFilteredSupervisors(supervisors.filter(supervisor => supervisor.name.toLowerCase().includes(event.target.value.toLowerCase())));
    };

    const [state, setState] = React.useState({
        age: '',
        name: 'hai',
    });
    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
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
    //

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
                        <Grid className="position-relative" item xs={3} style={{
                            height: "400px",
                            border: '1px solid black',
                            borderRadius: "20px",
                            textAlign: "center"
                        }}>

                            <h3>Supervisor</h3>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon/>
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{'aria-label': 'search'}}
                                    onChange={handleSearch}
                                />
                            </div>
                            <RequestSupervisor token={props.auth.user.token} data={filteredSupervisors}/>

                        </Grid>
                        <Grid item xs={3} style={{height: "400px", border: '1px solid black', borderRadius: "20px"}}>

                            <Container className="text-center h-100 px-0 position-relative"
                                       style={{textAlign: "center"}}>
                                <h3 className="m-1">Upcoming Submission</h3>

                                <Upcomming token={props.auth.user.token} data={upcomeProject}/>

                            </Container>
                        </Grid>
                        <Grid item xs={3} style={{
                            height: "400px",
                            border: '1px solid black',
                            borderRadius: "20px",
                            textAlign: "center"
                        }}>
                            <h3>Previous Project</h3>

                            <div style={{overflowX: 'hidden', overflowY: 'auto', height: 'calc(100% - 90px)'}}
                                 className="m-1">
                                <div className="row p-0 m-0 text-left">
                                    {
                                        [...previousProject].map((item, index) => (
                                            <div className="col-12 p-0 m-0 border-top border-bottom" key={index}>
                                                {item.title}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            {/*<Button*/}
                            {/*variant="contained"*/}
                            {/*color="primary"*/}
                            {/*style={{"textTransform": "none"}}*/}
                            {/*className={classes.submit}*/}
                            {/*// onClick={goRequest}*/}
                            {/*>*/}
                            {/*More*/}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);