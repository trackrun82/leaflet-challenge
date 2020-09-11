# leaflet-challenge

The goal of this homework was to form a map that showed earthquake and fault data.

### Earthquake Data
[Earthquake website](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson) - last month's Earthquake data

### Fault Data
[Fault data](https://github.com/trackrun82/leaflet-challenge/blob/master/Leaflet-Step-2/static/data/qfaults_latest_quaternary.geojson) - provided in data folder

## Level 1 -
[Basic map](https://github.com/trackrun82/leaflet-challenge/tree/master/Leaflet-Step-1)

A basic map was created using Leaflet that plots all of the earthquakes in the past month based on their longitude and latitude.
Data markers were added and they reflect the magnitude of the earthquake in their size and and the significance of earthquake in their color. 
Earthquakes with higher magnitudes appear larger and those with higher significance appear darker in color.
A legend was also formed to show the significance color levels.
Popups provide additional information about the earthquake when a marker is clicked.

## Level 2 -
[Advanced map](https://github.com/trackrun82/leaflet-challenge/tree/master/Leaflet-Step-2)

In addition to the basic map, the advanced map included the fault data as well.
The fault lines that had slip_rates that were either greater than 5.0 mm/yr or Between 1.0 and 5.0 mm/yr were added.
A higher stroke-weight was used for fault-lines with higher slip_rates.
Two base maps were added to choose from as well as our two different data sets were added into overlays that can be turned on and off independently.
Popups provide additional information about the fault when a fault-line is clicked.

