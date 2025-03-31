let categoryModel = require("../schemas/category");
module.exports = {
  getAllCategory: async () => {
    try {
      return await categoryModel.find({
        isDeleted: false,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  createACategory: async (category) => {
    try {
      let newCategory = new categoryModel({
        tenLoai: category.name,
        anhDaiDien: category.image,
      });
      return await newCategory.save();
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getACategory: async (categoryId) => {
    try {
      let category = await categoryModel.findOne({
        _id: categoryId,
        isDeleted: false,
      });
      return category;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  updateACategory: async (categoryId, category) => {
    try {
      return await categoryModel.findByIdAndUpdate(categoryId, {
        tenLoai: category.name,
        anhDaiDien: category.image,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteACategory: async (categoryId) => {
    try {
      return await categoryModel.findByIdAndUpdate(categoryId, {
        isDeleted: true,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
