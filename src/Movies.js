import React, {Component} from "react";
import './index.css';

class Movies extends Component{

    constructor(props) {
        super(props);
        this.state = {
            "getMovies": true,
            "movies":[],
            "moviesrc": {title: "", poster: "", director: "", rating: ""},
            "enableLB": false,
            "IDs":["tt1375666", "tt0816692",
                   "tt0114369", "tt0407887",
                   "tt0062622", "tt0477348",
                   "tt1392214", "tt2582782"]
        }
        this.getMovies = this.getMovies.bind(this);
        this.openLightBox = this.openLightBox.bind(this);
    }

    getMovies(){
        const axios = require('axios');
        var IDs = this.state.IDs;
        for(var i = 0; i < IDs.length; i++){
            axios.get('https://www.omdbapi.com/?i=' + IDs[i] +'&apiKey=3d413702').then((response)=> 
            {var movie = {"poster":"", "title":"", "director":"", "rating":""}
             var r = response;
             movie.poster = r.data.Poster;
             movie.title = r.data.Title;
             movie.director = r.data.Director;
             movie.rating = r.data.imdbRating;
             var movies = this.state.movies;
             console.log(movie);
             movies.push(movie);
             this.setState({"movies": movies});
            })
        }
        this.setState({"getMovies": false});
    }

    openLightBox(a){
        document.documentElement.style.overflow = 'hidden';
        document.body.scroll = "no";
        console.log(a);
        this.setState({"moviesrc": a, "enableLB": true});
        console.log(this.state.moviesrc);
    }

    closeLightBox(){
        document.documentElement.style.overflow = 'scroll';
        document.body.scroll = "yes";
        this.setState({"enableLB": false});
    }

    render(){
        if(this.state.getMovies){
            this.getMovies();
        }
        if(!this.state.enableLB){
            return(
                <div>
                    <div class="MovieGrid">
                        {this.state.movies.map((m) =>(
                            <img src={m.poster} onClick={() => this.openLightBox(m)}></img>
                        ))}
                    </div>
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
                        <button onClick={() => this.closeLightBox()} >Close</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Movies;