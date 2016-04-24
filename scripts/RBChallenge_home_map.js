// ==============================================
//  Home Rocket Bike Challenge management 
// ==============================================

// Map init
var map = L.map('map', {
    crs: L.CRS.Simple,
    Zoom : 1,
    minZoom: -10,
    maxZoom: 3,
    maxBounds : [ [0, 0], [4000, 1200] ],
    zoomControl : false,
    attributionControl : false
});

// Map background definition
var bounds = [[0,0], [4000,1200]];
var image = L.imageOverlay('images/compo_00.jpg', bounds).addTo(map);

// Always needed ?
map.fitBounds(bounds);


// Initial position and zoom set
map.setView( [600, 300], 0.2);


// Rocket bike trajectory
var trajectory = L.polyline([
    [310, 310],
    [850, 687],
    [880, 708],
    [909, 723],
    [1077, 798],
    [1120, 813],
    [1147, 813],
    [1366, 810],
    [1953, 732],
    [2289, 609],
    [2931, 157],
    [3340, 157],
    [3583, 154]
], {
        fillColor: 'white',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.4
    }).addTo(map);


// ISS Icon
var issIcon = L.icon({
    iconUrl: 'images/iss.png',

    iconSize:     [500, 211], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [250, 105], // point of the icon which will correspond to marker's location
    shadowAnchor: [250, 105],  // the same for the shadow
    popupAnchor:  [0, 60] // point from which the popup should open relative to the iconAnchor
});

L.marker([1120, 600], {icon: issIcon}).addTo(map);


// Bike animation
var icon_rocket_bike = L.icon({
  iconUrl: 'images/bike.png',
  iconSize: [171, 154],
  iconAnchor: [80, 100],
  shadowUrl: null
});

var bikeline = L.polyline([[310, 310],
    [850, 687],
    [880, 708],
    [909, 723],
    [1077, 798],
    [1120, 813],
    [1147, 813],
    [1366, 810]]),
    animatedMarker = L.animatedMarker(bikeline.getLatLngs(), {
                        icon: icon_rocket_bike,
                        autostart: true,
                        onEnd: function() {
                            map.removeLayer(animatedMarker);
                            }
                        });

map.addLayer(animatedMarker);


// Social network interactions
var icon_sn_fb = L.icon({
  iconUrl: 'images/fb.png',
  iconSize: [40, 40],
  iconAnchor: [20, 00],
  shadowUrl: null
});

var icon_sn_tw = L.icon({
  iconUrl: 'images/tw.png',
  iconSize: [40, 40],
  iconAnchor: [20, 00],
  shadowUrl: null
});

setTimeout(function(){
    L.marker([657, 390], {icon: icon_sn_fb}).addTo(map)
		.bindPopup('Congratulations. +100 likes we win 10km boost !')
		.openPopup();
}, 10000);

setTimeout(function(){
	L.marker([847, 790], {icon: icon_sn_tw}).addTo(map)
		.bindPopup('Congratulations. +100 RT we save 10km to ride !')
		.openPopup();
}, 20000);


// Bike position info display
var info = L.control({ options: { position: 'bottomright'}});

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4>Position to ISS</h4>' +  (props ?
        '<b>' + props.distance + '</b><br />'
        : 'Hover the Rocket Bike');
};

info.setPosition('bottomright');

info.addTo(map);


