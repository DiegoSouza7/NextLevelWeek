import React from 'react';
import { Route, Redirect} from 'react-router-dom';

const isAuth = () => {
  const tokenInLocalStorage = localStorage.getItem('Authorization')
  const tokenInSessionStorage = sessionStorage.getItem('Authorization')

  const token = (tokenInLocalStorage) || (tokenInSessionStorage)

  if(token) {
    return false
  } else {
    return true;
  }
}

const RouteSessions: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
  location?: any;
}> = (props) => {


  if(isAuth() === true) {
    return (
      <Route  path={props.path}  exact={props.exact} component={props.component} />
    )
  } else {
    return (
      <Redirect to={{ pathname: "/", state: { from: props.location } }} />
    )
  }
}

  export default RouteSessions