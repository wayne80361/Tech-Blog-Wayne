const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Set a default value to the current date and time
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user", // Reference the "user" model
        key: "id", // Reference the "id" field
      },
    },
  },
  {
    sequelize,
    timestamps: false, // Disable timestamps
    freezeTableName: true, // freeze the table name as model name
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
