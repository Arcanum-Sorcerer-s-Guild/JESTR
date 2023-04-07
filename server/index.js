const app = require("./app");
require("dotenv").config();

const PORT = process.env.SERVER_PORT || 3000;

// RoutePath.get("/_api/web/lists/:GetBy\\(:listTitle\\)/items\\(:itemId\\)", (req, res) => {
//   const list = req.params;
// res.status(200).json(list);
// });
// TODO: get rid of this commented code, Joseph?

app.listen(PORT, () => {
  console.log(`
  SP tester running on:
  http://localhost:${PORT}/_api/web/lists/GetByTitle('Assets')/items
  http://localhost:${PORT}/_api/web/lists/GetByTitle('Reservations')/items
  `);
});
