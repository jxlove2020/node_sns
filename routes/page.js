const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

router.get("/profile", (req, res) => {
  res.render("profile", { title: "profile - nodeSns" });
});

router.get("/join", (req, res) => {
  res.render("join", { title: "회원가입 - nodeSns" });
});

router.get("/", (req, res, next) => {
  const twits = [];
  res.render("main", {
    title: "NodeSns",
    twits,
  });
});

module.exports = router;
