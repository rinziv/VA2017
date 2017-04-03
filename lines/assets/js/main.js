// get a new dataset


//
// for (var i = 0; i < n; i++) {
// 	var r = Math.round(Math.random()*250);
// 	numbers.push(r)
// }
	
function generateNumbers(){
	var numbers = [];
	var n = Math.round(Math.random()*15);
	
	numbers = d3.range(n).map(function(d){
		return Math.round(Math.random()*250);
	});
	
	return numbers;
}


function visualizeNumbers(myNumbers){
	var svg = d3.select("#viz")
		.append("svg")
		.attr("width",600)
	.attr("height",400);
	
	var gs = svg.selectAll("g")
		.data(myNumbers)
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
}


var numbers = generateNumbers();
console.log("numbers",numbers);
visualizeNumbers(numbers);
	
