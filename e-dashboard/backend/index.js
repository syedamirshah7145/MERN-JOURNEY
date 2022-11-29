const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');
const app = express();
app.use(cors());
app.use(express.json());
const jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
});

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            jwt.sign({ user }, jwtKey, { expiresIn: "1h" }, (err, token) => {
                if (err) {
                    resp.send({ result: "Something Went Wrong!Try Again" });
                }
                resp.status(200).json({'auth' : token,'user':user});
            })
        }
        else {
            resp.send("User not found!");
        }
    }
    else {
        resp.send("User not found!");
    }
});

app.post("/add-product", async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
});

app.get("/products", async (req, res) => {
    let products = await Product.find();
    products.length > 0 ? res.send(products) : res.send("No products found!");
});

app.delete("/product/:id", async (req, res) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
});

app.get("/product/:id", async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    }
    else {
        res.send({ result: "Not Found" });
    }
});

app.put("/product/:id", async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    );
    res.send(result);
});

app.get("/search/:id", async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.id } },
            { price: { $regex: req.params.id } },
            { category: { $regex: req.params.id } }
        ]
    });
    res.send(result);
});

app.listen(5000);