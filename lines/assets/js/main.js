// get a new dataset
var numbers = [10,30,60,100,250,80,134,42,99];

var svg = d3.select("#viz")
	.append("svg")
	.attr("width",600)
.attr("height",400);
	
var gs = svg.selectAll("g")
	.data(numbers)
	.enter()
	.append("g")
	.attr("transform",function(d,i){
		return "translate(10,"+(i*14+10)+")";
	});
	
gs.append("line")
	.attr("x2",function(d){return d})
	.attr("stroke","black")
	;
	
gs.append("text")
	.attr("x",function(d){return d + 4})
	.text(function(d){return d});
	
