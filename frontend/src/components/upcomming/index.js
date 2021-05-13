import React,{useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import {Button, Container} from "@material-ui/core";
import * as API from "../../apis";

import {connect} from "react-redux";
import {submissionActions} from "../../actions";
import {bindActionCreators} from "redux";
import subItem from "../../reducers/submission";

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
}));

const Upcomming = (props) => {
    const classes = useStyles();

    const [checked, setChecked] = useState("");

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
    const {token = "", data = []} = props;

    const projectIdss = () => {
        const ids = [];
        [...checked].map((item, index) => {
            ids.push(item._id);
        });
        return ids;
    }


    const upcomingSubmission = () => {
        // setLoadingState(true);
        const tokens = token;
        console.log("upcoming_submission_token", tokens);
        // const projectIds = projectIdss();
        // console.log("upcoming_submission", projectIds);
        props.submissionActions.submission(checked);
        console.log("upcomingSubmission subitem", props.submission.subItem);
        // await API.upcomingSubmission(token, projectIds)
        //     .then((response) => {
        //         console.log("get_upcoming_project", response.data);
        //         const {res} = response.data;
        //         if (res === 1) {
        //             const {upcomeProject} = response.data;
        //             // console.log("get_upcoming_project_lenght", upcomeProjects.length);
        //             // setUpcomeProject(upcomeProject)
        //
        //         }
        //     });
        // setLoadingState(false);
        if (checked.length === 1){
            window.location.pathname = "/request";
        }else {
            console.log("upcoming_submission_select_null");
        }

    };

    return (
        <>
            <List dense className={classes.root}
                  style={{overflowX: 'hidden', overflowY: 'auto', height: 'calc(100% - 130px)', marginTop: "10px"}}>
                {[...data,].map((value, index) => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                        <ListItem key={value} button>
                            <ListItemAvatar>
                                <Avatar
                                    alt={`Avatar n°`}
                                    src={`/static/images/avatar/${value + 1}.jpg`}
                                />
                            </ListItemAvatar>
                            <ListItemText id={value.title} primary={`${value.title}`}/>
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
                onClick={upcomingSubmission}
            >
                Submit
            </Button>

        </>


    );
};


const mapStateToProps = (state) => ({
    // auth: state.auth,
    submission: state.submission,
});

const mapDispatchToProps = (dispatch) => {
    return {
        // authActions: bindActionCreators(submissionActions, dispatch),
        submissionActions : bindActionCreators(submissionActions,dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upcomming);