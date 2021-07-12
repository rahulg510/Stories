const router = require("express").Router();
const {ensureAuth, ensureGuest} = require("../middleware/auth.js");
//Landing page

router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

router.get("/dashboard", ensureAuth, (req, res) => {
  res.render("dashboard");
});

module.exports = router;
