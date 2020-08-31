var apiKey = "Overpass API 0.7.56.6 474850e8";

var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,id: "mapbox.streets",accessToken: apiKey
});

var map = L.map("mapid", {
    center: [55, -110],zoom: 2
  });
 graymap.addTo(map);

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {

  function styleInfo(feature) {
    return {fillOpacity: 1,  opacity: 1, color: "#000000", weight: 1, fillColor: getColor(feature.properties.mag), radius: getRadius(feature.properties.mag), stroke: true,};
  }


  function getRadius(magnitude) {
    if (magnitude == 0) {
      return .5;
    }

    return magnitude * 3;
  }

  function getColor(magnitude) {
    switch (true) {
    case magnitude > 5:
      return "#FF5733";
    case magnitude > 4:
      return "#FFD433";
    case magnitude > 3:
      return "#C7FF33";
    case magnitude > 2:
      return "#4CFF33";
    case magnitude > 1:
      return "#33FFB8";
    default:
      return "#33D7FF ";
    }
  }

  var legend = L.control({
    position: "bottomleft"
  });

  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");

    var colors = ["#33D7FF","#33FFB8","#4CFF33","#C7FF33","#FFD433","#FF5733"];
    var level = [0, 1, 2, 3, 4, 5];
    
    for (var ii = 0; ii < level.length; ii++) {
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " + level[ii] + (level[ii + 1] ? "&ndash;" + grades[ii + 1] + "<br>" : "+");}
    return div;
  };

  legend.addTo(map);


  L.geoJson(data, {

    style: styleInfo, onEachFeature: function(feature, layer) {
    layer.bindPopup("magnitude of earthquake: " + feature.properties.mag + "<br>location of earthquake: " + feature.properties.place);}
    pointToLayer: function(feature, latlng) {return L.circleMarker(latlng);}, }).addTo(map);


  
});
