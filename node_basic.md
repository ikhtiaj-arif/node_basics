# 🚀 Node.js Fundamentals Guide

<p align="center">
  <img src="https://nodejs.org/static/images/logo.svg" width="180" alt="Node.js Logo"/>
</p>

<p align="center">
  A beginner-friendly yet deep explanation of important Node.js concepts <br/>
  explained with visualization, analogies, and practical examples.
</p>

---

# 📚 Table of Contents

- [What is Node.js?](#-1-what-is-nodejs)
- [Why Node.js Became Popular](#-2-why-nodejs-became-popular)
- [Process vs Thread](#-3-process-vs-thread)
- [Single Thread vs Multi Thread](#-4-single-thread-vs-multi-thread)
- [How Node.js Handles Multiple Requests](#-5-how-nodejs-handles-multiple-requests)
- [Event Driven Architecture](#-6-event-driven-architecture)
- [Event Loop](#-7-event-loop)
- [IIFE](#-8-iife-immediately-invoked-function-expression)
- [Module System](#-9-module-system-in-nodejs)
- [CommonJS Modules](#-10-commonjs-modules)
- [ES Modules (ESM)](#-11-es-modules-esm)
- [Why We Use `.mjs`](#-12-why-we-use-mjs)
- [export vs export default](#-13-export-vs-export-default)
- [Types of Modules](#-14-types-of-modules)
- [Streams](#-15-streams)
- [Buffers](#-16-buffers)
- [Name Alias](#-17-name-alias)
- [Global Objects](#-18-global-objects)
- [Async Programming](#-19-async-programming-in-nodejs)
- [Callback Queue & Microtask Queue](#-20-callback-queue--microtask-queue)
- [Final Mental Model](#-21-final-mental-model-of-nodejs)

---

# 🟢 1. What is Node.js?

Node.js is a **JavaScript runtime** built on Chrome's **V8 Engine**.

Normally JavaScript runs inside the browser.

Node.js allows JavaScript to run:

✅ On servers  
✅ On backend applications  
✅ On APIs  
✅ On CLI tools  
✅ On databases and file systems

---

## 🧠 Mental Model

```txt
Browser JavaScript → Frontend

Node.js JavaScript → Backend
```

---

# ⚡ 2. Why Node.js Became Popular

Before Node.js:

| Frontend | Backend |
|---|---|
| JavaScript | PHP / Java / Python / C# |

After Node.js:

```txt
JavaScript Everywhere 🚀
```

---

## 🔥 Biggest Advantages

### ✅ Fast

Powered by Google's V8 Engine.

---

### ✅ Non-blocking

Can handle thousands of requests efficiently.

---

### ✅ Event-driven

Works based on events and callbacks.

---

### ✅ Huge Ecosystem

Millions of npm packages available.

---

# 🧵 3. Process vs Thread

This is one of the MOST important concepts.

---

# 🖥️ Process

A process is an independent running program.

Examples:

- Chrome
- VS Code
- Spotify

Each process has:

- Separate memory
- Separate resources
- Separate execution environment

---

# 🧠 Thread

A thread is a worker inside a process.

---

## 🍴 Restaurant Analogy

```txt
Restaurant = Process
Workers = Threads
```

---

# 📌 Visualization

```txt
PROCESS
 ├── Thread 1
 ├── Thread 2
 └── Thread 3
```

---

# ⚔️ 4. Single Thread vs Multi Thread

# 🔹 Single Thread

One worker handles tasks one by one.

```txt
Task A
Task B
Task C
```

---

# 🔹 Multi Thread

Multiple workers handle tasks simultaneously.

```txt
Thread 1 → Task A
Thread 2 → Task B
Thread 3 → Task C
```

---

# ⚠️ Important Confusion

People say:

> "Node.js is single-threaded"

This is only partially true.

---

# ✅ Actual Truth

JavaScript execution is single-threaded.

BUT internally Node.js uses:

- Thread Pool
- OS Threads
- Background Workers

---

# 🌍 5. How Node.js Handles Multiple Requests

This is one of the most important interview questions.

---

# 🤔 The Confusion

If Node.js uses one thread...

How does it handle thousands of users?

---

# 🔥 The Secret

Node.js does NOT wait for slow operations.

Instead it delegates them.

---

# 📌 Example

```txt
User 1 → File Read
User 2 → Database Query
User 3 → API Call
```

Node.js sends these tasks to:

- OS
- Networking system
- Thread pool

Then continues handling new requests.

---

# 🔄 Flow Visualization

```txt
Incoming Request
       ↓
   Event Loop
       ↓
Background Worker
       ↓
 Callback Queue
       ↓
 Main Thread Executes
```

---

# 🎯 Key Point

Node.js is:

✅ Single-threaded for JavaScript execution  
✅ Multi-threaded under the hood

---

# 📡 6. Event Driven Architecture

Node.js heavily relies on events.

---

# 🚪 Real Life Example

```txt
Door Bell Rings
       ↓
Someone Responds
```

Bell ringing = Event

Response = Event Handler

---

# 🧪 Example

```js
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("greet", () => {
  console.log("Hello!");
});

emitter.emit("greet");
```

---

# 🔄 Flow

```txt
Event Happens
      ↓
Listener Detects Event
      ↓
Callback Executes
```

---

# 🔁 7. Event Loop

The Event Loop is the heart of Node.js.

It continuously checks:

```txt
"Is any async task completed?"
```

---

# 📌 Visualization

```txt
Call Stack
    ↓
Event Loop
    ↓
Callback Queue
```

---

# 🧠 Mental Model

Imagine a manager repeatedly asking:

```txt
"Any completed task?"
"Any completed task?"
"Any completed task?"
```

That manager = Event Loop

---

# 🧪 Example

```js
console.log("Start");

setTimeout(() => {
  console.log("Timer Done");
}, 0);

console.log("End");
```

---

# 📤 Output

```txt
Start
End
Timer Done
```

---

# ❓ Why?

Because:

- `setTimeout` is async
- Callback goes to queue
- Event loop executes later

---

# ⚡ 8. IIFE (Immediately Invoked Function Expression)

An IIFE runs immediately after creation.

---

# 🧪 Syntax

```js
(function () {
  console.log("Runs immediately");
})();
```

---

# 🤔 Why Use IIFE?

Before modern modules, IIFE was used for:

- Private variables
- Avoiding global pollution
- Isolated scope

---

# 🔄 Visualization

```txt
Create Function
      ↓
Immediately Execute
```

---

# 📦 9. Module System in Node.js

Large applications are divided into small reusable files/modules.

---

# ❌ Without Modules

```txt
One giant file 😵
```

Hard to maintain.

---

# ✅ With Modules

```txt
auth.js
db.js
server.js
utils.js
```

Much cleaner.

---

# 📚 Types of Module Systems

1. CommonJS
2. ES Modules (ESM)

---

# 🧱 10. CommonJS Modules

Older/default Node.js module system.

Uses:

- `require`
- `module.exports`

---

# 📤 Export

```js
// math.js

function add(a, b) {
  return a + b;
}

module.exports = add;
```

---

# 📥 Import

```js
const add = require("./math");

console.log(add(2, 3));
```

---

# 🧠 Mental Model

```txt
require()
    ↓
Loads File
    ↓
Gets Exported Value
```

---

# ⚡ 11. ES Modules (ESM)

Modern JavaScript module system.

Uses:

- `import`
- `export`

---

# 📤 Export

```js
// math.mjs

export function add(a, b) {
  return a + b;
}
```

---

# 📥 Import

```js
import { add } from "./math.mjs";

console.log(add(2, 3));
```

---

# ✅ Advantages of ESM

- Cleaner syntax
- Standardized
- Better optimization
- Tree shaking

---

# 📄 12. Why We Use `.mjs`

Node.js originally understood only CommonJS.

To tell Node.js:

> "This file uses ES Modules"

we used:

```txt
.mjs
```

---

# 📌 Example

```txt
app.mjs
math.mjs
```

---

# ✅ Alternative Modern Way

Inside `package.json`

```json
{
  "type": "module"
}
```

Then `.js` files behave like ESM.

---

# ⚔️ CommonJS vs ESM

| CommonJS | ESM |
|---|---|
| require | import |
| module.exports | export |
| Older | Modern |
| Synchronous | Better optimization |

---

# 🎯 13. export vs export default

This confuses many beginners.

---

# 🔹 Named Export

```js
export const name = "Arif";
export const age = 25;
```

Import:

```js
import { name, age } from "./user.js";
```

Must use exact names.

---

# 🔹 Default Export

```js
export default function greet() {
  console.log("Hello");
}
```

Import:

```js
import anythingName from "./user.js";
```

You can choose any name.

---

# 🧠 Visualization

## Named Export

```txt
Box labeled "name"
Box labeled "age"
```

Must use labels.

---

## Default Export

```txt
One main box 📦
```

You choose the variable name.

---

# 🧩 14. Types of Modules

---

# 🏠 Local Module

Modules you create yourself.

```txt
auth.js
db.js
utils.js
```

---

# 🛠️ Built-in Module

Modules provided by Node.js.

Examples:

- fs
- path
- http
- os

---

# 📦 Third-party Module

Installed from npm.

```bash
npm install express
```

Example:

```js
const express = require("express");
```

---

# 🌊 15. Streams

Streams process data piece by piece instead of loading everything at once.

---

# ❌ Without Streams

```txt
Load entire 2GB file into memory 😵
```

---

# ✅ With Streams

```txt
Read small chunks continuously 🚀
```

---

# 🌊 Visualization

## Without Stream

```txt
[ Entire Ocean At Once 🌊 ]
```

---

## With Stream

```txt
[ Small Buckets of Water 🪣 ]
```

---

# 🧪 Example

```js
const fs = require("fs");

const stream = fs.createReadStream("bigfile.txt");

stream.on("data", (chunk) => {
  console.log(chunk);
});
```

---

# 📦 16. Buffers

Buffers temporarily store binary data.

---

# 🤔 Why Buffers?

Computers understand binary:

```txt
0101010101
```

When streaming/networking happens, Node.js uses buffers internally.

---

# 📌 Visualization

```txt
Incoming Data
      ↓
Stored Temporarily in Buffer
      ↓
Processed
```

---

# 🧪 Example

```js
const buffer = Buffer.from("Hello");

console.log(buffer);
```

---

# 🏷️ 17. Name Alias

Alias means renaming during import/export.

---

# 🧪 Example

```js
import { add as sum } from "./math.js";

console.log(sum(2, 3));
```

---

# 🤔 Why Useful?

- Avoid naming conflicts
- Improve readability

---

# 🌍 18. Global Objects

Node.js provides some objects globally.

Examples:

- console
- process
- Buffer
- setTimeout

---

# 🧪 Example

```js
console.log(process.platform);
```

---

# ⚡ 19. Async Programming in Node.js

Node.js is built around asynchronous programming.

---

# 🔹 Synchronous

```txt
Wait → Finish → Next Task
```

---

# 🔹 Asynchronous

```txt
Start Task
Continue Other Work
Come Back Later
```

---

# 🧪 Example

```js
setTimeout(() => {
  console.log("Done");
}, 2000);

console.log("Running...");
```

---

# 📤 Output

```txt
Running...
Done
```

---

# 🧠 Async Tools

- Callbacks
- Promises
- async/await

---

# 🧠 20. Callback Queue & Microtask Queue

Advanced Event Loop concept.

---

# 📦 Callback Queue

Stores:

- setTimeout
- setInterval

---

# ⚡ Microtask Queue

Higher priority queue.

Stores:

- Promise callbacks
- queueMicrotask()

---

# 🔄 Visualization

```txt
Call Stack Empty?
       ↓
Microtask Queue First
       ↓
Callback Queue Later
```

---

# 🧪 Example

```js
console.log("1");

setTimeout(() => console.log("2"));

Promise.resolve().then(() => console.log("3"));

console.log("4");
```

---

# 📤 Output

```txt
1
4
3
2
```

---

# 🧠 Why?

Promise callbacks run before timer callbacks.

---

# 🧠 21. Final Mental Model of Node.js

---

# 🔥 Complete Visualization

```txt
                 Node.js
                     ↓
          Single JavaScript Thread
                     ↓
                Event Loop
                     ↓
        Async Tasks Sent to Background
       (OS / Thread Pool / Network)
                     ↓
            Completed Tasks Return
                     ↓
              Callback Queue
                     ↓
            Main Thread Executes
```

---

# 🎯 One Sentence Summary

Node.js achieves high performance not by using many JavaScript threads, but by using:

✅ Non-blocking I/O  
✅ Event Loop  
✅ Async Operations  
✅ Background Workers

---

# 📌 Recommended Next Topics

After mastering these, learn:

- Express.js
- REST APIs
- Middleware
- Authentication
- JWT
- WebSockets
- Worker Threads
- Redis
- Clustering
- Scaling Node.js Apps

---

# 🚀 Final Advice

Do not memorize Node.js mechanically.

Instead visualize:

- Event Loop spinning continuously
- Async tasks going outside Node.js
- Callbacks returning later
- Streams flowing like water
- Buffers acting like temporary containers

Once you visualize the flow, Node.js becomes MUCH easier to understand.

---

<p align="center">
  ⭐ If this helped you, consider giving the repository a star.
</p>