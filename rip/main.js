if(!String.linkify) {
    String.prototype.linkify = function() {

        // http://, https://, ftp://
        var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

        // www. sans http:// or https://
        var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

        // Email addresses
        var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

        return this
            .replace(urlPattern, '<a href="$&">$&</a>')
            .replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>')
            .replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
    };
}

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

	var hash = location.hash.substring(1).split("+").join(" ");
	if(hash !== "" && hash !== undefined){
		document.title = "RIP. "+hash;
		$("#hash").html(hash.linkify());
	}
});