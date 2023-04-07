const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const knex = require("./db/dbConnections.js");
const app = express();

const { getUserByLoginName, createUser } = require("./db/controllers/users.js");
// const { login } = require("./db/controllers/login.js");
const {
  getListItem,
  postListItem,
  deleteListItem,
} = require("./db/controllers/lists.js");

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
  })
);
const store = new KnexSessionStore({
  knex,
  tablename: "sessions",
});
app.use(
  session({
    store: store,
    name: "connect.sid",
    secret: process.env.SESSION_SECRET || "6f646a6c6e6775306d7a68686d64637",
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // in milliseconds: ms * s * m * h = 1 day
    },
  })
);

const errorMessage =
  "The data you are looking for could not be found. Please try again";

// register new user
app.post("/register", async (req, res) => {
  const { LoginName, Password, IsOwner } = req.body;

  // reject missing LoginName or missing Password
  if (LoginName === "" || Password === "") {
    console.log("undefined user or pass");
    return res.status(401).json({
      error: "undefined user or pass",
    });
  }

  // reject duplicate LoginName
  const duplicate = await getUserByLoginName(LoginName);
  if (duplicate.length > 0) {
    console.log("duplicate LoginName of id:", duplicate[0].id);
    return res.status(401).json({
      error: "LoginName already taken...",
    });
  }

  try {
    // hash Password and insert user into database
    const hashedPassword = bcrypt.hashSync(Password, 10);
    const data = await createUser(LoginName, hashedPassword, IsOwner);
    const user = data[0];

    // create session cookie
    req.session.user = {
      userId: user.id,
      LoginName: user.LoginName,
      IsOwner: user.IsOwner,
    };

    // send user object to front end for cookie
    res.status(200);
    return res.json(req.session.user);
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      error: err,
    });
  }
});
// login existing user
app.post("/login", async (req, res) => {
  const { LoginName, Password } = req.body;

  // reject missing LoginName or missing Password
  console.log(" Line 101 || app.js || ALERT this log should be here... this is to login without a Password if null");
  // if (LoginName == undefined || Password == undefined) {
  if (LoginName == undefined) {
    console.log("undefined user or pass");
    return res.status(401).json({
      error: "Missing LoginName or Password",
    });
  }

  try {
    // search db for user
    const data = await getUserByLoginName(LoginName);

    // reject if user not found
    if (data.length === 0) {
      console.log("user not found");
      return res.status(401).json({
        error: "User not found",
      });
    }
    const user = data[0];
    console.log("user:", user);

    // compare Password hashes and reject if incorrect
    const matches = bcrypt.compareSync(Password, user.Password);
    if (!matches) {
      console.log("incorrect LoginName or Password");
      return res.status(401).json({
        error: "Incorrect LoginName or Password",
      });
    }

    // create session cookie
    req.session.user = {
      userId: user.id,
      LoginName: user.LoginName,
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

// logout user
app.post("/logout", async (req, res) => {
  try {
    await req.session.destroy();
    console.log("logout successful");
    res.clearCookie("connect.sid");
    return res.status(401).json({
      error: "logout successful",
    });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

// send user details to front end
app.post("/fetch-user", async (req, res) => {
  if (req.sessionID && req.session.user) {
    res.status(200);
    return res.json(req.session.user);
  }
  return res.sendStatus(403);
});

// app.get("/users", (req, res) => {
//   res.status(200).json(getUsers());
// });

app.get("/", (req, res) => {
  console.log(app);
  res.status(200).json("server running");
});

app.get("/test", (req, res) => {
  let status = {
    status: "success",
  };
  res.status(200).json(status);
});

// Get All Items
//http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items
//http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items
app.get(
  "/_api/web/lists/GetByTitle\\(':listTitle'\\)/items",
  (req, res) => {
    console.log(req.params.listTitle);
    getListItem(req.params.listTitle)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      })
  });

// Get Single Items
// http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items(1)
// http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items(1)
app.get(
  "/_api/web/lists/GetByTitle\\(':listTitle'\\)/items\\(:itemId\\)",
  (req, res) => {
    const listLocation = req.params.listTitle;
    const itemId = req.params.itemId;
    getListItem(listLocation, itemId)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      })
  });

// Post List Item
//http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items
//http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items
app.post(
  "/_api/web/lists/GetByTitle\\(':listTitle'\\)/items",
  (req, res) => {
    const listLocation = req.params.listTitle;
    const payload = req.body;
    postListItem(listLocation, payload)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        })
      });
  });

app.post(
  "/_api/web/lists/GetByTitle\\(':listTitle'\\)/items\\(:itemId\\)",
  (req, res) => {
    const listLocation = req.params.listTitle;
    const payload = req.body;
    const itemId = req.params.itemId;
    postListItem(listLocation, payload, itemId)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        })
      });
  }
);
module.exports = app;

// payload tests
//Assets
// [
//   {
//     "Serial": "x1y2z3",
//     "Equipment": "SA-20",
//     "Threat": "XM-15",
//     "ThreatType": "Manned",
//     "SystemInformation": "some string",
//     "StatusDate": "2022-11-02T19:44:06Z",
//     "Status": "GREEN",
//     "ETIC": "2022-11-02T19:44:06Z",
//     "Remarks": "some string",
//     "Schedulable": true,
//     "Operational": true,
//     "Range": 2205,
//     "SiteLocation": "string ex Charlie Batt",
//     "Latitude": "37.220",
//     "Longitude": "123.456",
//     "Elevation": 2000,
//     "Accuracy": "+/- 2m",
//     "CoordSource": "GARMIN GPX 55I",
//     "CoordRecordedDate": "2022-11-02T19:44:06Z"
//   }
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