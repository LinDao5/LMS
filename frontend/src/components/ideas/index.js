import React from 'react';
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
import {editIdeaActions} from "../../actions";
import {bindActionCreators} from "redux";
import editIdea from "../../reducers/editIdea";

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

const IdeaSupervisor = (props) => {
    const classes = useStyles();

    const [checked, setChecked] = React.useState("");

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [];
        if (currentIndex === -1) {
            newChecked.pop();
            newChecked.push(value)
        } else {

        }
        setChecked(newChecked);
    };
    const {token = "", data = []} = props;


    const editIdea = () => {
        // setLoadingState(true);
        const tokens = token;
        console.log("editIdeaToken", tokens);
        props.editIdeaActions.editIdea(checked);
        console.log("editIdea props", props.editIdea.ideaItem);

        if (checked.length === 1) {
            window.location.pathname = "/edit_idea";
        } else {
            console.log("editIdeaNull");
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

                            <ListItemText id={value.idea} primary={`${value.idea}`}/>
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
                onClick={editIdea}
            >
                Edit
            </Button>
        </>
    );
};


const mapStateToProps = (state) => ({
    editIdea: state.editIdea,
});

const mapDispatchToProps = (dispatch) => {
    return {
        editIdeaActions: bindActionCreators(editIdeaActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IdeaSupervisor);