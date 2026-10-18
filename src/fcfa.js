// Small helpers for FCFA (XOF) amounts and Lightning sats. No dependencies.

export const SATS_PER_BTC = 100_000_000;

/** Groups the digits of a whole number by thousands with a space: 25000 → "25 000". */
export function groupThousands(n) {
  if (!Number.isInteger(n)) throw new TypeError(`expected a whole number, got ${n}`);
  const sign = n < 0 ? "-" : "";
  return sign + String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/, " ");
}

/** 25000 → "25 000 FCFA". FCFA has no cents: amounts are whole numbers. */
export function formatXof(amount) {
  return `${groupThousands(amount)} FCFA`;
}

/** 40323 → "40 323 sats". */
export function formatSats(sats) {
  return `${groupThousands(sats)} sats`;
}

/** Reject invalid FCFA-per-bitcoin rates, even when they cannot be stringified. */
function assertValidRate(xofPerBtc) {
  if (!Number.isFinite(xofPerBtc) || xofPerBtc <= 0) {
    let description;
    try {
      description = String(xofPerBtc);
    } catch {
      description = `<unprintable ${typeof xofPerBtc}>`;
    }
    throw new RangeError(`expected a finite positive FCFA per bitcoin rate, got ${description}`);
  }
}

/** FCFA → sats, rounded to the nearest sat. Throws RangeError for an invalid rate. */
export function xofToSats(xof, xofPerBtc) {
  assertValidRate(xofPerBtc);
  return Math.round((xof * SATS_PER_BTC) / xofPerBtc);
}

/** sats → FCFA, rounded to the nearest franc. Throws RangeError for an invalid rate. */
export function satsToXof(sats, xofPerBtc) {
  assertValidRate(xofPerBtc);
  return Math.round((sats * xofPerBtc) / SATS_PER_BTC);
}
