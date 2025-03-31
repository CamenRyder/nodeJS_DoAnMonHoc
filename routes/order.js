var express = require("express");
var router = express.Router();
const orderController = require("../controllers/order");
var router = express.Router();

/* GET users listing. */
router.get("/",  async (req, res, next) => {
    try {
        let orders = await  orderController.GetAllOrder();
        CreateSuccessRes(res, orders, 200);
    } catch (error) {
        next(error);
    }
});

// export the router
module.exports = router;