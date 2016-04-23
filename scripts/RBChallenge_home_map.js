// ==============================================
// Gestion fond de carte F4Dom en page d'accueil
// ==============================================

// Initialisation de la carte
var map = L.map('map', {
    crs: L.CRS.Simple,
    Zoom : 1,
    minZoom: -10,
    maxZoom: 3,
    maxBounds : [ [0, 0], [4000, 1200] ],
    zoomControl : true,
    attributionControl : false
});

// Définitions pour le fond de carte
var bounds = [[0,0], [4000,1200]];
var image = L.imageOverlay('images/compo_00.jpg', bounds).addTo(map);

// Toujours utile ?
map.fitBounds(bounds);

// Affichage d'un markeur (provisoire)
//var sol = L.latLng([ 400, 200 ]);
//L.marker(sol).addTo(map);

// Réglage de la position et du zoom initial
map.setView( [600, 300], 0.2);

// Définition du style de base pour l'affichage des territoires
function style(feature) {
    return {
        fillColor: feature.properties.color,
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.4
    };
}





// Ajout info position du vélo
var info = L.control({ options: { position: 'bottomright'}});

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4>Position to ISS</h4>' +  (props ?
        '<b>' + props.name + '</b><br />'
        : 'Hover the Rocket Bike');
};

info.setPosition('bottomright');

info.addTo(map);


