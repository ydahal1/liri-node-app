require("dotenv").config();
const functions = require("./functions.js");

const userCommand = process.argv[2];
const userInput = process.argv[3];
functions.logCommands(userCommand, userInput);

switch(userCommand){
    case 'my-tweets' :
        functions.fetchTweet();
        break;

    case 'spotify-this-song' :
        functions.songInfo(userInput);
        break;

    case 'movie-this' : 
        functions.getMovieInfo(userInput);
        break;

    case 'do-what-it-says' :
    functions.doWhatItSays();
    break;

    default:
    console.log("Bad command");
}

/* Tests:
    Test for wrong command 
        1. node liri.js (no input)
        2. node liri.js (enter undefinded function)
    Test for tweets:
        1.node liri.js my-tweets
        2.node liri.js my-tweets random-command
    Test for Spotify
        1. node liri.js spotify-this-song (no user input)
        2. node liri.js spotify-this-song hello
        3. node liri.hs spotify-this-song (random input like number and special chars)
    Test for movie this
        1. node liri.js movie-this ( no user input)
        2. node liri.js movie-this holiday
        3. node liri.js movie-this (random input like number and special chars)
    Test for do what it says
        1. node liri.js do-what-it-says
        2. node liri.js do-what-it-says (enter random input)
*/