const { COOKIE_TOKEN_NAME, SECRET } = require('../config/constants.config');
const { jwtVerify } = require('../config/util.config');
const Trip = require('../models/Trip');

exports.auth = (req, res, next) => {
  const token = req.cookies[COOKIE_TOKEN_NAME];
  if (token) {
    jwtVerify(token, SECRET)
      .then((resolvedToken) => {
        req.user = resolvedToken;
        res.locals.user = resolvedToken;
        next();
      })
      .catch((err) => {
        console.log(err.message);
      });
  } else {
    next();
  }
};

exports.isLogged = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/user/login');
  }
  next();
};

exports.isGuest = (req, res, next) => {
  if (req.user) {
    return res.redirect('/');
  }
  next();
};

exports.isCreator = async (req, res, next) => {
  const tripId = req.params.id;
  const trip = await Trip.findById(tripId);
  if (trip.isOwner(req.user._id)) {
    return next();
  }
  res.redirect('/');
};
