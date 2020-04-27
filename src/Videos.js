import React, {Component} from "react";
import ReactDOM from "react-dom";
import './index.css';

class Videos extends Component{
    constructor(props){
        super(props);
        this.state = {
            "vidnum": 0
        }
        this.closeLightBox = this.closeLightBox.bind(this);
    }

    openLightBox(a){
        this.setState({"vidnum": a})
    }
    
    closeLightBox(){
        this.setState({"vidnum": 0})
    }

    render(){
        if (this.state.vidnum == 1){
            return(
            <div>
                <div id="nav">
                <u1>
                    <li><a href="/index">Home</a></li>
                    <li><a href="/images">Images</a></li>
                    <li><a class="current" href="/videos">Videos</a></li>
                    <li><a href="/links">Links</a></li>
                </u1>
                </div>
                <br/>
                <div class="close">
                    <button onClick={this.closeLightBox}>Close LightBox</button>
                </div>
                <div id="LightBox1" class="LBoxV">
                    <video id="LBvid1" width="500" height = "380" controls>
                        <source src="/images/vid1.mp4" type="video/MP4" />
                    </video>        
                </div>
            </div>
            )
        } else if (this.state.vidnum == 3){
            return(
                <div>
                    <div id="nav">
                    <u1>
                        <li><a href="/index">Home</a></li>
                        <li><a href="/images">Images</a></li>
                        <li><a class="current" href="/videos">Videos</a></li>
                        <li><a href="/links">Links</a></li>
                    </u1>
                    </div>
                    <br/>
                    <div class="close">
                        <button onClick={this.closeLightBox}>Close LightBox</button>
                    </div>
                    <div id="LightBox3" class="LBoxV">
                        <video id="LBvid3" width="500" height = "380" controls>
                            <source src="/images/vid3.mp4" type="video/MP4" />
                        </video>        
                    </div>
                </div>
                )
        }else{
            return(
                <div>
                    <div id="nav">
                    <u1>
                        <li><a href="/index">Home</a></li>
                        <li><a href="/images">Images</a></li>
                        <li><a class="current" href="/videos">Videos</a></li>
                        <li><a href="/links">Links</a></li>
                    </u1>
                    </div>
                    <br/>
                    <h3> Summer 2019, Videos </h3>
                    <div id="videoGrid" class="container">
                        <video onClick={() => this.openLightBox(1)} width="320" height="240" controls>
                            <source src="/images/vid1.mp4" type="video/MP4" />
                        </video>
                        <video onClick={() => this.openLightBox(3)} width="320" height="240" controls>
                            <source src="/images/vid3.mp4" type="video/MP4" />
                        </video>
                    </div>
                </div>
            )
        }
    }
}

export default Videos