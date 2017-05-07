
/** 
 *  Main component to organize the entire webpage
 */


function app(){
	var svg;
	var map = MapWithLayers(); //using custom module to handle the map
	
	
	function me(selection){
		console.log("MyApp Component");
		
		
		//  create SVG container
		svg = selection.append("svg")
		.attr({width:600, height:400});
		
		
		// load data
		var q = d3.queue();   // use a queue to load multiple files in parallel
		var dsv = d3.dsv(";","text/plain");  // one of the file has a custom format using a custom parser
		
		q.defer(dsv,"assets/data/opere_colori.csv")
			.defer(d3.json,"assets/data/world.geojson")
		.await(function(error, opere, world){
			if(error) throw error;
			
			console.log("opere", opere);
			
			
			// prepare map 
			map.scale(390)
			.center([-47,50]);
			svg.append("g")
				.attr("class","map")
				.datum(world)
			.call(map);
			
			
		})
	}
	
	return me;
}




var myApp = app();

d3.select("#viz").call(myApp);