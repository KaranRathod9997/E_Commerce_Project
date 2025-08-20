const multer = require("multer");
const path = require("path")

// const upload = multer({dest:"public/images"})
// const upload = multer()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "..", "public", "products"))
    },
    filename: (req, file, cb) => {
        const preFix = Date.now() + "-" + Math.ceil(Math.random() * 10000000)
        cb(null, preFix + "_" + file.originalname)
    }
})

const upload = multer({ storage: storage })

module.exports = upload