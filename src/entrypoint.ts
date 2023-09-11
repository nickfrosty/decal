/**
 * Entrypoint for the mobile app
 *
 * it loads all the shims, then kicks out to
 * expo-router to do its magic
 */

import "react-native-url-polyfill/auto";

/**
 * Buffer shim
 */
import { Buffer } from "buffer";
if (typeof global.Buffer == "undefined") {
  global.Buffer = Buffer;
}

/**
 * Polyfill/shims for random numbers and `crypto`
 */
import { getRandomValues as expoCryptoGetRandomValues } from "expo-crypto";

class Crypto {
  getRandomValues = expoCryptoGetRandomValues;
}

const webCrypto = typeof crypto !== "undefined" ? crypto : new Crypto();

(() => {
  if (typeof crypto === "undefined") {
    Object.defineProperty(window, "crypto", {
      configurable: true,
      enumerable: true,
      get: () => webCrypto,
    });
  }
})();

/**
 * always import expo router at the very end
 *
 * this will ensure all the shims are loaded before expo router takes over the app
 */
import "expo-router/entry";
