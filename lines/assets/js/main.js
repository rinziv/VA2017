// get a new dataset


//
// for (var i = 0; i < n; i++) {
// 	var r = Math.round(Math.random()*250);
// 	numbers.push(r)
// }
	
var svg = d3.select("#viz")
	.append("svg")
	.attr("width",600)
.attr("height",400);	
	
function generateNumbers(){
	var numbers = [];
	var n = Math.round(Math.random()*15);
	
	numbers = d3.range(n).map(function(d){
		return Math.round(Math.random()*250);
	});
	console.log("numbers",numbers);
	return numbers;
}


function visualizeNumbers(myNumbers){
	var gs = svg.selectAll("g")
	.data(myNumbers);
	
	// exit
	var gsToRemove = gs.exit().remove();
	
	// append
	var gsToAdd = gs
		.enter()
		.append("g")
		.attr("transform",function(d,i){
			return "translate(10,"+(i*14+10)+")";
		});
	gsToAdd.append("line").attr("x2",0).attr("stroke","black");
	gsToAdd.append("text").attr("x",0);	
		
	// update
	gs.select("line")
		.transition()
		.attr("x2",function(d){return d})
		.duration(1500)
		;
	
	gs.select("text")
		.transition()
		.attr("x",function(d){return d + 4})
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

	
