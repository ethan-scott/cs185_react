import React from 'react';
import {BrowserRouter, Switch, Route, withRouter} from 'react-router-dom';
import './App.css';
import Home from './Home.js';
import Images from './Images.js';
import Videos from './Videos.js';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={withRouter(Home)} />
          <Route exact path="/index.html" component={withRouter(Home)} />
          <Route exact path="/images.html" component={withRouter(Images)} />
          <Route exact path="/videos.html" component={withRouter(Videos)} />
        </Switch>
      </BrowserRouter>
    </div>
    )
}

export default App;