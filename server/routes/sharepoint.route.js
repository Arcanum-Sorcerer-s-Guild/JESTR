const express = require('express');
const router = express.Router();

const db = require('../db/controllers/lists.js');

console.log('sharepoint route loaded');

const encapsulateLikeSharepoint = (results) => {
  if (Array.isArray(results)) {
    return {
      d: {
        results: results,
      },
    };
  } else {
    return {
      d: results,
    };
  }
};

// Get All Items in List
// http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items
// http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items
router.get("/lists/GetByTitle\\(':listTitle'\\)/items", (req, res) => {
  db.getListItem(req.params.listTitle)
    .then((data) => {
      res.status(200).json(encapsulateLikeSharepoint(data));
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
    const listLocation = req.params.listTitle;
    const itemId = req.params.itemId;
    db.getListItem(listLocation, itemId)
      .then((data) => {
        if (data.length > 0) {
          res.status(200).json(encapsulateLikeSharepoint(data));
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
  db.createListItem(listLocation, {
    ...payload,
    AuthorId: req.session.user.userId,
    EditorId: req.session.user.userId,
  })
    .then((data) => {
      res.status(200).json(encapsulateLikeSharepoint(data));
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

    db.updateListItem(
      listLocation,
      {
        ...payload,
        EditorId: req.session.user.userId,
      },
      itemId
    )
      .then((data) => {
        res.status(200).json(encapsulateLikeSharepoint(data));
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

    db.deleteListItem(listLocation, itemId)
      .then((data) => {
        res.status(200).json(encapsulateLikeSharepoint(data));
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
);

module.exports = router;
