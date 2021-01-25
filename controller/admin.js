const { sequelize } = require("../config/DB");
const { QueryTypes } = require("sequelize");

const getRusak = async (req, res) => {
  try {
    const hasil = await sequelize.query("SELECT * from kerusakan ", {
      type: QueryTypes.SELECT,
    });

    res.render("pages/dashboard.ejs", { hasil, type: "rusak" });
  } catch (err) {
    console.log(err);
  }
};

const getGejala = async (req, res) => {
  try {
    const hasil = await sequelize.query("SELECT * from gejala ", {
      type: QueryTypes.SELECT,
    });
    res.render("pages/dashboard.ejs", { hasil, type: "gejala" });
  } catch (err) {
    console.log(err);
  }
};

const getRelasi = async (req, res) => {
  try {
    const hasil = await sequelize.query(
      `SELECT pertanyaan.*, gejala.nama_gejala as gejala FROM pertanyaan 
      INNER JOIN gejala
      ON id_gejala = tanya_awal
      
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.render("pages/dashboard.ejs", { hasil, type: "relasi" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getRusak,
  getGejala,
  getRelasi,
};
