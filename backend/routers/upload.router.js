const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer.middleware");
const controller = require("../controllers/upload.controller");

router.post("/", upload.single("file"), controller.upload);

module.exports = router;
