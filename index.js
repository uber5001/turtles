var xhr = new XMLHttpRequest();
xhr.open('GET', 'graph.json');
xhr.onload = function() {
	var graph = JSON.parse(xhr.response);
	for (var node in graph) {
		var nodeElement = document.createElement('div');
		nodeElement.classList.add('node');
		nodeElement.appendChild(createTurtleElement(node));
		var white = graph[node].white;
		var black = graph[node].black;
		for (var turtle in white) {
			nodeElement.appendChild(createTurtleElement(white[turtle]));
		}
		for (var turtle in black) {
			nodeElement.appendChild(createTurtleElement(black[turtle]));
		}
		document.body.appendChild(nodeElement);
	}
}
xhr.send();

function createTurtleElement(turtle) {
	var imgWrap = document.createElement('div');
	imgWrap.classList.add('turtle');
	var img = document.createElement('img');
	img.src = "http://imgs.xkcd.com/turtledown/" + turtle + "-tiled.png";
	imgWrap.appendChild(img);
	return imgWrap;
}