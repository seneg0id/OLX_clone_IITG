const router = require("express").Router();
const User = require("../models/user");
const Product = require("../models/Product");

//create product
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const saveProd = await newProduct.save();
    res.status(200).json(saveProd);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update product
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product.useremail === req.body.useremail || req.user.isAdmin ) {
      try {
        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedProduct);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you can update only ur product");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product.useremail === req.body.useremail || req.user.isAdmin) {
      try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("product has been deleted");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you can delete only ur product");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//get post
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all products
router.get("/", async (req, res) => {
  const useremail = req.query.useremail;
  const catname = req.query.category;
  const sellingPrice = req.query.sellingPrice
  try {
    let products;
    if (useremail) {
      products = await Product.find({ useremail });
    } else if (catname) {
      products = await Product.find({
        category: {
          $in: [catname],
        },
      });
    }else if (sellingPrice) {
      products = await Product.find({
        sellingPrice: {
          $in: [sellingPrice],
        },
      });
    }
    else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
