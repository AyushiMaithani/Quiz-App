var express = require("express");
var router = express.Router();
const userModel = require("../routes/users");
const scoreModel=require("../routes/score")
const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.get("/profile", isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
 
  res.render("profile");
});

router.post("/register", function (req, res) {
  const userData = new userModel({
    fullname:req.body.fullname,
    username: req.body.username,
    email: req.body.email,
  });

  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}

router.post('/profile', async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have authenticated user
    const userScore = req.body.score; // Assuming the score is sent in the request body

    // Create a new score document
    const newScore = new Score({
      user: userId,
      score: userScore
    });

    // Save the score to the database
    await newScore.save();

    // Optionally, send a success response
    res.status(200).json({ message: "Score saved successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error saving score:", error);
    res.status(500).json({ error: "Error saving score" });
  }
});

module.exports = router;
