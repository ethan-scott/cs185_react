import React, {Component} from "react";
import ReactDOM from "react-dom";
import './index.css';
import {TinyButton as ScrollUpButton} from "react-scroll-up-button";


class Images extends Component{
    constructor(props){
        super(props);
        this.state = {
            "enableLB": false,
            "imgsrc": "/images/whitney.jpg"
        }
        this.closeLightBox = this.closeLightBox.bind(this);
    }
    
    openLightBox(a){
        var imgsrc = "./images/" + a + ".jpg";
        console.log(imgsrc);
        this.setState({
            "enableLB": true,
            "imgsrc": imgsrc
         })
         console.log(this.state)
    }
    
    closeLightBox(){
        this.setState({
            "enableLB": false
        })
        console.log(this.state)
    }

    render(){
        if (!this.state.enableLB){
        return(
            <div>
                <br></br>
                <h3 id="imgTitle"> Summer 2019, Images </h3>
                <div>
                    <ScrollUpButton />
                </div>
                <div id="pictureGrid" class="container">
                        <img id="river" src="./images/river.jpg" onClick={() => this.openLightBox('river')} />
                        <img id="whitney" src="./images/whitney.jpg" onClick={() => this.openLightBox('whitney')} />
                        <img id="rocks" src="./images/rocks.jpg" onClick={() => this.openLightBox('rocks')} />
                        <img id="lake" src="./images/lake.jpg" onClick={() => this.openLightBox('lake')} />
                        <img id="sunset" src="./images/sunset.jpg" onClick={() => this.openLightBox('sunset')} />
                        <img id="trees" src="./images/trees.jpg" onClick={() => this.openLightBox('trees')} />
                        <img id="canyon" src="./images/canyon.jpg" onClick={() => this.openLightBox('canyon')} />
                        <img id="mountain" src="./images/mountain.jpg" onClick={() => this.openLightBox('mountain')} />
                        <img id="tent" src="./images/tent.jpg" onClick={() => this.openLightBox('tent')} />
                </div>
            </div>
        )
        }
        return(
            <div>
                <div id="LightBox" class="LBox">
                    <button onClick={this.closeLightBox}>Close LightBox</button>
                    <img id="LBimg" src={this.state.imgsrc}></img>
                </div>
            </div>
        )
    }
}

export default Images