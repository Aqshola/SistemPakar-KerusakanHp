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

const getAddRusak = async (req, res) => {
  res.render("pages/action.ejs", { type: "rusak" });
};

const postAddRusak = async (req, res) => {
  try {
    const { kode_rusak, nama_rusak } = req.body;
    await sequelize.query(
      `insert into kerusakan values ('${kode_rusak}','${nama_rusak}')`,
      {
        type: QueryTypes.INSERT,
      }
    );
    console.log("success");
  } catch (err) {
    console.log(err);
  }

  res.render("pages/action.ejs", { type: "rusak" });
};

const getAddGejala = async (req, res) => {
  res.render("pages/action.ejs", { type: "gejala" });
};

const postAddGejala = async (req, res) => {
  try {
    const { kode_gejala, nama_gejala } = req.body;

    await sequelize.query(
      `insert into gejala values ('${kode_gejala}','${nama_gejala}')`,
      {
        type: QueryTypes.INSERT,
      }
    );
    console.log("success");
  } catch (err) {
    console.log(err);
  }

  res.render("pages/action.ejs", { type: "gejala" });
};

const getAddRelasi = async (req, res) => {
  const dataGejala = await sequelize.query("select * from gejala", {
    type: QueryTypes.SELECT,
  });

  const dataRusak = await sequelize.query("select * from kerusakan", {
    type: QueryTypes.SELECT,
  });

  console.log(dataGejala);
  console.log(dataRusak);

  res.render("pages/action.ejs", { type: "relasi", dataGejala, dataRusak });
};

const postAddRelasi = async (req, res) => {
  try {
    const { gejala_awal, ya, tidak } = req.body;

    await sequelize.query(
      `insert into pertanyaan (tanya_awal, ya, tidak) 
       values ('${gejala_awal}','${ya}','${tidak}')`,
      {
        type: QueryTypes.INSERT,
      }
    );

    console.log("success");

    const dataGejala = await sequelize.query("select * from gejala", {
      type: QueryTypes.SELECT,
    });

    const dataRusak = await sequelize.query("select * from kerusakan", {
      type: QueryTypes.SELECT,
    });

    res.render("pages/action.ejs", { type: "relasi", dataGejala, dataRusak });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getRusak,
  getGejala,
  getRelasi,
  getAddRusak,
  getAddGejala,
  getAddRelasi,
  postAddRusak,
  postAddGejala,
  postAddRelasi,
};
