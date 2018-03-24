var mongoose = require('mongoose');  
var PodcastSchema = new mongoose.Schema({  
  Id: String,
  Id_Segment: String,
  Id_episode: String
});

mongoose.model('Podcast', PodcastSchema);

module.exports = mongoose.model('dbPodcast');