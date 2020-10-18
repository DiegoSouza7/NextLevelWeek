import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import PrivateRoute from './auth';
import RouteSessions from './authSession';
import RedirectToRoute from './redirectToRoute';

import Landing from './pages/Landing';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import OrphanagesMap from './pages/OrphanagesMap';
import Dashboard from './pages/Dashboard';
import PendingOrphanages from './pages/PendingOrphanages';


function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" exact component={OrphanagesMap} />

        <RouteSessions path="/login" exact component={Login} />
        <RouteSessions path="/forgot" exact component={ForgotPassword} />
        <PrivateRoute path="/orphanages/create" exact component={CreateOrphanage} />
        <Route path="/orphanages/:id" exact component={Orphanage} />
        <RouteSessions path="/reset" exact component={ResetPassword} />

        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/pending" exact component={PendingOrphanages} />

        <Route component={RedirectToRoute} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;