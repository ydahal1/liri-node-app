const keys = require("./keys.js");
const fs = require("fs");


// #################    Function  to get song info #################################
const songInfo = function songInfo(userInput){
    var Spotify = require('node-spotify-api');


    if(userInput == undefined){
         userInput = "Ace of Base";
    }
    //Creating new spotify with credentials saved in .env file
    var spotify = new Spotify({
        id : keys.spotify.id,
        secret : keys.spotify.secret
    });

    //Querying with user input
    spotify.search({ type: 'track', query: userInput }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      //Song name
      console.log('\n'+ '\n' + "########## " + data.tracks.items[0].name + " ###########");
      console.log(' Album Name : ' + data.tracks.items[0].album.name +
                  '\n Preview Url : ' + data.tracks.items[0].preview_url);
                  var artists = data.tracks.items[0].album.artists;
                  for( var i = 0; i < artists.length ; i++){
                      console.log(" Artist/s Name: " + artists[i].name + ",");
                  }     
    });
    }

// #################    Function  to get tweets  #################################
const fetchTweet = function fetchTweet(){
    var Twitter = require('twitter');

    var client = new Twitter({
        consumer_key: keys.twitter.consumer_key,
        consumer_secret: keys.twitter.consumer_secret,
        access_token_key: keys.twitter.access_token_key,
        access_token_secret: keys.twitter.access_token_secret
      });

      var params = {screen_name: 'GooglePolice'};
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
     if (!error) {
        for (var i = 0 ; i < tweets.length; i++){
            console.log('\n'+ '\n'+ "#### Tweeted on " + tweets[i].created_at + "################");
            console.log(tweets[i].text);
        }
  }
});

}

// #################    Function  to get movie Info  #################################
var getMovieInfo = function(userInput){
    var omdbApi = require('omdb-client');
    if(userInput == undefined){
        userInput = "Mr. Nobody";
    }

    var params = {
        apiKey: keys.omdb.omdb_api_key,
        title: userInput
        }
    omdbApi.get(params, function(err, data) {
        console.log("############ " + data.Title + " ############" + '\n'+
                    " Year : " + data.Year +
                    "\n IMDB Rating: " + data.imdbRating +
                    "\n Rotten Tomato Rating: " + "N/A" +
                    "\n Country: " + data.Country +
                    "\n Language :" + data.Language + 
                    "\n Plot: " + data.Plot + 
                    "\n Actors: " + data.Actors + 
                    "\n #######################################"
                );
    });
}

//#################    Function  to create log  #################################
var logCommands = function(userCommand, userInput){
    var logTime = new Date().toLocaleString();

    fs.appendFile('log.txt', "\n" + logTime + " :  " + "node liri.js " + userCommand + " " + userInput, function (err) {
        if (err) {
          console.log("error logging : " + err)
        } 
      })
}



var doWhatItSays = function doWhatItSays(){
    console.log("Hello");
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            return console.log(error);
        }
        songInfo(data);

    });
}

//exporting the functions
    module.exports = {
        songInfo : songInfo,
        fetchTweet : fetchTweet,
        getMovieInfo : getMovieInfo,
        doWhatItSays : doWhatItSays,
        logCommands : logCommands
    }