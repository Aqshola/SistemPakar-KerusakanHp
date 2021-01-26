const { sequelize } = require("../config/DB");
const { QueryTypes } = require("sequelize");

//Rusak controller
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
const getAddRusak = async (req, res) => {
  res.render("pages/action.ejs", { type: "rusak", action: "add" });
};
const getEditRusak = async (req, res) => {
  console.log(req.params.id);

  const dataRusak = await sequelize.query(
    `select * from kerusakan where id_rusak = '${req.params.id}'`,
    {
      type: QueryTypes.SELECT,
    }
  );
  res.render("pages/action.ejs", { type: "rusak", action: "edit", dataRusak });
};

const postEditRusak = async (req, res) => {
  const { nama_rusak } = req.body;
  const id_rusak = req.params.id;

  await sequelize.query(
    `update kerusakan
     set nama_rusak= '${nama_rusak}'
     where id_rusak= '${id_rusak}'`,
    { type: QueryTypes.UPDATE }
  );

  console.log("update");

  const dataRusak = await sequelize.query(
    `select * from kerusakan where id_rusak = '${req.params.id}'`,
    {
      type: QueryTypes.SELECT,
    }
  );

  res.render("pages/action.ejs", { type: "rusak", action: "edit", dataRusak });
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

  res.render("pages/action.ejs", { type: "rusak", action: "add" });
};
const postRemoveRusak = async (req, res) => {
  const id_rusak = req.params.id;

  await sequelize.query(
    `
    delete from pertanyaan
    where ya = '${id_rusak}' || tidak='${id_rusak}'
  `,
    {
      type: QueryTypes.DELETE,
    }
  );

  console.log("pertanyaan delete");

  await sequelize.query(
    `    delete from kerusakan
    where id_rusak = '${id_rusak}'
  `,
    {
      type: QueryTypes.DELETE,
    }
  );

  console.log("kerusakan delete");

  res.redirect("/admin");
};

//Gejala Controller
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
const getAddGejala = async (req, res) => {
  res.render("pages/action.ejs", { type: "gejala", action: "add" });
};
const getEditGejala = async (req, res) => {
  try {
    const id = req.params.id;

    const dataGejala = await sequelize.query(
      `select * from gejala where id_gejala = '${id}'`,
      {
        type: QueryTypes.SELECT,
      }
    );

    res.render("pages/action.ejs", {
      type: "gejala",
      action: "edit",
      dataGejala,
    });
  } catch (err) {
    console.log(err);
  }
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
    res.redirect(req.originalUrl);
  } catch (err) {
    console.log(err);
  }
};
const postEditGejala = async (req, res) => {
  try {
    const { nama_gejala } = req.body;
    const id = req.params.id;
    await sequelize.query(
      `update gejala
       set nama_gejala='${nama_gejala}'
       where id_gejala='${id}'
      `,
      { type: QueryTypes.UPDATE }
    );
    console.log("Update sukses");
    res.redirect(req.originalUrl);
  } catch (err) {
    console.log(err);
  }
};
const postRemoveGejala = async (req, res) => {
  const id = req.params.id;

  await sequelize.query(
    `delete from pertanyaan
     where ya = '${id}' || tidak = '${id}'
    `,
    {
      type: QueryTypes.DELETE,
    }
  );
  console.log("delete pertanyaan");
  await sequelize.query(`delete from gejala where id_gejala = '${id}'`, {
    type: QueryTypes.DELETE,
  });

  console.log("delete gejala");

  res.redirect("/admin/gejala");
};

//Relasi Controller
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
const getAddRelasi = async (req, res) => {
  const dataGejala = await sequelize.query("select * from gejala", {
    type: QueryTypes.SELECT,
  });

  const dataRusak = await sequelize.query("select * from kerusakan", {
    type: QueryTypes.SELECT,
  });

  res.render("pages/action.ejs", {
    type: "relasi",
    dataGejala,
    dataRusak,
    action: "add",
  });
};
const getEditRelasi = async (req, res) => {
  try {
    const id = req.params.id;

    const dataRelasi = await sequelize.query(
      `select * from pertanyaan where id='${id}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    const dataGejala = await sequelize.query("select * from gejala", {
      type: QueryTypes.SELECT,
    });

    const dataRusak = await sequelize.query("select * from kerusakan", {
      type: QueryTypes.SELECT,
    });

    res.render("pages/action.ejs", {
      type: "relasi",
      dataGejala,
      dataRusak,
      dataRelasi,
      action: "edit",
    });
  } catch (err) {
    console.log(err);
  }
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

    res.redirect(req.originalUrl);
  } catch (err) {
    console.log(err);
  }
};
const postEditRelasi = async (req, res) => {
  try {
    const id = req.params.id;
    const { gejala_awal, ya, tidak } = req.body;

    await sequelize.query(
      `update pertanyaan
       set tanya_awal = '${gejala_awal}',
           ya = '${ya}',
           tidak= '${tidak}'
      where id=${id}
      `
    );
    console.log("Update sukses");
    res.redirect(req.originalUrl);
  } catch (err) {
    console.log(err);
  }
};
const postRemoveRelasi = async (req, res) => {
  try {
    const id = req.params.id;

    const dataRelasi = await sequelize.query(
      `select * from pertanyaan where id = '${id}'`,
      {
        type: QueryTypes.SELECT,
      }
    );

    await sequelize.query(
      `update pertanyaan
       set ya = 'NONE'
       where  ya = '${dataRelasi[0].tanya_awal}'`,
      {
        type: QueryTypes.UPDATE,
      }
    );

    await sequelize.query(
      `update pertanyaan
       set tidak = 'NONE'
       where  tidak = '${dataRelasi[0].tanya_awal}'`,
      {
        type: QueryTypes.UPDATE,
      }
    );

    await sequelize.query(
      `delete from pertanyaan
     where tanya_awal = '${dataRelasi[0].ya}' || tanya_awal = '${dataRelasi[0].tidak}'
    `,
      {
        type: QueryTypes.DELETE,
      }
    );

    await sequelize.query(
      `delete from pertanyaan
     where id='${id}'`,
      {
        type: QueryTypes.DELETE,
      }
    );

    console.log("Delete success");

    res.redirect("/admin/relasi");
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
  getEditRusak,
  getEditGejala,
  getEditRelasi,
  postAddRusak,
  postAddGejala,
  postAddRelasi,
  postEditRusak,
  postRemoveRusak,
  postEditGejala,
  postRemoveGejala,
  postEditRelasi,
  postRemoveRelasi,
};
