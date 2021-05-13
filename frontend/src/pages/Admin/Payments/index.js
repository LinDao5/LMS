import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
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
}));

const Index = (props) => {
  const { token } = props.admin.user;
  const classes = useStyles();

  const [payments, setPayments] = React.useState([]);

  React.useEffect(() => {
    getPayments();
  }, []);

  const getPayments = async () => {
    props.onLoadingStart();
    await API.adminGetPayments(token)
      .then((response) => {
        console.log("response_getPayments", response.data);
        const { success } = response.data;
        if (success === 1) {
          const { payments } = response.data;
          setPayments(payments);
        } else {
        }
      })
      .catch((error) => {
        console.log("error_getMessages", error);
      });
    props.onLoadingEnd();
  };

  return (
    <Grid container spacing={3}>
      {/* <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Table title="Memberships" />
        </Paper>
      </Grid> */}
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Table title="Payments" data={payments} />
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
