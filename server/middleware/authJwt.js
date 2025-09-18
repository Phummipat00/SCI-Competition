import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.js";
// import db from "../models/index.js";
// const User = db.User;

import User from "../models/user.model.js";

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No Token Provided!" });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    req.username = decoded.username; // สมมติว่า token เก็บ username
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.username).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      return res.status(401).send({ message: "Require Admin Role!" });
    });
  });
};

const isModOrAdmin = (req, res, next) => {
  User.findByPk(req.username).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator" || roles[i].name === "admin") {
          next();
          return;
        }
      }
      return res
        .status(401)
        .send({ message: "Require Moderator or Admin Role!" });
    });
  });
};

const isManager = (req, res, next) => {
  User.findByPk(req.username).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "manager") {
          next();
          return;
        }
      }
      return res.status(401).send({ message: "Require Manager Role!" });
    });
  });
};

export { verifyToken, isAdmin, isManager };
const authJwt = { verifyToken, isAdmin, isModOrAdmin, isManager };
export default authJwt;
