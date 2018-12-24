let rain = [];
let char_size = 15;
let x_size, y_size;
let char_color = "#00ff00";

window.onload = function(){
	console.log("Loaded Page, executing init");
	define_variables();	
}

function define_variables(){
	canvas = document.getElementById("page_canvas");
	ctx = canvas.getContext("2d");

	ctx.font = ""+ char_size +"px Arial";

	cols = Math.floor(canvas.width/char_size);
	rows = Math.floor(canvas.height/char_size);

	rain.length = cols;

	let id = setInterval(draw,100);

	canvas.addEventListener("click",function(e){
		clearInterval(id);	
		console.log("INTERUPT");
	});
}

function draw(){
	
	ctx.fillStyle = "black";
	ctx.rect(0,0,canvas.width,canvas.height);
	ctx.fill();
	ctx.stroke();
	
	//try to add another raining stream	
	if(Math.random() <= 0.3){
		let pos = Math.floor(Math.random()*cols);
		//console.log("Position: "+ pos);
	
		if(rain[pos] == undefined){
			//console.log("Creating new Wave");
			rain[pos] = new Wave(pos*char_size, char_size);
		}
	}

	//ctx.fillStyle = char_color;

	for(let i=0; i < rain.length; i++){
		if(rain[i] != undefined){
			if(rain[i].outOfBounds(canvas.height)){
				rain[i] = null;
				console.log("Deleted");
			}
			else{
				rain[i].update();
				rain[i].show(ctx);
			}
		}
	}
}
