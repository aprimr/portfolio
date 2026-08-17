---
{
  "id": "writting-a-webserver-in-go",
  "enabled": false,
  "title": "Writting a WebServer in Go",
  "description": "",
  "tags": ["Go", "Backend", "REST APIs"],
  "createdAt": "2026-08-16"
}
---

# What is a web server?
A web server is a program that receives requests from clients (usually browsers or mobile apps) and sends back responses over HTTP/HTTPS.

![WebServer](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWGv5hHUbuvlTgTcdaj2Rneg1SA13roSeRs3035aC-5vC-tWoA7zSJjgQ&s=10)

# Building your first web server in go

Go makes it surprisingly easy to build a web server. You don't need a framework or a long list of dependencies — Go's standard library already provides everything you need.

## The `net/http` Package

The main package we'll use is `net/http`.

Here's a minimal web server:

```go
package main

import (
	"fmt"
	"net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello, World!")
}

func main() {
	http.HandleFunc("/", helloHandler)

	fmt.Println("Server running on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
```

Save it as `main.go` and run:

```bash
go run main.go
```

Open `http://localhost:8080` in your browser and you'll see:

```text
Hello, World!
```

That's a complete web server.

## How Does It Work?

There are three important parts.

First, `http.HandleFunc` registers a route:

```go
http.HandleFunc("/", helloHandler)
```

This tells Go to call `helloHandler` whenever a request comes to `/`.

The handler receives two values:

```go
func helloHandler(w http.ResponseWriter, r *http.Request)
```

`w` is used to send a response, while `r` contains information about the incoming request.

Finally:

```go
http.ListenAndServe(":8080", nil)
```

starts the server on port `8080`.

## Turning It Into an API

We can easily return JSON using Go's standard library:

```go
type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

func usersHandler(w http.ResponseWriter, r *http.Request) {
	users := []User{
		{ID: 1, Name: "Alice"},
		{ID: 2, Name: "Bob"},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}
```

Now `/users` can return data like:

```json
[
  {
    "id": 1,
    "name": "Alice"
  },
  {
    "id": 2,
    "name": "Bob"
  }
]
```

No external web framework is required.


## Final Thoughts

Go's `net/http` package is a great place to start learning backend development.

You can build a working server in minutes, understand exactly what's happening, and add complexity only when your application needs it.

Sometimes, the best way to learn a framework is to first understand what the framework is doing for you.
