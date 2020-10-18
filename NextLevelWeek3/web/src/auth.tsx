import React from 'react';
import { Route, Redirect} from 'react-router-dom';

const isAuth = () => {
  const tokenInLocalStorage = localStorage.getItem('Authorization')
  const tokenInSessionStorage = sessionStorage.getItem('Authorization')

  const token = (tokenInLocalStorage) || (tokenInSessionStorage)

  if(token) {
    return true
  } else {
    return false;
  }

}

const  PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {

const condition = isAuth();

return  condition ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) : 
  (<Redirect  to="/"  />);
};
export  default  PrivateRoute;