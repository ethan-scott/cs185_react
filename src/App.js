import * as React from 'react';
import {Component} from 'react';
import {HashRouter, Switch, Route, withRouter, BrowserRouter} from 'react-router-dom';
import './App.css';
import Home from './Home.js';
import Images from './Images.js';
import Videos from './Videos.js';
import Links from './Links.js';
import Movies from './Movies.js';
import Guestbook from './Guestbook.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        "active": 1,
    }
    this.changeActive = this.changeActive.bind(this);
}

changeActive(a){
    this.setState({
        "active": a
    })
}

render(){
  if(this.state.active == 1){
    return(
      <div>
      <div id="nav">
        <u1>
            <li><a class="current" onClick={() => this.changeActive(1)}>Home</a></li>
            <li><a onClick={() => this.changeActive(2)}>Images</a></li>
            <li><a onClick={() => this.changeActive(3)}>Videos</a></li>
            <li><a onClick={() => this.changeActive(4)}>Links</a></li>
            <li><a onClick={() => this.changeActive(5)}>Guestbook</a></li>
            <li><a onClick={() => this.changeActive(6)}>Movies</a></li>
        </u1>
      </div>
      <Home />
      </div>
    )
  }
  if(this.state.active == 2){
    return(
    <div>
    <div id="nav">
      <u1>
          <li><a onClick={() => this.changeActive(1)}>Home</a></li>
          <li><a class="current" onClick={() => this.changeActive(2)}>Images</a></li>
          <li><a onClick={() => this.changeActive(3)}>Videos</a></li>
          <li><a onClick={() => this.changeActive(4)}>Links</a></li>
          <li><a onClick={() => this.changeActive(5)}>Guestbook</a></li>
          <li><a onClick={() => this.changeActive(6)}>Movies</a></li>
      </u1>
    </div>
    <Images />
    </div>
    )
  }
  if(this.state.active == 3){
    return(
    <div>
    <div id="nav">
      <u1>
          <li><a onClick={() => this.changeActive(1)}>Home</a></li>
          <li><a onClick={() => this.changeActive(2)}>Images</a></li>
          <li><a class="current" onClick={() => this.changeActive(3)}>Videos</a></li>
          <li><a onClick={() => this.changeActive(4)}>Links</a></li>
          <li><a onClick={() => this.changeActive(5)}>Guestbook</a></li>
          <li><a onClick={() => this.changeActive(6)}>Movies</a></li>
      </u1>
    </div>
    <Videos />
    </div>
    )
  }
  if(this.state.active == 4){
    return(
    <div>
    <div id="nav">
      <u1>
          <li><a onClick={() => this.changeActive(1)}>Home</a></li>
          <li><a onClick={() => this.changeActive(2)}>Images</a></li>
          <li><a onClick={() => this.changeActive(3)}>Videos</a></li>
          <li><a class="current" onClick={() => this.changeActive(4)}>Links</a></li>
          <li><a onClick={() => this.changeActive(5)}>Guestbook</a></li>
          <li><a onClick={() => this.changeActive(6)}>Movies</a></li>
      </u1>
    </div>
    <Links />
    </div>
    )
  }
  if(this.state.active == 5){
    return(
    <div>
    <div id="nav">
      <u1>
          <li><a onClick={() => this.changeActive(1)}>Home</a></li>
          <li><a onClick={() => this.changeActive(2)}>Images</a></li>
          <li><a onClick={() => this.changeActive(3)}>Videos</a></li>
          <li><a onClick={() => this.changeActive(4)}>Links</a></li>
          <li><a class="current" onClick={() => this.changeActive(5)}>Guestbook</a></li>
          <li><a onClick={() => this.changeActive(6)}>Movies</a></li>
      </u1>
    </div>
    <Guestbook />
    </div>
    )
  }
  if(this.state.active == 6){
    return(
    <div>
    <div id="nav">
      <u1>
          <li><a onClick={() => this.changeActive(1)}>Home</a></li>
          <li><a onClick={() => this.changeActive(2)}>Images</a></li>
          <li><a onClick={() => this.changeActive(3)}>Videos</a></li>
          <li><a onClick={() => this.changeActive(4)}>Links</a></li>
          <li><a onClick={() => this.changeActive(5)}>Guestbook</a></li>
          <li><a class="current" onClick={() => this.changeActive(6)}>Movies</a></li>
      </u1>
    </div>
    <Movies />
    </div>
    )
  }
}
}

export default App;