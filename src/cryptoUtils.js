const crypto = require('crypto');

function hashValue(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

function deriveKey(key) {
  return crypto.createHash('sha256').update(key).digest();
}

function encryptValue(text, key) {
  const encryptionKey = deriveKey(key);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    encryptionKey,
    iv
  );

  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final()
  ]);

  return Buffer.concat([iv, encrypted]).toString('hex');
}

function decryptValue(encrypted, key) {
  const encryptionKey = deriveKey(key);
  const data = Buffer.from(encrypted, 'hex');

  const iv = data.subarray(0, 16);
  const ciphertext = data.subarray(16);

  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    encryptionKey,
    iv
  );

  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final()
  ]);

  return decrypted.toString('utf8');
}

module.exports = { hashValue, encryptValue, decryptValue };