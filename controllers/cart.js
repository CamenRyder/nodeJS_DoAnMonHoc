const { toFormData } = require("axios");
let cartDetailModel = require("../schemas/cartDetail");
let cartModel = require("../schemas/cart");
module.exports = {
  getAllCartByUserId: async (userId) => {
    return await cartModel.find({
      user: userId,
      isDeleted: false,
    });
  },
  createCart: async (cart) => {
    try {
      let createCart = new Date().toUTCString();
      let updateCart = new Date().toUTCString();
      console.log(createCart, updateCart);
      let newCart = new cartModel({
        user: cart.userId,
        createDate: createCart,
        updateDate: updateCart,
        totalPrice: 0,
        totalQuanity: 0,
      });
      return await newCart.save();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  autoUpdateCart: async (id) => {
    try {
      let cart = await cartModel.findOne({
        _id: id,
        isDeleted: false,
      });
      let cartDetails = await cartDetailModel.find({
        cart: id,
        isDeleted: false,
      });
      let quanity = 0;
      let price = 0;
      for (let index = 0; index < cartDetails.length; index++) {
        quanity += cartDetails[index].quanity;
        price += cartDetails[index].price * cartDetails[index].quanity;
      }
      let updateCart = new Date().toUTCString();
      cart.totalPrice = price;
      cart.totalQuanity = quanity;
      cart.updateDate = updateCart;
      return await cart.save();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteCart: async (id) => {
    try {
      // soft delete
      return await cartModel.findByIdAndUpdate(id, {
        isDeleted: true,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
