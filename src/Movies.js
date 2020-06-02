import React, {Component} from "react";
import './index.css';
import * as firebase from 'firebase';
class Movies extends Component{

    constructor(props) {
        super(props);
        this.state = {
            "getMovies": true,
            "movies":[],
            "moviesrc": {title: "", poster: "", director: "", rating: "", id: "", notIn: []},
            "enableLB": false,
            "movieNames": [],
            "addMovieID": "",
            "searchName": "",
            "IDs":[],
            "alternate": false,
            "alt_movies": [],
            "pages":1,
            "listNames": ["All", "WannaWatch"],
            "lists":{},
            "listNames": "",
            "whichList": "All",
            "value": "WannaWatch",
            "options": false,
        }
        this.getMovies = this.getMovies.bind(this);
        this.openLightBox = this.openLightBox.bind(this);
        this.closeLightBox = this.closeLightBox.bind(this);
        this.handleTextSearch = this.handleTextSearch.bind(this);
        this.handleTextMovie = this.handleTextMovie.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.openOptions = this.openOptions.bind(this);
        this.closeOptions = this.closeOptions.bind(this);
        this.handleTextList = this.handleTextList.bind(this);
        this.addList = this.addList.bind(this);
        this.addMovie = this.addMovie.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.handleListChange = this.handleListChange.bind(this);
        this.addMovieToList = this.addMovieToList.bind(this);
        this.changeWhichList = this.changeWhichList.bind(this);
    }

    getMovies(){
        const axios = require('axios');
        var IDs = []
        var doc = firebase.firestore().collection('posts').doc('movies');
        doc.get().then(snapshot =>{
            var IDs = snapshot.get("IDs");
            var lists = snapshot.get("lists");
            
            for(var i = 0; i < 8; i++){
                axios.get('https://www.omdbapi.com/?i=' + IDs[i] +'&apiKey=3d413702').then((response)=> 
                {var movie = {"poster":"", "title":"", "director":"", "rating":"", "id": ""}
                var r = response;
                movie.poster = r.data.Poster;
                movie.title = r.data.Title;
                movie.director = r.data.Director;
                movie.rating = r.data.imdbRating;
                movie.id = r.data.imdbID;

                var movies = this.state.movies;
                movies.push(movie);
                var movieNames = this.state.movieNames;
                movieNames.push(movie.title);
                this.setState({"movies": movies, "movieNames": movieNames});
                })
            }
            this.setState({"lists": lists, "listNames": Object.keys(lists)})
        })
        this.setState({"getMovies": false});
    }

    openLightBox(a){
        console.log(Object.keys(this.state.lists))
        document.documentElement.style.overflow = 'hidden';
        document.body.scroll = "no";
        console.log(a);
        var doc = firebase.firestore().collection('posts').doc('movies');
        doc.get().then(snapshot =>{
            var lists = snapshot.get("lists");
            console.log(lists)
            var notInList = [];
            for (var key in lists){
                console.log(key)
                console.log(lists[key])
                console.log(a.id)
                if(!lists[key].includes(a.id)){
                    notInList.push(key);
                }
            }
            a.notIn = notInList;
            this.setState({"moviesrc": a, "enableLB": true, "lists":lists});
            console.log(this.state.moviesrc);
        })
    }

    closeLightBox(){
        document.documentElement.style.overflow = 'scroll';
        document.body.scroll = "yes";
        this.setState({"enableLB": false});
    }

    handleTextSearch(evt){
        var name = evt.target.value;
        this.setState({"searchName": name});
    }

    handleSearch(){
        const axios = require('axios');
        var doc = firebase.firestore().collection('posts').doc('movies');
        var IDs = []
        doc.get().then(snapshot =>{
            IDs = snapshot.get("IDs");
            var movies = []
            for(var i = 0; i < IDs.length; i++){
                axios.get('https://www.omdbapi.com/?i=' + IDs[i] +'&apiKey=3d413702').then((response)=> 
                {var movie = {"poster":"", "title":"", "director":"", "rating":"", "id": ""}
                var r = response;
                movie.poster = r.data.Poster;
                movie.title = r.data.Title;
                movie.director = r.data.Director;
                movie.rating = r.data.imdbRating;
                movie.id = r.data.imdbID;

                movies.push(movie);
                var searchName = this.state.searchName;
                for(var i = 0; i < movies.length; i++){
                    if(movies[i].title == searchName){
                        this.setState({"alt_movies": [movies[i]]});
                    }
                }
                this.setState({"alternate": true})
                })
            }   
        })
    }

