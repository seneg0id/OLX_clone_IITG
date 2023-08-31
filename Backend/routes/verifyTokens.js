const { json } = require("express");
const jwt = require("jsonwebtoken");
const keys = require("../keys");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, keys.JWT.secretKey, (err, user) => {
      if (err){res.status(403).json("Token invalid");} 
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("you are not authenticated");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not allowed to do it");
    }
  });
};
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("you are not Admin");
      }
    });
  };
  

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
