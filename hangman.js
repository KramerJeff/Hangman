var word = "triumph";
var i = 0;
var html = '';
var xStart = 0;
var x2Start = 35;
var yStart = 0;
for(i = 0; i < word.length; i++) {
	html += "<svg height='10' width='35'><line x1='" + xStart + "' y1='" + yStart + "' x2='" + x2Start + "' y2='" + yStart + "' style='stroke:rgb(0,0,0);stroke-width:2'/></svg>";
	html += "<svg height='10' width='5'><line x1=0 y1=0 x2=5 y2=0 style='stroke:rgb(255,255,255);stroke-width:2'/></svg>";
	//xStart += 40;
	//x2Start += 35;
	//yStart += 35;
	//document.getElementById('underlines').innerHTML += "<p>aloha</p>";
}

document.getElementById('underlines').innerHTML += html;