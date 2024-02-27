const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Routing logic
    let filePath = '.' + req.url + '.html';
    if (filePath === './.html') {
        filePath = './src/index.html';
    } else {
        filePath = './src' + req.url + '.html';
    }

    // Read the HTML file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // If the file is not found, serve 404 page
            if (err.code === 'ENOENT') {
                fs.readFile('./src/404.html', (err, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                // For other errors, send 500 status
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Serve the requested HTML file
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
