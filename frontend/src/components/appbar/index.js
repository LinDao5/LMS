import React, {useState, useEffect} from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import {Container, TextField, Button, Avatar, Box, Grid, Backdrop, CircularProgress} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import {connect} from "react-redux";
import {authActions} from "../../actions";
import {bindActionCreators} from "redux";
import editIdea from "../../reducers/editIdea";
import {editIdeaActions} from "../../actions";
import * as API from "../../apis";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        textAlign: "center",
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
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
        marginRight: theme.spacing(5),
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

const PrimarySearchAppBar = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [user, setUser] = useState([]);
    const [messages, setMessages] = useState([]);


    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    React.useEffect(() => {
        console.log("sssssss", props.auth.user);
        setUser(props.auth.user);                      //todo how to get userinfo
        getMessageCount();
    }, []);

    const getMessageCount = () => {
        const token = props.auth.user.token;
        const role = props.auth.user.role;
        console.log("getMessageCountToken: ", token);
        API.getMessageCount(token, role)
            .then((result) => {
                const {res, message} = result.data;
                if (res === 1) {
                    console.log("getMessageCountSuccess: ", message);
                    const {requests} = result.data;
                    setMessages(requests);

                } else if (res === 2) {
                    console.log("getMessageCountError: ", message);
                }
            })
            .catch((error) => {
                console.log("getMessageCountError: ", error);
            })
    };

    const setInActiveRequest = () => {
        const token = props.auth.user.token;
        const role = props.auth.user.role;
        console.log("getMessageCountToken: ", token);
        API.setInActiveRequest(token)
            .then((result) => {
                const {res, message} = result.data;
                if (res === 1) {
                    console.log("getMessageCountSuccess: ", message);

                } else if (res === 2) {
                    console.log("getMessageCountError: ", message);
                }
            })
            .catch((error) => {
                console.log("getMessageCountError: ", error);
            })
    };


    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const gotoMessage = () => {
        window.location.pathname = "/message";
        setInActiveRequest();
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const logOut = async () => {
        props.authActions.logOut();
        window.location.pathname = "/login";
        console.log("logout", props.auth.user.firstName);
    };

    const handleMenuClose = () => {
        logOut();
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>LOGOUT</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {props.auth.user.role == 1 && (

                <MenuItem>
                    <IconButton aria-label="show 4 new mails" color="inherit" onClick={gotoMessage}>
                        <Badge badgeContent={messages.length} color="secondary">
                            <MailIcon/>
                        </Badge>
                    </IconButton>
                    <p>Messages</p>
                </MenuItem>
            )}
            {props.auth.user.role == 0 && (

                <MenuItem>
                    <IconButton aria-label="show 4 new mails" color="inherit" onClick={gotoMessage}>
                        <Badge badgeContent={messages.length} color="secondary">
                            <MailIcon/>
                        </Badge>
                    </IconButton>
                    <p>Messages</p>
                </MenuItem>
            )}

            {/*<MenuItem>*/}
            {/*<IconButton aria-label="show 11 new notifications" color="inherit">*/}
            {/*<Badge badgeContent={messages.length} color="secondary">*/}
            {/*<NotificationsIcon/>*/}
            {/*</Badge>*/}
            {/*</IconButton>*/}
            {/*<p>Notifications</p>*/}
            {/*</MenuItem>*/}
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>LogOut</p>
            </MenuItem>
        </Menu>
    );

    const gotoCreateProject = () => {
        window.location.pathname = "/create_project";
    };
    const gotoCreateIdea = () => {
        props.editIdeaActions.editIdea([]);
        window.location.pathname = "/edit_idea";
    };
    const gotoSuperHomepage = () => {
        window.location.pathname = "/supervisorhomepage";
    };
    const gotoMyProject= () => {
        window.location.pathname = "/supermyproject";
    };
    const gotoSuperGrading = () => {
        window.location.pathname = "/supervisorgrading";
    };

    const gotoHomePage = () => {
        window.location.pathname = "/homepage";
    };

    const gotoMySubmission = () => {
        window.location.pathname = "/my_submission";
    };

    return (
        <div className={classes.grow}>
            <AppBar position="fixed">
                <Toolbar>
                    <Button color="inherit"
                            style={{"textTransform": "none"}}>Name: {props.auth.user.name}
                    </Button>

                    <div className={classes.grow}/>

                    {props.auth.user.role == 1 && (
                        <>
                            <Button onClick={gotoSuperHomepage} color="inherit"
                                    style={{"textTransform": "none"}}>HomePage</Button>
                            <Button onClick={gotoCreateProject} color="inherit" style={{"textTransform": "none"}}>Create
                                Project</Button>
                            <Button onClick={gotoCreateIdea} color="inherit" style={{"textTransform": "none"}}>Create
                                Idea</Button>
                            <Button onClick={gotoMyProject} color="inherit"
                                    style={{"textTransform": "none"}}>My Project</Button>
                            <Button onClick={gotoSuperGrading} color="inherit"
                                    style={{"textTransform": "none"}}>Grading</Button>
                        </>


                    )}


                    {props.auth.user.role == 0 && (

                        <>
                            <Button onClick={gotoHomePage} color="inherit"
                                    style={{"textTransform": "none"}}>HomePage</Button>
                            <Button onClick={gotoMySubmission} color="inherit"
                                    style={{"textTransform": "none"}}>MySubmission</Button>
                        </>

                    )}
                    <div className={classes.grow}/>
                    <div className={classes.sectionDesktop}>

                        {props.auth.user.role == 1 && (

                            <IconButton aria-label="show 4 new mails" color="inherit" onClick={gotoMessage}>
                                <Badge badgeContent={messages.length} color="secondary">
                                    <MailIcon/>
                                </Badge>
                            </IconButton>
                        )}

                        {props.auth.user.role == 0 && (

                            <IconButton aria-label="show 4 new mails" color="inherit" onClick={gotoMessage}>
                                <Badge badgeContent={messages.length} color="secondary">
                                    <MailIcon/>
                                </Badge>
                            </IconButton>
                        )}


                        {/*<IconButton aria-label="show 17 new notifications" color="inherit">*/}
                        {/*<Badge badgeContent={messages.length} color="secondary">*/}
                        {/*<NotificationsIcon/>*/}
                        {/*</Badge>*/}
                        {/*</IconButton>*/}
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}


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


export default connect(mapStateToProps, mapDispatchToProps)(PrimarySearchAppBar);
