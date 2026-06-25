import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Products = sequelize.define("Products", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0,
            },
        },

        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },

        imageUrl: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false
    });

    Products.associate = (models) => {
        Products.belongsToMany(models.Category, {
            through: models.ProductCategory,
            foreignKey: "product_id",
            otherKey: "category_id",
        });
    }

    return Products;
}