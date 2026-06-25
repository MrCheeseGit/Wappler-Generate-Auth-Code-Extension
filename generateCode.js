/**
 * generateCode.js — random verification / auth codes for Wappler Server Connect (Node).
 * Uses crypto.randomInt for unpredictable codes (not Math.random).
 */

const crypto = require('crypto');

const CHARSETS = {
    numeric: '0123456789',
    alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    alphanumeric_mixed: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
};

const MIN_LENGTH = 4;
const MAX_LENGTH = 64;
const DEFAULT_LENGTH = 6;
const DEFAULT_TYPE = 'numeric';

/**
 * @param {unknown} raw
 * @returns {number}
 */
function clampLength(raw) {
    const n = parseInt(String(raw), 10);
    if (!Number.isFinite(n)) return DEFAULT_LENGTH;
    return Math.min(MAX_LENGTH, Math.max(MIN_LENGTH, n));
}

/**
 * @param {string} type
 * @returns {string}
 */
function resolveCharset(type) {
    return CHARSETS[type] || CHARSETS[DEFAULT_TYPE];
}

/**
 * @param {object} options
 * @param {number|string} [options.length]
 * @param {string} [options.type] numeric | alphanumeric | alphanumeric_mixed
 * @returns {{ code: string }}
 */
exports.generate = function (options) {
    const length = clampLength(this.parseOptional(options.length, '*', String(DEFAULT_LENGTH)));
    const type = this.parseOptional(options.type, 'string', DEFAULT_TYPE);
    const charset = resolveCharset(type);

    let code = '';
    for (let i = 0; i < length; i++) {
        code += charset.charAt(crypto.randomInt(0, charset.length));
    }

    return { code };
};

exports._clampLength = clampLength;
exports._resolveCharset = resolveCharset;
