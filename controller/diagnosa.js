const { sequelize } = require("../config/DB");
const { QueryTypes } = require("sequelize");

const getDiagnosa = async (req, res) => {
  try {
    const tipe = req.params.id.substring(0, 2);
    let data = {};

    const tanya = await sequelize.query(
      "select nama_gejala from `gejala` where id_gejala = " +
        `'${req.params.id}'`,
      {
        type: QueryTypes.SELECT,
      }
    );

    const lanjutan = await sequelize.query(
      "select ya, tidak from `pertanyaan` where tanya_awal = " +
        `'${req.params.id}'`,
      {
        type: QueryTypes.SELECT,
      }
    );

    data = {
      value: tanya[0].nama_gejala,
      ya: lanjutan[0].ya,
      tidak: lanjutan[0].tidak,
      tipe: "tanya",
    };

    res.render("pages/tanya.ejs", { data });
  } catch (err) {
    console.log(err);
  }
};

const getHasilDiagnosa = async (req, res) => {
  const tipe = req.params.id.substring(0, 2);
  let data = "";

  if (tipe === "KR") {
    const hasil = await sequelize.query(
      "SELECT nama_rusak from kerusakan where id_rusak = " +
        `'${req.params.id}'`,
      {
        type: QueryTypes.SELECT,
      }
    );

    data = "Terjadi kerusakan pada " + hasil[0].nama_rusak;
  } else {
    data =
      "Tidak diketahui, hubungi admin untuk tambah data atau bawa hape ke tempat service";
  }

  res.render("pages/hasil.ejs", { data });
};
module.exports = {
  getDiagnosa,
  getHasilDiagnosa,
};
