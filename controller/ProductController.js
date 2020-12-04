const productModel = require("../model/ProductModel");

function addProduct(req, res, next) {
  productModel
    .create({
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      stock: req.body.stock,
      dokanName: req.body.dokanName,
      location: req.body.location,
      image: req.body.image,
      price: req.body.price,
      postedBy: req.body.postedBy,
    })
    .then((data) => {
      res.status(201).send(data);
    })

    .catch((err) => {
      res.status(500).send(err);
    });
}

function viewProduct(req, res, next) {
  productModel
    .find()
    .sort({ addedAt: "desc" })
    .then((product) => {
      res.status(200);
      res.send(product);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

function viewProductByUserId(req, res) {
  productModel
    .find({ postedBy: req.params.id })
    .sort({ addedAt: "desc" })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

function searchProduct(req, res) {
  productModel
    .find({ name: { $regex: ".*" + req.body.name + ".*", $options: "i" } })
    .sort({ addedAt: "desc" })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.send(500).send(err);
    });
}

module.exports = {
  addProduct,
  viewProduct,
  viewProductByUserId,
  searchProduct,
};
