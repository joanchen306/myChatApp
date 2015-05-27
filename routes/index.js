var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Chat = require('../models/Chat.js');

var io = require('socket.io');
var socket = io();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MyChatApp' });
});

router.get('/chat', function(req, res, next) {
	Chat.find({}, function (err, post) {
      if (err) {
    	console.log("There is an error when getting");
    	return next(err);
      } else {
      	  res.format({
      	    html: function() {
      	  	  var name = req.query.name;
			  var title = "ChatRoom: " + name;
			  res.render('chat', { title: title, name: name});
      	    },
      	    json: function() {
              var msg = "";
              for(i = 0; i < post.length; i++) {
                msg = msg + post[i]["name"] + ": " + post[i]["chat"];
                console.log(i);
              }
              res.json(msg);
            }
          });
        }
    });
});

/* POST /chat */
router.post('/chat', function(req, res, next) {
  Chat.create(req.body, function (err, post) {
    if (err) {
    	console.log("There is an error when posting");
    	return next(err);
    }
    res.json(post);
    });
});

/* GET /todos/id 
router.get('/chat/:id', function(req, res, next) {
  Chat.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

*/

/* PUT /todos/:id
router.put('/chat/:id', function(req, res, next) {
  Chat.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
*/

/* DELETE /todos/:id 
router.delete('/chat/:id', function(req, res, next) {
  Chat.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

*/



module.exports = router;
