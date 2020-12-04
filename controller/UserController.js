const userModel = require("../model/UserModel");
const bcrypt = require("bcryptjs")
const jwttoken = require("jsonwebtoken")

function addUser(req, res, next) {
    userModel.findOne({ email: req.body.email })
        .then((user) => {
            if (user == null) {
                let password = req.body.password;
                bcrypt.hash(password, 10, function (err, hash) {
                    if (err) {
                        res.status(500).send(err);
                    }
                    userModel.create({
                        fullName: req.body.fullName,
                        email: req.body.email,
                        gender: req.body.gender,
                        age: req.body.age,
                        location: req.body.location,
                        password: hash,
                        type: req.body.type,
                        contactNo: req.body.contactNo
                    }).then(user => {
                        let token = jwttoken.sign({ _id: user._id },
                            process.env.APP_SECRET);
                        res.status(201);
                        res.json({
                            code: 201
                            , status: "Registered!!!!", token: token
                        });
                    }).catch(next)
                });
            }
            else {
                res.status(409);
                res.json({
                    status: 402,
                    message: "Email already registered"
                })
            }
        })
        .catch(next)
}

function chkLogin(req, res, next) {
    userModel.findOne({ email: req.body.email })
        .then((user) => {
            if (user == null) {
                res.status(401)
                res.json({
                    code: 401, status: 'User not registered'
                })
            } else

                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            res.status(403)
                            res.json({
                                code: 403, status: "Password not valid"
                            })
                        }
                        if (user.verified == false) {
                            res.status(402)
                            res.json({
                                code: 402,
                                status: 'Your account is not verified'
                            })
                        }
                        else {
                            let token = jwttoken.sign({
                                _id: user._id
                            },
                                process.env.APP_SECRET);
                            res.status(200);
                            res.json({
                                code: 200, status: 'You have logged!!!', token: token, type: user.type
                            });
                        }
                    }).catch(next);

        }).catch(next);
}
function getUser(req, res, next) {
    userModel.find().then((user) => {
        res.status(200);
        res.send(user);
    }).catch(next)
}

module.exports = { addUser, chkLogin, getUser }