import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Main from "./layout/main";
import Login from "./layout/login";
import UsersLayot from "./layout/usersLayot";
import NotFound from "./layout/notFound";
import NavBar from "./components/ui/navBar";
import UserEditPage from "./components/page/userEditPage";

function App() {
    return <>
        <NavBar />
        <Switch>
            <Route path="/users/:userId?/edit" component={UserEditPage} />
            <Route path="/users/:userId?" component={UsersLayot} />
            <Route path="/login/:type?" component={Login} />
            <Route exact path="/" component={Main} />
            <Route path="/404" component={NotFound} />
            <Redirect to="/404"/>
        </Switch>
    </>;
};

export default App;
