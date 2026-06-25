
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Orders', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },

    status: {
      type: Sequelize.STRING,
      defaultValue: 'pending',
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('Orders');
}