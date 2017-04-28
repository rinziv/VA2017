
var myLineChart = lineBarChart();
var svg = d3.select("#viz")
	.append("svg")
	.attr("width",600)
.attr("height",400);

svg.datum(generateNumbers()).call(myLineChart);


function lineBarChart(){
	var width = 500,
		height =400;
	
	function me(selection){
		// let's assume selection is an SVG container
		console.log("selection", selection.datum());
		
		var xAxis = d3.svg.axis()
		.orient("top");

		if(selection.select("g.axis").empty()){
			selection.append("g")
				.attr("class","axis")
			    .attr("transform","translate(10,40)")
			.call(xAxis);
		}
		
		var gnumbers = selection.select("g.numbers");
		if(gnumbers.empty()){
			gnumbers = selection.append("g")
			    .attr("class","numbers")
			.attr("transform","translate(10,60)");
		}
		
		
		var gs = gnumbers.selectAll("g.number")
		.data(selection.datum());
	
		// exit
		var gsToRemove = gs.exit().remove();
	
		// append
		var gsToAdd = gs
			.enter()
			.append("g")
			.attr("class","number")
			.attr("transform",function(d,i){
				return "translate(0,"+(i*24+10)+")";
			});
		gsToAdd.append("line").attr("x2",0).attr("stroke","black");
		gsToAdd.append("text")
			.attr("text-anchor","end")
			.attr("dy",-2)
			.attr("x",0);	
		
		// update
		var scale = d3.scale.linear()
			.domain([0,d3.max(selection.datum())])
		.range([0,580]);
	
		xAxis.scale(scale);
    
	    selection.select("g.axis")
	    .call(xAxis);
	
		// var cScale = d3.scale.linear()
		// 	.domain([0,d3.max(myNumbers)])
		// .range(["#fff", "#f00"]);
		var cScale = d3.scale.quantile()
			.domain(selection.datum())
		.range(colorbrewer['Purples'][4]);
		//.range(["#fee0d2","#fc9272","#de2d26"]);  // Reds-3classes
	

	
		gs.select("line")
			.transition()
			.attr("x2",scale)
			.attr("stroke",cScale)
			.duration(1500)
			;
	
		gs.select("text")
			.transition()
			.attr("x",function(d){return scale(d)})
			.duration(1500)
			.text(function(d){return d});
	}
	
	me.width = function(_){
		if(!arguments.length) return width;
		width = _;
		return me;
	}
	
	me.height = function(_){
		if(!arguments.length) return height;
		height = _;
		return me;
	}
	
	return me;
}
	
    
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
	
}


var numbers = generateNumbers();

visualizeNumbers(numbers);

d3.select("#shuffle")
	.on("click", function(d){
		console.log("click");
		svg.datum(generateNumbers()).call(myLineChart);
	})

	
