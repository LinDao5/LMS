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

  const [packageName, setPackageName] = React.useState("");

  const [packageDescription, setPackageDescription] = React.useState("");

  const [packageFileName, setPackageFileName] = React.useState("");

  const [packageFileType, setPackageFileType] = React.useState("");

  const [packageFileSize, setPackageFileSize] = React.useState("");

  const [thumbnailFileName, setThumbnailFileName] = React.useState("");

  const [packageFile, setPackageFile] = React.useState(null);

  const [thumbnailFile, setThumbnailFile] = React.useState(null);

  const [packages, setPackages] = React.useState([]);

  React.useEffect(() => {
    if (open === false) {
      setPackageName("");
      setPackageDescription("");
      setPackageFile(null);
      setPackageFileName("");
      setPackageFileType("");
      setPackageFileSize("");

      setThumbnailFile(null);
      setThumbnailFileName("");
    }
  }, [open]);

  React.useEffect(() => {
    getPackages();
  }, []);

  const addPackage = async () => {
    props.onLoadingStart();
    await API.adminAddPackage(
      token,
      packageName,
      packageDescription,
      readableFileSize(packageFileSize),
      packageFile,
      thumbnailFile
    )
      .then((response) => {
        console.log("response_addPackage", response.data);
        const { success } = response.data;
        if (success === 1) {
          const { packages } = response.data;
          setPackages(packages);
        } else {
        }
      })
      .catch((error) => {
        console.log("error_addPackage", error);
      });

    props.onLoadingEnd();
    setOpen(false);
  };

  const getPackages = async () => {
    props.onLoadingStart();
    await API.adminGetPackages(token)
      .then((response) => {
        console.log("response_getPackages", response.data);
        const { success } = response.data;
        if (success === 1) {
          const { packages } = response.data;
          setPackages(packages);
        } else {
        }
      })
      .catch((error) => {
        console.log("error_getPackages", error);
      });

    props.onLoadingEnd();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const packageHandleChange = (evt) => {
    if (evt.target.value.length === 0) {
      return;
    }
    console.log("packageHandleChange", evt.target.files[0]);
    setPackageFile(evt.target.files[0]);
    setPackageFileName(evt.target.files[0].name);
    setPackageFileType(evt.target.files[0].type);
    setPackageFileSize(evt.target.files[0].size);
  };

  const thumbnailHandleChange = (evt) => {
    if (evt.target.value.length === 0) {
      return;
    }
    console.log("packageHandleChange", evt.target.files[0]);
    setThumbnailFile(evt.target.files[0]);
    setThumbnailFileName(evt.target.files[0].name);
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
        <DialogTitle id="form-dialog-title">Add Package</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add package, please enter detail of package here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Package Name"
            fullWidth
            value={packageName}
            onChange={(evt) => {
              setPackageName(evt.target.value);
            }}
          />

          <TextField
            margin="dense"
            id="name"
            label="Description"
            fullWidth
            value={packageDescription}
            onChange={(evt) => {
              setPackageDescription(evt.target.value);
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
                Package file
                <input type="file" hidden onChange={packageHandleChange} />
              </Button>
            </Grid>

            <Grid item xs={2} />

            <Grid item xs={5}>
              <Typography className={classes.typography}>
                {packageFileSize > 0 &&
                  packageFileName + " • " + readableFileSize(packageFileSize)}
              </Typography>
            </Grid>

            <Grid item xs={5}>
              <Button
                className={classes.button}
                variant="contained"
                component="label"
                fullWidth
              >
                Thumbnail file
                <input type="file" hidden onChange={thumbnailHandleChange} />
              </Button>
            </Grid>

            <Grid item xs={2} />

            <Grid item xs={5}>
              <Typography className={classes.typography}>
                {thumbnailFileName}
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
            onClick={addPackage}
            disabled={
              packageName === "" ||
              packageDescription === "" ||
              packageFile === null ||
              thumbnailFile === null
            }
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Table title="Packages" data={packages} />
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
