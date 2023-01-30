import React from "react";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router";
import Main from "./layout/main";
import Login from "./layout/login";
import UsersPage from "./layout/usersPage";

function App() {
    return <>
        <NavBar />
        <Switch>
            <Route path="/users/:userId?" component={UsersPage} />
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Main}/>
        </Switch>
    </>;
};

export default App;
