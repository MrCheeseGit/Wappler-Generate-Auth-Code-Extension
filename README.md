# Generate Auth Code (Wappler Server Connect)


**Cryptographically random verification codes** for Wappler Server Connect (Node): SMS PINs, email tokens, password-reset codes, and similar flows.

[![License: Mr Cheese Extension v1.0](https://img.shields.io/badge/License-Mr%20Cheese%20Extension%20v1.0-blue.svg)](https://www.mrcheese.co.uk/extension-license)
![Wappler](https://img.shields.io/badge/Wappler-Server%20Connect-teal)
![Version](https://img.shields.io/badge/version-1%2E1%2E8-green)

Built by **[Mr Cheese](https://www.mrcheese.co.uk)** · Wappler extensions & custom modules

---

## Why this exists

Registration, login, and verification APIs often need a **random code** stored in the database and sent by SMS or email. Doing that with ad-hoc expressions or weak `Math.random()` logic is easy to get wrong.

This extension adds one Server Connect step that returns `{ code: "..." }` with a charset and length you choose in the UI.

---

## Features

| Capability | Description |
|------------|-------------|
| **Numeric** | Digits only — typical 6-digit SMS PIN |
| **Alphanumeric (uppercase)** | `A–Z` and `0–9` — compact email / reset tokens |
| **Alphanumeric (mixed case)** | `A–Z`, `a–z`, `0–9` — longer tokens with more entropy |
| **Configurable length** | 4–64 characters (default 6); bind length from a prior step or `$_POST` |
| **Secure random** | Node `crypto.randomInt` (not `Math.random`) |
| **No extra npm packages** | Uses built-in Node `crypto` only |

No project-specific connections or tables are baked in.

---

## Requirements

- Wappler project with **Server Connect (Node)**
- Node **≥ 14** (`crypto.randomInt`)

---

## Installation

Official Wappler guide: [How To Install Custom Wappler Extensions](https://docs.wappler.io/t/how-to-install-custom-wappler-extensions/49982/).

| Path | |
|------|--|
| **npm** | Wappler Project Settings → Extensions (`wappler-generate-auth-code`) |
| **Git** | [Extension Installer](https://www.mrcheese.co.uk/extensions/install) or manual copy below |

Git manual copy installs into `extensions/` and `lib/modules/`.

### Git install — Extension Installer (recommended)

This repo ships **`wappler-install.json`** at the root. Use the **[Mr Cheese Extension Installer](https://www.mrcheese.co.uk/extensions/install)** — select **Generate Auth Code**, keep **Use wappler-install.json from the repository** enabled, and run the generated script locally.

### Manual install

Run from your **Wappler project root** (the folder that contains `package.json`). Skip `git clone` if you already have this repo cloned alongside your project.

```bash
git clone https://github.com/MrCheeseGit/Wappler-Generate-Auth-Code-Extension.git ../Wappler-Generate-Auth-Code-Extension

cp ../Wappler-Generate-Auth-Code-Extension/server_connect/modules/generateCode.hjson extensions/server_connect/modules/
cp ../Wappler-Generate-Auth-Code-Extension/server_connect/modules/generateCode.js lib/modules/
```

**Quit Wappler completely and restart** after installing or updating. No additional npm packages are required.

The action appears under **Mr Cheese → Generate Auth Code**.


### npm install (Wappler Project Settings)

1. **Wappler** → Project Settings → Extensions → Add → `wappler-generate-auth-code`
2. From your project root: `npm install`
3. **Quit Wappler completely** and reopen your project.

#### Local `file:` development (optional)

```json
"devDependencies": {
  "wappler-generate-auth-code": "file:../path/to/this-extension"
}
```

After you change extension source, run `npm install` again, then Project Updater if needed, and restart Wappler.

## Quick start

```
Generate Auth Code  →  Database insert / SMS / email step
```

1. Add **Generate Auth Code** to your API.
2. Set **Length** (e.g. `6`) and **Character set** (e.g. *Numeric*).
3. Enable **Output**.
4. In a later step, use `{{yourStepName.code}}` (e.g. `{{authCode.code}}`) in an insert, SMS body, or mail template.
5. Run the API once and **save** so App Connect picks up step `meta`.

---

## Options

| Option | Default | Notes |
|--------|---------|--------|
| **Length** | `6` | Clamped to 4–64 |
| **Character set** | `numeric` | `numeric`, `alphanumeric`, `alphanumeric_mixed` |
| **Output** | on | Return `{ code }` in API response |

### Character sets

| Value | Characters | Typical use |
|-------|------------|-------------|
| `numeric` | `0–9` | SMS OTP / PIN |
| `alphanumeric` | `A–Z`, `0–9` | Email verification, short tokens |
| `alphanumeric_mixed` | `A–Z`, `a–z`, `0–9` | Longer reset or magic-link tokens |

---

## Output

```json
{
  "code": "482913"
}
```

Bind in App Connect: `{{authCode.code}}` (use your step name).

---

## Example flow

1. **Generate Auth Code** → `authCode`
2. **Database insert** — store `{{authCode.code}}` with expiry
3. **ClickSend / mail** — send code to the user
4. **Verify API** — compare user input to stored value

See [examples/](examples/) for generic API fragments.

---

## Works well with ClickSend SMS

Pair this extension with **[ClickSend SMS for Wappler](https://github.com/MrCheeseGit/Wappler-ClickSend-SMS-Extension)** for phone verification in one API:

```
Generate Auth Code  →  ClickSend Send SMS  →  (optional) Database insert
```

1. **Generate Auth Code** — numeric, length `6` → `{{authCode.code}}`
2. **ClickSend Send SMS** — `to` = user mobile, `body` = `Your code is {{authCode.code}}` (leave **From** empty unless registered in ClickSend)
3. Store the code and expiry in your database before or after send, then verify on a separate endpoint

Both extensions use **Mr Cheese** in Server Connect and need no extra npm packages.

---

## Security notes

- Codes are random but **not hashed** — treat like passwords in transit (HTTPS) and store hashed in the database if policy requires it.
- For high-assurance OTP, consider rate limiting and expiry on the verify endpoint (outside this extension).

---

## Compatibility

Pairs with [ClickSend SMS](https://github.com/MrCheeseGit/Wappler-ClickSend-SMS-Extension) for SMS OTP. For shared patterns across Mr Cheese extensions, see [Mr Cheese extension docs](https://github.com/MrCheeseGit/Wappler-Extension-Docs/blob/main/extension-compatibility.md).

## Links

- [ClickSend SMS extension (GitHub)](https://github.com/MrCheeseGit/Wappler-ClickSend-SMS-Extension)
- [Node crypto.randomInt](https://nodejs.org/api/crypto.html#cryptorandomintmin-max-callback)

---

## License

[Mr Cheese Extension License v1.0](https://www.mrcheese.co.uk/extension-license) — see [LICENSE](LICENSE). © [Mr Cheese](https://www.mrcheese.co.uk)
