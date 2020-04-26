import React, {Component} from "react";
import ReactDOM from "react-dom";
import './index.css';

class Images extends Component{
    render(){
        return(
            <div>
                <div id="nav">
                    <u1>
                        <li><a href="index.html">Home</a></li>
                        <li><a class="current" href="images.html">Images</a></li>
                        <li><a href="videos.html">Videos</a></li>
                        <li><a href="links.html">Links</a></li>
                    </u1>
                </div>
                <br></br>
                <button id="scrollTop" title="Go to top">Top</button>
                <h3 id="imgTitle"> Summer 2019, Images </h3>
                <div id="pictureGrid" class="container">
                        <img id="river" src="/images/river.jpg"></img>
                        <img id="whitney" src="/images/whitney.jpg"></img>
                        <img id="rocks" src="/images/rocks.jpg"></img>
                        <img id="lake" src="/images/lake.jpg"></img>
                        <img id="sunset" src="/images/sunset.jpg"></img>
                        <img id="trees" src="/images/trees.jpg"></img>
                        <img id="canyon" src="/images/canyon.jpg"></img>
                        <img id="mountain" src="/images/mountain.jpg"></img>
                        <img id="tent" src="/images/tent.jpg"></img>
                </div>
                <div id="LightBox" class="LBox">
                    <img id="LBimg"></img>
                </div>
            </div>
        )
    }
}

export default Images