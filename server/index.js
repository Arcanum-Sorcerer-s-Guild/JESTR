const app = require("./app");
require("dotenv").config();

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`
  SP tester running on:
  http://localhost:${PORT}/_api/web/lists/GetByTitle('Assets')/items
  http://localhost:${PORT}/_api/web/lists/GetByTitle('Reservations')/items
  `);
});
