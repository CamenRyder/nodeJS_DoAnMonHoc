let imageProductModel = require("../schemas/imageProduct"); 

module.exports = {
    GetAllImageProduct: async () => {
        return await imageProductModel.find();
    },
    CreateAnImageProduct: async (image) => {
        try {
            let newImageProduct = new imageProductModel({
                image: image,
            });
            return await newImageProduct.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },
};