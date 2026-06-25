import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Orders = sequelize.define("Orders", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id"
            },
            onDelete: "CASCADE"
        },

        status: {
            type: DataTypes.ENUM(
                "pending",
                "paid",
                "shipped",
                "delivered",
                "cancelled"
            ),
            allowNull: false,
            defaultValue: "pending"
        },

        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0,
            }
        },
    }, {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false
    });

    Orders.associate = (models) => {
        Orders.belongsTo(models.Users, {
            foreignKey: "user_id"
        });

        Orders.hasMany(models.OrderItems, {
            foreignKey: "order_id",
            onDelete: "CASCADE"
        });
    }

    return Orders;
}