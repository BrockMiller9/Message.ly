/** Middleware for handling req authorization for routes. */

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** Middleware: Authenticate user. */

// function authenticateJWT(req, res, next) {
//   try {
//     const tokenFromBody = req.body._token;
//     const payload = jwt.verify(tokenFromBody, SECRET_KEY);
//     req.user = payload; // create a current user
//     return next();
//   } catch (err) {
//     return next();
//   }
// }

function authenticateJWT(req, res, next) {
  try {
    let token = null;
    if (req.body._token) {
      token = req.body._token;
    } else if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1]; // Extract the token from the Bearer string
    }

    if (token) {
      const payload = jwt.verify(token, SECRET_KEY);
      req.user = payload; // create a current user
    }

    return next();
  } catch (err) {
    return next();
  }
}

/** Middleware: Requires user is authenticated. */

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return next({ status: 401, message: "Unauthorized" });
  } else {
    return next();
  }
}

/** Middleware: Requires correct username. */

function ensureCorrectUser(req, res, next) {
  try {
    if (req.user.username === req.params.username) {
      return next();
    } else {
      return next({ status: 401, message: "Unauthorized" });
    }
  } catch (err) {
    // errors would happen here if we made a request and req.user is undefined
    return next({ status: 401, message: "Unauthorized" });
  }
}
// end

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureCorrectUser,
};
