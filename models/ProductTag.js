const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const Product = require("./Product");
const Tag = require("./Tag");

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        key: "id",
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "product_id",
  as: "tags",
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: "tag_id",
  as: "products",
});

module.exports = ProductTag;
