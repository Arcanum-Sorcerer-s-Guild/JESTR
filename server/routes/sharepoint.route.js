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
  const permitted = helper.checkPermissions(req, ['User']);
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
    const permitted = helper.checkPermissions(req, ['User']);
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

// Create new List Item
// http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items
// http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items
router.post("/lists/GetByTitle\\(':listTitle'\\)/items", (req, res) => {
  const listLocation = req.params.listTitle;
  let permittedGroups = listLocation === 'Assets' ? ['Site Admin'] : ['User'];

  const permitted = helper.checkPermissions(req, permittedGroups);
  if (typeof permitted === 'number') {
    return res.sendStatus(permitted);
  }

  let payload = req.body[0];
  // These properties are not definable by the user
  ['Id', 'AuthorId', 'EditorId'].forEach(
    (property) => delete payload[property]
  );
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
  async (req, res) => {
    console.log(req.body);
    // Check if user is logged in before performing any calls to the db
    let permitted = helper.checkPermissions(req, ['User']);
    if (typeof permitted === 'number') {
      return res.sendStatus(permitted);
    }

    // Get the user ID of the item author
    const itemId = req.params.itemId;
    const listLocation = req.params.listTitle;
    let originalUserId;
    try {
      const originalItem = await dbLists.getListItem(listLocation, itemId);
      originalUserId = originalItem[0].AuthorId;
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    }

    let permittedGroups =
      listLocation === 'Assets' ? ['Site Admin'] : ['Author', 'Approver'];

    // Check if user is the author of the item or is approver or admin
    permitted = helper.checkPermissions(req, permittedGroups, originalUserId);
    if (typeof permitted === 'number') {
      return res.sendStatus(permitted);
    }

    let payload = req.body[0];
    // These properties are not definable by the user
    ['Id', 'AuthorId', 'EditorId'].forEach(
      (property) => delete payload[property]
    );
    // Remove Status, if user is not an Approver or Site Admin
    if (!(req.session.user.IsApprover || req.session.user.IsSiteAdmin)) {
      delete payload['Status'];
    }

    console.log('payload:', payload);

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
  async (req, res) => {
    // Check if user is logged in before performing any calls to the db
    let permitted = helper.checkPermissions(req, ['User']);
    if (typeof permitted === 'number') {
      return res.sendStatus(permitted);
    }

    // Get the user ID of the item author
    const itemId = req.params.itemId;
    const listLocation = req.params.listTitle;
    let originalUserId;
    try {
      const originalItem = await dbLists.getListItem(listLocation, itemId);
      originalUserId = originalItem[0].AuthorId;
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    }

    let permittedGroups =
      listLocation === 'Assets' ? ['Site Admin'] : ['Author'];

    // Check if user is the author of the item or is approver or admin
    permitted = helper.checkPermissions(req, permittedGroups, originalUserId);
    if (typeof permitted === 'number') {
      return res.sendStatus(permitted);
    }

    dbLists
      .deleteListItem(listLocation, itemId)
      .then(() => {
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
  let permitted = helper.checkPermissions(req, ['User']);
  if (typeof permitted === 'number') {
    return res.sendStatus(permitted);
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
