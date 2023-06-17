const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "fruver",
  port: "3306",
});

const getProductos = async (req, res) => {
  //res.send("GET Pagina Productos desde Controller");
  await pool.query("SELECT * FROM productos", (err, data) => {
    if (err) {
      console.error(err);
      res.status(400).json({ mensaje: err });
    } else {
      console.log(data);
      res.status(200).json(data);
    }
  });
};

const postProductos = async (req, res) => {
  //res.send("POST Pagina Productos desde Controller");
  const { nombre, detalle } = req.body;
  await pool.query(
    `INSERT INTO  productos(nombre, detalle) VALUES ('${nombre}','${detalle}') `,
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(400).json({ mensaje: err });
      } else {
        console.log(data);
        res.status(200).json({
          body: {
            producto: {
              nombre: nombre,
              detalle: detalle,
            },
          },
        });
      }
    }
  );
};

const putProductos = async (req, res) => {
  //res.send("PUT Pagina Productos desde Controller");
  //res.send("DELETE Pagina Productos desde Controller");
  const { idProducto } = req.params;
  const { nombre, detalle } = req.body;
  await pool.query(
    `UPDATE productos set nombre='${nombre}', detalle='${detalle}' WHERE idProducto='${idProducto}'`,
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(400).json({ mensaje: err });
      } else {
        console.log(data);
        res.status(200).json({
          body: {
            producto: {
              nombre: nombre,
              detalle: detalle,
            },
          },
        });
      }
    }
  );
};

const deleteProductos = async (req, res) => {
  //res.send("DELETE Pagina Productos desde Controller");
  const { idProducto } = req.params;
  await pool.query(
    `DELETE FROM productos WHERE idProducto='${idProducto}'`,
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(400).json({ mensaje: err });
      } else {
        console.log(data);
        res.status(200).json({
          body: {
            mensaje: `Registro con id  ${idProducto} Eliminado Satisfactoriamente`,
          },
        });
      }
    }
  );
};

module.exports = {
  getProductos,
  postProductos,
  putProductos,
  deleteProductos,
};
