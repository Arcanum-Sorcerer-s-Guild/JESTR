const express = require('express');
const router = express.Router();

const dbLists = require('../db/controllers/lists.js');
const dbUsers = require('../db/controllers/users.js');

const helper = require('../utils/helper.util.js');

console.log('sharepoint route loaded');

// Get All Items in List
// http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items
// http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items
router.get("/lists/GetByTitle\\(':listTitle'\\)/items", (req, res) => {
  const permitted = helper.checkPermissions(req, {
    needLoggedIn: true,
  });
  if (typeof permitted === 'number') {
    return res.sendStatus(permitted);
  }
  dbLists
    .getListItem(req.params.listTitle)
    .then((data) => {
      res.status(200).json(helper.encapsulateLikeSharepoint(data));
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Get Single Item
// http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items(1)
// http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items(1)
router.get(
  "/lists/GetByTitle\\(':listTitle'\\)/items\\(:itemId\\)",
  (req, res) => {
    const permitted = helper.checkPermissions(req, {
      needLoggedIn: true,
    });
    if (typeof permitted === 'number') {
      return res.sendStatus(permitted);
    }
    const listLocation = req.params.listTitle;
    const itemId = req.params.itemId;
    dbLists
      .getListItem(listLocation, itemId)
      .then((data) => {
        if (data.length > 0) {
          res.status(200).json(helper.encapsulateLikeSharepoint(data[0]));
        } else {
          res.status(404).json({
            error: 'item not found',
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
);

// Post List Item
// http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items
// http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items
router.post("/lists/GetByTitle\\(':listTitle'\\)/items", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'unauthorized' });
  }

  const listLocation = req.params.listTitle;
  // Deconstruct req.body into payload and remove Id, AuthorId, EditorId
  const [{ Id, AuthorId, EditorId, ...payload }] = req.body;
  dbLists
    .createListItem(listLocation, {
      ...payload,
      AuthorId: req.session.user.Id,
      EditorId: req.session.user.Id,
    })
    .then((data) => {
      res.status(200).json(helper.encapsulateLikeSharepoint(data[0]));
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Update List Item
// http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items(1)
// http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items(1)
router.put(
  "/lists/GetByTitle\\(':listTitle'\\)/items\\(:itemId\\)",
  (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const listLocation = req.params.listTitle;
    const itemId = req.params.itemId;
    // Deconstruct req.body into payload and remove Id, AuthorId, EditorId
    const [{ Id, AuthorId, EditorId, ...payload }] = req.body;

    dbLists
      .updateListItem(
        listLocation,
        {
          ...payload,
          EditorId: req.session.user.Id,
        },
        itemId
      )
      .then((data) => {
        res.status(200).json(helper.encapsulateLikeSharepoint(data[0]));
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
);

// Delete List Item
// http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items(1)
router.delete(
  "/lists/GetByTitle\\(':listTitle'\\)/items\\(:itemId\\)",
  (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const listLocation = req.params.listTitle;
    const itemId = req.params.itemId;

    dbLists
      .deleteListItem(listLocation, itemId)
      .then((data) => {
        res.sendStatus(204);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
);

// Return Current User
// http://localhost:3001/_api/Web/CurrentUser
router.get('/CurrentUser', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'unauthorized' });
  }

  try {
    console.log('SP getting user by ID: ', req.session.user.Id);
    const [user] = await dbUsers.getUserById(req.session.user.Id);
    console.log(user);
    const sharepointUser = helper.formatSharepointUser(user);
    const encapsulatedSharepointUser =
      helper.encapsulateLikeSharepoint(sharepointUser);
    res.status(200).json(encapsulatedSharepointUser);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
