function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

var age;
var infoHTML;

//Animations
$("a").hover(function(){
	$(this).addClass("animated swing");
},
function(){
	$(this).removeClass("animated swing");
});

//Hashes
$(document).ready(function(){
	var hash = window.location.hash;

	age = getAge("1999/05/04");

	//Content
	infoHTML = "Hi! I'm Thomas Konings. Some lad living in Essen, Belgium and "+ age +" years old.<br>I'm also CEO at <a href='http://simplyapps.nl/'>simplyApps</a>, have built multiple websites and I've worked on a significant amount of projects.<br><br>Nowadays I'm particularly interested in the economy and certain business aspects, that's why I enjoy working at simplyApps so much.<br>";
	links = '<div id="links"><a class="big" href="http://github.com/tkon99" target="_blank"><span class="fa fa-github"></span></a> <a class="big" href="http://stackoverflow.com/users/1743392/tkon99" target="_blank"><span class="fa fa-stack-overflow"></span></a> <a  class="big" href="http://facebook.com/tkon99" target="_blank"><span class="fa fa-facebook"></span></a> <a  class="big" href="https://twitter.com/tkon99" target="_blank"><span class="fa fa-twitter"></span></a> <a class="big" href="http://instagram.com/tkon99_" target="_blank"><span class="fa fa-instagram"></span></a> <a class="big" href="https://www.google.com/+ThomasKonings99" target="_blank"><span class="fa fa-google-plus"></span></a></div>';
	hashHandler(hash);
});

$(window).on('hashchange', function() {
	var hash = window.location.hash;
	hashHandler(hash);
});

function hashHandler(hash){
	if(hash == "" || hash == "#"){
		animateDown();
	}else if(hash == "#info"){
		$("#content #title").html("Info");
		$("#content #text").html(infoHTML + links);
		animateUp();
	}else if(hash == "#projects"){
		$("#content #title").html("Projects");
		$("#content #text").html("Check my github for some projects."+links);
		animateUp();
	}else if(hash == "#contact"){
		$("#content #title").html("Contact");
		$("#content #text").html("<a class='big white' href='mailto:thomas@simplyapps.nl' target='_blank'><span class='fa fa-envelope white'></span></a><br>"+links);
		animateUp();
	}else{
		animateDown();
	}
}

function animateUp(){
	$("#content").animate({top: "0vh"}, 1500);
}

function animateDown(){
	$("#content").animate({top: "100vh"}, 1500);
}