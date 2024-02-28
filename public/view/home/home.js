import { fetchUserStocks, deleteUserStocks } from '../../service/userStockService.js';
import { fetchPrices } from '../../service/stockService.js';
import { computePosition, computeProfitability, computeProfit, formatNumber, isTradingPeriod } from '../../utils.js';

var stocksView = {};
var userStocks = [];
var baseTableHTML = "";
var priceTimer;

onload = () => {
    baseTableHTML = document.getElementById("stocks").innerHTML;
    document.getElementById("delete").onclick = deleteStocks;
    fetchData();
    //Updates price every 10 seconds if trading period
    priceTimer = setInterval(updatePrices, 10000);
}

/*  Fetches user stocks, updating local user stock data and view. */
function fetchData(){
    fetchUserStocks().then((stocks) => {
        stocks.forEach(stock => {
            stocksView[stock.ticker] = {
                "shares": stock.shares, 
                "cost": stock.cost
            };
            userStocks.push(stock.ticker);
        });
        updateView();
        updatePrices();
    });
}

/*  Fecthes price data and updates view if is trading period. */
function updatePrices(){
    if (!isTradingPeriod()) clearInterval(priceTimer);
    fetchPrices(userStocks, ({ticker, price}) => {
        stocksView[ticker]["price"] = price;
        updateView();
    });
}

/*  Updates View based on fetched data. */
function updateView(){
    updateTable();
    updateTotal();
}

/*  Updates table with user stocks */
function updateTable(){
    const table = document.getElementById('stocks');
    table.innerHTML = baseTableHTML;
    userStocks.forEach(ticker => {
        const stock = stocksView[ticker];
        const price = (stock.price || "0.00").toString();
        const stockReturn = computeProfit(stock.cost, stock.shares, price);
        const stockValue = computePosition(stock.shares, price);
        const profitability = computeProfitability(stock.cost, stockValue);
        table.innerHTML += `
            <tr>
                <td>${ticker}</td>
                <td>${stock.shares}</td> 
                <td>${formatNumber(stock.cost)}</td>
                <td>${formatNumber(price)}</td>
                <td>${formatNumber(stockValue)}</td>
                <td>${formatNumber(stockReturn)}</td>
                <td>${formatNumber(profitability)}</td>
            </tr>
        `;
    });
};

/*  Updates total cost and position with user stocks */
function updateTotal(){
    const cost = document.getElementById('cost');
    const pos = document.getElementById('position');
    var costSum = 0.00;
    var posSum = 0.00;
    userStocks.forEach(ticker => {
        const stock = stocksView[ticker];
        costSum += parseFloat(stock.cost);

        const price = (stock.price || "0.00").toString();
        const stockValue = computePosition(stock.shares, price);
        posSum += parseFloat(stockValue);
    });
    const label = costSum.toFixed(2);
    cost.innerHTML = `R$ ${formatNumber(label)}`;
    
    const label2 = posSum.toFixed(2);
    const prof = computeProfitability(costSum, posSum);
    if (prof != 0.0)
        pos.innerHTML = `R$ ${formatNumber(label2)} (${formatNumber(prof)})`;
    else
        pos.innerHTML = `R$ ${formatNumber(label2)}`;
};

/*  Deletes all stock data and updates view */
async function deleteStocks() {
    if (await deleteUserStocks()){
        stocksView = {};
        userStocks = [];
        updateView();
    }
}