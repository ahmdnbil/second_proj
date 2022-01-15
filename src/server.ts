import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

//import the handelers files to control the endpoints
import orderRoutes from './handlers/orders';
import productRoutes from './handlers/products';
import userRoutes from './handlers/users';

//intiating the program at address 0.0.0.0:3000
const app: express.Application = express();
const address = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Welcome to second project on Udacity by ahmedNabil !');
});

//routes for the endpoint
orderRoutes(app);
productRoutes(app);
userRoutes(app);

app.listen(3000, () => {
  console.log(`starting app on :${address}`);
});

export default app;
