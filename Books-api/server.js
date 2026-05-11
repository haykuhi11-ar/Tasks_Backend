const http = require('node:http');
const url = require("node:url");
const fs = require("node:fs");


let books = [];

try {
    const data = fs.readFileSync('./books.json', 'utf-8');
    books = JSON.parse(data);
} catch {
    books = [];
}

function getIdFromUrl(url) {
    const parts = url.split('/');
    return parseInt(parts[2]);
}

function saveInFile() {
    fs.writeFileSync("./books.json", JSON.stringify(books, null, 2));
}

function log(req, statusCode) {
    console.log(`
        [${new Date().toDateString()}] ${req.method} ${req.url} => ${statusCode}
        `);
}

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'application/json');

//---------------GET-----------------

        const parseUrl = url.parse(req.url, true);
        const query = parseUrl.query;
        const pathname = parseUrl.pathname;
    
        if (req.method === 'GET' && pathname ==='/books') {

            let result = [...books];

            if (query.author) {
                result = result.filter(book => 
                    book.author === query.author
                );
            }

            if (query.title) {
                result = result.filter(book => 
                    book.title === query.title
                );
            }

            if (query.year) {
                result = result.filter(book => 
                    book.year === query.year
                );
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(result));
            log(req, 200);
            return;
        }
        if (req.method === 'GET' && req.url.startsWith('/books/')) {
            const id = getIdFromUrl(req.url);
            const book = books.find(b => b.id === id);

            try {
                if (book) {

                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(book));
                    log(req, 200);
                    return;
                }
            } catch {
                res.writeHead(404);
                res.end(JSON.stringify({
                    error: "Resource not found (wrong id)"
                }));
                log(req, 404);
                return;
            }
        }

//--------------POST------------------        

        if (req.method === 'POST' && req.url === '/books') {
            let body = '';

            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                try{
                    const data = JSON.parse(body);
                    if (!data.title) {
                        res.writeHead(400, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({
                            error: 'Title is required'
                        }));
                        log(req, 400);
                        return;
                    }
                    if (!data.author) {
                        res.writeHead(400, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({
                            error: 'Author is required'
                        }));
                        log(req, 400);
                    }
                    const newBook = {
                        id: books.length > 0
                            ? Math.max(...books.map(book => book.id)) + 1
                            : 1,
                        ...data
                    };
                    books.push(newBook);
                    saveInFile();

                    res.writeHead(201, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(newBook));
                    log(req, 201);
                    return;

                } catch {
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({
                        error: 'Invalid JSON'
                    }));
                    log(req, 400);
                    return;
                }
            });
            return;
        }

//--------------PUT------------------        

        if (req.method === 'PUT' && req.url.startsWith('/books/')) {
            const id = getIdFromUrl(req.url);

            let body = '';

            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                try {
                    const newBook = JSON.parse(body);

                    if (!newBook.title) {
                        res.writeHead(400);
                        res.end(JSON.stringify({
                            error: 'Title is required'
                        }));
                        log(req, 400);
                        return;
                    }
                    if (!newBook.author) {
                        res.writeHead(400);
                        res.end(JSON.stringify({
                            error: 'Author is required'
                        }));
                        log(req, 400);
                        return;
                    }
                    if (!newBook.year) {
                        res.writeHead(400);
                        res.end(JSON.stringify({
                            error: 'Year is required'
                        }));
                        log(req, 400);
                        return;
                    }
                    const bookIdx = books.findIndex(book => book.id === id);
                    if (books[bookIdx]) {
                    books[bookIdx] = {id, ...newBook};
                    saveInFile();

                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(newBook));
                    log(req, 200);
                    return;
                    
                    }
                } catch {
                    res.writeHead(404);
                    res.end(JSON.stringify({
                        error: "Resource not found (wrong id)"
                    }));
                    log(req, 404);
                    return;
                }
            });
        }

//--------------PATCH------------------        

        if (req.method === 'PATCH' && req.url.startsWith("/books/")) {
            const id = getIdFromUrl(req.url);

            let body = '';
            req.on("data", chunk => body += chunk);
            req.on("end", () => {
                try {
                    const data = JSON.parse(body);
                    const book = books.find(b => b.id === id);

                    if (book) {
                        Object.assign(book, data);
                        saveInFile();

                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify(data));
                        log(req, 200);
                    }
                } catch {
                    res.writeHead(404);
                    res.end(JSON.stringify({
                        error: "Resource not found (wrong id)"
                    }));
                    log(req, 404);
                    return;
                }
            });
            return;
        }

//--------------DELETE------------------        

        if (req.method === 'DELETE' && req.url.startsWith('/books/')) {
            const id = getIdFromUrl(req.url);

            try {
                const book = books.find(book => book.id === id);
                if (book) {
                    books = books.filter( book => 
                        book.id !== id 
                    );
                    saveInFile();

                    res.writeHead(204);
                    res.end();
                    log(req, 204);
                    return;
                }
            } catch {
                res.writeHead(404);
                res.end(JSON.stringify({
                    error: "Resource not found (wrong id)"
                }));
                log(req, 404);
                return;
            }
        }

//--------------OPTIONS------------------        

        if (req.method === 'OPTIONS' && req.url === '/books') {
            res.writeHead(204, { Allow: "GET, POST, PUT, PATCH, DELETE, OPTIONS" });
            res.end();
            log(req, 204);
            return;
        }

//--------------FALLBACK------------------        

        res.writeHead(404);
        res.end(JSON.stringify({
            error: "Route not found"
        }));
        log(req, 404);
        return;
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
