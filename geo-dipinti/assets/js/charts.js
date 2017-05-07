

function Chart(){
	var dimension = "Technique";
	var museum;
	var svg;
	var nvchart;
	
	function me(selection){
		console.log("paintings", selection.datum());
		
		if(!svg){
			selection.append("h4")
			.text(dimension);
			
			svg = selection.append("svg")
			.attr({width:"100%", height:400});
			
			nvchart = nv.models.multiBarHorizontalChart()
				.margin({left:100})
				.showLegend(false)
				.showControls(false);
		}
		svg.datum(groupDataBy(selection.datum(),dimension))
		.call(nvchart);
	}
	
	me.dimension = function(_){
		if(!arguments.length) return dimension;
		dimension = _;
		
		return me;
	}
	
	
	function groupDataBy(data, dimension, museum){
		var filtered;
		if(!museum){
			filtered = data;
		}else{
			filtered = data.filter(function(d){return m.MUSEUM==museum})
		}
		
		var grouped = d3.nest()
			.key(function(d){return d[dimension.toUpperCase()].toLowerCase()})
			.rollup(function(leaves){return leaves.length})
		.entries(filtered);
		
		return [
			{
				key:"Count " + dimension,
				values: grouped
					.map(function(d){return {x:d.key, y:d.values}}) // rename proerty name of objects
					.sort(function(a,b){return -a.y + b.y}) // sort by frequency
					.filter(function(d,i){return i < 10})  // select only first 10 rows
			}
		]
	}
	
	
	
	return me;
}
