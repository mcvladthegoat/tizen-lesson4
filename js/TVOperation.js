var last_focus_index = 0;
var mainfocus = 0;
var item_count = 0;
var button_count = 3;

function setFocusElement(e) {
	console.log("setFocusElement : keyCode : " + e.keyCode);
	console.log("mainfocus = " + mainfocus);
	switch (e.keyCode) {
		case TvKeyCode.KEY_ENTER:
			window.location.href = $("#id"+mainfocus).attr("href");
			var filePath = $("#id"+mainfocus).attr("file-path");
			console.log("filePath", filePath);
			var ext =  filePath.split('.').pop();
			console.log(ext);
			
			$("#video-junk").empty().append("<video id='tizen-player'><source src='" + filePath + "' type='video/" + ext + "'></video>");
			document.getElementById("tizen-player").play();
			document.getElementById("tizen-player").requestFullscreen();
            break;
        case TvKeyCode.KEY_UP:
			if(mainfocus < item_count + 1 && mainfocus > 0){
				mainfocus = mainfocus - 1;
				hideItem(last_focus_index);
				showItem(mainfocus);
				last_focus_index=mainfocus;
			}
			break;
        case TvKeyCode.KEY_LEFT:
			if(mainfocus > item_count && mainfocus < item_count + button_count){
				if(mainfocus)
				mainfocus = mainfocus - 1;
				hideItem(last_focus_index);
				showItem(mainfocus);
				last_focus_index=mainfocus;
			}
	        break;
        case TvKeyCode.KEY_DOWN:
			if(mainfocus < item_count && mainfocus > -1){
				mainfocus = mainfocus + 1;
				hideItem(last_focus_index);
				showItem(mainfocus);
				last_focus_index=mainfocus;
			}
			break;
		case TvKeyCode.KEY_RIGHT:
			if(mainfocus > item_count - 1 && mainfocus < item_count + button_count - 1){
				mainfocus = mainfocus + 1;
				hideItem(last_focus_index);
				showItem(mainfocus);
				last_focus_index=mainfocus;
			}
            break;
		case TvKeyCode.KEY_VOLUMEDOWN:
			tizen.tvaudiocontrol.setVolumeDown();
			showVolumeOnScreen();
			
			break;
		case TvKeyCode.KEY_VOLUMEUP:
			tizen.tvaudiocontrol.setVolumeUp();
			showVolumeOnScreen();
			break;	
		case TvKeyCode.KEY_PAUSE:
			document.getElementById("tizen-player").pause();
			break;
		case TvKeyCode.KEY_PLAY:
			document.getElementById("tizen-player").play();
			break;
    }
}

function showVolumeOnScreen(){
	console.log("DSFSDF");
	$("#tizen-infoblock-volume").html("Volume: " + tizen.tvaudiocontrol.getVolume());
}

function showItem(index) {
	$("#id" + index).addClass("ui-btn-active");
	$("#id" + index).addClass("ui-focus");
	$("#li" + index).addClass("ui-focus");
}

function hideItem(index) {
	$("#id" + index).removeClass("ui-btn-active");
	$("#id" + index).removeClass("ui-focus");
	$("#li" + index).removeClass("ui-focus");
	if((index == item_count - 1) && $(".ui-btn-active").attr("id") && parseInt($(".ui-btn-active").attr("id").substr(2,1)) > item_count - 1){
		$(".ui-btn-active").removeClass("ui-btn-active");
	}
}

$(document).ready(function(){
    var usedKeys = [
                    'MediaFastForward',
                    'MediaPause',
                    'MediaPlay',
                    'MediaRewind',
                    'MediaStop'
                ];

                usedKeys.forEach(
                    function(keyName) {
                        tizen.tvinputdevice.registerKey(keyName);
                    }
                );
                
	console.log(tizen.tvaudiocontrol.setVolumeChangeListener);
	function onVolumeChanged(volume)
	{
	   console.warn(volume);
	   $("#tizen-infoblock-volume").html("Volume:" + volume)
	}
	tizen.tvaudiocontrol.setVolumeChangeListener(onVolumeChanged);
	
	
	 tizen.filesystem.resolve('removable_sda1', function(dir)
			 {
			    documentsDir = dir;
			    dir.listFiles(listFilesOnSuccess, listFilesOnError);
			 }, function(e)
			 {
			    console.log("Error" + e.message);
			 }, "rw");
	 
	 function listFilesOnSuccess(files){
		 
//		 $("#tizen-filelist").empty();
		 
		 for(var i=0; i<files.length;i++){
			 console.log(files[i].name);
			 $("#tizen-filelist").append("<li id='li"+ i +"'><a id='id"+ i +"' href='#' file-path='"+ files[i].fullPath +"'>"+files[i].name+"</a></li>").listview('refresh');
//			 item_count++;
		 }
		 console.log(files);
		 item_count = $("ul[data-role='listview']").find("a").length;
		 console.log("li count = " + item_count);
		 
	 }
	 
	 function listFilesOnError(){
		 console.log("failed");
	 }
	 
	 
	 showItem(0);
     console.log("page load complete!!!");
	 $(".ui-controlgroup-controls").attr("style", "width:50%");
	 


});

//ui-btn-active km_focusable


