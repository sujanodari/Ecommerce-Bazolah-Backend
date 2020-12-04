
require('dotenv').config();
var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../server");
const should = chai.should();
chai.use(chaiHttp);

//for registration
describe("/POST user", () => {
  it("it should register the user info", (done) => {
    const user = {
        "fullName":"Sujan Odari",
        "email": "test@gmail.com",
        "gender":"Male",
        "age":"23",
        "location":"jhapa",
        "password":"sujan",
        "type":"Vendor",
        "contactNo":"1234567"
    };
    chai
      .request(app)
      .post("/register")
      .send(user)
      .end((err, res) => {
        res.body.should.be.a("object");
        done();
      });
  });
});


 //Login TDD
describe("/POST user", () => {
  it("it should post the Login info", (done) => {
    const user = {
      email: " sujan@gmail.com",
      password: "sujan",
    };
    chai
      .request(app)
      .post("/login")
      .send(user)
      .end((err, res) => {
        res.body.should.be.a("object");
        done();
      });
  });
});

 //Get user
describe("/GET user", () => {
    it("it should grt the users info", (done) => {
      chai
        .request(app)
        .get("/user")
        .end((err, res) => {
          res.body.should.be.a("object");
          done();
        });
    });
  });

 var Token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUzZGE4MDA1ZjI3NjRjY2ZjYzU2NzIiLCJpYXQiOjE1OTkzNjk0NjF9.-tZwrKqwAnAWLKhAojq-EkFbSp1BaXIx9LBsIq8HNYg"
  //add product
  describe("/POST product", () => {
    it("it should add product info", (done) => {
      const product = {
        "name":"Apple",
        "type": "",
        "description":"this",
        "stock":2,
        "dokanName":"name",
        "location": "jhapa",
        "image": "image",
        "category": "phone",
        "price": "2000"
      };
      chai
        .request(app)
        .post("/product")
        .set("Authorization",Token)
        .send(product)
        .end((err, res) => {
          res.body.should.be.a("object");
          done();
        });
    });
  });


   //Get product
describe("/GET product", () => {
    it("it should get the product", (done) => {
      chai
        .request(app)
        .get("/product")
        .end((err, res) => {
        res.should.have.status(200);
          done();
        });
    });
  });