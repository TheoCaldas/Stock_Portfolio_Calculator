import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import stockRoute from './route/stockRoute.js';
import userStockRoute from './route/userStockRoute.js';

// CONFIG
const app = express();
const port = process.env.PORT || 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/", stockRoute); //stock requests
app.use("/", userStockRoute); //user stock requests

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// PAGE REQUESTS
app.get('/', async (req, res) => {
  res.sendFile(__dirname + '/public/view/home/home.html');
});

app.get('/home', async (req, res) => {
  res.sendFile(__dirname + '/public/view/home/home.html');
});

app.get('/purchase', async (req, res) => {
  res.sendFile(__dirname + '/public/view/purchase/purchase.html')
});