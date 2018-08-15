function up(queryInterface) {
  return queryInterface
    .sequelize
    .query("ALTER TABLE interlocutor MODIFY COLUMN status ENUM('favorite', 'pending', 'money');");
}
function down(queryInterface) {
  return queryInterface
    .sequelize
    .query("ALTER TABLE interlocutor MODIFY COLUMN status ENUM('favorite', 'pending');");
};

module.exports = {up, down};
