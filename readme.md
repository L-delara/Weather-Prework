#Basic weather display app

Using a search bar to take a city name, it runs through Open-Meteo's Geocoding API to pull the latitude/longitude coordinates to run through their Weather Forecast API. (Weather API only takes coordinates, not city names, makes it easier on user)

Displays the city name, the current temperature in Farenheit, and the high and low temperatures for the day.

##To Run:

Clone project to machine, install Live Server to VS Code.
Run project on default port 5500, using Go Live button on bottom right
Project also hosted on Netlify: https://lively-queijadas-df263e.netlify.app

##To-Do:

~~Clean up CSS~~
(For fun: toggle light/dark view?)
If time allows, convert API's Weather Code into readable weather description ('sunny', 'rainy', etc)
Find icons to display?
