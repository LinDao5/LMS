import React, {useState, useEffect} from "react";
import {makeStyles, fade} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import {Container, TextField, Button, Avatar, Box, Grid, Backdrop, CircularProgress} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {connect} from "react-redux";
import {authActions} from "../../../actions";
import {bindActionCreators} from "redux";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


import * as API from "../../../apis";
import Footer from "../../../components/Footer";
import PrimarySearchAppBar from "../../../components/appbar";
import InputBase from "@material-ui/core/InputBase/InputBase";
import editIdea from "../../../reducers/editIdea";
import {editIdeaActions} from "../../../actions";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


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
        form: {
            width: "100%",
            marginTop: theme.spacing(4),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: "#fff",
        },

        selectEmpty: {
            marginTop: theme.spacing(2),
        },

        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },

        inputRoot: {
            color: 'inherit',
        },
    alert: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },

    })
);


const EditIdeas = (props) => {
    const classes = useStyle();
    const [loadingState, setLoadingState] = useState(false);
    const [idea, setIdea] = useState("");
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("red");
    const [editedIdea, setEditedIdea] = useState("");
    const [isCreate, setIsCreate] = useState(true);
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
        window.location.pathname = "/supervisorhomepage";

    };

    useEffect(() => {
        console.log("editIdea", props.editIdea.ideaItem);
        if (props.editIdea.ideaItem.length === 0){
            console.log("ssssEmpty");
            setIsCreate(true);
        } else {
            setIsCreate(false);
            setEditedIdea(props.editIdea.ideaItem[0].idea);
        }

    },[]);

    const editIdea = () => {
        const token = props.auth.user.token;
        const ideaId = props.editIdea.ideaItem[0]._id;
        const editedIdeas = editedIdea;
        console.log("editIdeaData: token: ",token,", ideaId: ", ideaId,", idea:",editedIdeas);
        API.editIdea(token, ideaId, editedIdeas)
            .then((result) => {
                const {res, message} = result.data;
                if (res === 1){
                    console.log("editIdeaSuccess: ", message);
                    handleAlert(1);
                    // props.editIdeaActions.editIdea([]);
                } else {
                    console.log("editIdeaError: ", message);
                    handleAlert(0);

                }
            })

    };

    const createIdea = () => {
        const token = props.auth.user.token;
        console.log("editIdeaData: token: ",token);
        const editedIdeas = editedIdea;
        API.createIdea(token,editedIdeas)
            .then((result) => {
                const {res, message} = result.data;
                if (res === 1){
                    console.log("editIdeaSuccess: ", message);
                    // props.editIdeaActions.editIdea([]);
                    handleAlert(1);
                } else {
                    console.log("editIdeaError: ", message);
                    handleAlert(0);
                }
            })

    };

    return (
        <div>
            <PrimarySearchAppBar {...props}/>
            <Container maxWidth="sm" style={{marginBottom: "40px"}}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                </div>

                <form className={classes.form} noValidate>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Idea"
                        value={editedIdea}
                        onChange={(e) => {
                            setMessage("");
                            setEditedIdea(e.target.value)
                        }}
                    />
                    <div style={{ color: messageColor }}>{message}</div>

                    {isCreate &&(
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            style={{"textTransform": "none"}}
                            onClick={createIdea}
                            disabled={editedIdea === ""}
                        >
                            Create
                        </Button>
                    )}
                    {!isCreate && (
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            style={{"textTransform": "none"}}
                            onClick={editIdea}
                            disabled={editedIdea === ""}
                        >
                            Edit
                        </Button>
                    )}

                </form>
            </Container>

            {/*alert part*/}
            <div className={classes.alert}>
                <Snackbar open={positiveOpen} autoHideDuration={6000} onClose={closeAlert}>
                    <Alert onClose={closeAlert} severity="success">
                        Create Success
                    </Alert>
                </Snackbar>
                <Snackbar open={negativeOpen} autoHideDuration={6000} onClose={closeAlert}>
                    <Alert onClose={closeAlert} severity="error">
                        Create Failed!
                    </Alert>
                </Snackbar>

            </div>

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
    editIdea: state.editIdea,
});

const mapDispatchToProps = (dispatch) => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        editIdeaActions: bindActionCreators(editIdeaActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditIdeas);