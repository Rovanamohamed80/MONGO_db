import express from 'express';
import { db } from './database/dbConnection.js';
import customerRouter from './modules/customers/customer.routes.js';
import carRouter from './modules/cars/car.routes.js';
import rentalRouter from './modules/rentals/rental.routes.js';
import specialRouter from './modules/specials/special.routes.js';
const app = express();
const port = 3000;
app.use(express.json())
app.use('/customers',customerRouter)
app.use('/cars',carRouter)
app.use('/rentals',rentalRouter)
app.use('/specials',specialRouter)

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
