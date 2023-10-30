import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import useAuth from "./shared/hooks/auth-hook";
import loading from "./assets/loading.svg";

const User = React.lazy(() => import("./user/pages/User"));
const UserPlace = React.lazy(() => import("./places/pages/UserPlace"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const Login = React.lazy(() => import("./user/pages/Login"));

const App = () => {
  const { token, loginHandler, logoutHandler, uId } = useAuth();
  const loadingComponent = (
    <div className="flex justify-center">
      <img className="w-[150px]" src={loading} alt="loading" />
    </div>
  );
  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <User />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlace />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <User />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlace />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: uId,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      <Router>
        <MainNavigation />
        <main className="mt-[5rem]">
          <Suspense fallback={loadingComponent}>{routes}</Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
