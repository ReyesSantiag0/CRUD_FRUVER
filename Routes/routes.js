const { Router } = require("express");
const {
  getProductos,
  postProductos,
  putProductos,
  deleteProductos,
} = require("../Controllers/controller.js");

const router = Router();

//Definir Rutas
router.get("/", (req, res) => {
  res.send("GET Pagina Principal Express");
});

router.get("/productos", getProductos);
router.post("/productos", postProductos);
router.put("/productos/:idProducto", putProductos);
router.delete("/productos/:idProducto", deleteProductos);

module.exports = router;
