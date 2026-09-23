# Matrix Audit

## Ubuntu + Node 22

- OS: Ubuntu
- Node version: 22
- Failed step: Run npm test
- Error: `TypeError: crypto.createCipher is not a function`
- Failure type: Runtime version incompatibility
- Fix: Replaced deprecated `crypto.createCipher()` / `crypto.createDecipher()` with `createCipheriv()` / `createDecipheriv()` using an explicit key and IV.

## Windows + Node 18

- OS: Windows
- Node version: 18
- Failed step: Run npm test
- Failure type: OS-specific
- Fix: Made file paths cross-platform with `path.join()` and normalized Windows line endings.

## Windows + Node 20

- OS: Windows
- Node version: 20
- Failed step: Run npm test
- Error: Expected `\n` line endings but received Windows `\r\n` line endings.
- Failure type: OS-specific
- Fix: Normalized `\r\n` to `\n` when reading text files and replaced manual path concatenation with `path.join()`.

## Windows + Node 22

- OS: Windows
- Node version: 22
- Failed step: Run npm test
- Failure type: OS-specific
- Fix: Applied the cross-platform file path and line-ending fixes. Node 22 also required the crypto API compatibility fix documented above.