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
  pushListItem,
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
  const { username, password, isAdmin } = req.body;

  // reject missing username or missing password
  if (username === "" || password === "") {
    console.log("undefined user or pass");
    return res.status(401).json({
      error: "undefined user or pass",
    });
  }

  // reject duplicate username
  const duplicate = await getUserByUsername(username);
  if (duplicate.length > 0) {
    console.log("duplicate username of id:", duplicate[0].id);
    return res.status(401).json({
      error: "Username already taken...",
    });
  }

  try {
    // hash password and insert user into database
    const hashedPassword = bcrypt.hashSync(password, 10);
    const data = await createUser(username, hashedPassword, isAdmin);
    const user = data[0];

    // create session cookie
    req.session.user = {
      userId: user.id,
      username: user.username,
      isAdmin: user.is_admin,
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
  const { username, password } = req.body;

  // reject missing username or missing password
  if (username == undefined || password == undefined) {
    console.log("undefined user or pass");
    return res.status(401).json({
      error: "Missing Username or Password",
    });
  }

  try {
    // search db for user
    const data = await getUserByUsername(username);

    // reject if user not found
    if (data.length === 0) {
      console.log("user not found");
      return res.status(401).json({
        error: "User not found",
      });
    }
    const user = data[0];
    console.log("user:", user);

    // compare password hashes and reject if incorrect
    const matches = bcrypt.compareSync(password, user.password);
    if (!matches) {
      console.log("incorrect username or password");
      return res.status(401).json({
        error: "Incorrect username or password",
      });
    }

    // create session cookie
    req.session.user = {
      userId: user.id,
      username: user.username,
      isAdmin: user.is_admin,
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

app.get("/users", (req, res) => {
  res.status(200).json(getUsers());
});


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
app.get(
  "/_api/web/lists/GetByTitle\\(':listTitle'\\)/items",
  (req, res) => {
    res.status(200).json("working");
  }
);

// Get Single Items
app.get(
  "/_api/web/lists/GetByTitle\\(':listTitle'\\)/items:itemId",
  (req, res) => {
    res.status(200).json("working");
  }
);

app.post(
  "/_api/web/lists/GetByTitle\\(':listTitle'\\)/items/:itemId",
  (req, res) => {
    res.status(200).json("working");
  }
);

app.post(
  "/_api/web/lists/GetByTitle\\(':listTitle'\\)/items",
  (req, res) => {
    res.status(200).json("working");
  }
);

module.exports = app;
