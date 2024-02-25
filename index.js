import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { requestStock, parseStock } from './public/calculator.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
  // res.sendFile(__dirname + '/public/view/home.html')

  try{
    // res.send(await requestStock("PETR4.SA"));
    const data = await requestStock("VALE3.SA")
    res.send(parseStock(data));


  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});