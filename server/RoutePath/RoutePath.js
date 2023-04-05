import Express from "express";
const express = Express();
const RoutePath = express;
import fs from "fs";

import readJSON from "../Helpers/readJSON.js";
import writeJSON from "../Helpers/writeJSON.js";
import filterById from "../Helpers/filterById.js";

RoutePath.get("/", (req, res) => { 
  res.status(200).json(`Server started correctly...`);
});

RoutePath.get("/test", (req, res) => {
  let status = {
    status: "success",
  };
  res.status(200).json(status);
});

// Get All Items
RoutePath.get(
  "/_api/web/lists/GetByTitle\\(':listTitle'\\)/items",
  (req, res) => {
    const listLocation = req.params.listTitle;
    const list = readJSON(listLocation);
    res.status(200).json(list);
  }
);

// Get Single Items
RoutePath.get(
  "/_api/web/lists/GetByTitle\\(':listTitle'\\)/items:itemId",
  (req, res) => {
    const listLocation = req.params.listTitle;
    const itemId = req.params.itemId;
    const filterItem = filterById(listLocation, itemId);
    res.status(200).json(filterItem);
  }
);

RoutePath.post("/_api/web/lists/GetByTitle\\(':listTitle'\\)/items/:itemId", (req, res) => {
  const reservation = req.body;
  const listName = req.params.listTitle;
  const itemId = req.params.itemId;
  const item = writeJSON(listName, reservation, itemId);
  res.status(200).json(JSON.parse(item));
});

RoutePath.post("/_api/web/lists/GetByTitle\\(':listTitle'\\)/items", (req, res) => {
  const reservation = req.body;
  const listName = req.params.listTitle;
  const item = writeJSON(listName, reservation);
  res.status(200).json(JSON.parse(item));
});




RoutePath.put("/reservations", (req, res) => {
  res.status(200).json(JSON.parse(reservations));
});
RoutePath.delete("/reservations", (req, res) => {
  res.status(200).json(JSON.parse(reservations));
});


export default RoutePath;
