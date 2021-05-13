import React, {useState, useEffect} from "react";
import {makeStyles, fade} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import {Container, TextField, Button, Avatar, Box, Grid, Backdrop, CircularProgress} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {connect} from "react-redux";
import {authActions} from "../../actions";
import {bindActionCreators} from "redux";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import * as API from "../../apis";
import Footer from "../../components/Footer";
import PrimarySearchAppBar from "../../components/appbar";
import InputBase from "@material-ui/core/InputBase/InputBase";
import SubmissionHistory from "../../components/submissionHistory";

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
            marginTop: theme.spacing(2),
        },

        span: {
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(3),
        },

        root: {
            width: '100%',
            marginTop : theme.spacing(2),
        },
        container: {
            maxHeight: 440,
        },

    })
);


const MySubmission = (props) => {
    const classes = useStyle();
    const [loadingState, setLoadingState] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [mySubmission, setMySubmission] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        getMySubmission();
    },[]);

    const getMySubmission = async () => {
        // setLoadingState(true);
        const token = props.auth.user.token;
        console.log("getMySubmissionToken: ", token);
        await API.getMySubmission(token)
            .then((response) => {
                console.log("getLatestSubmission", response.data);
                const {res} = response.data;
                if (res === 1) {
                    const {mySubmission} = response.data;
                    console.log("mySubmissionSuccess:", mySubmission);
                    setMySubmission(mySubmission);
                }
            });
        setLoadingState(false);

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

                <div className={classes.span}>

                </div>

                <h3 className={classes.paper}>My Submission</h3>


                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableBody>
                                {
                                    mySubmission.length > 0 && (
                                        <>
                                        <TableRow hover role="checkbox" >
                                            <TableCell>
                                                {mySubmission[0].title}
                                            </TableCell>

                                            <TableCell>
                                                {mySubmission[0].idea}
                                            </TableCell>

                                            <TableCell>
                                                {mySubmission[0].assessment}
                                            </TableCell>


                                            {
                                                mySubmission[0].isPrevious === 2 && (
                                                    <TableCell align="right">
                                                        OnGoing
                                                    </TableCell>
                                                )
                                            }
                                            {
                                                mySubmission[0].isPrevious === 1 && (
                                                    <TableCell align="right">
                                                        Finished
                                                    </TableCell>
                                                )
                                            }
                                        </TableRow>

                                        </>
                                    )
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>

                </Paper>
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

export default connect(mapStateToProps, mapDispatchToProps)(MySubmission);