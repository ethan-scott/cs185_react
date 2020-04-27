import React, {Component} from "react";
import ReactDOM from "react-dom";
import './index.css';

class Home extends Component{

    render(){
        return (
            <div>
            <div id="nav">
                <u1>
                    <li ><a class="current" href="/index">Home</a></li>
                    <li ><a href="/images">Images</a></li>
                    <li ><a href="/videos">Videos</a></li>
                    <li ><a href="/links">Links</a></li>
                </u1>
            </div>
            <br></br>
            <button id="scrollTop" title="Go to top">Top</button>
            <h3>Personal Bio - Ethan Scott</h3>
            <p> &emsp; Welcome to my website. I'm a computer science student at UCSB, and 
                I'm currently in my second year. I hope to learn more about website design and user 
                interfaces in this class. </p>
            <br></br>
            <img src="/images/ucsb.jpg" height="100" width="130"></img>
            </div>
        )
    }
}

export default Home;