# Changelog

## [1.1.0] - 2026-06-05

### Added

- **Mr Cheese** group in Wappler (`groupTitle`, `groupIcon`) for distribution
- **Mixed-case alphanumeric** charset option (`alphanumeric_mixed`)
- **Bindable length** via `serverDataBindings`
- Distribution package: README, LICENSE, examples, `package.json`

### Changed

- **Cryptographic randomness:** `crypto.randomInt` instead of `Math.random`
- **Length bounds:** 4–64 characters (invalid values clamped; default still 6)
- UI title: **Generate Auth Code**; default step base name `authCode`
- British spelling in docs

### Notes

- Module name `generateCode` and action `generate` unchanged for backward compatibility with existing APIs
- `numeric` and `alphanumeric` behave as before (`alphanumeric` = uppercase letters + digits)
