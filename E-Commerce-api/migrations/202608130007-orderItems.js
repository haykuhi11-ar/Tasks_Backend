
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('OrderItems', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    order_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Orders',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },

    product_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Products',
        key: 'id',
      },
    },

    quantity: {
      type: Sequelize.INTEGER,
    },

    price_at_purchase: {
      type: Sequelize.DECIMAL(10, 2),
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('OrderItems');
}