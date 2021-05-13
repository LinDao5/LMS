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


import * as API from "../../apis";
import Footer from "../../components/Footer";
import RequestTable from "../../components/table";
import PrimarySearchAppBar from "../../components/appbar";
import InputBase from "@material-ui/core/InputBase/InputBase";

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

        span: {
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(3),
        },

        root: {
            width: '100%',
            marginTop: theme.spacing(2),
        },
        container: {
            maxHeight: 440,
        },

    })
);


const Messages = (props) => {
    const classes = useStyle();
    const [loadingState, setLoadingState] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [messages, setMessages] = useState([]);

    React.useEffect(() => {
        console.log("sssssss", props.auth.user);
        getMessage();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getMessage = () => {
        const token = props.auth.user.token;
        const role = props.auth.user.role;
        console.log("getMessageToken: ", token);
        API.getMessage(token, role)
            .then((result) => {
                const {res, message} = result.data;
                if (res === 1) {
                    console.log("getMessageSuccess: ", result.data);
                    const {requests} = result.data;
                    setMessages(requests);
                } else if (res === 2) {
                    console.log("getMessageError: ", message);
                }
            })
            .catch((error) => {
                console.log("getMessageError: ", error);
            });

    };

    const replyRequest = (value) => {
        console.log("replyRequest: ", value.target.value);
    }

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

                <h3 className={classes.paper}>Messages</h3>


                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableBody>
                                {messages.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map((item, index) => {
                                    return (
                                        <RequestTable data={item} index={index}/>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 15, 30]}
                        component="div"
                        count={messages.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(Messages);