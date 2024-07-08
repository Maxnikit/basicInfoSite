const http = require("http");
const url = require("url");
const fs = require("fs");

const routes = ["/about", "/contact-me"];

http
  .createServer(function (request, response) {
    const q = url.parse(request.url, true);
    const pathName = q.pathname;

    if (pathName === "/") {
      fs.readFile("index.html", (err, data) => {
        if (err) {
          response.writeHead(404, {
            "Content-Type": "text/html",
          });
          return response.end("404 Not found");
        } else {
          response.writeHead(200, {
            "Content-Type": "text/html",
          });
          return response.end(data);
        }
      });
    }
    if (routes.includes(pathName)) {
      fs.readFile(`.${pathName}.html`, (err, data) => {
        if (err) {
          response.writeHead(404, {
            "Content-Type": "text/html",
          });
          return response.end("404 Not found");
        } else {
          response.writeHead(200, {
            "Content-Type": "text/html",
          });
          return response.end(data);
        }
      });
    } else {
      fs.readFile("404.html", (err, data) => {
        if (err) {
          response.writeHead(404, {
            "Content-Type": "text/html",
          });
          return response.end("Couldn't read 404.html");
        } else {
          response.writeHead(404, {
            "Content-Type": "text/html",
          });
          return response.end(data);
        }
      });
    }
  })
  .listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