    openOptions(){
        this.setState({"options":true});
    }

    closeOptions(){
        this.setState({"options":false});
    }

    handleTextList(evt){
        var name = evt.target.value;
        this.setState({"listName": name})
    }

    addList(){
        var name = this.state.listName;
        var myLists = this.state.lists;
        if(!myLists.hasOwnProperty(name)){
            myLists[name] = []
            var doc = firebase.firestore().collection('posts').doc('movies');
            doc.get().then(snapshot =>{
                doc.set({"lists": myLists}, {merge:true});
            })
            this.setState({"lists": myLists})
        }
    }

    handleTextMovie(evt){
        var name = evt.target.value;
        this.setState({"addMovieID": name})
    }

    addMovie(){
        var id = this.state.addMovieID;
        var lists = this.state.lists;
        console.log(lists);
        var all = lists.All;
        console.log(all)
        var doc = firebase.firestore().collection('posts').doc('movies');
        if(! all.includes(id) ){
            all.push(id);
            lists.All = all;
            this.setState({"lists": lists});
            doc.get().then(snapshot =>{
                var IDs = snapshot.get("IDs");
                IDs.push(id);
                doc.set({"lists": lists, "IDs": IDs}, {merge:true});
            })
        }
    }

    loadMore(){
        console.log(this.state.lists.All)
        const axios = require('axios');
        var IDs = []
        var doc = firebase.firestore().collection('posts').doc('movies');
        var a = this.state.pages;
        var b = (a + 1) * 8;
        doc.get().then(snapshot =>{
            var IDs = snapshot.get("IDs");
            for(var i = a * 8; (i < b) & (i < IDs.length); i++){
                axios.get('https://www.omdbapi.com/?i=' + IDs[i] +'&apiKey=3d413702').then((response)=> 
                {var movie = {"poster":"", "title":"", "director":"", "rating":"", "id": ""}
                var r = response;
                console.log(response);
                movie.poster = r.data.Poster;
                movie.title = r.data.Title;
                movie.director = r.data.Director;
                movie.rating = r.data.imdbRating;
                movie.id = r.data.imdbID;

                var movies = this.state.movies;
                movies.push(movie);
                var movieNames = this.state.movieNames;
                movieNames.push(movie.title);
                this.setState({"movies": movies, "movieNames": movieNames});
                })
            }
        })
        this.setState({"pages": a+1})
    }

    handleListChange = e => {
        //this.setState({"value": evt.target.value})
        this.setState({"value": e.target.value})
        console.log(this.state.value)
        console.log(this.state.listNames)
    }

    addMovieToList(){
        var lists = this.state.lists;
        var c = this.state.value;
        var array1 = lists[c]
        if(!array1.includes(this.state.moviesrc.id)){
            array1.push(this.state.moviesrc.id);
            lists[c] = array1
            var doc = firebase.firestore().collection('posts').doc('movies');
            doc.get().then(snapshot =>{
                doc.set({"lists": lists}, {merge:true});
            })
        }
    }

