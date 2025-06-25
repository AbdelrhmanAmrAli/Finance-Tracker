const { convertCurrency } = require('../utils/openExchange');

exports.getConversion = async (req, res) => {
  const { base = "USD", target = "EUR", amount = 1 } = req.query;

  if (!base || !target) {
    return res.status(400).json({ message: 'Missing base or target currency' });
  }

  try {
    const data = await convertCurrency(base, target);
    const converted = Number(amount) * data.rate;
    res.json({ ...data, amount: Number(amount), converted });
  } catch (err) {
    console.error('Conversion error:', err);
    res.status(500).json({ message: 'Conversion failed' });
  }
};
