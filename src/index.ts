import express from 'express';
import logger from './utilities/logger';
import userRoutes from './handlers/users';
import productRoutes from './handlers/products';
import orderRoutes from './handlers/orders';

const app: express.Application = express();
const port = 3000;

app.use(express.json());
userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.post('/test', (req: express.Request, res: express.Response): void => {
  try {
    res.send(req);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
export default app;
