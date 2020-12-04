require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");

var bodyParser = require("body-parser");
var cors = require("cors");
var auth = require("./auth/authentication");

app.use(morgan("tiny"));
app.use(express.static(__dirname + "/public"));
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
//api hit log
mongoose.connect(
  process.env.APP_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log("MongoDB connected");
  }
);

app.get("/", function (req, res) {
  res.send("Hello Wbborld");
});

const userController = require("./controller/UserController");
app.post("/login", userController.chkLogin);
app.post("/register", userController.addUser);
app.get("/users", userController.getUser);
app.get("/profile", auth.verifyUser, (req, res) => {
  res.json(req.user);
});

const categoryController = require("./controller/CategoryController");
app.post("/category", auth.verifyUser, categoryController.addCategory);
app.get("/category", categoryController.viewCategory);
app.put(
  "/category/:id",
  auth.verifyUser,
  categoryController.addProductToCategory
);

const productController = require("./controller/ProductController");
app.post("/product", auth.verifyUser, productController.addProduct);
app.get("/product", productController.viewProduct);
app.post("/product/search", productController.searchProduct);
app.get("/product/:id", productController.viewProductByUserId);

// image upload
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './public/images',
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 },
  fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
  }
}).single('productImage')

function checkFileType(file, cb) {
  const filetypes = /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|docx|pdf)$/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
      cb('You can upload only image files!');
     
  } else {
      return cb(null, true);
  }
}

app.post('/image', (req, res) => {
 // console.log(req.productImage);
  upload(req, res, (error) => {
      if (error) {
          console.log(error)
          res.status(400).json({
              success: false,
              error: error
          })
      } else {
          if (req.file == undefined) {
              res.status(400).json({
                  success: 403,
                  message: "No File Selected!"
              });
          } else {
              res.status(201)
              res.json({status:201, fileName: req.file.filename });
          }
      }
  });
});
app.use(express.static(path.join(__dirname, './images/')));


app.listen(3000);

module.exports = app;
