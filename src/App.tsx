import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Home from 'components/Home';
import Genre from 'components/Genre';
import NavigationBar from 'components/common/menubar/NavigationBar';
import GenreBar from 'components/common/menubar/GenreBar';
import paths from 'paths';

const App: FC = () => (
  <div>
    <NavigationBar />
    <GenreBar />
    <Switch>
      <Route path={paths.genre} component={Genre} />
      <Route path={paths.home} component={Home} exact />
      <Redirect to={paths.home} />
    </Switch>
  </div>
);

export default App;
