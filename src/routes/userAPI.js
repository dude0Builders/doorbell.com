import router from "./index";
import user from '../models/userModel';
import userType from '../models/userTypeModel';
import mongoose from 'mongoose';

var User = mongoose.model('Users');
var UserType = mongoose.model('UserType');

router.get('/list', function (req, res, next) {
  User.find(function (err, users) {
    if (err)
      res.status(500).json({
        message: 'Error while fetching users list'
      })
    res.send(users);
  });
});

router.post('/create', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: "Please fill all the fields."
    });
  }
  var user = new User();
  user.username = req.sanitize(req.body.username);
  user.setPassword(req.sanitize(req.body.password));
  var promise = user.save();
  promise.then(function (data) {
    res.json({
      token: user.generateJWT()
    });
  }).catch(function (err) {
    return res.status(500).json(err.message);
  })
});

router.param('userid', function (req, res, next, id) {
  var query = User.findById(id);
  query.exec(function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user)
      return next(new Error('Cannot find the User'));
    req.user = user;
    return next();
  })
})

router.put('/user/:userid', function (req, res, next) {
  var user = req.user;
  user.setPassword(req.sanitize(req.body.password));
  user.save(function (err) {
    if (err) {
      return next(err);
    }
    return res.json('User successfully updated!');
  })
});


router.post('/login', function (req, res, next) {

  res.end();
})

router.delete('/user/:userid', function (req, res, next) {

  res.end();
});


router.post('/addusertype', function (req, res, next) {
  var userType = new UserType();
  var type = req.sanitize(req.body.type);
  var roles = req.sanitize(req.body.roles);
  if (!type || !(req.body.roles instanceof Array)) {
    console.log(roles);
    return res.status(403).send({
      message: 'Invalid Input'
    });
  }

  userType.type = type;
  userType.roles = req.body.roles;
  /*req.body.roles.forEach(function(data){
    userType.roles.push(data);
  });*/
  var promise = userType.save();
  promise.then(function (data) {
    console.log('UserType added ' + type);
    return res.status(200).json({
      message: 'UserType added Successfully.'
    })
  }).catch(function (error) {
    console.error('Error occurred while adding userType');
    return res.status(500).json({
      message: 'Error occurred while adding userType ' + error.message
    });
  })
});

router.param('usertype', function (req, res, next, id) {
  var query = UserType.findById(id);
  query.exec(function (err, type) {
    if (err) {
      console.error('No userType found for ' + id);
      return next(err);
    }
    req.type = type;
    return next();
  })
});

router.put('/updateusertype/:userid/:usertype', function (req, res, next) {
  req.user.type = req.type._id;
  var promise = req.user.save();
  promise.then(function (data) {
    console.log('UserType update for the user ' + req.user._id);
    return res.status(200).json({
      message: 'User type updated.'
    });
  }).catch(function (err) {
    console.log('Error while updating userType for user ' + req.user._id + err.message);
    return res.status(500).json({
      message: 'Error while updating userType ' + err.message
    });
  })

});

router.get('/getusertype/:userid', function (req, res, next) {

})

router.delete('/removeusertype/:userid', function (req, res, next) {

});
