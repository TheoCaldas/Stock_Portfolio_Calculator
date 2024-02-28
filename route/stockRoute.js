import express from 'express';
import { requestStock, parseStock } from '../controller/stockController.js';
const router = express.Router();

router.get('/stock/:ticker', async (req, res) => {
    try{
      const ticker = req.params.ticker;
      const data = await requestStock(ticker);
      const stock = parseStock(data);
      res.status(200).send(stock);
    } catch(error){
      res.status(404).json({error: "Stock not found!"});
    }
});

export default router;