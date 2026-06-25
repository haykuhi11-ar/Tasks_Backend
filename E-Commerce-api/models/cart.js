import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Carts = sequelize.define("Carts", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: "Users",
                key: "id"
            },
            onDelete: "CASCADE"
        },
    }, {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false
    });

    Carts.associate = (models) => {
        Carts.belongsTo(models.Users, {
            foreignKey: "user_id",
        });

        Carts.hasMany(models.CartItems, {
            foreignKey: "cart_id",
            onDelete: "CASCADE"
        });
    }

    return Carts;
}