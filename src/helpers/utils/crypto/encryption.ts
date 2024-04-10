import crypto from 'crypto';

const { ENCRYPTION_KEY, SECRET_IV, ALGORITHM } = process.env;

if (!ENCRYPTION_KEY || !SECRET_IV || !ALGORITHM) {
  throw new Error('ENCRYPTION_KEY, SECRET_IV, and ALGORITHM are required');
}

const key = crypto.createHash('sha512').update(ENCRYPTION_KEY).digest('hex').slice(0, 32);
const encryptionIV = crypto.createHash('sha512').update(SECRET_IV).digest('hex').slice(0, 16);

export function encryptData(data: any): string {
  const cipher = crypto.createCipheriv(ALGORITHM!, key, encryptionIV);
  const encrypted = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
  return Buffer.from(encrypted, 'hex').toString('base64');
}

export function decryptData(encryptedData: string): string {
  const buff = Buffer.from(encryptedData, 'base64');
  const decipher = crypto.createDecipheriv(ALGORITHM!, key, encryptionIV);
  const decrypted = decipher.update(buff.toString('hex'), 'hex', 'utf8') + decipher.final('utf8');
  return decrypted;
}
