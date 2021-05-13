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
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";


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


const SubmissionHistory = (props) => {
    const classes = useStyle();
    const [loadingState, setLoadingState] = useState(false);
    const [positiveOpen, setPositiveOpen] = useState(false);
    const [negativeOpen, setNegativeOpen] = useState(false);
    const {index = 0, data = []} = props;
    const [role, setRole] = useState("");
    const [comment, setComment] = useState("");

    useEffect(() => {
        const role = props.auth.user.role;
        setRole(role);
    }, []);


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
        window.location.pathname = "/supervisorgrading";
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const setGrade = () => {
        const projectId = data._id;
        const comments = comment;
        API.setGrade(projectId, comments)
            .then((result) => {
                const {res, message} = result.data;
                if (res === 1){
                    handleAlert(1);
                } else {
                    handleAlert(0)
                }
            })
            .catch((error) => {
                console.log("setGradeErrror: ", error);
            });
        handleClose();
    };
    const setDone = () => {
        const projectId = data._id;
        API.setDone(projectId)
            .then((result) => {
                const {res, message} = result.data;
                if (res === 1){
                    handleAlert(1);
                } else {
                    handleAlert(0)
                }
            })
            .catch((error) => {
                console.log("setGradeErrror: ", error);
            });
        handleClose();
    };

    return (
        <>
            <TableRow hover role="checkbox" key={data._id}>
                <TableCell>
                    {data.title}
                </TableCell>

                <TableCell>
                    {data.idea}
                </TableCell>

                <TableCell>
                    {data.assessment}
                </TableCell>


                {
                    data.isPrevious === 2 && (
                        <TableCell align="right">
                            <Button className="mr-1" style={{
                                "textTransform": "none",
                                "color": "white",
                                "backgroundColor": "green"
                            }}
                                    onClick={handleClickOpen}>
                                Grade
                            </Button>

                            <Button className="mr-1" style={{
                                "textTransform": "none",
                                "color": "white",
                                "backgroundColor": "green"
                            }}
                                    onClick={setDone}>
                                Done
                            </Button>

                        </TableCell>
                    )
                }
                {
                    data.isPrevious === 1 && (
                        <TableCell align="right">
                            Finished
                        </TableCell>
                    )
                }


            </TableRow>


            {/*Dialog*/}
            <div>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Grade:</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            multiline
                            rows={3}
                            id="name"
                            label="Comment"
                            fullWidth
                            onChange={(evt) => {
                                setComment(evt.target.value)
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={setGrade} color="primary">
                            Send
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

            {/*alert part*/}
            <div className={classes.alert}>
                <Snackbar open={positiveOpen} autoHideDuration={6000} onClose={closeAlert}>
                    <Alert onClose={closeAlert} severity="success">
                        Updated Successfully
                    </Alert>
                </Snackbar>
                <Snackbar open={negativeOpen} autoHideDuration={6000} onClose={closeAlert}>
                    <Alert onClose={closeAlert} severity="error">
                        Updated Failed!
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

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionHistory);