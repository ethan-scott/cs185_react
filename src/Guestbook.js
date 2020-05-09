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
                    "date": "",
                    "visible": false},
            "allposts":[],
            "readFirebase": true,
            "error": " "
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleVisible = this.handleVisible.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(){
        var today = new Date();
        var month = today.getMonth() + 1;
        var date = month + "/" + today.getDate();
        var post = this.state.post;
        post.date = date;
        this.setState({"post": post})

        var namelength = this.state.post.name.length;
        var desclength = this.state.post.description.length;
        var messlength = this.state.post.message.length;
        if(namelength < 6 || namelength > 19){
            this.setState({"error": "Name must be 6 to 19 characters."})
        }
        else if(desclength > 99){
            this.setState({"error": "Description must be less than 100 characters."})
        }
        else if(messlength < 16 || messlength > 500){
            this.setState({"error": "Message must be 16 to 500 characters."})
        }
        else{
            this.setState({"error": " "})
            if(this.state.post.visible){
                var posts = [];
                var doc = firebase.firestore().collection('posts').doc('posts');
                doc.get().then(snapshot =>{
                    posts = snapshot.get("posts");
                    posts.push(this.state.post);
                    doc.set({"posts":posts}, {merge:true});  
                })
            }

            var allposts = this.state.allposts;
            allposts.unshift(this.state.post);
            this.setState({"allposts": allposts});
            console.log(this.state.allposts[this.state.allposts.length - 1]);
        }
    }

    retrievePosts(){
        console.log("retrieving")
        var doc = firebase.firestore().collection('posts').doc('posts');
        doc.get().then(snapshot =>{
            var allposts = snapshot.get("posts");
            // remove all "not visible" posts
            for(var i = allposts.length - 1; i >= 0; i--){
                if(allposts[i].visible == false){
                    allposts.splice(i, 1);
                }
            }
            allposts = allposts.reverse()
            this.setState({"allposts": allposts});
        })
    }

    render(){
        if(this.state.readFirebase){
            // only read from firebase once
            this.retrievePosts();
            this.setState({"readFirebase": false})
        }
        return(
            <div class="guestbook">
                <br/>
                <div class="postForm">
                    <form>
                        <div class="label1">Name *</div>
                        <input type="text" name="name" onChange={this.handleChange} />
                        <br/><br/>

                        <div class="label1">Description </div>
                        <input type="text" name="description" onChange={this.handleChange} />
                        <br/><br/>

                        <div class="label1">Message *</div>
                        <input type="text" name="message" onChange={this.handleChange} />
                        <br/><br/>

                        <div class="label1">Email</div>
                        <input type="text" name="email" onChange={this.handleChange} />
                        <br/><br/>

                        <div class="label1">Visible</div>
                        <input type="checkbox" ref="check1" onChange={this.handleVisible} />
                    </form>
                    <br/>
                    <button onClick={this.handleSubmit}>Submit</button>
                    <p class="errorMessage">{this.state.error}</p>
                </div>
                <div class="displayPosts">
                    {this.state.allposts.map((post) =>(
                        <div class="post">
                            <p>{post.name} &emsp; &emsp;{post.date} </p>
                            <p>{post.description}</p>
                            <p>{post.message}</p>
                            <p>{post.email}</p>
                            <br/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
export default Guestbook