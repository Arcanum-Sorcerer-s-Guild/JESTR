const express = require('express');
const router = express.Router();

const db = require('../db/controllers/lists.js');

console.log('sharepoint route loaded');

// Get All Items in List
//http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items
//http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items
router.get("/GetByTitle\\(':listTitle'\\)/items", (req, res) => {
  db.getListItem(req.params.listTitle)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Get Single Items
// http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items(1)
// http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items(1)
router.get("/GetByTitle\\(':listTitle'\\)/items\\(:itemId\\)", (req, res) => {
  const listLocation = req.params.listTitle;
  const itemId = req.params.itemId;
  db.getListItem(listLocation, itemId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Post List Item
//http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items
//http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items

// TODO - Need to check to see if user can edit assets with user authentication
router.post("/GetByTitle\\(':listTitle'\\)/items", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'unauthorized' });
  }

  const listLocation = req.params.listTitle;
  const [payload] = req.body;
  db.postListItem(listLocation, {
    ...payload,
    EditorId: req.session.user.userId,
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Update List Item
//http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items(1)
//http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items(1)
// TODO - Need to check to see if user can edit assets with user authentication
router.put("/GetByTitle\\(':listTitle'\\)/items\\(:itemId\\)", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'unauthorized' });
  }

  const listLocation = req.params.listTitle;
  const [payload] = req.body;
  const itemId = req.params.itemId;

  db.postListItem(
    listLocation,
    {
      ...payload,
      AuthorId: req.session.user.userId,
      EditorId: req.session.user.userId,
    },
    itemId
  )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Delete List Item
//http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items(1)
// TODO - Need to check to see if user can delete assets with user authentication
router.delete(
  "/GetByTitle\\(':listTitle'\\)/items\\(:itemId\\)",
  (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const listLocation = req.params.listTitle;
    const itemId = req.params.itemId;

    db.deleteListItem(listLocation, itemId)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
);

module.exports = router;

// payload tests
//Assets
// [
  // {
  //   "Serial": "x1y2z3",
  //   "Equipment": "SA-20",
  //   "Threat": "XM-15",
  //   "ThreatType": "Manned",
  //   "SystemInformation": "some string",
  //   "StatusDate": "2022-11-02T19:44:06Z",
  //   "Status": "GREEN",
  //   "ETIC": "2022-11-02T19:44:06Z",
  //   "Remarks": "some string",
  //   "Schedulable": true,
  //   "Operational": true,
  //   "Range": 2205,
  //   "SiteLocation": "string ex Charlie Batt",
  //   "Latitude": "37.220",
  //   "Longitude": "123.456",
  //   "Elevation": 2000,
  //   "Accuracy": "+/- 2m",
  //   "CoordSource": "GARMIN GPX 55I",
  //   "CoordRecordedDate": "2022-11-02T19:44:06Z"
  // }
// ]
// Reservations
// [
//   {
//     "Squadron": "VMGR-152",
//     "ContactDSN": "123-456-7890",
//     "Range": 2211,
//     "SiteLocation": "Charlie batt",
//     "Threat": "SA-3",
//     "Equipment": "T-2",
//     "ThreatType": "unmanned",
//     "EndDate": "2021-05-18T19:00:00Z",
//     "EventDate": "2021-05-18T21:00:00Z",
//     "Notes": "fgdsfjgkfgds",
//     "Status": "Pending"
//   }
// ]
