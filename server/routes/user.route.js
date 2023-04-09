const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const db = require('../db/controllers/users.js');

console.log('user route loaded');

// Register a new user
router.post('/register', async (req, res) => {
  console.log('req.body', req.body);
  const { firstName, middleName, lastName, password } = req.body;

  // reject missing user registration info
  if (
    !firstName ||
    !middleName ||
    !lastName ||
    !password
  ) {
    const errorMessage = 'missing user registration info';
    console.log(errorMessage);
    return res.status(401).json({
      error: errorMessage,
    });
  }

  const newUser = {
    LoginName:
      `i:0e.t|fedvis|${firstName}.${middleName[0]}.${lastName}`.toLowerCase(), // i:0e.t|fedvis|joseph.w.hartsfield
    Title:
      `${lastName} ${firstName} DOD - ` +
      `${firstName}.${middleName[0]}.${lastName}`.toLowerCase(), // "Hartsfield Joseph DOD - joseph.w.hartsfield"
    Email: `${firstName}.${lastName}@us.af.mil`, // first.last@us.af.mil
    Password: bcrypt.hashSync(password, 10), // password
    IsSiteAdmin: req.body.IsSiteAdmin || false,
    IsOwner: req.body.IsOwner || false,
    IsApprover: req.body.IsApprover || false,
  };

  // reject duplicate LoginName
  const existing = await db.getUserByEmail(newUser.Email);
  if (existing.length > 0) {
    console.log(
      `duplicate Email ${newUser.Email} of id:`,
      existing[0].Id
    );
    return res.status(401).json({
      message: 'LoginName already taken...',
    });
  }

  try {
    // hash Password and insert user into database
    const data = await db.createUser(newUser);
    const user = data[0];

    // create session cookie
    req.session.user = {
      userId: user.Id,
      LoginName: user.LoginName,
      Title: user.Title,
      Email: user.Email,
      IsSiteAdmin: user.IsSiteAdmin,
      IsApprover: user.IsApprover,
      IsOwner: user.IsOwner,
    };

    // send user object to front end for cookie
    res.status(200);
    return res.json(req.session.user);
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      message: err,
    });
  }
});

// Login existing user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // reject missing login info
  if (!email || !password) {
    const errorMessage = 'missing login info';
    console.log(errorMessage);
    return res.status(401).json({
      message: errorMessage,
    });
  }

  try {
    // search db for user
    const data = await db.getUserByEmail(email);

    // reject if user not found
    if (data.length === 0) {
      const errorMessage = 'user not found';
      console.log(errorMessage);
      return res.status(401).json({
        message: errorMessage,
      });
    }
    const user = data[0];
    console.log('user:', user);

    // compare Password hashes and reject if incorrect
    const matches = bcrypt.compareSync(password, user.Password);
    if (!matches) {
      console.log('incorrect LoginName or Password');
      return res.status(401).json({
        error: 'Incorrect LoginName or Password',
      });
    }

    // create session cookie
    req.session.user = {
      userId: user.Id,
      LoginName: user.LoginName,
      Title: user.Title,
      Email: user.Email,
      IsSiteAdmin: user.IsSiteAdmin,
      IsApprover: user.IsApprover,
      IsOwner: user.IsOwner,
    };

    // send user object to front end for cookie
    res.status(200);
    return res.json(req.session.user);
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      error: err,
    });
  }
});

// Logout user
router.post('/logout', async (req, res) => {
  if (!req.session.user) {
    return res.sendStatus(204);
  }
  try {
    await req.session.destroy();
    console.log('logout successful');
    res.clearCookie('connect.sid');
    return res.status(200).json({
      message: 'logout successful',
    });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

// send user details to front end
router.get('/details', async (req, res) => {
  if (req.sessionID && req.session.user) {
    res.status(200);
    return res.json(req.session.user);
  }
  return res.sendStatus(403);
});

module.exports = router;
