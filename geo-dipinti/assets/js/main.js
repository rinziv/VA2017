
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
		.attr({width:"100%", height:400});
		
		
		// load data
		var q = d3.queue();   // use a queue to load multiple files in parallel
		var dsv = d3.dsv(";","text/plain");  // one of the file has a custom format using a custom parser
		
		q.defer(dsv,"assets/data/opere_colori.csv")
			.defer(d3.json,"assets/data/world.geojson")
		.await(function(error, opere, world){
			if(error) throw error;
			
			console.log("opere", opere);
			
			// visualization arranged in layers
			//  svg
			//    +--g.map
			//       +--- g.mapLayer
			//.......+--- g.circles
			
			// prepare map 
			map.scale(390)
			.center([-47,50]);
			svg.append("g")
				.attr("class","map")
				.datum(world)
			.call(map);
			
			
			// aggregate data for paintings
			// * select only a subset of fields
			// * counte number of paintings for each museum
			// * store the coordinates of each museum
			
			// create a dictionary of museums. 
			var museums = {};
			
			// scan opere to extract relevant information
			var paintings = opere.map(function(d,i){
				// create a modified version of each data entry
				// selectiong a subset of attributes
				var p = {
					// convert strings to numbers
					ANNO_ARTWORK: +d.ANNO_ARTWORK, 

					// select only a few attributes
					ARTWORK_PLACE: d.ARTWORK_PLACE,
					MUSEUM: d.MUSEUM,
					TECHNIQUE: d.TECHNIQUE,
					TYPE: d.TYPE,
					SCHOOL: d.SCHOOL,
					// discard all the others
				}
				
				// save coordiante and data of museum in the dictionary
				var m = museums[d.MUSEUM.toLowerCase()] || (museums[d.MUSEUM.toLowerCase()] = {name: d.MUSEUM, point: [+d.ARTWORK_PLACE_LON, +d.ARTWORK_PLACE_LAT], place: d.ARTWORK_PLACE, count:0});
				// update count of paintings for current museum
				m.count++;
				
				return p;
					
			})
			console.log("museums",museums);
			
			// transform data of museums to match the format required by MapWithLayers
			// Creating a FeatureColletion of Museums
			var fcMuseums = {
				type:"FeatureCollection",
				features: d3.values(museums).map(function(d,i){  // for each entry in Museums dictionary
					return {
						type:"Feature",
						properties:{
							name:d.name,
							place:d.place,
							count: d.count
						},
						geometry:{
							type:"Point",
							coordinates:d.point
						}
					}
				})
			};
			console.log("fcMuseums", fcMuseums);
			// create a new g to contain circles
			svg.append("g")
				.attr("class","circles")
				.datum(fcMuseums)
			.call(map);
			
			var zoom = d3.behavior.zoom()
			.on("zoom",function() {
				svg.selectAll("g").attr("transform","translate("+ 
				d3.event.translate.join(",")+")scale("+d3.event.scale+")");
			});

			svg.call(zoom);
			
			
			// Create container for charts
			// We will implement a chart for each of the following dimensions:
			// Technique, Type, School
			var dimensions = ["Technique", "Type", "School"];
			var charts = d3.select("#charts");
			
			
			
			dimensions.forEach(function(d){
				var chart = Chart().dimension(d);
				charts.append("div")
					.classed("chart-technique", true)
					.classed("col-md-4",true)
					.datum(paintings)
				.call(chart);
			})
			
		})
	}
	
	return me;
}




var myApp = app();

d3.select("#viz").call(myApp);