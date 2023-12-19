const express = require("express");
const router = express.Router();
const { postControllers } = require("../controllers");
const { encryptResponseData, sendEncryptedResponse,decryptRequestData } = require("../middleware/encryptionMiddleware")

router.post("/", decryptRequestData, postControllers.postCreate, encryptResponseData, sendEncryptedResponse);
router.get("/", postControllers.postList, encryptResponseData, sendEncryptedResponse);
router.get("/:postId", postControllers.postGet, encryptResponseData, sendEncryptedResponse);
router.put("/:postId", decryptRequestData, postControllers.postUpdate, encryptResponseData, sendEncryptedResponse);
router.delete("/:postId", postControllers.postDelete);

router.post("/:postId/likes", decryptRequestData, postControllers.handleLikes, encryptResponseData, sendEncryptedResponse)
router.post("/:postId/comments", decryptRequestData, postControllers.handleComments, encryptResponseData, sendEncryptedResponse)

module.exports = router;
