import React from "react";

import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import {Page, Admin, Verification} from "./pages";

import Login from "./pages/login";
import Register from "./pages/register";
import RequstSupervision from "./pages/request_supervision";
import HomePage from "./pages/homepage";
import SupervisorHomePage from "./pages/supervisor/homepage";
import SupervisorGrading from "./pages/supervisor/grading";
import CreateProject from "./pages/supervisor/project";
import MyProject from "./pages/supervisor/myproject";
import EditIdeas from "./pages/supervisor/idea";
import Messages from "./pages/messages";
import MySubmission from "./pages/mysubmission";

import {Provider} from "react-redux";
import store from "./store";

import "./App.css";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>

                    <Route exact path="/admin" render={(props) => <Admin {...props} />}/>

                    <Route exact path="/homepage" render={(props) => <HomePage{...props}/>}/>
                    <Route exact path="/my_submission" render={(props) => <MySubmission{...props}/>}/>
                    <Route exact path="/supervisorhomepage" render={(props) => <SupervisorHomePage{...props}/>}/>
                    <Route exact path="/supervisorgrading" render={(props) => <SupervisorGrading{...props}/>}/>
                    <Route exact path="/supermyproject" render={(props) => <MyProject{...props}/>}/>
                    <Route exact path="/create_project" render={(props) => <CreateProject{...props}/>}/>
                    <Route exact path="/edit_idea" render={(props) => <EditIdeas{...props}/>}/>
                    <Route exact path="/message" render={(props) => <Messages{...props}/>}/>
                    <Route exact path="/request" render={(props) => <RequstSupervision {...props}/>}/>

                    <Redirect exact={true} from="/" to="/login"/>
                    <Route exact path="/login" render={(props) => <Login {...props}/>}/>
                    <Route exact path="/register" render={(props) => <Register {...props}/>}/>


                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
