import { DataTypes } from "sequelize";

export default (sequelize) => {
    const CartItems = sequelize.define("CartItems", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        cart_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Carts",
                key: "id"
            },
            onDelete: "CASCADE"
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Products",
                key: "id"
            }
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1
            }
        },

        indexes: [
            {
                unique: true,
                fields: ["cart_id", "product_id"]
            }
        ]
    });

    CartItems.associate = (models) => {
        CartItems.belongsTo(models.Carts, {
            foreignKey: "cart_id"
        });
    }

    return CartItems;
}