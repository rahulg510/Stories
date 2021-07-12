const router = require("express").Router();
const passport = require("passport");
//Auth with google: /auth/google

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//google auth callback: /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

//logout user /auth/logout
router.get('/logout', (req,res)=>{
  req.logOut();
  res.redirect('/');
})

module.exports = router;
