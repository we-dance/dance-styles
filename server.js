const path = require("path");
const fs = require("fs");
const yaml = require("js-yaml");

const directoryPath = path.join(__dirname, "content");
const dbPath = path.join(__dirname, "db.json");

const data = { styles: [] };

fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  files.forEach(function (fileName) {
    const fileContents = fs.readFileSync(
      path.join(directoryPath, fileName),
      "utf8"
    );

    const item = yaml.safeLoadAll(fileContents);

    data.styles.push(item[0]);
  });

  fs.writeFile(dbPath, JSON.stringify(data), function (err) {
    if (err) {
      return console.log("Unable to write file: " + err);
    }

    console.log("db exported");

    console.log("starting server");

    const jsonServer = require("json-server");
    const server = jsonServer.create();
    const router = jsonServer.router("db.json");
    const middlewares = jsonServer.defaults();
    const port = process.env.PORT || 3000;

    server.use(middlewares);
    server.use(router);

    server.listen(port);

    console.log("server started at port " + port);
  });
});
