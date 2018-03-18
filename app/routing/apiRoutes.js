// link to the friend data
var friendData = require("../data/friends")

module.exports = function(app){

  // show the friends json
  app.get("/api/friends", function(req, res){
    res.json(friendData);
  });
  
  // responds with the best match
  app.post("/api/friends", function(req, res){

    // assigns the user scores to its own array variable
    var userScores = req.body.scores;
    var results = [];

    // double for loop to go through the user scores and and each of the friends' scores, subtract the values at corresponding indices, and push each calculated value to the results array
    for (var i in friendData){
      var diff = 0;
      for (var j in friendData[i].scores){
        diff += Math.abs(parseFloat(userScores[j]) - parseFloat(friendData[i].scores[j]))
      };
      results.push(diff);
    };

    // gets the minimum value in the results array
    var minValue = Math.min.apply(null, results);

    // finds the index of the minimum value (if 2 are the same, will get the first one)
    var bestMatchIndex = results.indexOf(minValue);

    // gets the friend that matched the best
    var bestMatch = friendData[bestMatchIndex];

    // calculates a percentage match and adds it to the best match object
    bestMatch.matchPercent = (100 * (1 - (minValue / 40))).toFixed(1) + "%";

    // returns the resulting best match object
    res.json(bestMatch);
  });
};