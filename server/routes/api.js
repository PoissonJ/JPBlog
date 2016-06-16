var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.js');
var BlogPost = require('../models/blogPost.js');


router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username }),
    req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

router.get('/blog', function(req, res) {
  console.log('At blog api endpoint');
  BlogPost.find({}, function(err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

router.get('/blog/:title', function(req, res) {
  console.log('At blog find api endpoint');
  var title = req.params.title;
  title = title.split('+').join(' ');
  BlogPost.findOne({'title': title}, function(err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

router.post('/blog/create', function(req, res) {
  console.log('At blog post endpoint');
  console.log(req.body);
  if (req.body && req.body.title && req.body.author && req.body.body && req.body.preview) {
    var newBlog = new BlogPost({
        title: req.body.title,
        author: req.body.author,
        body: req.body.body,
        preview: req.body.preview,
        date: req.body.date,
      });

    newBlog.save(function (err) {
      if (err) return res.status(500).json({created: false});
    });
    return res.status(200).json({created: true});
  } else {
    return res.status(500).json({created: false});
  }
});

router.delete('/blog/delete/:id', function(req, res) {
  var id = req.params.id;
  BlogPost.remove({_id: id}, function(err) {
    if (!err) return res.status(200);
    else return res.status(500);
  });
});

router.put('/blog/update', function(req, res) {
  var id      = req.body.id;
  var title   = req.body.title;
  var author  = req.body.author;
  var body    = req.body.body;
  var preview = req.body.preview;

  BlogPost.findOne({_id: id}, function(err, doc) {
    if (err) return res.status(500).json({success: "Failed to Update"});
    else {
      doc.title   = title;
      doc.author  = author;
      doc.body    = body;
      doc.preview = preview;
      doc.save();

      return res.status(200).json({
        success: "Updated"
      });
    }
  });
});

router.get('/status', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
});



module.exports = router;
