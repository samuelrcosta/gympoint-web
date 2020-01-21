import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import StudentsList from '../pages/Students/List';
import StudentsForm from '../pages/Students/Form';
import PlansList from '../pages/Plans/List';
import PlansForm from '../pages/Plans/Form';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" component={StudentsList} exact isPrivate />
      <Route path="/students/new" component={StudentsForm} isPrivate />
      <Route path="/students/:id/edit" component={StudentsForm} isPrivate />

      <Route path="/plans" component={PlansList} exact isPrivate />
      <Route path="/plans/new" component={PlansForm} isPrivate />
      <Route path="/plans/:id/edit" component={PlansForm} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} isPrivate />
    </Switch>
  );
}
