const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 * 10, checkperiod: 60 * 11 });

module.exports = cache;
