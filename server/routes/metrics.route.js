const express = require('express');
const router = express.Router();

const db = require('../db/controllers/metrics.js');

const helper = require('../utils/helper.util.js');

console.log('metrics route loaded');

// Return Date of earliest Reservation
// http://localhost:3001/metrics/EarliestReservationDate
router.get('/EarliestReservationDate', async (req, res) => {
  const permitted = helper.checkPermissions(req, ['User']);
  if (typeof permitted === 'number') {
    return res.sendStatus(permitted);
  }
  try {
    const earliestReservationDate = await db.getEarliestReservationDate();
    res.status(200).json(earliestReservationDate[0]);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
