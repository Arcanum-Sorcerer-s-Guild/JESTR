import readJSON from "./readJSON.js";
const filterById = (listName, id) => {
  let listAll = readJSON(listName);
  listAll = listAll.d.results;
  let listFilter = listAll.filter(item => item.ID === parseInt(id));
  return { "d": { "results": listFilter } };
};
export default filterById;