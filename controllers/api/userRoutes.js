const router = require("express").Router();
const { User } = require("../../models");

// Route for creating a new user
// /api/users
router.post("/", async (req, res) => {
  try {
    // create new user with the info from req.body
    const userData = await User.create(req.body);

    // save the user's session info
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route for login
// /api/users/login
router.post("/login", async (req, res) => {
  try {
    // check if input username exists in database
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }
    // check if the input password matches the user's password in database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }
    // save the user's session info
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route for logout
// /api/users/logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    // kill the logged_in session
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
