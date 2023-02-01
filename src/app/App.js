import React from "react";
import NavBar from "./components/navBar";
import { Redirect, Route, Switch } from "react-router";
import Main from "./layout/main";
import Login from "./layout/login";
import UsersLayot from "./layout/usersLayot";
import NotFound from "./layout/notFound";

function App() {
    return <>
        <NavBar />
        <Switch>
            <Route path="/users/:userId?" component={UsersLayot} />
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Main} />
            <Route path="/404" component={NotFound} />
            <Redirect to="/404"/>
        </Switch>
    </>;
};

export default App;
