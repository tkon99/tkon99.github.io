var state = false;
//true = color: white
//false = color: black

function colors(){
	if(state == false){
		document.getElementById("text").style.color = "black"; 
		document.getElementById("back").style.backgroundColor = "white";
	}else{
		document.getElementById("text").style.color = "white"; 
		document.getElementById("back").style.backgroundColor = "black";
	}

	state = !state;

	setTimeout(function(){
		return colors();
	}, 50);
}

$(document).ready(function(){
	colors();
});