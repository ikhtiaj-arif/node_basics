
const { a: x } = require("./index2"); // distructure and rename
const { a: y } = require("./file3");

// const add = require('./utils/add.js')
const {f1:add} = require('./utils')
const {f2:sub} = require('./utils')

console.log(add(x,y));
console.log(sub(x,y));
console.log(x,y);
