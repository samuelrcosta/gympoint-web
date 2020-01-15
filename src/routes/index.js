import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import StudentsList from '../pages/Students/List';
import StudentsForm from '../pages/Students/Form';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" component={StudentsList} exact isPrivate />
      <Route path="/students/new" component={StudentsForm} isPrivate />
      <Route path="/students/:id/edit" component={StudentsForm} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} isPrivate />
    </Switch>
  );
}
