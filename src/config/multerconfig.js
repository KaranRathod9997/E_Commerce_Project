const multer = require("multer");

const upload = multer({dest:"public/images"})
// const upload = multer()

module.exports = upload