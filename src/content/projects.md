---
{
  "id": "reportit",
  "enabled": true,
  "order": 1,
  "title": "ReportIt",
  "shortDescription": "A complaint reporting system built to simplify reporting community issues.",
  "stack": ["Go", "Flutter", "PostgreSQL", "JWT"],
  "links": {
    "github": { "url": "https://github.com/aprimr/reportit" },
    "demo": { "url": null },
    "download": { "url": null }
  }
}
---
## Overview

ReportIt makes it easier to report community issues without paperwork and unnecessary hassle. Users can submit a complaint with an image, details, and a location using Google Maps or their device's current location.

## Implementation

Built the backend with Go using a repository, service, and handler architecture, with PostgreSQL as database.

Implemented JWT authentication with access and refresh tokens, refresh token rotation, and role-based authentication and authorization across the backend and mobile application.

## What I Learned

Access and refresh token authentication, refresh token rotation, role-based authorization, and integrating Google Maps and device location in Flutter.

---
{
  "id": "tinypanda-intrepreter",
  "enabled": true,
  "order": 2,
  "title": "TinyPanda Interpreter",
  "shortDescription": "A toy interpreted programming language written in Go.",
  "stack": ["Lexer", "Parser", "Evaluator", "Go lang"],
  "links": {
    "github": { "enabled": true, "url": "https://github.com/aprimr/tinypanda" },
    "demo": { "enabled": true, "url": "https://tinypanda.is-cool.dev/playground" },
    "download": { "enabled": true, "url": "https://tinypanda.is-cool.dev/download" }
  }
}
---
## Overview

TinyPanda is an interpreted programming language written in Go, with support for variables, functions, loops, operators, built-in functions, and multiple data types.

It also includes a web playground where TinyPanda programs can be written and executed directly in the browser.

## Implementation

The interpreter follows the **lexer → parser → AST → evaluator** pipeline.

I extended the language with:

- `for` and `loop` statements
- Increment and decrement operators
- Ternary operators
- Floating-point values
- Escape characters and comments
- Additional built-in functions
- Type conversion, string, math, and time/date utilities

The web playground runs the Go interpreter through **WebAssembly**, allowing programs to be executed directly in the browser.

![TinyPanda playground execution pipeline](https://tinypanda.is-cool.dev/assets/images/playground-arch-79f9dcb29adee2aec3e829df5db333ad.png)

The diagram above shows how a TinyPanda program moves from the playground through the WebAssembly runtime and interpreter before returning the result.

## What I Learned

Working on this helped me understand how lexers, parsers, ASTs, and evaluators work together to execute a program.

I also gained experience extending a language with new syntax and running a Go-based interpreter in the browser using WebAssembly.