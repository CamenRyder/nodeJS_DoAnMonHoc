let orderModel = require("../schemas/order");
let paymentModel = require("../schemas/payment");
let orderStatusModel = require("../schemas/orderStatus");
module.exports = {
  getAllOrderByUserId: async (userId) => {
    let orders = await orderModel
      .find({
        user: userId,
        isDeleted: false,
      })
      .populate({
        path: "orderDetail",
      });
    return orders;
  },

  getOrderByOrderId: async (orderId) => {
    let order = await orderModel
      .findOne({
        _id: orderId,
        isDeleted: false,
      })
      .populate({
        path: "orderDetail",
      });
    return order;
  },

  createOrder: async (order) => {
    const [payment, orderStatus] = await Promise.all([
      paymentModel.findOne({
        tenLoai: order.payment,
      }),
      brandModel.findOne({ isDeleted: false, tenLoai: body.brand }),
      orderStatusModel.findOne({
        tenTrangThai: order.orderStatus,
      }),
    ]);

    let newOrder = new orderModel();
    newOrder.orderDate = new Date().toUTCString();
    newOrder.totalPrice = 0;
    newOrder.totalQuantity = 0;
    newOrder.shippingAddress = order.shippingAddress;
    newOrder.notes = order.notes;
    newOrder.user = order.user;
    newOrder.payment = payment._id;
    newOrder.orderStatus = orderStatus._id;
    await newOrder.save();

    return newOrder;
  },

  updateOrder: async (orderId, order) => {
      let payment = "" ; 
      let orderStatus = "" ;  
      let
    if(order.payment)
    {

    }

    let updatedOrder = await orderModel.findOneAndUpdate(
      {
        _id: orderId,
        isDeleted: false,
      },
      order,
      {
        new: true,
      }
    );
    return updatedOrder;
  },

  deleteOrder: async (orderId) => {
    let deletedOrder = await orderModel.findOneAndUpdate(
      {
        _id: orderId,
        isDeleted: false,
      },
      {
        isDeleted: true,
      }
    );
    return deletedOrder;
  },
};
