// code for creating Basic Map (Level 1)

// Create function for creating map
function createMap(earthquakes) {

  // Create the tile layer that will be the background of our map
  const darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });
  
  // Create the map object with options
  const map = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 3,
    layers: [darkmap, earthquakes]
  });
  
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {
  
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += "<h4>EQ Significance</h4>";
    div.innerHTML += '<i style="background: #ffe6e6"></i><legend>0-250</legend><br>';
    div.innerHTML += '<i style="background: #ff8080"></i><legend>250-500</legend><br>';
    div.innerHTML += '<i style="background: #ff0000"></i><legend>500-750</legend><br>';
    div.innerHTML += '<i style="background: #b30000"></i><legend>750-1000</legend><br>';
    div.innerHTML += '<i style="background: #4d0000"></i><legend>1000+</legend><br>';
    return div;
  }
  legend.addTo(map);
}
  
// Define a markerSize function that will give each earthquake a different radius based on its magnitude
function markerSize(magnitude) {
  return magnitude * 20000;
}

// Form function for color groups
function getColor(significance){
  if (significance > 1000){
    return "#4d0000";
  }
  else if (significance > 750){
    return "#b30000";
  }
  else if (significance > 500){
    return "#ff0000";
  }
  else if (significance > 250){
    return "#ff8080";
  }
  else {
    return "#ffe6e6";
  }
};

// Create function to create markers with pop-ups
function createMarkers(response) {
       
  // Pull the "earthquake" features off of response.data
  const quakes = response.features;

  // Create an array to hold earthquake markers
  // Loop through the earthquake array
  const quakeMarkers = quakes.map( quake => {

    // For each earthquake, create a marker and bind a popup with the earthquake info
    return L.circle([quake.geometry.coordinates[1], quake.geometry.coordinates[0]],{
      color: 'blank',
      fillColor: getColor(quake.properties.sig),
      fillOpacity: 0.5,
      radius: markerSize(quake.properties.mag)
    })
      .bindPopup("<h3>" + quake.properties.place + 
      "</h3><hr><p>Time: " + new Date(quake.properties.time) + 
      "</p><hr><p> Magnitude: " + quake.properties.mag +
      "</p><hr><p> Significance: " + quake.properties.sig + "</p>");
  });
  // Create a layer group made from the earthquake markers array, pass it into the createMap function
  createMap(L.layerGroup(quakeMarkers));
};

// legend.addTo(map);

// Perform an API call to the Earthquake API to get info. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson", createMarkers)