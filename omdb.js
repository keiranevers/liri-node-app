
var request = require('request');

var nodeArgs = process.argv;

	var movieName = "";

		for (var i = 2; i < nodeArgs.length; i++) {
		if (i > 2 && i < nodeArgs.length) {
		movieName = movieName + "+" + nodeArgs[i];
		} else {
			movieName += nodeArgs[i];
			}
		}

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

	request(queryUrl, function(error, response, body) {

		if (!error && response.statusCode === 200) {


	//Title of the movie
		console.log("Movie Name: " + JSON.parse(body).Title);

	//Year the movie came out
		console.log("Release Year: " + JSON.parse(body).Year);

	//IMDB Rating of the movie
		console.log("IMDB Rating: " + JSON.parse(body).imdbRating);

	//Rotten Tomatoes Rating of the movie
		console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);

	//Country where the movie was produced
		console.log("Produced by: " + JSON.parse(body).Production);

	//Language of the movie
		console.log("Language: " + JSON.parse(body).Language);

	//Plot of the movie
		console.log("Plot: " + JSON.parse(body).Plot);

	//Actors in the movie
		console.log("Starring: " + JSON.parse(body).Actors);
		
		} else {



		}

	});