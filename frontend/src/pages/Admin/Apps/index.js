import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
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

  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  typography: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Index = (props) => {
  const { token } = props.admin.user;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [appVersion, setAppVersion] = React.useState("");

  const [appDescription, setAppDescription] = React.useState("");

  const [appFileName, setAppFileName] = React.useState("");

  const [appFileSize, setAppFileSize] = React.useState("");

  const [appFile, setAppFile] = React.useState(null);

  const [apps, setApps] = React.useState([]);

  React.useEffect(() => {
    if (open === false) {
      setAppFile(null);
      setAppFileName("");
      setAppFileSize("");
      setAppVersion("");
      setAppDescription("");
    }
  }, [open]);

  React.useEffect(() => {
    getApps();
  }, []);

  const addApp = async () => {
    props.onLoadingStart();
    await API.adminAddApp(
      token,
      appVersion,
      appDescription,
      readableFileSize(appFileSize),
      appFile
    )
      .then((response) => {
        console.log("response_addApp", response.data);
        const { success } = response.data;
        if (success === 1) {
          const { apps } = response.data;
          setApps(apps);
        } else {
        }
      })
      .catch((error) => {
        console.log("error_addPackage", error);
      });

    props.onLoadingEnd();
    setOpen(false);
  };

  const getApps = async () => {
    props.onLoadingStart();
    await API.adminGetApps(token)
      .then((response) => {
        console.log("response_getApps", response.data);
        const { success } = response.data;
        if (success === 1) {
          const { apps } = response.data;
          setApps(apps);
        } else {
        }
      })
      .catch((error) => {
        console.log("error_getApps", error);
      });
    props.onLoadingEnd();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const appHandleChange = (evt) => {
    if (evt.target.value.length === 0) {
      return;
    }
    console.log("appHandleChange", evt.target.files[0]);
    setAppFile(evt.target.files[0]);
    setAppFileName(evt.target.files[0].name);
    setAppFileSize(evt.target.files[0].size);
  };

  const readableFileSize = (bytes, si = true, dp = 1) => {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
      return bytes + " B";
    }

    const units = si
      ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
      : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
    let u = -1;
    const r = 10 ** dp;

    do {
      bytes /= thresh;
      ++u;
    } while (
      Math.round(Math.abs(bytes) * r) / r >= thresh &&
      u < units.length - 1
    );

    return bytes.toFixed(dp) + " " + units[u];
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add App</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add app, please enter detail of app here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Version"
            fullWidth
            value={appVersion}
            onChange={(evt) => {
              setAppVersion(evt.target.value);
            }}
          />

          <TextField
            margin="dense"
            id="name"
            label="Description"
            fullWidth
            value={appDescription}
            onChange={(evt) => {
              setAppDescription(evt.target.value);
            }}
          />

          <Grid container>
            <Grid item xs={5}>
              <Button
                className={classes.button}
                variant="contained"
                component="label"
                fullWidth
              >
                App file
                <input type="file" hidden onChange={appHandleChange} />
              </Button>
            </Grid>

            <Grid item xs={2} />

            <Grid item xs={5}>
              <Typography className={classes.typography}>
                {appFileSize > 0 &&
                  appFileName + " • " + readableFileSize(appFileSize)}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={addApp}
            disabled={
              appVersion === "" || appDescription === "" || appFile === null
            }
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Table title="Apps" data={apps} />
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
