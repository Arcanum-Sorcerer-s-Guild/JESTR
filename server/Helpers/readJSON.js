import fs from "fs";

const readJSON = (listName) => {
  let listAll = `./dataStore/${listName}.json`;
  const readFile = fs.readFileSync(listAll, "utf8", function (err, data) {
    if (err) console.log(err);
  });
  return JSON.parse(readFile);
};

export default readJSON;
