var express = require("express");
var router = express.Router();
const userModel = require("../routes/users");

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

// Add this route to index.js
router.get("/leaderboard", isLoggedIn, async function (req, res, next) {
  try {
    const users = await userModel.find().sort({ score: -1 }).exec();
    res.render("leaderboard", { users });
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    res.status(500).send("Error fetching leaderboard data");
  }
});

router.get("/profile", isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render("profile", { user });
});

router.post("/register", function (req, res) {
  const userData = new userModel({
    fullname: req.body.fullname,
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

router.post("/profile", isLoggedIn, async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user is authenticated and req.user is available
    const lastScore = req.body.lastscore;

    // Find the current user in the database
    const user = await userModel.findById(userId);

    if (!user) {
      console.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's last score
    user.lastscore = lastScore;

    // Update the user's high score only if the new score is higher
    if (lastScore > user.highscore) {
      user.highscore = lastScore;
    }

    // Save the user with the updated scores
    await user.save();

    res.status(200).json({ message: "Scores updated successfully", user });
  } catch (error) {
    // Handle errors
    console.error("Error updating scores:", error);
    res.status(500).json({ error: "Error updating scores" });
  }
});


module.exports = router;
