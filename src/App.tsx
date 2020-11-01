import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Home from 'components/Home';
import NavigationBar from 'components/common/menubar/NavigationBar';
import Spacer from 'components/common/atoms/Spacer';
import paths from 'paths';

const App: FC = () => (
  <div>
    <NavigationBar />
    <Spacer />
    <Switch>
      <Route path={paths.home} component={Home} exact />
      <Redirect to={paths.home} />
    </Switch>
  </div>
);

export default App;
