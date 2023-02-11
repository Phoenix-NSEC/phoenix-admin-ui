import React, {useEffect} from 'react'
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import MembershipForm from "views/MembershipForm";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebaseConfig';

const App = () => {
  const history = useHistory();

    useEffect(() => {
        onAuthStateChanged(auth, (userAuth) => {
            if (userAuth) {
              console.log(userAuth);
            } else {
              console.log("error")
              history.push("/auth/signin");
            }
        });
    }, [])

  return (
    <>
        <Switch>
          <Route path={`/auth`} component={AuthLayout} />
          <Route path={`/admin`} component={AdminLayout} />
          <Route path={`/rtl`} component={RTLLayout} />
          <Route path={'/member-registration'} component={MembershipForm}/>
          <Redirect from={`/`} to="/admin/dashboard" />
        </Switch>
    </>
  )
}

export default App