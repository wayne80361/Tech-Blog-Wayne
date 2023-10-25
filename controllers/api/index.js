const router = require("express").Router();
const userRoutes = require("./userRoutes");
const posttRoutes = require("./projectRoutes");

router.use("/users", userRoutes);
router.use("/posts", posttRoutes);

module.exports = router;
