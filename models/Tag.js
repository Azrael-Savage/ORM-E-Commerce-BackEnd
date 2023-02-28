const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Product = require("./Product");
const ProductTag = require("./ProductTag");

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

// Define the ProductTag model before using it in the association


Tag.belongsToMany(Product, {
	through: ProductTag,
	foreignKey: "tag_id",
});

module.exports = Tag;
