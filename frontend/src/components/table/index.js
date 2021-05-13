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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import TableRow from '@material-ui/core/TableRow';


import * as API from "../../apis";
import Footer from "../../components/Footer";


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyle = makeStyles((theme) => ({
        alert: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    })
);


const RequestTable = (props) => {
    const classes = useStyle();
    const [loadingState, setLoadingState] = useState(false);
    const [positiveOpen, setPositiveOpen] = useState(false);
    const [negativeOpen, setNegativeOpen] = useState(false);
    const {index = 0, data = []} = props;
    const [role, setRole] = useState("");
    console.log("RequestTable: ", index);

    useEffect(() => {
        const role = props.auth.user.role;
        setRole(role);
    }, []);

    const acceptRequest = () => {
        console.log("replyRequest: ", data);
        const requestId = data._id;
        const studentId = data.studentId;
        const supervisorId = data.supervisorId;
        const isStudentActive = 1;
        const isSupervisorActive = 0;
        const isAccepted = 1;
        API.acceptRequest(requestId, studentId, supervisorId, isStudentActive, isSupervisorActive,isAccepted)
            .then((result) => {
                const {res, message} = result.data;
                if (res === 1) {
                    console.log("acceptRequestSuccess: ", result.data);
                    handleAlert(1);
                }
            })
            .catch((error) => {
                console.log("acceptRequest: ", error);
                handleAlert(0);
            })

    };

    const denyRequest = () => {
        console.log("replyRequest: ", data);
        const requestId = data._id;
        const studentId = data.studentId;
        const supervisorId = data.supervisorId;
        const isStudentActive = 1;
        const isSupervisorActive = 0;
        const isAccepted = 2;
        API.acceptRequest(requestId, studentId, supervisorId, isStudentActive, isSupervisorActive,isAccepted)
            .then((result) => {
                const {res, message} = result.data;
                if (res === 1) {
                    console.log("acceptRequestSuccess: ", result.data);
                    handleAlert(1);
                }
            })
            .catch((error) => {
                console.log("acceptRequest: ", error);
                handleAlert(0);
            })

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
        window.location.pathname = "/message";

    };

    return (
        <>
            <TableRow hover role="checkbox" key={data._id}>
                <TableCell>
                    {data.email}
                </TableCell>

                <TableCell>
                    {data.message}
                </TableCell>

                {
                    role === 1 &&(
                        <>
                            {
                                data.isAccepted === 0 &&(
                                    <TableCell align="right">
                                        <Button className="mr-1" style={{
                                            "textTransform": "none",
                                            "color": "white",
                                            "backgroundColor": "green"
                                        }}
                                                onClick={acceptRequest}>
                                            Accept
                                        </Button>

                                        <Button className="ml-1" style={{
                                            "textTransform": "none",
                                            "color": "white",
                                            "backgroundColor": "red"
                                        }}
                                                onClick={denyRequest}>Deny</Button>
                                    </TableCell>
                                )
                            }
                            {
                                data.isAccepted === 1 &&(
                                    <TableCell align="right" >
                                        Accepted
                                    </TableCell>
                                )
                            }
                            {
                                data.isAccepted === 2 &&(
                                    <TableCell align="right">
                                        Deny
                                    </TableCell>
                                )
                            }
                        </>
                    )
                }
                {
                  role === 0 && (
                      <>
                          {data.isAccepted === 1 && (
                              <TableCell>
                                  Accepted
                              </TableCell>
                          )}
                          {data.isAccepted === 2 && (
                              <TableCell>
                                  Deny
                              </TableCell>
                          )}
                      </>
                  )

                }


            </TableRow>

            {/*alert part*/}
            <div className={classes.alert}>
                <Snackbar open={positiveOpen} autoHideDuration={6000} onClose={closeAlert}>
                    <Alert onClose={closeAlert} severity="success">
                        Sent Successfully
                    </Alert>
                </Snackbar>
                <Snackbar open={negativeOpen} autoHideDuration={6000} onClose={closeAlert}>
                    <Alert onClose={closeAlert} severity="error">
                        Sent Failed!
                    </Alert>
                </Snackbar>

            </div>
        </>


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

export default connect(mapStateToProps, mapDispatchToProps)(RequestTable);