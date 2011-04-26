// relatively global.  the result location in the web page
var data;

// when the DOM has loaded
//   set the click action on the button
//   get the result location from the page
$(function() {
    bindButtons();
    data = $("#results");
});

// some constants
var CITY = "city";
var STATE = "region_name";
var ZIP = "zipcode";

// o is the returned object from the ajax call
// s is the status. We don't seem to get a response 
// on failure, though.
// 
// Update the return block in the web page
// with the result
var handler = function (o, s) {
    data.empty();
    if (s === "success")
    {
        data.append(o[CITY]);
        data.append("<br>");
        data.append(o[STATE]);
        data.append("<br>");
        data.append(o[ZIP]);
        data.append("<br>");
        data.append("<br>");
    } 
}

// send the ip address from the form field to the 
// web service and pass in the handler.  The URL
// is a relay on this machine because AJAX won't allow
// me to talk directly to the geolocation service.
var bindButtons = function () {
    var ipaddr = $("#ipaddr");
    $('#btnGetLocation').click(function() {
        req = "http://localhost:8080/getgeo?ip=" + ipaddr.val();
        var formattedResponse = jQuery.getJSON(req, handler);
    });
}
