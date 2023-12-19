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

function decryptRequestData(req, res, next) {
  const encryptedData = req.body.encryptedRequestBody;
  const key = Buffer.from(KEY, "base64");
  const iv = Buffer.from(IV, "base64");

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
  decryptedData += decipher.final("utf-8");

  req.body = JSON.parse(decryptedData);
  next();
}

function sendEncryptedResponse(req, res) {
  res.json(res.locals.encryptedResponse);
}
module.exports = {
  encryptResponseData,
  sendEncryptedResponse,
  decryptRequestData,
};
