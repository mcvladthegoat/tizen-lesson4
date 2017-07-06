var backEventListener = null;

var unregister = function() {
    if ( backEventListener !== null ) {
        document.removeEventListener( 'tizenhwkey', backEventListener );
        backEventListener = null;
        window.tizen.application.getCurrentApplication().exit();
    }
}

//Initialize function
var init = function () {
    // register once
    if ( backEventListener !== null ) {
        return;
    }

    
    // TODO:: Do your initialization job
    console.log("init() called");
    
    var backEvent = function(e) {
        if ( e.keyName == "back" ) {
            try {
                if ( $.mobile.urlHistory.activeIndex <= 0 ) {
                    // if first page, terminate app
                    unregister();
                } else {
                    // move previous page
                    $.mobile.urlHistory.activeIndex -= 1;
                    $.mobile.urlHistory.clearForward();
                    window.history.back();
                }
            } catch( ex ) {
                unregister();
            }
        }
    }
    
    // add eventListener for tizenhwkey (Back Button)
    document.addEventListener( 'tizenhwkey', backEvent );
    backEventListener = backEvent;
	document.addEventListener( 'keydown', setFocusElement );
	tizen.systeminfo.getPropertyValue("BUILD", function(h){
		$("#tizen-infoblock").append("<b>Manufacturer:</b> " + h.manufacturer);
		$("#tizen-infoblock").append(" <b>Build version:</b>" + h.buildVersion);
		$("#tizen-infoblock").append(" <b>TV Model:</b>" + h.model);
	});
	tizen.systeminfo.getPropertyValue("WIFI_NETWORK", function(h){
		$("#tizen-infoblock").append(" <br><b>IPv4 Address:</b>" + h.ipAddress);
		$("#tizen-infoblock").append(" <b>IPv6 Address:</b>" + h.ipv6Address);
	});
	

};



$(document).bind( 'pageinit', init );

window.onload = function(){

}

$(document).unload( unregister );