import { DataTypes } from "sequelize";
import { hashPassword } from "../src/utils/hashPassword.js"

export default (sequelize) => {
    const Users = sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [8, 50],
                is: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/
            }
        },

        role: {
            type: DataTypes.ENUM("user", "admin"),
            allowNull: false,
            defaultValue: "user"
        },
    }, {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false
    });

    Users.beforeCreate(async (user) => {
        if (user.password) {
            user.password = await hashPassword(user.password);
        }
    });

    Users.beforeUpdate(async (user) => {
        if (user.changed("password")) {
            user.password = await hashPassword(user.password);
        }
    });

    Users.associate = (models) => {
        Users.hasOne(models.Carts, {
            foreignKey: "user_id",
            onDelete: "CASCADE"
        });

        Users.hasMany(models.Orders, {
            foreignKey: "user_id",
            onDelete: "CASCADE"
        });

        Users.hasMany(models.Review, {
            foreignKey: "user_id",
            onDelete: "CASCADE"
        });
    };

    return Users;
};

