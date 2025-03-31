var express = require("express");
var router = express.Router();
let orderDetailController = require("../controllers/orderDetail");
var router = express.Router();

/* GET users listing. */
router.get("/",  async (req, res, next) => {
    try {
        let orderDetails = await  orderDetailController.GetAllOrderDetail();
        CreateSuccessRes(res, orderDetails, 200);
    } catch (error) {
        next(error);
    }
});

// export the router
module.exports = router;