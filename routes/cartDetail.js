var express = require("express");
var router = express.Router();
let cartDetailController = require("../controllers/cartDetail");

// Get All Cart Detail
router.get("/", async (req, res) => {
    try {
        let cartDetails = await cartDetailController.GetAllCartDetail();
        res.status(200).json(cartDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// export the router
module.exports = router;