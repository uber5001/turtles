var http = require('http');
var fs = require('fs');
var graph = {}
var fullyExpanded = false;

function expandTurtle(graph, turtle, callback) {
	if (!graph[turtle]) {
		graph[turtle] = 'expanding...';
		console.log(turtle);
		http.request({
			hostname: 'c.xkcd.com',
			path: '/turtle/' + turtle
		}, function(response) {
			var data = '';
			response.on('data', function(chunk) {
				data += chunk;
			});
			response.on('end', function() {
				var links = JSON.parse(data);
				var black = links.black;
				var white = links.white;
				graph[turtle] = links;
				for (var nextTurtle in white) {
					expandTurtle(graph, white[nextTurtle], callback);
				}
				for (var nextTurtle in black) {
					expandTurtle(graph, black[nextTurtle], callback);
				}
			});
		}).end();
	}
	//lazy, lazy, lazy.
	callback();
}

expandTurtle(graph, 'turtles', function() {
	fs.writeFile('graph.json', JSON.stringify(graph));
});