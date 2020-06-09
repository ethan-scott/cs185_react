import React, {Component} from "react";
import './index.css';
var d3 = require("d3");
const axios = require('axios');

const data = {
    nodes: [
        {
            name: "E",
            group: 1
        },
        {
            name: "S",
            group: 2
        }
    ],
    links: [
        {
            source: 1,
            target: 0,
        }
    ]
}

const GraphVizIDs = [
    "tt0407887", // departed
    "tt1375666", // inception
    "tt1663202", // revenant
    "tt0993846", // wolf of wall street
    "tt1345836", // dark night
    "tt1210166", // moneyball
    "tt0137523", // fight club
    "tt0372183"  // bourne supremacy
]

class MovieGraph extends Component{
    constructor(props) {
        super(props);
        this.state = {
            "done": false,
            "nodes": [],
            "links": [],
            "actors": []
        }
        this.chart = this.chart.bind(this);
        this.loadChart = this.loadChart.bind(this);
        this.connectNodes = this.connectNodes.bind(this);
        this.createActorNodes = this.createActorNodes.bind(this);
    }

    drag = (simulation) => {
        function dragStarted(d){
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d){
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragEnded(d){
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded)
    }
    chart(nodes, links){
        const width = 1920;
        const height = 1080;

        const obj_links = links.map(d => Object.create(d));
        const obj_nodes = nodes.map(d => Object.create(d));

        const svg = d3.create("svg")
            .attr("viewBox", [0, 0, width, height])

        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(obj_links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value))
        
        var defs = svg.append('svg:defs')
        for(var i = 0; i < nodes.length; i++){
            if(nodes[i].group == 0){
                defs.append("svg:pattern")
                    .attr("id", nodes[i].id)
                    .attr("width", 10)
                    .attr("height", 10)
                    .append("svg:image")
                    .attr("xlink:href", nodes[i].poster)
                    .attr("x", 0)
                    .attr("y", 0)
            }
        }
       
        console.log(defs)

        const fillNode = (node) => {
            if (node.group == 0) { //movie
                console.log(node.poster)
                console.log(node.id)
                var s = "url(#" + node.id + ")"
                console.log(s)
                return s
            } else {
                return d3.color("blue")
            }
        }

        const getRadius = (node) => {
            if (node.group == 0){
                return 150
            }
            return 50
        }

        const hoverNode = (node) => {
            var nodeSelection = d3.select(this).style({opacity:'0.8'});
            nodeSelection.select("text").style({opacity:'1.0'});
        }
        
        const simulation = d3.forceSimulation(obj_nodes)
            .force("link", d3.forceLink().links(links).id(d => { return d.index; }).distance(400))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width/2, height/2));
        
            simulation.on("tick", () => {
                link
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y);
                
                node
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y);
            })

        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(obj_nodes)
            .join("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", getRadius)
            .style("fill", "#fff")
            .style("fill", fillNode)
            .call(this.drag(simulation))
        
        node.append("svg:title")
            .text(function(d) {return d.name})

        console.log("done")
        return svg.node();
    }

    connectNodes () {
        var n = this.state.nodes;
        var actorsInMovie = [];
        var links = [];
        console.log(n)
        for(var i = 0; i < n.length; i++){
            if(n[i].group == 0){
                actorsInMovie = n[i].actors
                console.log(actorsInMovie)
                for(var j = 0; j < actorsInMovie.length; j++){
                    for(var k = 0; k < n.length; k++){
                        if(n[k].group == 1){
                            if(n[k].name == actorsInMovie[j]){
                                links.push({source: k, target: i})
                            }
                        }
                    }
                }
            }
        }
        this.setState({"links": links})
        console.log(links)
        const elem = document.getElementById("mysvg")
        elem.appendChild(this.chart(this.state.nodes, this.state.links));
    }

    createActorNodes(){
        console.log("?")
        var actorNodes = []
        var actors = []
        var a = {name: "", group: 1}
        var n = this.state.nodes
        var d = []
        for(var i = 0; i < n.length; i++){
            d = []
            d = n[i].actors
            for(var j = 0; j < d.length; j++){
                if(!actors.includes(d[j])){
                    actorNodes.push({name: d[j], group: 1})
                    actors.push(d[j])
                }
            }            
        }
        for(var i = 0; i < actorNodes.length; i++){
            n.push(actorNodes[i])
        }
        this.setState({"nodes": n, "actors": actors})
        console.log(n)
        this.connectNodes();
    }
    async loadChart(){
        if(!this.state.done){
            var d1 = {title: "", actors: [], poster: "", id: "", group: 0}
            var actors = []
            var ac1 = []
            var s = ""
            var counter = 0;
            for(var i = 0; i < 8; i++){
                axios.get('https://www.omdbapi.com/?i=' + GraphVizIDs[i] +'&apiKey=3d413702').then((response)=> 
                    {
                    counter++;
                    d1 = {title: "", actors: [], poster: "", id: "", group: 0}
                    actors = []
                    ac1 = []
                    s = ""
                    var r = response;
                    d1.poster = r.data.Poster;
                    d1.title = r.data.Title;
                    d1.id = r.data.imdbID;
                    s = r.data.Actors;

                    ac1 = s.split(",");
                    for(var j = 0; j < ac1.length; j++){
                        actors.push(ac1[j].trim())
                    }
                    d1.actors = actors
                    console.log(d1)
                    var nodes1 = this.state.nodes
                    nodes1.push(d1)
                    this.setState({"nodes": nodes1})
                    console.log(counter)
                    if(counter == 8){
                        console.log("what?")
                        this.createActorNodes();
                    }
                })
            }
             this.setState({"done": true})
        }
    }
    
    render () {
        
        return(
            <div>
                <br/>
                <button onClick={ () => this.loadChart()} disabled={this.state.done}>Load Graph</button>
                <div id="mysvg"></div>
            </div>   
        )
    }
}

export default MovieGraph;