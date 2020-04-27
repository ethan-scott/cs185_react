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
          <Route exact path="/" component={withRouter(Home)} />
          <Route exact path="/index" component={withRouter(Home)} />
          <Route exact path="/images" component={withRouter(Images)} />
          <Route exact path="/videos" component={withRouter(Videos)} />
          <Route exact path="/links" component={withRouter(Links)} />
        </Switch>
      </BrowserRouter>
    </div>
    )
}

export default App;