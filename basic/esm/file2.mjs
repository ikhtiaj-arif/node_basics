//? when importing from default export no need to destructure the import
// import a from './file1.mjs'
// console.log(a);

//* when importing from normal export, need to destructure the import
import {a as value} from './file1.mjs'
console.log(value);