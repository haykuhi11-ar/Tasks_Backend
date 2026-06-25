
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('CartItems', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    cart_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Carts',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },

    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
    },

    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('CartItems');
}