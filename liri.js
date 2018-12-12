require("dotenv").config();
var keys = require("./keys.js");//code required to import the keys.js file
var fs = require("fs");// Core node package for reading and writing files
var axios = require("axios");//bands in town and omdb
var moment = require('moment');//concert-this
var Spotify = require("node-spotify-api");//spotify-this-song
var command = process.argv;
var action = command[2];
var input = command[3];
//-----------------------------------------------------------------------------------------------------//
switch (action) {
    case `concert-this`:
        concertThis(input);
        break;
    case `spotify-this-song`:
        spotifySongs(input);
        break;
    case `movie-this`:
        omdbThis(input);
        break;
    case `do-what-it-says`:
        doWhatItSays();
        break;
    default:
        console.log('Sorry, LIRI does not know that command!');
};
//----------------------------------------------------------------------------------------------------------//
function concertThis(input) {
    var bandsInTownURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
    axios.get(bandsInTownURL)
        .then(function (response) {
            var data = response.data;
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                console.log("Venue: " + data[i].venue.name);
                console.log("Country: " + data[i].venue.country);
                console.log("City: " + data[i].venue.city);
                console.log("Date: " + moment(data[i].datetime).format("MM/DD/YYYY"));
                console.log('------------------------------------------');
            }
        });
}

//------------------------------------------------------------------------------------------------------//
function spotifySongs(input) {
    var spotify = new Spotify(keys.spotifyKeys);

    if (!input) {
        input = "The Sign";
    }
    spotify.search({ type: 'track', query: input }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        var songInfo = data.tracks.items;
        for (var i = 0; i < songInfo.length; i++) {
            if (songInfo[i].name.toLowerCase().indexOf(input.toLowerCase()) >= 0) {
                console.log[i];
                console.log('Artist(s):  ' + songInfo[i].artists[0].name);
                console.log('Song:  ' + songInfo[i].name);
                console.log('Preview Link:  ' + songInfo[i].preview_url);
                console.log('Album:  ' + songInfo[i].album.name);
                console.log('----------------------------------');
            }
        }
    });
}
// //----------------------------------------------------------------------------------------------------//

function omdbThis(input) {
    if (!input) {
        input = 'Mr. Nobody';
    }
    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy").then(function (jsonData) {


        var jsonData = jsonData.data;
        console.log('Title:  ' + jsonData.Title);
        console.log('Year:  ' + jsonData.Year);
        console.log('IMDB Rating:  ' + jsonData.imdbRating);
        console.log('Rotten Tomatoes Rating:  ' + jsonData.tomatoRating);
        console.log('Country:  ' + jsonData.Country);
        console.log('Language:  ' + jsonData.Language);
        console.log('Plot:  ' + jsonData.Plot);
        console.log('Actors:  ' + jsonData.Actors);

    });
};
// // //-------------------------------------------------------------------------------------------//

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");

        if (dataArr[0] == "spotify-this-song") {
            spotifySongs(dataArr[1].slice(1, -1));
        }
        else if (dataArr[0] == "movie-this") {
            omdbThis(dataArr[1]);
        }
        else {
            concertThis();
        }
    });
};