    changeWhichList = e => {
        var c = e.target.value;
        if(c == "All"){
            this.setState({"alternate": false, "whichList": "All"})
        }else{
            this.setState({"whichList": e.target.value})
            var alt_movies = []
            const axios = require('axios');
            var doc = firebase.firestore().collection('posts').doc('movies');
            var IDs = this.state.lists[e.target.value]
            console.log(IDs)
            
            for(var i = 0; i < IDs.length; i++){
                axios.get('https://www.omdbapi.com/?i=' + IDs[i] +'&apiKey=3d413702').then((response)=> 
                {var movie = {"poster":"", "title":"", "director":"", "rating":"", "id": ""}
                var r = response;
                movie.poster = r.data.Poster;
                movie.title = r.data.Title;
                movie.director = r.data.Director;
                movie.rating = r.data.imdbRating;
                movie.id = r.data.imdbID;
                console.log(r)
                alt_movies.push(movie);
                this.setState({"alt_movies": alt_movies})
                })
            }
            console.log(alt_movies)
            this.setState({"alternate": true})
        }
    }
    render(){
        if(this.state.getMovies){
            this.getMovies();
        }
        if(this.state.options){
            return(
                <div>
                    <br/>
                    <button onClick={this.closeOptions}>Close Options</button>
                    <br/>
                    <input type="text" name="addList" onChange={this.handleTextList} />
                    <button onClick={this.addList}>Add List</button>
                    <input type="text" name="addMovie" onChange={this.handleTextMovie} />
                    <button onClick={this.addMovie}>Add Movie</button>
                </div>
            )
        }
        if(this.state.alternate & !this.state.enableLB){
            return(
                <div>
                    <br/>
                    <div class="MovieBar">
                        <div class="Options">
                            <button onClick={this.openOptions}>Options</button>
                        </div>
                        <br/>
                        <div class="MovieSearch">
                            <input type="text" name="search" onChange={this.handleTextSearch} />
                            <button onClick={this.handleSearch}>Search</button>
                        </div>
                        <div>
                            <select value={this.state.whichList} onChange={this.changeWhichList}>
                                {Object.keys(this.state.lists).map((i) =>(
                                    <option value={i}>{i}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div class="MovieGrid">
                        {this.state.alt_movies.map((m) =>(
                            <img src={m.poster} onClick={() => this.openLightBox(m)}></img>
                        ))}
                    </div>
                    <br/>
                    <button onClick={this.loadMore}>Load More</button>
                </div>
            )
        }
        if(this.state.alternate & this.state.enableLB){
            return(
                <div>
                    <br/>
                    <br/>
                    <br/>
                    <div class="MovieGridOpaque">
                            {this.state.alt_movies.map((m) =>(
                                <img src={m.poster}></img>
                            ))}
                    </div>
                    <div class="MovieLB">
                        <img src= {this.state.moviesrc.poster}></img>
                        <div class="MovieDescription">
                            <p>&ensp; {this.state.moviesrc.title}</p>
                            <p>&ensp; Director: {this.state.moviesrc.director}</p>
                            <p>&ensp; Rating: {this.state.moviesrc.rating}</p>
                            <p>&ensp;Add to List: </p>
                                <text>&ensp; &ensp;</text>
                                <select value={this.state.value} onChange={this.handleListChange}>
                                    {this.state.moviesrc.notIn.map((i) =>(
                                    <option value={i}>{i}</option>
                                    ))}
                                </select>
                            <button onClick={() => this.addMovieToList()} >Add To List</button>
                            <br/>
                            <button onClick={() => this.closeLightBox()} >Close</button>
                        </div>
                    </div>
                </div>
            )
        }
        if(!this.state.enableLB){
            return(
                <div>
                    <br/>
                    <div class="MovieBar">
                        <div class="Options">
                            <button onClick={this.openOptions}>Options</button>
                        </div>
                        <br/>
                        <div class="MovieSearch">
                            <input type="text" name="search" onChange={this.handleTextSearch} />
                            <button onClick={this.handleSearch}>Search</button>
                        </div>
                        <div>
                            <select value={this.state.whichList} onChange={this.changeWhichList}>
                                {Object.keys(this.state.lists).map((i) =>(
                                    <option value={i}>{i}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div class="MovieGrid">
                        {this.state.movies.map((m) =>(
                            <img src={m.poster} onClick={() => this.openLightBox(m)}></img>
                        ))}
                    </div>
                    <br/>
                    <button onClick={this.loadMore}>Load More</button>
                </div>
            )
        }
        return(
            <div>
                <div class="MovieGridOpaque">
                        {this.state.movies.map((m) =>(
                            <img src={m.poster}></img>
                        ))}
                </div>
                <div class="MovieLB">
                    <img src= {this.state.moviesrc.poster}></img>
                    <div class="MovieDescription">
                        <p>&ensp; {this.state.moviesrc.title}</p>
                        <p>&ensp; Director: {this.state.moviesrc.director}</p>
                        <p>&ensp; Rating: {this.state.moviesrc.rating}</p>
                        <p>&ensp; Add to List: </p>
                            <text>&ensp; &ensp;</text>
                            <select value={this.state.value} onChange={this.handleListChange}>
                                {this.state.moviesrc.notIn.map((i) =>(
                                <option value={i}>{i}</option>
                                ))}
                            </select>
                        <button onClick={() => this.addMovieToList()} >Add To List</button>
                        <br/>
                        <button onClick={() => this.closeLightBox()} >Close</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Movies;