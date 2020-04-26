import React, {Component} from "react";
import ReactDOM from "react-dom";
import './index.css';

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            "counter": 0,
        }
    }
    update(){
        this.setState({"counter": this.state.counter + 1});
    }
    render(){
        return (
            <div>
            <div id="nav">
                <u1>
                    <li ><a class="current" href="index.html">Home</a></li>
                    <li ><a href="images.html">Images</a></li>
                    <li ><a href="videos.html">Videos</a></li>
                    <li ><a href="links.html">Links</a></li>
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