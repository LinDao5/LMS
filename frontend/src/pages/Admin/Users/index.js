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
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [latestSubmissions, setLatestSubmission] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    props.onLoadingStart();
    await API.adminGetUsers(token)
      .then((response) => {
        console.log("response_getUsers", response.data);
        const { success } = response.data;
        if (success === 1) {
          const { users } = response.data;
          console.log("getUsersss: ", response.data);
          setUsers(users);
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
          <Title>Students</Title>
          <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">

                      <TableBody>

                          {
                              users.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map((item, index) => {
                                  if (item.role === 0){
                                      return (
                                          <TableRow hover role="checkbox" key={item._id}>
                                              <TableCell>
                                                  {item.name}
                                              </TableCell>

                                              <TableCell>
                                                  {item.email}
                                              </TableCell>

                                              <TableCell>
                                                  {item.phone_number}
                                              </TableCell>

                                              <TableCell>
                                                  {item.department}
                                              </TableCell>

                                          </TableRow>
                                      );
                                  }

                              })
                          }
                      </TableBody>
                  </Table>
              </TableContainer>
              <TablePagination
                  rowsPerPageOptions={[5, 15, 30]}
                  component="div"
                  count={latestSubmissions.length}
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
