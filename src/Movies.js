import React, {Component} from "react";
import './index.css';

class Movies extends Component{

    constructor(props) {
        super(props);
        this.state = {
            "getMovies": true,
            "movies":[],
            "IDs":["tt1375666", "tt0816692",
                   "tt0114369", "tt0407887",
                   "tt0062622", "tt0477348",
                   "tt1392214", "tt2582782"]
        }
        this.getMovies = this.getMovies.bind(this);
    }

    getMovies(){
        const axios = require('axios');
        var IDs = this.state.IDs;
        for(var i = 0; i < IDs.length; i++){
            axios.get('http://www.omdbapi.com/?i=' + IDs[i] +'&apiKey=3d413702').then((response)=> 
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

    render(){
        if(this.state.getMovies){
            this.getMovies();
        }
        return(
            <div class="MovieGrid">
                {this.state.movies.map((m) =>(
                    <img src={m.poster}></img>
                ))}
            </div>
        )
    }
}

export default Movies;