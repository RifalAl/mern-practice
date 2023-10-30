import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { AuthContext } from "./shared/context/auth-context";

import User from "./user/pages/User";
import UserPlace from "./places/pages/UserPlace";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UpdatePlace from "./places/pages/UpdatePlace";
import Login from "./user/pages/Login";
import useAuth from "./shared/hooks/auth-hook";

const App = () => {
  const { token, loginHandler, logoutHandler, uId } = useAuth();

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
        <main className="mt-[5rem]">{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
