var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true}));
router.use(bodyParser.json());

var Podcast = require('./dbPodcasts');

router.post('/', function(req, res) {

    Podcast.create({
        id : req.body.id,
        id_episode : req.body.episode,
        id_segment : req.body.segment
    },
    function(err, podcast){
        if(err) return res.status(500).send("problem");
        res.status(200).send(podcast);
    });

});

router.get('/', function(req, res){

    Podcast.find({}, function(err, podcasts) {
        if(err) return res.status(500).send("problem podcasts");
        res.status(200).send(users);
    })
});

router.get('/:id', function(req, res) {
    Podcast.findById(req.params.id, function (err, podcast){
        if(err) return res.status(500).send("problem finding podcast");
        if(!podcast) return res.status(404).send("no podcast found");
        res.status(200).send(podcast);
    });
});

router.delete('/:id', function(req, res) {

    Podcast.findByIdAndRemove(req.params.id, function(err, podcast){
        if(err) return res.status(500).send("problem deleting podcast");
        res.status(200).send("Podcast" + podcast.id + " deleted");
    })
})

router.put('/:id', function(req, res){
    Podcast.findByIdAndUpdate(req.params.id, req.body, {new: true},
    function(err, podcast) {
        if(err) return res.status(500).send("problem updating podcast");
        res.status(200).send(podcast);
    });
});

module.exports = router;