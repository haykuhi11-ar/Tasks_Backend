import { DataTypes } from "sequelize";

export default (sequelize) => {
    const OrderItems = sequelize.define("OrderItems", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Orders",
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
            },
            onDelete: "CASCADE"  
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0
            }
        },

        price_at_purchase: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0
            }
        }
    }, {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false
    });

    OrderItems.associate = (models) => {
        OrderItems.belongsTo(models.Orders, {
            foreignKey: "order_id"
        });
    }

    return OrderItems;
}