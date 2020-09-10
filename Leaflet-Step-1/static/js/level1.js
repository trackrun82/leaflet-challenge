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
  }
  
// Define a markerSize function that will give each earthquake a different radius based on its magnitude
function markerSize(magnitude) {
  return magnitude * 20000;
}

  // Create function to create markers with pop-ups
function createMarkers(response) {
       
  // Pull the "earthquake" features off of response.data
  const quakes = response.features;

  // Create an array to hold earthquake markers
  // Loop through the earthquake array
  const quakeMarkers = quakes.map( quake => {

    // Form color groups
    let color;
    if (quake.properties.sig > 1000){
      color = "#4d0000";
    }
    else if (quake.properties.sig > 750){
      color = "#b30000";
    }
    else if (quake.properties.sig > 500){
      color = "#ff0000";
    }
    else if (quake.properties.sig > 250){
      color = "#ff8080";
    }
    else {
      color = "#ffe6e6";
    }
    
    // For each earthquake, create a marker and bind a popup with the earthquake info
    return L.circle([quake.geometry.coordinates[1], quake.geometry.coordinates[0]],{
      color: color,
      fillColor: color,
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
}

// Set up the legend
function getColor(d) {
  return d > 1000 ? '#4d0000' :
         d > 750  ? '#b30000' :
         d > 500  ? '#ff0000' :
         d > 250  ? '#ff8080' :
                    '#ffe6e6';
}
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
    significance = ["0-250", "250-500", "500-750", "750-1000", "1000+"],
    labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < significance.length; i++) {

      div.innerHTML += 
      labels.push(
          '<i class="circle" style="background:' + getColor(significance[i]) + '"></i> ' +
      (significance[i] ? significance[i] : '+'));

  }
  div.innerHTML = labels.join('<br>');


return div;
console.log(div)
};

// legend.addTo(map);

// Perform an API call to the Earthquake API to get info. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson", createMarkers);