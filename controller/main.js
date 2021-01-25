const { sequelize } = require("../config/DB");
const { QueryTypes } = require("sequelize");

const getMain = async (req, res) => {
  try {
    const tanya_id = await sequelize.query("SELECT * FROM `pertanyaan`", {
      type: QueryTypes.SELECT,
    });

    res.render("pages/main.ejs", { id: tanya_id[0].tanya_awal });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getMain,
};
