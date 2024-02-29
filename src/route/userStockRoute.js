import express from 'express';
import { getUserStocks, getUserStock, createUserStock, deleteUserStocks, updateUserStock } from '../controller/databaseController.js';
const router = express.Router();

router.get('/user/stocks', async (req, res) => {
    try{
      const stocks = await getUserStocks();
      res.status(200).send(stocks);
    } catch(error){
      console.error(error);
      res.status(500).json({error: "Failed to connect to the server!"});
    }
});
  
router.get('/user/stocks/:ticker', async (req, res) => {
    try{
      const ticker = req.params.ticker;
      const stock = await getUserStock(ticker);
      res.status(200).send(stock);
    } catch(error){
      console.error(error);
      res.status(404).json({error: `User stock of ticker ${ticker} not found!`});
    }
});
  
router.post('/user/stocks', async (req, res) => {
    try{
      const ticker = req.body.ticker;
      const shares = parseFloat(req.body.shares);
      const pricePerShare = parseFloat(req.body.pricePerShare);
      const priceTotal = (shares * pricePerShare).toFixed(2);
  
      const createdStock = await createUserStock(ticker, shares, priceTotal);
      res.status(201).send(createdStock);
    } catch (error) {
      console.error(error);
      res.status(500).json({error: "Failed to connect to the server!"});
    }
});
  
  router.put('/user/stocks', async (req, res) => {
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
  
router.delete('/user/stocks', async (req, res) => {
    try{
      const deleted = await deleteUserStocks();
      res.status(200).send(deleted);
    } catch (error) {
      console.error(error);
      res.status(500).json({error: "Failed to connect to the server!"});
    }
});

export default router;