const app = require("./app");
require("dotenv").config();

const port = process.env.SERVER_PORT || 3000;

// RoutePath.get("/_api/web/lists/:GetBy\\(:listTitle\\)/items\\(:itemId\\)", (req, res) => {
//   const list = req.params;
// res.status(200).json(list);
// });

app.listen(port, () => {
  console.log(`
  SP tester running on:
  http://localhost:${port}/_api/web/lists/GetByTitle('Reservations')/items
  http://localhost:${port}/_api/web/lists/GetByTitle('Threats')/items
  `);
});