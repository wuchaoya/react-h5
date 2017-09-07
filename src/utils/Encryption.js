/**
 * Created by chao on 2017/9/5.
 */
import CryptoJS from 'crypto-js';

class Encryption {

  static encryptFun (data) {
    let key = CryptoJS.enc.Latin1.parse('IYnGgQe8jDfADSFWDbEWzdPDMEnsdDuI');
    let iv = CryptoJS.enc.Latin1.parse('XYgGnQE2jDFADSXF');
    // 加密
    let encrypted = CryptoJS.AES.encrypt(
      data,
      key,
      {
        iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7
      });
    // 解密
    // var decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding });
    // console.log('decrypted: ' + decrypted.toString(CryptoJS.enc.Utf8) + '    --->    ' + 'encrypted: ' + encrypted);
    return encrypted.toString();
  }

}

export default Encryption;
