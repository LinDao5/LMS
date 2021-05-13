import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';

import * as API from "../../../apis";

import { connect } from "react-redux";
import { adminActions } from "../../../actions";
import { bindActionCreators } from "redux";
import SubmissionHistory from "../../../components/submissionHistory";
import {Button} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow/TableRow";
import Title from "../title";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
}));

const Index = (props) => {
    const classes = useStyles();

    const [users, setUsers] = useState([]);

    const { token } = props.admin.user;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [messages, setMessage] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        getMessage();
    }, []);

    const getMessage = async () => {
        props.onLoadingStart();
        await API.adminGetMessage(token)
            .then((response) => {
                console.log("adminGetMessageData", response.data);
                const {res, message} = response.data;
                if (res === 1) {
                    const { messages } = response.data;
                    setMessage(messages);
                } else {
                }
            })
            .catch((error) => {
                console.log("error_getUsers", error);
            });
        props.onLoadingEnd();
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Title>Submissions</Title>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableBody>
                                {
                                    messages.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map((item, index) => {
                                        return (
                                            <TableRow hover role="checkbox" key={item._id}>
                                                <TableCell>
                                                    {item.email}
                                                </TableCell>

                                                <TableCell>
                                                    {item.message}
                                                </TableCell>

                                                {item.isAccepted === 0 && (
                                                    <TableCell>
                                                        Not Accepted
                                                    </TableCell>
                                                )}
                                                {item.isAccepted === 1 && (
                                                    <TableCell>
                                                        Accepted
                                                    </TableCell>
                                                )}
                                                {item.isAccepted === 2 && (
                                                    <TableCell>
                                                        Deny
                                                    </TableCell>
                                                )}

                                            </TableRow>
                                        );
                                    })
                                }
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
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state) => ({
    admin: state.admin,
});

const mapDispatchToProps = (dispatch) => {
    return {
        adminActions: bindActionCreators(adminActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
