import React, {Component} from "react";
import ReactDOM from "react-dom";
import {TinyButton as ScrollUpButton} from "react-scroll-up-button";
import './index.css';

class Links extends Component{
    render(){
        return (
            <div>
                <div id="nav">
                <u1>
                    <li><a href="/cs185_react/index">Home</a></li>
                    <li><a href="/cs185_react/images">Images</a></li>
                    <li><a href="/cs185_react/videos">Videos</a></li>
                    <li><a class="current" href="/cs185_react/links">Links</a></li>
                </u1>
                </div>
                <br />
                <div>
                    <ScrollUpButton />
                </div>
                <h3>External Links</h3>
                <br />
                <div id="project">
                    <a href="https://github.com/ucsb-ersp-2019/ersp_architecture"><img src="/images/github.png" />  ERSP Architecture</a>
                </div> 
                <div id="project">
                    <a href="https://github.com/ethan-scott/CS185"><img src="/images/github.png" />  CS185 Repository</a>
                </div>
                <div id="project">
                    <a href="https://engineering.ucsb.edu/"><img src="/images/ucsb.jpg" />   UCSB College of Engineering</a>
                </div>
            </div>
        )
    }
}

export default Links
