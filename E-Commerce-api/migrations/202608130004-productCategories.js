
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('ProductCategory', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },

    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Category',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('ProductCategory');
}