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
	var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%20%3D%20%22http://ws.audioscrobbler.com/1.0/user/tkon99/recenttracks.rss%22%20and%20xpath%3D%22*%22&format=json";
	$.getJSON(url, function(data){
		//console.log(data);
		var desc = data.query.results.html.body.rss.channel.item[0].content;
		$("#song").html(removelinks(desc));
	});

	var hash = window.location.hash.substring(1);
	doHash(hash);
});