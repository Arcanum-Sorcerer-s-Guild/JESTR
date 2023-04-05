import Express, { Router } from "express";
import cors from "cors";
import RoutePath from "./RoutePath/RoutePath.js";

const app = Express();
const port = 3001;

app.use(cors());
app.use(Express.json());
app.use(RoutePath);

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
export default app;