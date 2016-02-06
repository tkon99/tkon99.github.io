function doHash(hash){
	if(hash == "about"){
		$("#aboutmodal").modal();
		$("#aboutmodal").trigger('openModal');
	}else if(hash == "project"){
		$("#projectmodal").modal();
		$("#projectmodal").trigger('openModal');
	}
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
	}

	//LastFM
	var url = "http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=tkon99&api_key=5b801a66d1a34e73b6e563afc27ef06b&limit=1&format=json";
	$.getJSON(url, function(data){
		var track = data["recenttracks"]["track"][0];
		var desc = '<a href="'+track["url"]+'" target="_blank">'+track["name"]+' by '+track["artist"]["#text"]+'</a>';
		$("#song").html(desc);
	});

	//Github
	var git_url = "https://api.github.com/users/tkon99/events";
	$.getJSON(git_url, function(data){
		var lastEdit = new Date(data[0]["created_at"]);
		var desc = lastEdit.getDate()+"-"+(lastEdit.getMonth()+1)+"-"+lastEdit.getFullYear()+" @ "+lastEdit.getHours()+":"+pad(lastEdit.getMinutes());
		$("#codeDate").html('<a href="https://github.com/tkon99?tab=activity" target="_blank">'+desc+'</a>');
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