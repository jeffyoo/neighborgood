var request = require('request');

var googleMapsClient = require('@google/maps').createClient({
	key: process.env.GOOGLE_API_KEY
});

var controller = {
	//uses googleMapsClient to grab location data from input
 	getGeoLocation : function(req, res) {
		var newAddress = req.query.newAddress;

		googleMapsClient.geocode({
			address: newAddress
			}, function(err, response) {
				if (err) {
					console.log(err, 'error feching geoCode on startup');
				}
				//console.log(response.json.results, 'this is resuts from geoCode Google')
				res.send(response.json.results)
			})
	},

	//uses googlePlaces to grab nearest 5 restaurants to our map location
	getRestaurantLocation : function(req, res) {

		var latlng = req.query.latlng;

		googleMapsClient.placesNearby({
			location : latlng,
			radius : 5000,
			rankBy : 'distance',
			type : 'restaurant'
		}, function(err, response) {
			if (err) {
				console.log(err, 'error getRestarantLocation controller.js')
			}
			//console.log(response.json, 'this is what i send from placesNarby');
			res.send(response.json);
		})
	},

	//uses googlePlaces to grab nearest 5 stores to our map location
	getStoreLocation : function(req, res) {

		var latlng = req.query.latlng;

		googleMapsClient.placesNearby({
			location : latlng,
			radius : 5000,
			rankBy : 'distance',
			type : 'store'
		}, function(err, response) {
			if (err) {
				console.log(err, 'error getStoreLocation controller.js')
			}
			//console.log(response.json, 'this is what i send from placesNarby getStoreLocation');
			res.send(response.json);
		})
	},

	getScore : function(req, res) {
		// get population density
		// var userInfo = req.query;
		var lat = req.query.latitude;
		var lng = req.query.longitude;
		var populationDensity; // km-2

		var options = {
			method: 'GET',
			url: 'http://www.datasciencetoolkit.org/coordinates2statistics/' + lat + '%2c' + lng,
			qs: {
				statistics : 'population_density'
			}
		}
		request(options, function(err, response, body){
			if (err) {
				console.log('error getting population density: ', err);
				res.send(err);
			}

			populationDensity = body[0].statistics.population_density.value;

		});

		
	}

}
module.exports = {
  controller: controller
}
