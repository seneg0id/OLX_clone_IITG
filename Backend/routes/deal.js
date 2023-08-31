const router = require("express").Router();
const Deal = require('../models/Deal')
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyTokens")
  

//create Deal
router.post("/", verifyToken, async (req, res) => {
    const newDeal = new Deal(req.body);
    try {
      const savedDeal = await newDeal.save();
      res.status(200).json(savedDeal);
    } catch (err) {
      res.status(500).json(err);
    }
});
  //update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const updatedDeal = await Deal.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedDeal);
    } catch (err) {
      res.status(500).json(err);
    }
});
  //delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Deal.findByIdAndDelete(req.params.id);
      res.status(200).json("Deal has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
});
//user deals
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
      const deals = await Deal.find({ userId: req.params.userId });
      res.status(200).json(deals);
    } catch (err) {
      res.status(500).json(err);
    }
});
//user deals
router.get("/find/:productID", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const deals = await Deal.find({ productId: req.params.productID });
    res.status(200).json(deals);
  } catch (err) {
    res.status(500).json(err);
  }
});
  //all deals
  router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
      const deals = await Deal.find();
      res.status(200).json(deals);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;