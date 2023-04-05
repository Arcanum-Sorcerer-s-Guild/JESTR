import fs from "fs";
import readJSON from "./readJSON.js";

const writeJSON = (listName, newData, pid) => {
  let listAll = readJSON(listName);
  listAll = listAll.d.results;
  console.log(listAll)
  let id = pid ? parseInt(pid) : parseInt(listAll[listAll.length - 1].ID + 1);

  let listExclude = listAll.filter((item) => item.ID != parseInt(id));
  let listItem = listAll.filter((item) => item.ID === parseInt(id));

  id = listItem.length !== 0 ? id : parseInt(listAll[listAll.length - 1].ID + 1);
  newData.ID = id;
  newData.Id = id;
  let joinData = { ...listItem[0], ...newData };
  let newList = { d: { results: [...listExclude, joinData] } };
  // console.log(JSON.stringify(newList));
  fs.writeFileSync(
    `./dataStore/${listName}.json`,
    JSON.stringify(newList),
    (sss, err) => {
      if (err) {
        console.log(err)
      } else {
        return joinData
      }     
    }
  );
  
};

export default writeJSON;

//
