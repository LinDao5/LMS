import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "../chart";
import PaymentsInfo from "../paymentsInfo";
import UsersInfo from "../usersInfo";
import Table from "../table";

import * as API from "../../../apis";

import { connect } from "react-redux";
import { adminActions } from "../../../actions";
import { bindActionCreators } from "redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

const Index = (props) => {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [users, setUsers] = useState([]);

  const { token } = props.admin.user;

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
      {/* Payments Chart */}
      {/* <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <Chart />
        </Paper>
      </Grid> */}
      {/* Payments Info */}
      {/* <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <PaymentsInfo />
        </Paper>
      </Grid> */}
      {/* Users Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <Chart />
        </Paper>
      </Grid>
      {/* Users Info */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <UsersInfo data={users} />
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Table title="Recent users" data={users} />
        </Paper>
      </Grid>
      {/* Recent Users */}
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Table title="Recent payments" />
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
