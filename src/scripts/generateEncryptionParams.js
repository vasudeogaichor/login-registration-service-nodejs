const crypto = require('crypto');

// Generate a secure 256-bit (32-byte) key
const encryptionKey = crypto.randomBytes(32);

// Generate a secure 16-byte IV for AES-CBC
const iv = crypto.randomBytes(16);

// Print the base64-encoded key and IV (for storage or transmission)
console.log('Key:', encryptionKey.toString('base64'));
console.log('IV:', iv.toString('base64'));