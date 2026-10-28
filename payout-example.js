// payout-example.js
import { formatXof, formatSats, xofToSats } from "./src/fcfa.js";

// The rate is the current BTC price in FCFA per bitcoin.
// You can get it from a price API (CoinGecko, Bitnob, etc.).
const rate = 62_000_000; // FCFA per bitcoin (example rate)
const amountXof = 10_000; // amount received in FCFA

const sats = xofToSats(amountXof, rate);
console.log(`You received ${formatSats(sats)} (${formatXof(amountXof)})`);
