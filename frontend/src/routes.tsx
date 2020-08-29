import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignUp from './components/signup';
import SignIn from './components/signin';
import Home from './components/home';
import { AuthContext } from './contexts/AuthContext';

interface CustomRouteProps {
  isPrivate?: boolean;
  exact?: boolean;
  path: string;
}

const CustomRoute: React.SFC<CustomRouteProps> = ({ isPrivate, ...rest }) => {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/signin" />;
  }

  return <Route {...rest} />;
};

export interface RoutesProps {}

const Routes: React.SFC<RoutesProps> = () => {
  return (
    <>
      <Switch>
        <CustomRoute path="/" isPrivate exact>
          <Home />
        </CustomRoute>
        <CustomRoute path="/signup">
          <SignUp />
        </CustomRoute>
        <CustomRoute path="/signin">
          <SignIn />
        </CustomRoute>
      </Switch>
    </>
  );
};

export default Routes;
