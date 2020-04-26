import React, {Component} from "react";
import ReactDOM from "react-dom";
import './index.css';

class Videos extends Component{
    render(){
        return(
            <div>
                <div id="nav">
                <u1>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="images.html">Images</a></li>
                    <li><a class="current" href="videos.html">Videos</a></li>
                    <li><a href="links.html">Links</a></li>
                </u1>
                </div>
                <br/>
                <button id="scrollTop" title="Go to top">Top</button>
                <h3> Summer 2019, Videos </h3>
                <div id="videoGrid" class="container">
                    <video width="320" height="240" controls>
                        <source src="/images/vid1.mp4" type="video/MP4" />
                    </video>
                    <video width="320" height="240" controls>
                        <source src="/images/vid3.mp4" type="video/MP4" />
                    </video>
                </div>
                <div id="LightBox1" class="LBox">
                    <video id="LBvid1" width="500" height = "380" controls>
                        <source src="/images/vid1.mp4" type="video/MP4" />
                    </video>        
                </div>
                <div id="LightBox3" class="LBox">
                    <video id="LBvid3" width="500" height = "380" controls>
                        <source src="/images/vid3.mp4" type="video/MP4" />
                    </video>        
                </div>
            </div>
        )
    }
}

export default Videos