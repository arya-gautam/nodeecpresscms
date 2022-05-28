 function singleMap() {
    var myLatLng = {
        lng: $('#singleMap').data('longitude'),
        lat: $('#singleMap').data('latitude'),
    };
    var single_map = new google.maps.Map(document.getElementById('singleMap'), {
        zoom: 12,
        center: myLatLng,
        scrollwheel: false,
        zoomControl: false,
        fullscreenControl: true,
        mapTypeControl: false,
        scaleControl: false,
        panControl: false,
        navigationControl: false,
        streetViewControl: true,
        styles:  [{featureType:"administrative",elementType:"geometry.fill",stylers:[{visibility:"on"},{color:"#ffffff"}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{gamma:"0.00"},{weight:"0.01"},{visibility:"on"},{color:"#8c8c8c"}]},{featureType:"administrative.neighborhood",elementType:"labels.text",stylers:[{visibility:"on"}]},{featureType:"administrative.neighborhood",elementType:"labels.text.fill",stylers:[{color:"#898989"}]},{featureType:"administrative.neighborhood",elementType:"labels.text.stroke",stylers:[{color:"#ffffff"},{weight:"4.00"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#ffffff"}]},{featureType:"landscape.man_made",elementType:"geometry.fill",stylers:[{visibility:"simplified"},{color:"#ffffff"}]},{featureType:"landscape.natural",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"landscape.natural",elementType:"labels.text.fill",stylers:[{color:"#8d8d8d"}]},{featureType:"landscape.natural.terrain",elementType:"geometry.stroke",stylers:[{visibility:"on"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"poi.park",elementType:"geometry.fill",stylers:[{color:"#cef8d5"},{visibility:"on"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{visibility:"on"},{color:"#60b36c"}]},{featureType:"poi.park",elementType:"labels.text.stroke",stylers:[{visibility:"on"},{color:"#ffffff"}]},{featureType:"poi.park",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"all",stylers:[{saturation:"-100"},{lightness:"32"},{visibility:"on"}]},{featureType:"road",elementType:"geometry.fill",stylers:[{color:"#f3f3f3"}]},{featureType:"road",elementType:"geometry.stroke",stylers:[{color:"#e1e1e1"}]},{featureType:"road",elementType:"labels.text",stylers:[{visibility:"on"}]},{featureType:"road.highway",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{visibility:"on"},{lightness:"63"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#f3f3f3"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#e1e1e1"}]},{featureType:"road.highway",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"road.highway",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"transit.station",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"all",stylers:[{visibility:"on"},{color:"#eeeeee"}]},{featureType:"water",elementType:"geometry.fill",stylers:[{color:"#cce4ff"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{visibility:"on"},{color:"#6095a5"}]}]
    });
var marker = new google.maps.Marker({
    position: myLatLng, 
    map: single_map, 
    icon: 'images/marker-single.png',
    draggarble: false
});
if ($(".mapC_vis").length > 0) {
    var datainfotitle = $('#singleMap').data('infotitle'),
        datainfotext = $('#singleMap').data('infotext');
    var information = new google.maps.InfoWindow({
        content: "<div class='info-window-content'><h1>" + datainfotitle + "</h1> <p>" + datainfotext + "</p></div>"
    });
    marker.addListener('click', function () {
        information.open(single_map, marker);
    });
}
var scrollEnabling = $('.scrollContorl');
$(scrollEnabling).click(function (e) {
    e.preventDefault();
    $(this).toggleClass("enabledsroll");

    if ($(this).is(".enabledsroll")) {
        single_map.setOptions({
            'scrollwheel': true
        });
    } else {
        single_map.setOptions({
            'scrollwheel': false
        });
    }
});
var zoomControlDiv = document.createElement('div');
var zoomControl = new ZoomControl(zoomControlDiv, single_map);
function ZoomControl(controlDiv, single_map) {
    zoomControlDiv.index = 1;
    single_map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControlDiv);
    controlDiv.style.padding = '5px';
    var controlWrapper = document.createElement('div');
    controlDiv.appendChild(controlWrapper);
    var zoomInButton = document.createElement('div');
    zoomInButton.className = "mapzoom-in";
    controlWrapper.appendChild(zoomInButton);
    var zoomOutButton = document.createElement('div');
    zoomOutButton.className = "mapzoom-out";
    controlWrapper.appendChild(zoomOutButton);
    google.maps.event.addDomListener(zoomInButton, 'click', function () {
        single_map.setZoom(single_map.getZoom() + 1);
    });
    google.maps.event.addDomListener(zoomOutButton, 'click', function () {
        single_map.setZoom(single_map.getZoom() - 1);
    });
}
if ($(".mapC_vis2").length > 0) {
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    single_map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    single_map.addListener('bounds_changed', function () {
        searchBox.setBounds(single_map.getBounds());
    });
    var infowindow = new google.maps.InfoWindow({});
    var markers = [];
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            var icon = {
                url: place.icon,
                size: new google.maps.Size(31, 31),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };
            var marker = new google.maps.Marker({
                map: single_map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            });
            markers.push(marker);
            (function (marker, place) {
                marker.addListener('click', function () {
                    var content = "<h1>" + place.name + "</h1>";
                    content += "<p>" + place.formatted_address + "</p>";
                    if (place.formatted_phone_number) {
                        content += "<p>Phone:&nbsp;" + place.formatted_phone_number + "</p>";
                    }
                    infowindow.setContent(content);
                    infowindow.open(single_map, marker);
                });
            })(marker, place);

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        single_map.fitBounds(bounds);
        single_map.setZoom(12);
    });
}
$(".single-map-item").on("click", function (e) {
    e.preventDefault();
    google.maps.event.trigger(single_map, 'resize');
    $(".map-modal-wrap").fadeIn(400);
    single_map.setZoom(12);
    var $that = $(this),
        newln = $that.data("newlatitude"),
        newlg = $that.data("newlongitude"),
        newtitle = $that.parents(".geodir-category-listing").find(".title-sin_item a").text(),
        newtitleAdress = $that.parents(".geodir-category-listing").find(".geodir-category-location a span").text(),
        latlng = new google.maps.LatLng(newln, newlg);
    marker.setPosition(latlng);
    single_map.panTo(latlng);
    $(".map-modal-container h3 span").text(newtitle);
    var information2 = new google.maps.InfoWindow({
        content: "<div class='info-window-content'><h1>" + newtitle + "</h1> <p>" + newtitleAdress + "</p></div>"
    });
    marker.addListener('click', function () {
        information2.open(single_map, marker);
    });
});
$(".map-modal-close , .map-modal-wrap-overlay").on("click", function () {
    $(".map-modal-wrap").fadeOut(400);
    single_map.setZoom(14);
    single_map.getStreetView().setVisible(false);
});
}
var single_map = document.getElementById('singleMap');
if (typeof (single_map) != 'undefined' && single_map != null) {
    google.maps.event.addDomListener(window, 'load', singleMap);
}
 