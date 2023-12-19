const express = require("express");
const router = express.Router();
const { postControllers } = require("../controllers");
const { encryptResponseData, sendEncryptedResponse } = require("../middleware/encryptionMiddleware")

router.post("/", postControllers.postCreate, encryptResponseData, sendEncryptedResponse);
router.get("/", postControllers.postList, encryptResponseData, sendEncryptedResponse);
router.get("/:postId", postControllers.postGet, encryptResponseData, sendEncryptedResponse);
router.put("/:postId", postControllers.postUpdate, encryptResponseData, sendEncryptedResponse);
router.delete("/:postId", postControllers.postDelete);

router.post("/:postId/likes", postControllers.handleLikes, encryptResponseData, sendEncryptedResponse)
router.post("/:postId/comments", postControllers.handleComments, encryptResponseData, sendEncryptedResponse)

module.exports = router;
