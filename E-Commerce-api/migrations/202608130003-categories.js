
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Category', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },

    description: {
      type: Sequelize.TEXT,
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('Category');
}