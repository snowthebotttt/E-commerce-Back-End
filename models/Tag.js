const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");
const Category = require("./Category");

class Tag extends Model {}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "tag",
  }
);

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: "tag_id",
  as: "products",
});

module.exports = Tag;
