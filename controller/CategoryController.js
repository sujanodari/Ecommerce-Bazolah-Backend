const categoryModel = require("../model/CategoryModel");

function addCategory(req, res) {
  categoryModel.findOne({ category: req.body.category })
        .then((category)=>{
          if(category==null){
            categoryModel
            .create({
              category: req.body.category,
            })
            .then((data) => {
              res.status(201).send(data);
            })
            .catch((err) => {
              res.status(500).send(err);
            });
          }
          else{
              res.status(409);
              res.json({
                  status: 409,
                  message: "Category already exist"
              })
          }
        }
        ).catch((err)=>{
          res.status(500).send(err);
        }

        );
 
}


function viewCategory(req, res) {
  categoryModel
    .find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

function addProductToCategory(req, res) {
  categoryModel
    .find({ _id: req.params.id })
    .then((category) => {
      categoryModel
        .findByIdAndUpdate(
          req.params.id,
          { $push: { products: req.body.products } },
          { new: true }
        )
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

module.exports = { addCategory, viewCategory, addProductToCategory };
