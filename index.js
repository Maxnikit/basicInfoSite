const http = require("http");
const url = require("url");
const fs = require("fs");

const routes = ["/about", "/contact-me"];
const errorPage = fs.readFileSync("404.html", "utf8", (err, data) => {
  if (err) {
    throw err;
  }
  return data;
});
http
  .createServer(function (request, response) {
    const q = url.parse(request.url, true);
    let filename;
    if (q.pathname === "/") {
      filename = "." + "/index.html";
    } else {
      filename = "." + q.pathname + ".html";
    }

    fs.readFile(filename, (err, data) => {
      if (err) {
        response.writeHead(404, {
          "Content-Type": "text/html",
        });
        response.write(errorPage);
        return response.end();
      } else {
        response.writeHead(200, {
          "Content-Type": "text/html",
        });
        response.write(data);
        return response.end();
      }
    });
  })
  .listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
