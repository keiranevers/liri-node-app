require("dotenv").config();

var keys = require("./keys.js");
var fs = require('fs-extra');
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var inquirer = require('inquirer');
var appArg = process.argv[2];
var nodeArgs = process.argv;

switch (appArg) {

	//case statements

	case 'my-tweets': getTweets();
	break;

	case 'spotify-this-song': getSong();
	break;

	case 'movie-this': getMovie();
	break;

	case 'do-what-it-says': doWhatItSays();
	break;

};


// * `my-tweets`

function getTweets() {

	var client = new twitter (keys.twitter);

	//get last 20 tweets from @neverstoppinggo

	var twitterUser = 'neverstoppinggo';

	var params = {screen_name: twitterUser, count: 20 };

	client.get('statuses/user_timeline', params, function(error, tweets, response) {

    if (!error) {
      data = [];
      for (var i = 0; i < tweets.length; i++) {
        data.push({
          'created at: ' : tweets[i].created_at,
          'Tweets: ' : tweets[i].text
        });
      }
      console.log(data);
    }
  });
};

// * `spotify-this-song`

function getSong() {

	var spotifyClient = new spotify(keys.spotify);

	var nodeArgs = process.argv;

	var songName = "";

		for (var i = 3; i < nodeArgs.length; i++) {

		if (i > 3 && i < nodeArgs.length) {

		songName = songName + "+" + nodeArgs[i];

		} else {

			songName += nodeArgs[i];

			}
		}
	
	//Default to "The Sign" by Ace of Base
	
		if (!songName) {

    		songName = "The Sign";

    		console.log("YOu didn't chose a song, so you get The Sign by Ace of Base");

    	}

	spotifyClient.search({type: 'track', query: songName, limit: 1}, function(error, data) {
  	
	  	if (error) {
	    
	    return console.log('Error: ' + error);
	
	  	} else {



	//Artist
	console.log("Artist: " + data.tracks.items[0].artists[0].name);
	
	//Song Name
	console.log("Song Entered: " + songName);

	//A preview of link of the song from Spotify
	console.log("Song URL: " + data.tracks.items[0].preview_url);

	//The album that the song is from
	console.log("Album: " + data.tracks.items[0].album.name)

  }
})
};


// * `movie-this`

function getMovie() {

	var nodeArgs = process.argv;

	var movieName = "";

		for (var i = 3; i < nodeArgs.length; i++) {

		if (i > 3 && i < nodeArgs.length) {

		movieName = movieName + "+" + nodeArgs[i];

		} else {

			movieName += nodeArgs[i];

			}
		}

		if (!movieName) {

    		movie = "Mr. Nobody";

    	return console.log("You didn't specify a movie but you might like this one:'Mr. Nobody'. \n");

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
};

// * `do-what-it-says`

function doWhatItSays() {

	//run spotify-this-song from random.txt

  	fs.readFile("random.txt", "utf8", function(error, data) {

 		if (error) {

 			console.log("Error: " + error );

 		} else {

 			var results = data.split(",");
 			var arg2 = results[0];
 			var arg3 = results[1];
 			process.argv.splice(2,1);
 			process.argv.push(arg2);
 			process.argv.push(arg3);
 			getSong();
 		}
  });
};





