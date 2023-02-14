
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import "./index.css"
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import MembershipForm from "views/MembershipForm";
import App from "./App";

ReactDOM.render(
  <HashRouter>
    <App />
    {/* <Switch>
      <Route path={`/auth`} component={AuthLayout} />
      <Route path={`/admin`} component={AdminLayout} />
      <Route path={`/rtl`} component={RTLLayout} />
      <Route path={'/member-registration'} component={MembershipForm}/>
      <Redirect from={`/`} to="/admin/dashboard" />
    </Switch> */}
  </HashRouter>,
  document.getElementById("root")
);
