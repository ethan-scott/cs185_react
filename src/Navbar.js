import React, {Component} from "react";
import ReactDOM from "react-dom";
import {TinyButton as ScrollUpButton} from "react-scroll-up-button";
import {Link} from 'react-router-dom';
import './index.css';

class Navbar extends Component{
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
        return(
        <div id="nav">
            <u1>
                <li><a href="/cs185_react/index" onClick={() => this.changeActive(1)}>Home</a></li>
                <li><a href="/cs185_react/images" onClick={() => this.changeActive(2)}>Images</a></li>
                <li><a href="/cs185_react/videos" onClick={() => this.changeActive(3)}>Videos</a></li>
                <li><a href="/cs185_react/links" onClick={() => this.changeActive(4)}>Links</a></li>
            </u1>
        </div>
        )
    }
}
export default Navbar