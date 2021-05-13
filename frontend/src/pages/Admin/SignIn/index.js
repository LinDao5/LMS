import React, { useState } from "react";

import { Container, TextField, Button, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import * as API from "../../../apis";

import { connect } from "react-redux";
import { adminActions } from "../../../actions";
import { bindActionCreators } from "redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(8),
  },

  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Index = (props) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const signIn = async () => {
    props.onLoadingStart();
    await API.adminSignIn(email, password)
      .then((response) => {
        console.log("response_signIn", response.data);
        const { success } = response.data;
        if (success === 1) {
          const { user } = response.data;
          setMessage(response.data.message);

          props.adminActions.signIn(user);
        } else {
          setMessage(response.data.message);
        }
      })
      .catch((error) => {
        console.log("error_signUp", error);
      });
    props.onLoadingEnd();
  };

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            value={email}
            onChange={(evt) => {
              setEmail(evt.target.value);
            }}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(evt) => {
              setPassword(evt.target.value);
            }}
          />

          <div style={{ color: "#FF0034" }}>{message}</div>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signIn}
            disabled={email === "" || password === ""}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    adminActions: bindActionCreators(adminActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
