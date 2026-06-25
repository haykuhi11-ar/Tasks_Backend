import { DataTypes } from "sequelize";

export default (sequelize) => {
  const ProductCategory = sequelize.define(
    "ProductCategory",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Category",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "product_category",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["product_id", "category_id"],
        },
      ],
    }
  );

  ProductCategory.associate = (models) => {
    ProductCategory.belongsTo(models.Products, {
      foreignKey: "product_id",
    });

    ProductCategory.belongsTo(models.Category, {
      foreignKey: "category_id",
    });
  };

  return ProductCategory;
};