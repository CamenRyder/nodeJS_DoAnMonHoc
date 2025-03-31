const multer = require("multer");
const path = require("path");

// Cấu hình nơi lưu trữ file upload
const storageAvatar = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/avatar/"); // Lưu file vào thư mục uploads/
  },
  filename: function (req, file, cb) {
    // Đổi tên file để tránh trùng lặp
    cb(null, Date.now() + "_" + path.extname(file.originalname));
  },
});

const storageCatogry = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/category/"); // Lưu file vào thư mục uploads/
  },
  filename: function (req, file, cb) {
    // Đổi tên file để tránh trùng lặp
    cb(null, Date.now() + "_" + path.extname(file.originalname));
  },
});

const storageProduct = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/product/"); // Lưu file vào thư mục uploads/
  },
  filename: function (req, file, cb) {
    // Đổi tên file để tránh trùng lặp
    cb(null, Date.now() + "_" + path.extname(file.originalname));
  },
});

// Kiểm tra loại file (chỉ cho phép ảnh)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg' , 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(new Error('Chỉ chấp nhận file ảnh (jpg, jpeg, png)!'), false);
  }
};
// 

const fileFilterList = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(new Error('Chỉ chấp nhận file ảnh (jpg, jpeg, png)!'), false);
  }
};



// Middleware upload file
const upload = multer({
  storage: storageAvatar,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
});

const uploadAvatarCategory = multer({
  storage: storageCatogry,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hân 5MB
});

const uploadAvatarProduct = multer({
  storage: storageProduct,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hân 5MB
});

module.exports = {
  upload,
  uploadAvatarProduct,
  uploadAvatarCategory,
};
