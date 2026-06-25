
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Products', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    description: {
      type: Sequelize.TEXT,
    },

    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },

    stock: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    imageUrl: {
      type: Sequelize.STRING,
    },

    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('Products');
}