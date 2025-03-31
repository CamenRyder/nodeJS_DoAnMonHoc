var roleModel = require("../schemas/role");
module.exports = {
  getAllRoles: async function () {
    return await roleModel.find({
      isDeleted: false,
    });
  },
  createARole: async function (name) {
    try {
      let newRole = new roleModel({
        name: name,
      });
      return await newRole.save();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteARole: async function (id) {
    try {
      return await roleModel.findByIdAndUpdate(id, {
        isDeleted: true,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateARole: async function (id, name) {
    try {
      return await roleModel.findByIdAndUpdate(id, {
        name: name,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getARole: async function (id) {
    try {
      return await roleModel.findById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
