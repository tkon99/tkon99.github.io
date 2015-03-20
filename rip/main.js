var state = false;
//true = color: white
//false = color: black

var stop = false;

function colors(){
	if(stop !== true){
		if(state == false){
			document.getElementById("text").style.color = "black"; 
			document.getElementById("hash").style.color = "black";
			document.getElementById("back").style.backgroundColor = "white";
		}else{
			document.getElementById("text").style.color = "white"; 
			document.getElementById("hash").style.color = "white";
			document.getElementById("back").style.backgroundColor = "black";
		}

		state = !state;
	}

	setTimeout(function(){
		return colors();
	}, 50);
}

function colorSwitch(){
	if(stop == false){
		stop = true;
	}else{
		stop = false;
	}
}

$(document).ready(function(){
	colors();

	var hash = location.hash.substring(1);
	if(hash !== "" && hash !== undefined){
		document.title = "RIP. "+hash;
		$("#hash").html(hash);
	}
});