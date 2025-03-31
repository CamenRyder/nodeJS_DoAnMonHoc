let jwt = require("jsonwebtoken");
let constants = require("../utils/constants");
let userController = require("../controllers/users");

module.exports = {
  check_authentication: async function (req, res, next) {
    if (req.headers && req.headers.authorization) {
      let authorization = req.headers.authorization;
      if (authorization.startsWith("Bearer")) {
        let token = authorization.split(" ")[1];
        let result = jwt.verify(token, constants.SECRET_KEY);
        if (result.expire > Date.now()) {
          let user = await userController.getUserByID(result.id);
          req.user = user;
          next();
        } else {
          next(Error("ban chua dang nhap"));
        }
      } else {
        next(Error("Thieu tien to: Bearer"));
      }
    } else {
      next(Error("Ban thieu headers, can co authorization"));
    }
  },
  check_authorization: function (roles) {
    return async function (req, res, next) {
      try {
        let roleOfUser = req.user.role.name;
        console.log(roleOfUser);
        if (roles.includes(roleOfUser)) {
          next();
        } else {
          throw Error("ban khong co quyen");
        }
      } catch (error) {
        next(error);
      }
    };
  },
};
