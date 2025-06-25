// utils/openExchange.js
const axios = require("axios");
const API_URL = "https://openexchangerates.org/api/latest.json";

async function convertCurrency(base = "USD", target = "EUR") {
  const res = await axios.get(API_URL, {
    params: {
      app_id: process.env.OXR_KEY,
      base, // optional in paid plans, default is USD
      symbols: target,
    },
  });

  const rate = res.data.rates[target];
  return {
    pair: `${base}${target}`,
    rate,
    base,
    target,
  };
}

module.exports = { convertCurrency };
