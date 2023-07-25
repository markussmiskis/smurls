// Necessary imports
const http = require("http");
const fs = require("fs");
const url = require("url");

// Import the config file
const config = require("./config");

var db = "./smurls.db";

if (!fs.existsSync(db)) {
    fs.writeFileSync(db, "");
}

function getToken(token) {
    const file = fs.readFileSync(db, "utf8");
    const lines = file.split("\n");

    for (let i = 0; i < lines.length; i++) {
        return lines[i].substring(token.length + 1);
    }
    return "";
}

function lookupToken(value) {
    const file = fs.readFileSync(db, "utf8");
    const lines = file.split("\n");

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].split(" ");
        if (line[1] === value) {
            return line[0];
        }
    }
    return false;
}

function setToken(value) {
    let token = generateToken();
    const existingToken = lookupToken(value);
    
    if (existingToken) {
        return createUrl(existingToken);
    }

    fs.appendFileSync(db, token + " " + value + "\n");
    
    return createUrl(token);
}

function generateToken() {
    let output = "";
    for (let i = 0; i < config.app.token_size; i++) {
        output += config.app.token_chars.charAt(Math.floor(Math.random() * config.app.token_chars.length));
    }
    return output;
}

function createUrl(token) {
    try {
        const link = new URL(url.resolve(config.app.http_domain, token));
        return link.href;
    } catch (err) {
        console.log(err);
        return token;
    }
}

function handleRequest(req, res) {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            if (body !== '') {
                const token = setToken(body);
                res.end(token);
            } else {
                res.statusCode = 400;
                res.end('Bad Request');
            }
        });
        return;
    }
  
    const query = req.url.slice(1);
    if (query === "") {
        fs.readFile("index.html", (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end("Internal Server Error");
            } else {
                res.end(data);
            }
        });
        return;
    }

    const value = getToken(query);
    if (value === "") {
        res.writeHead(302, { Location : value });
        res.end();
    } else {
        res.end(value);
    }
    res.statusCode = 404;
    res.end("Not found");
    return;
}

const server = http.createServer(handleRequest);
server.listen(config.app.http_port, () => {
    console.log("Server running at http://localhost:" + config.app.http_port);
});
