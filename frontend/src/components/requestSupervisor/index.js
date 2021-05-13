import React ,{useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import {Button, Container} from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as API from "../../apis";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    submit: {
        position: 'absolute',
        left: '50%',
        bottom: '10px',
        transform: 'translate(-50%, 0)',
        margin: theme.spacing(3, 0, 2),
        textTransform: "none",
    },
    alert: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const RequestSupervisor = (props) => {
    const classes = useStyles();
    const [checked, setChecked] = useState([]);
    const [message, setMessage] = useState("");
    const [positiveOpen, setPositiveOpen] = useState(false);
    const [negativeOpen, setNegativeOpen] = useState(false);

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
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        // const newChecked = [...checked];
        // if (currentIndex === -1) {
        //     newChecked.push(value);
        // } else {
        //     newChecked.splice(currentIndex, 1);
        // }

        const newChecked = [];
        if (currentIndex === -1) {
            newChecked.pop();
            newChecked.push(value)
        } else {

        }
        setChecked(newChecked);
    };
    const {token = "sss", data = []} = props;

    const supervisorId = () => {
        const ids = [];
        [...checked].map((item, index) => {
            ids.push(item._id);
        });
        return ids;
    };


    const requestMeeting =  ()=> {
        // setLoadingState(true);
        const tokens = token;
        console.log("requestMeetingtoken", tokens);
        const supervisorIds = supervisorId();
        console.log("requestMeetingSuervisorId", supervisorIds);
        API.requestMeeting(token, supervisorIds, message)
            .then((response) => {
                console.log("requestMeeting", response.data);
                const {res} = response.data;
                if (res === 1) {
                    const {upcomeProject} = response.data;
                    handleAlert(1)
                    // console.log("get_upcoming_project_lenght", upcomeProjects.length);
                    // setUpcomeProject(upcomeProject)
                }
            })
            .catch((error) => {
                handleAlert(2);
            });
        // setLoadingState(false);
        setOpen(false);
    };


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        console.log("sssssss", checked);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <List dense className={classes.root}
                  style={{overflowX: 'hidden', overflowY: 'auto', height: 'calc(100% - 130px)', marginTop: "10px"}}>
                {[...data,].map((value, index) => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                        <ListItem key={value} button>
                            {/*<ListItemAvatar>*/}
                            {/*<Avatar*/}
                            {/*alt={`Avatar n°`}*/}
                            {/*src={`/static/images/avatar/${value + 1}.jpg`}*/}
                            {/*/>*/}
                            {/*</ListItemAvatar>*/}
                            <ListItemText id={value.name} primary={`${value.name}`}/>
                            <ListItemSecondaryAction>
                                <Checkbox
                                    edge="end"
                                    onChange={handleToggle(value)}
                                    checked={checked.indexOf(value) !== -1}
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>

            <Button
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleClickOpen}
                disabled={checked.length === 0}
            >
                Request Meeting
            </Button>

            {/*alert part*/}
            <div className={classes.alert}>
                <Snackbar open={positiveOpen} autoHideDuration={6000} onClose={closeAlert}>
                    <Alert onClose={closeAlert} severity="success">
                        Request is send successfully.
                    </Alert>
                </Snackbar>
                <Snackbar open={negativeOpen} autoHideDuration={6000} onClose={closeAlert}>
                    <Alert onClose={closeAlert} severity="error">
                        Request Failed!
                    </Alert>
                </Snackbar>

            </div>

            {/*Dialog*/}
            <div>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Request Meeting</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send updates
                            occasionally.
                        </DialogContentText>
                        {checked.length === 0 &&(
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="To"
                                // value={checked[0].name}

                                fullWidth
                            />
                        )}
                        {checked.length === 1 &&(
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="To"
                                value={checked[0].name}
                                fullWidth
                            />
                        )}

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            multiline
                            rows={3}
                            id="name"
                            label="Time"
                            fullWidth
                            onChange={(evt) => {
                                setMessage(evt.target.value);
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={requestMeeting} color="primary">
                            Send
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>


    );
};

export default RequestSupervisor;