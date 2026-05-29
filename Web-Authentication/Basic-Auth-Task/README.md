# Basic Auth Task

## Overview
This project is a simple **Node.js + Express** server that demonstrates HTTP Basic 

Authentication.  

It includes:
- A public route accessible without credentials.
- Two protected routes that require valid username and password.

---

## Setup & Run
1. Install dependencies:
   ```bash
   npm install

2. Start the server:
    ```bash
    node server.js

3. The server runs at:
    ```bash
    http://localhost:3000


## Users

Hardcoded users are defined in the server:

    alice / pass123

    bob / abc-pass

    charlie / pass-abc


## Routes

    Public: /home

    Protected (welcome): /welcome

    Protected (items): /items


## Example curl Requests

Public route
 
 ```bash

    curl http://localhost:3000/home
```

Response:

```bash

    This is a public route
```

## Authentication Flow

1. Client sends Authorization header
2. Server decodes Base64 credentials
3. Middleware checks username and password
4. If credentials are valid:
   - Access is granted
5. If credentials are invalid:
   - Server responds with status 401
   - `WWW-Authenticate` header is sent


## Reflection Questions

### Why is Base64 not considered a security measure?

Base64 is only an encoding method, not encryption.

Anyone can easily decode Base64 data back into plain text. Because of this, usernames and passwords encoded with Base64 are not secure without HTTPS.

---

### What is the purpose of the WWW-Authenticate header?

The `WWW-Authenticate` header tells the browser that authentication is required.

Browsers use this header to display the login popup window for entering username and password.

Example:

```http
WWW-Authenticate: Basic realm="Protected Area"
```

---

### In what real-world situations is Basic Auth still acceptable?

Basic Auth is still acceptable in simple or internal systems, such as:

- Internal company tools
- Development environments
- Testing APIs
- Small admin panels
- Services protected with HTTPS

However, for modern production applications, token-based authentication is usually preferred.


