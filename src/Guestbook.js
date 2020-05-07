import React, {Component} from "react";
import * as firebase from 'firebase';
import './index.css';

class Guestbook extends Component{
    
    constructor (props) {
        super(props);
        this.state = {
            "post": {"name" : "",
                    "description": "",
                    "message":"",
                    "email": "",
                    "visible": false},
            "allposts":[],
            "readFirebase": true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleVisible = this.handleVisible.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.errorMessage = this.errorMessage.bind(this);
        this.retrievePosts = this.retrievePosts.bind(this);
    }

    handleChange (evt) {
        var post = this.state.post;
        var field = evt.target.name;
        var value = evt.target.value;
        post[field] = value;
        this.setState({ "post": post})
        console.log(this.state);
    }

    handleVisible (evt) {
        var post = this.state.post;
        post.visible = this.refs.check1.checked;
        this.setState({ "post": post})
    }

    async handleSubmit(){
        var namelength = this.state.post.name.length;
        var desclength = this.state.post.description.length;
        var messlength = this.state.post.message.length;
        if(namelength < 6 || namelength > 19){
            this.errorMessage();
        }
        else if(desclength > 99){
            this.errorMessage();
        }
        else if(messlength < 16 || messlength > 500){
            this.errorMessage();
        }
        else{
            if(this.state.post.visible){
                var posts = [];
                var doc = firebase.firestore().collection('posts').doc('posts');
                doc.get().then(snapshot =>{
                    posts = snapshot.get("posts");
                    posts.push(this.state.post);
                    doc.set({"posts":posts}, {merge:true});
                    console.log("done writing");
                    this.retrievePosts();  
                })
            }
            var allposts = this.state.allposts;
            allposts.push(this.state.post);
            this.setState({"allposts": allposts});
        }
    }

    errorMessage(){
        console.log("error message");
    }

    retrievePosts(){
        console.log("retrieving")
        var doc = firebase.firestore().collection('posts').doc('posts');
        doc.get().then(snapshot =>{
            var allposts = snapshot.get("posts");
            this.setState({"allposts": allposts})
        })
    }

    render(){
        if(this.state.readFirebase){
            // only read from firebase once
            this.retrievePosts();
            this.setState({"readFirebase": false})
        }
        return(
            <div>
                <br/>
                <div id="inputForm">
                    <form>
                        <label>Name *</label>
                        <input type="text" name="name" onChange={this.handleChange} />
                        <br/>

                        <label>Description</label>
                        <input type="text" name="description" onChange={this.handleChange} />
                        <br/>

                        <label>Message *</label>
                        <input type="text" name="message" onChange={this.handleChange} />
                        <br/>

                        <label>Email</label>
                        <input type="text" name="email" onChange={this.handleChange} />
                        <br/>

                        <label>Visible</label>
                        <input type="checkbox" ref="check1" onChange={this.handleVisible} />
                    </form>
                    <button onClick={this.retrievePosts}>Submit</button>
                </div>
            </div>
        )
    }
}
export default Guestbook