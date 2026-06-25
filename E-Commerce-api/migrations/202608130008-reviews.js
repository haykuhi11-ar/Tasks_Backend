
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Review', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
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
      onDelete: 'CASCADE',
    },

    rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    comment: {
      type: Sequelize.TEXT,
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('Review');
}