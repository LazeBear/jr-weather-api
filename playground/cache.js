const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 60 * 10, checkperiod: 60 * 11 });

const obj = { my: 'Special', variable: 42 };
// myCache.set('myKey', obj);
// myCache.set('myKey', "updated");
const savedObj = myCache.get('myKey');
console.log(savedObj);
