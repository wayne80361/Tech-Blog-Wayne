const User = require("./User");
const Post = require("./Post");

User.hasMany(Post, {
  foreignKey: "user_id",
  // if a user is deleted, their associated posts should be deleted
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Post };
