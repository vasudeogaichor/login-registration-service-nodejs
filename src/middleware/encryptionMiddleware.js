const crypto = require("crypto");

function encryptResponseData(req, res, next) {
  const json = res.locals.json;
  console.log("json - ", json);
  const key = crypto.randomBytes(32);
  console.log("key - ", key);
  const iv = crypto.randomBytes(16); // Initialization Vector
  console.log("iv - ", iv);

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encryptedData = cipher.update(JSON.stringify(json), "utf-8", "hex");
  console.log("encryptedData - ", encryptedData);
  encryptedData += cipher.final("hex");
  console.log("encryptedData - ", encryptedData);
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
