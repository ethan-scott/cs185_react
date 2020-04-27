import React from 'react';
import {BrowserRouter, Switch, Route, withRouter} from 'react-router-dom';
import './App.css';
import Home from './Home.js';
import Images from './Images.js';
import Videos from './Videos.js';
import Links from './Links.js';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/cs185_react/" component={withRouter(Home)} />
          <Route exact path="/cs185_react/index" component={withRouter(Home)} />
          <Route exact path="/cs185_react/images" component={withRouter(Images)} />
          <Route exact path="/cs185_react/videos" component={withRouter(Videos)} />
          <Route exact path="/cs185_react/links" component={withRouter(Links)} />
        </Switch>
      </BrowserRouter>
    </div>
    )
}

export default App;