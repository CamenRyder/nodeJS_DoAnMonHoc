let brandModel = require("../schemas/brand");

module.exports = {
  getAllBrand: async function () {
    return await brandModel.find({
      isDeleted: false,
    });
  },

  // Create Brand
  createBrand: async function (body) {
    let newBrand = new brandModel({
      tenLoai: body.tenLoai,
      anhDaiDien: body.anhDaiDien,
    });

    return await newBrand.save();
  },

  // deleteBrand
  deleteBrand: async function (id) {
    return await brandModel.findByIdAndUpdate(id, {
      isDeleted: true,
    });
  }, 

  // updateBrand

  updateBrand: async function (id, body) {
    return await brandModel.findByIdAndUpdate(id, {
      tenLoai: body.tenLoai,
      anhDaiDien: body.anhDaiDien,
    });
  },
};
