function doHash(hash){
	if(hash == "about"){
		$("#aboutmodal").trigger('openModal');
	}else if(hash == "project"){
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

$(document).ready(function(){
	$("#aboutmodal").easyModal({
		onClose: function(){
			window.location.hash = "";
		},
		overlayOpacity: 0.1
	});
	$("#projectmodal").easyModal({
		onClose: function(){
			window.location.hash = "";
		},
		overlayOpacity: 0.1
	});

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

	var hash = window.location.hash.substring(1);
	doHash(hash);
});