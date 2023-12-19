const crypto = require("crypto");
const KEY = process.env.ENCRYPT_KEY;
const IV = process.env.ENCRYPT_IV;

function encryptResponseData(req, res, next) {
  const json = res.locals.json;
  const key = Buffer.from(KEY, "base64");
  const iv = Buffer.from(IV, "base64"); // Initialization Vector

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encryptedData = cipher.update(JSON.stringify(json), "utf-8", "hex");
  encryptedData += cipher.final("hex");
  res.locals.encryptedResponse = { encryptedData };
  next();
}

function sendEncryptedResponse(req, res) {
  res.json(res.locals.encryptedResponse);
}
module.exports = {
  encryptResponseData,
  sendEncryptedResponse,
};
