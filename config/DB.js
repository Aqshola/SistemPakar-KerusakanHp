const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sistempakar", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const callDB = async () => {
  try {
    await sequelize.authenticate();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { callDB, sequelize };
