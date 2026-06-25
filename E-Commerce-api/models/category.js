import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Category = sequelize.define("Category", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Products",
                key: "id"
            },
            onDelete: "CASCADE"
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        description: {
            type: DataTypes.TEXT
        },
    });

    Category.associate = (models) => {
        Category.belongsToMany(models.Products, {
            through: models.ProductCategory,
            foreignKey: "category_id",
            otherKey: "product_id",
        });
    }

    return Category;
};