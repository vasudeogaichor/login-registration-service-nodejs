const express = require("express");
const router = express.Router();
const { postControllers } = require("../controllers");

router.post("/", postControllers.postCreate);
router.get("/", postControllers.postList);
router.get("/:postId", postControllers.postGet);
router.put("/:postId", postControllers.postUpdate);
router.delete("/:postId", postControllers.postDelete);

module.exports = router;
