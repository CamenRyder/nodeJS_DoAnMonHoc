let paymentModel = require("../schemas/payment");

module.exports = {
  getAllPayment: async () => {
    let payments = await paymentModel.find({
      isDeleted: false,
    });
    return payments;
  },
  getPaymentById: async (id) => {
    return await paymentModel.findById(id, {
      isDeleted: false,
    });
  },

  createPayment: async (tenLoai) => {
    let payment = new paymentModel({
      tenLoai,
    });
    await payment.save();
    return payment;
  },
  updatePayment: async (id, tenLoai) => {
    let payment = await paymentModel.findByIdAndUpdate(id, { tenLoai });
    return payment;
  },
  deletePayment: async (id) => {
    let payment = await paymentModel.findByIdAndUpdate(id, { isDeleted: true });
    return payment;
  },
};
