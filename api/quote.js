const { randomUUID } = require('node:crypto');
const catalog = require('../lib/quote-catalog.json');

module.exports = function createQuote(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Use POST to prepare a quote.' });
  }

  const items = req.body?.items;
  if (!Array.isArray(items) || items.length < 1 || items.length > Object.keys(catalog).length) {
    return res.status(400).json({ error: 'Add at least one catalogue item to your cart.' });
  }

  const seen = new Set();
  const lines = [];
  for (const item of items) {
    const { id, quantity } = item ?? {};
    if (typeof id !== 'string' || !Object.hasOwn(catalog, id) || seen.has(id) ||
        !Number.isInteger(quantity) || quantity < 1 || quantity > 999) {
      return res.status(400).json({ error: 'Check your product selections and quantities (1–999).' });
    }
    seen.add(id);
    lines.push(`• ${catalog[id]} — ${quantity}`);
  }

  const reference = randomUUID().slice(0, 8).toUpperCase();
  const message = [
    `Hello Gauri & Sons, please quote for these items. Reference ${reference}.`,
    ...lines,
    '',
    'Please confirm pack sizes, availability, taxes and delivery.'
  ].join('\n');
  const whatsapp = new URL('https://wa.me/918826750844');
  whatsapp.searchParams.set('text', message);
  return res.status(200).json({ url: whatsapp.href });
};
