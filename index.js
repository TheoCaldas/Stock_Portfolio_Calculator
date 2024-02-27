import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { requestStock, parseStock } from './public/calculator.js'
import { UserStock } from './model/userStock.js';

// CONFIG
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/public/view');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// GLOBAL

var stocks = [];

// REQUESTS

app.get('/', async (req, res) => {
  res.sendFile(__dirname + '/public/view/home/home.html');
  // res.render('home');
});

app.get('/home', async (req, res) => {
  res.sendFile(__dirname + '/public/view/home/home.html', {});
  // res.render('home', {
  //   stocks: stocks
  // });
});

app.get('/user/stocks', async (req, res) => {
  try{
    res.status(201).send(stocks);
  } catch(error){
    res.status(404).json({error: "User stocks not found!"});
  }
});

app.get('/stock/:ticker', async (req, res) => {
  try{
    const ticker = req.params.ticker;
    const data = await requestStock(ticker);
    const stock = parseStock(data);
    res.status(201).send(stock);
  } catch(error){
    res.status(404).json({error: "Stock not found!"});
  }
});

app.post('/buy', async (req, res) => {
  try{
    const ticker = req.body.ticker;
    const shares = parseFloat(req.body.shares);
    const pricePerShare = parseFloat(req.body.pricePerShare);
    const priceTotal = (shares * pricePerShare).toFixed(2);; 

    // console.log(ticker);
    // console.log(shares);
    // console.log(pricePerShare);
    // console.log(priceTotal);

    const data = await requestStock(ticker);
    parseStock(data);
    stocks.push(new UserStock(ticker, shares, priceTotal));

    res.status(201).send(stocks);
    
  } catch (error) {
    res.status(404).json({error: "Ticker not found!"});
  }
});

app.get('/purchase', async (req, res) => {
  res.sendFile(__dirname + '/public/view/purchase/purchase.html')
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});