
/** 
 *  Main component to organize the entire webpage
 */


function app(){
	
	function me(selection){
		console.log("MyApp Component");
		
		
		//  create SVG container
		selection.append("svg")
		.attr({width:600, height:400});
		
		
		// load data
		var q = d3.queue();   // use a queue to load multiple files in parallel
		var dsv = d3.dsv(";","text/plain");  // one of the file has a custom format using a custom parser
		
		q.defer(dsv,"assets/data/opere_colori.csv")
			.defer(d3.json,"assets/data/world.geojson")
		.await(function(error, opere, world){
			if(error) throw error;
			
			console.log("opere", opere);
			console.log("world", world);
		})
	}
	
	return me;
}




var myApp = app();

d3.select("#viz").call(myApp);