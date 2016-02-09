function doHash(hash){
	if(hash == "about"){
		$("#aboutmodal").modal();
		$("#aboutmodal").trigger('openModal');
	}else if(hash == "project"){
		$("#projectmodal").modal();
		$("#projectmodal").trigger('openModal');
	}
}

function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function hashChanged(){
	var hash = window.location.hash.substring(1);
	doHash(hash);
}

function removelinks(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url){
    	return ' <b><a href="'+url+'" target="_blank">Listen it here</a></b>';
    });
}

function pad(value) {
    if(value < 10) {
        return '0' + value;
    } else {
        return value;
    }
}
!function(a){var b=/iPhone/i,c=/iPod/i,d=/iPad/i,e=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,f=/Android/i,g=/IEMobile/i,h=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,i=/BlackBerry/i,j=/BB10/i,k=/Opera Mini/i,l=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,m=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),n=function(a,b){return a.test(b)},o=function(a){var o=a||navigator.userAgent,p=o.split("[FBAN");return"undefined"!=typeof p[1]&&(o=p[0]),this.apple={phone:n(b,o),ipod:n(c,o),tablet:!n(b,o)&&n(d,o),device:n(b,o)||n(c,o)||n(d,o)},this.android={phone:n(e,o),tablet:!n(e,o)&&n(f,o),device:n(e,o)||n(f,o)},this.windows={phone:n(g,o),tablet:n(h,o),device:n(g,o)||n(h,o)},this.other={blackberry:n(i,o),blackberry10:n(j,o),opera:n(k,o),firefox:n(l,o),device:n(i,o)||n(j,o)||n(k,o)||n(l,o)},this.seven_inch=n(m,o),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet,"undefined"==typeof window?this:void 0},p=function(){var a=new o;return a.Class=o,a};"undefined"!=typeof module&&module.exports&&"undefined"==typeof window?module.exports=o:"undefined"!=typeof module&&module.exports&&"undefined"!=typeof window?module.exports=p():"function"==typeof define&&define.amd?define("isMobile",[],a.isMobile=p()):a.isMobile=p()}(this);

$(document).ready(function(){	
	if(isMobile.any){
		$("body").removeClass("desktop");
		$("body").addClass("mobile");
		$(".fix-height").height($(window).height() + 60);
		$(".full-page").attr("style","min-height:"+($(window).height() + 60)+" !important;");
	}else{
		setInterval(function(){
			lastFm();
		},5000);
	}

	//LastFM
	var currentTrack;
	function lastFm(){
		var url = "http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=tkon99&api_key=5b801a66d1a34e73b6e563afc27ef06b&limit=1&format=json";
		$.getJSON(url, function(data){
			var track = data["recenttracks"]["track"][0];
			if(currentTrack !== track){
				var desc = '<a href="'+track["url"]+'" target="_blank">'+track["name"]+' by '+track["artist"]["#text"]+'</a>';
				$("#song").html(desc);
				var playingDesc = "";
				var scrobbles = data["recenttracks"]["@attr"]["total"];
				if(track["@attr"] !== undefined){
					if(track["@attr"]["nowplaying"]){
						playingDesc = "Right now I'm listening to:";
						scrobbles++;
					}
				}else{
					playingDesc = "The last song I listened to is:";
				}
				$("#playingDesc").html(playingDesc);
				if(track["image"][3]["#text"] !== ""){
					$("#playingImg").attr("src",track["image"][3]["#text"]);
				}else{
					$("#playingImg").attr("src","img/album.png");
				}
				$("#songCount").html(ordinal_suffix_of(scrobbles));
			}
		});
	}
	lastFm();

	//Github
	var git_url = "https://api.github.com/users/tkon99/events";
	$.getJSON(git_url, function(data){
		var lastEdit = new Date(data[0]["created_at"]);
		var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		$("#codingDay").html(ordinal_suffix_of(lastEdit.getDate()));
		$("#codingMonth").html("of "+monthNames[lastEdit.getMonth()]);
		$("#codingTime").html("at "+lastEdit.getHours()+":"+lastEdit.getMinutes());
	});

	//Whatpulse
	var wp_url = "https://jsonp.afeld.me/?url="+encodeURIComponent("http://api.whatpulse.org/user.php?user=tkon99&format=json");
	$.getJSON(wp_url, function(data){
		var keys = data["Computers"]["computer-0"]["Keys"];
		var clicks = data["Computers"]["computer-0"]["Clicks"];
		var lastPulse = data["LastPulse"];
		var whatpulseUrl = "https://whatpulse.org/tkon99";
		$("#keys").html('<a href="'+whatpulseUrl+'" target="_blank">'+keys+' (@ '+lastPulse+')</a>');
		$("#clicks").html('<a href="'+whatpulseUrl+'" target="_blank">'+clicks+' (@ '+lastPulse+')</a>');
	});

	var hash = window.location.hash.substring(1);
	doHash(hash);
});