import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { requestStock, parseStock } from './calculator.js'
import { getUserStocks, getUserStock, createUserStock, deleteUserStocks, updateUserStock } from './database.js';

// CONFIG
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// REQUESTS
app.get('/', async (req, res) => {
  res.sendFile(__dirname + '/public/view/home/home.html');
});

app.get('/home', async (req, res) => {
  res.sendFile(__dirname + '/public/view/home/home.html');
});

app.get('/purchase', async (req, res) => {
  res.sendFile(__dirname + '/public/view/purchase/purchase.html')
});

app.get('/stock/:ticker', async (req, res) => {
  try{
    const ticker = req.params.ticker;
    const data = await requestStock(ticker);
    const stock = parseStock(data);
    res.status(200).send(stock);
  } catch(error){
    res.status(404).json({error: "Stock not found!"});
  }
});

app.get('/user/stocks', async (req, res) => {
  try{
    const stocks = await getUserStocks();
    res.status(200).send(stocks);
  } catch(error){
    res.status(500).json({error: "Failed to connect to the server!"});
  }
});

app.get('/user/stocks/:ticker', async (req, res) => {
  try{
    const ticker = req.params.ticker;
    const stock = await getUserStock(ticker);
    res.status(200).send(stock);
  } catch(error){
    console.error(error);
    res.status(404).json({error: `User stock of ticker ${ticker} not found!`});
  }
});

app.post('/user/stocks', async (req, res) => {
  try{
    const ticker = req.body.ticker;
    const shares = parseFloat(req.body.shares);
    const pricePerShare = parseFloat(req.body.pricePerShare);
    const priceTotal = (shares * pricePerShare).toFixed(2);

    const createdStock = await createUserStock(ticker, shares, priceTotal);
    res.status(201).send(createdStock);
  } catch (error) {
    res.status(500).json({error: "Failed to connect to the server!"});
  }
});

app.put('/user/stocks', async (req, res) => {
  try{
    const ticker = req.body.ticker;
    const shares = parseFloat(req.body.shares);
    const pricePerShare = parseFloat(req.body.pricePerShare);
    const priceTotal = shares * pricePerShare;

    //update 
    const stock = await getUserStock(ticker);
    const newShares = stock.shares + shares;
    const newCost = (parseFloat(stock.cost) + priceTotal).toFixed(2);

    const updated = await updateUserStock(ticker, newShares, newCost);
    res.status(200).send(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Failed to connect to the server!"});
  }
});

app.delete('/user/stocks', async (req, res) => {
  try{
    const deleted = await deleteUserStocks();
    res.status(200).send(deleted);
  } catch (error) {
    res.status(500).json({error: "Failed to connect to the server!"});
  }
});