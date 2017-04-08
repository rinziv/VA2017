// get a new dataset


//
// for (var i = 0; i < n; i++) {
// 	var r = Math.round(Math.random()*250);
// 	numbers.push(r)
// }


// General setting of the enviroment
//   * create an SVG container
//   * prepare an axis
var svg = d3.select("#viz")
	.append("svg")
	.attr("width",600)
.attr("height",400);	

var xAxis = d3.svg.axis()
.orient("top");

svg.append("g")
	.attr("class","axis")
    .attr("transform","translate(10,40)")
.call(xAxis);

var gnumbers = svg.append("g")
    .attr("class","numbers")
.attr("transform","translate(10,60)");
	
    
// Random generator of integers
function generateNumbers(){
	var numbers = [];
	var n = 1+Math.round(Math.random()*15);
	
	numbers = d3.range(n).map(function(d){
		return Math.round(Math.random()*2500);
	});
	console.log("numbers",numbers);
	return numbers;
}


function visualizeNumbers(myNumbers){
	var gs = gnumbers.selectAll("g.number")
	.data(myNumbers);
	
	// exit
	var gsToRemove = gs.exit().remove();
	
	// append
	var gsToAdd = gs
		.enter()
		.append("g")
		.attr("class","number")
		.attr("transform",function(d,i){
			return "translate(10,"+(i*14+10)+")";
		});
	gsToAdd.append("line").attr("x2",0).attr("stroke","black");
	gsToAdd.append("text").attr("x",0);	
		
	// update
	var scale = d3.scale.linear()
		.domain([0,d3.max(myNumbers)])
	.range([0,580]);
	
	xAxis.scale(scale);
    
    svg.select("g.axis")
    .call(xAxis);
	
	var cScale = d3.scale.linear()
		.domain([0,d3.max(myNumbers)])
	.range(["#fff", "#f00"]);
	
	
	gs.select("line")
		.transition()
		.attr("x2",scale)
		.attr("stroke",cScale)
		.duration(1500)
		;
	
	gs.select("text")
		.transition()
		.attr("x",function(d){return scale(d)+4})
		.duration(1500)
		.text(function(d){return d});
}


var numbers = generateNumbers();

visualizeNumbers(numbers);

d3.select("#shuffle")
	.on("click", function(d){
		console.log("click");
		visualizeNumbers(generateNumbers());
	})

	
