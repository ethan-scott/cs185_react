import React, {Component} from "react";
import ReactDOM from "react-dom";
import {TinyButton as ScrollUpButton} from "react-scroll-up-button";
import './index.css';

class Home extends Component{

    render(){
        return (
            <div>
            <br></br>
            <div>
                <ScrollUpButton />
            </div>
            <h3>Personal Bio - Ethan Scott</h3>
            <p> &emsp; Welcome to my website. I'm a computer science student at UCSB, and 
                I'm currently in my second year. I hope to learn more about website design and user 
                interfaces in this class. </p>
            <br></br>
            <img src="./images/ucsb.jpg" height="100" width="130"></img>
            </div>
        )
    }
}

export default Home;