

function Chart(){
	var dimension = "Technique";
	var svg;
	var nvchart;
	
	function me(selection){
		console.log("paintings", selection.datum());
		
		// group data
		var grouped = d3.nest()
			.key(function(d){return d["TECHNIQUE"]})
			.rollup(function(leaves){return leaves.length})
		.entries(selection.datum());
		
		if(!svg){
			selection.append("h4")
			.text(dimension);
			
			svg = selection.append("svg")
			.attr({width:"100%", height:400});
			
			nvchart = nv.models.multiBarHorizontalChart();
		}
		svg.datum([
			{
				key:"Count " + dimension,
				values: grouped
					.map(function(d){return {x:d.key, y:d.values}})
			}
		])
		.call(nvchart);
	}
	
	
	return me;
}
