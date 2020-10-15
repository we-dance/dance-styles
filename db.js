const path = require("path");
const fs = require("fs");
const yaml = require("js-yaml");

const directoryPath = path.join(__dirname, "content");
const dbPath = path.join(__dirname, "json-server", "db.json");

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
  });
});
