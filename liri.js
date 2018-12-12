require("dotenv").config();
var keys = require("./keys.js");//code required to import the keys.js file
var fs = require("fs");// Core node package for reading and writing files
var inquirer = require("inquirer");
var axios = require("axios");
var moment = require('moment'); moment().format();
var spotifyNode = require("node-spotify-api");
var request = require("request");
var command = process.argv;
var action = command[2];
var input = command[3];

// function startLiri() {
//     inquirer.prompt([
//         {
//             type: "list",
//             name: "userInput",
//             choices: [
//                 `concert-this`,
//                 `spotify-this-song`,
//                 `movie-this`,
//                 `do-what-it-says`
//             ]
//         }
//     ]).then(function (response) {

switch (action) {
    // case `concert-this`:
    //     concertThis(input);
    //     break;
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



// function callBandsInTownAPI() {
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "artist",
//             message: "What artist?"
//         }])
//         .then(function (response) {
// var bandsInTownURL = "https://rest.bandsintown.com/artists/" + response.artist + "/events?app_id=codingbootcamp"
// //             // var concerts = axiosGet(bandsInTownURL);
// //             // console.log(concerts);

// axios.get(bandsInTownURL)
//     .then(function (response) {
//         var data = response.data;
//         console.log(data);

// var concertThis = function (concertName) {
//     // //             // var concerts = axiosGet(bandsInTownURL);
//     request("https://rest.bandsintown.com/artists/" + concertName + "/events?app_id=codingbootcamp", function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             for (var i = 0; i < data.length; i++) {
//                 console.log("Venue: " + data[i].venue.name);
//                 console.log("Country: " + data[i].venue.country);
//                 console.log("City: " + data[i].venue.city);
//                 console.log("Date: " + data[i].datetime);
//             }
//         }
//     })
// }
// .catch(function (error) {
//     console.log(error);
// });


// function axiosGet(url) {
//     axios.get(url)
//         .then(function (response) {
//             var data = response.data;
//             return data;
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }


//------------------------------------------------------------------------------------------------------//
// function spotifySongs(input){
// // var spotify = new Spotify(keys.spotify);

// if (!input) {
//     input = "The Sign";
// }

// // var artistsNames = function (artist) {
// //     return artist.name;
// // }

//     spotify.search({ type: 'track', query: input }, function (err, data) {
//         if (err) {
//             console.log('Error occurred: ' + err);
//             return;
//         }
//         var songInfo = data.tracks.items;
//         // for (var i = 0; i < songInfo.length; i++) {
//             // console.log[i];
//             console.log('Artist(s):  ' + songInfo[0].artists[0].name);
//             console.log('Song:  ' + songInfo[0].name);
//             console.log('Preview Link:  ' + songInfo[0].preview_url);
//             console.log('Album:  ' + songInfo[0].album.name);
//             console.log('----------------------------------------------');
//         });
//     }



// //----------------------------------------------------------------------------------------------------//

function omdbThis(input) {
    request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (!input) {
            input = 'Mr Nobody';
        }
        if (!error && response.statusCode === 200) {
            var jsonData = JSON.parse(body);
            console.log('Title:  ' + jsonData.Title);
            console.log('Year:  ' + jsonData.Year);
            console.log('IMDB Rating:  ' + jsonData.imdbRating);
            console.log('Rotten Tomatoes Rating:  ' + jsonData.tomatoRating);
            console.log('Country:  ' + jsonData.Country);
            console.log('Language:  ' + jsonData.Language);
            console.log('Plot:  ' + jsonData.Plot);
            console.log('Actors:  ' + jsonData.Actors);
            console.log('----------------------------------------------');
        }
    });
};
// //-------------------------------------------------------------------------------------------//

function doWhatItSays () {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");

        if (dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]);
        }
        else if (dataArr.length == 1); {
            pick(dataArr[0]);
        }
    });
};