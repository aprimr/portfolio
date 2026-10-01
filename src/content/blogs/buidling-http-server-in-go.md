---
{
  "id": "building-http-server-in-go",
  "enabled": true,
  "title": "Building a HTTP web server in Go",
  "description": "A practical step-by-step guide to build a basic HTTP web server from scratch in Go using the net/http standard library.",
  "tags": ["Go", "Web Server", "Backend"],
  "createdAt": "2026-08-16"
}
---

![Gopher](https://miro.medium.com/v2/1*SlJ48yFmyNeMW-TvxyTKlw.png)

# What is a web server?
A web server is a combination of software and a computer system which accepts requests from clients or other servers, processes those requests, can interact with the databases, and sends back a proper response.

![WebServer](https://www.datocms-assets.com/22695/1751327200-1732028491-a-web-server-processes-requests-between-client-and-server.webp)

# Why Go for a web server?
Unlike many other languages where you need to learn complex frameworks like Express or Django. Go provides a production ready http server at the start using its [net/http](https://pkg.go.dev/net/http) standard library. Also Go was designed for fast and concurrent system from the begining of its development so it can handle thousands of requests easily.

# Your first web server in Go 
Go makes it very easy to build a web server. As we already discussed we don't need a heavy framework, Go's standard library already provides everything we need.

## Setting up
Before we start setting up our web server, make sure you have **Go** installed on your machine (check with `go version` in your terminal)

Let's create a new folder and setup our Go server.
```bash 
mkdir web-server
cd web-server
go mod init github.com/<username>/<project-name>
```
Then create a file named `main.go`. This is the entry point for our server.

## Creating the server
Here is a simple working HTTP server that returns a response message.

`main.go`
```
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func handleHello(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode("Hello World")
}

func handleHome(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode("I am a GO server")
}

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/", handleHome)
	mux.HandleFunc("/hello", handleHello)

	fmt.Println("Server starting on port 3000...")
	err := http.ListenAndServe(":3000", mux)
	if err != nil {
		log.Fatalf("Failed to start server %v", err)
	}
}
```

### Code Breakdown
- `http.NewServeMux()`: Creates a router (mux) to direct incoming traffic to the correct handler function based on the URL path.

- `http.ResponseWriter`: Used to write the response data back to the client.

- `http.Request`: Contains all the information about the incoming request (URL, method, headers, parameters, body, etc.).

- `http.ListenAndServe(":3000", mux)`: This starts our server on port 3000 and tells it to listen for incoming traffic using our router.

Open up the terminal and start the server by:
```
go run main.go
```

Now, open the browser and test these endpoints:

1. Go to [`http://localhost:3000`](http://localhost:3000). You will see "I am a Go server" message.
2. Go to [`http://localhost:3000/hello`](http://localhost:3000/hello). You will see "Hello World" message.

This is the simplest form a web server, it only handles `GET` requests for now. But we can upgrade it anytime to handle more request methods, return more properly formatted responses, and send back correct status codes.

# Conclusion
And that is it, we have just built a our HTTP server in Go using GO standard `net/http` library. It's a good example of how simple, clean and powerful Go is for backend things.