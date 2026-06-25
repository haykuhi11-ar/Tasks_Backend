import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Review = sequelize.define("Review", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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

        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Products",
                key: "id"
            },
            onDelete: "CASCADE"
        },

        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 1,
                max: 5
            }
        },

        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    }, {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
        indexes: [
            {
                unique: true,
                fields: ["user_id", "product_id"]
            }
        ]
    });

    Review.associate = (models) => {
        Review.belongsTo(models.Users, {
            foreignKey: "user_id"
        });

        Review.belongsTo(models.Products, {
            foreignKey: "product_id"
        });
    }

    return Review;
}