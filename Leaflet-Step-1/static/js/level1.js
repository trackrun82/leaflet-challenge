// code for creating Basic Map (Level 1)
function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map
    const darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "dark-v10",
      accessToken: API_KEY
    });
  
    // Create a baseMaps object to hold the lightmap layer
    const baseMaps = {
      "Dark Map": darkmap
    };
  
    // Create an overlayMaps object to hold the earthquakes layer
    const overlayMaps = {
      "Earthquakes": earthquakes
    };
  
    // Create the map object with options
    const map = L.map("map", {
      center: [40.73, -74.0059],
      zoom: 12,
      layers: [darkmap, earthquakes]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  
  function createMarkers(response) {
  
    // Pull the "stations" property off of response.data
    const quakes = response.features;
  
    // Create an array to hold bike markers
  
    // Loop through the stations array
    const quakeMarkers = quakes.map( quake => {
  
      // For each station, create a marker and bind a popup with the station's name
      return L.marker([quake.geometry.coordinates[1], quake.geometry.coordinates[0]])
        .bindPopup("<h3>" + quake.properties.place + "<h3><h3>Capacity: " + quake.properties.time + "</h3>");
  
    });
  
    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(quakeMarkers));
  }
  
  
// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson", createMarkers);
  
