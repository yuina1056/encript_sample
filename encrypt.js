const crypto = require('crypto');

const ENCRYPTION_KEY = "HH95XH7sYAbznRBJSUE9W8RQxzQIGSpy" // 32Byte. このまま利用しないこと！
const ENCODING = "hex" // 暗号化時のencoding

const raw = 'a' // 暗号化する対象。stringなら何でも。

let iv

function getEncryptedString(raw) {
  iv = Buffer.from(crypto.randomBytes(16))
  let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv)
  let encrypted = cipher.update(raw)

  encrypted = Buffer.concat([encrypted, cipher.final()])

  console.log(iv.toString("hex"))
  console.log(encrypted.toString("hex"))
  return encrypted.toString("hex")
}

function getDecryptedString(encrypted,iv) {
  let encryptedText = Buffer.from(encrypted, "hex")
  let ivtext = Buffer.from(iv, "hex")
  let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), ivtext)
  let decrypted = decipher.update(encryptedText)

  decrypted = Buffer.concat([decrypted, decipher.final()])

  return decrypted.toString()
}

// 以下は試してみてるだけ

console.log(`raw: ${raw}`)

const encrypted = getEncryptedString(raw)

console.log(`encrypted: ${encrypted}`)

const decrypted = getDecryptedString(encrypted, iv)

console.log(`decrypted: ${decrypted}`)
