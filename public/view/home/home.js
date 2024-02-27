import { fetchStocks, fetchUserStocks } from '../../service/stockService.js';
import { computeCurrentValue, computeProfitability, computeStockReturn, formatNumber } from '../../utils.js';

var stocksView = {};
var userStocks = [];
var baseTableHTML = "";

onload = () => {
    baseTableHTML = document.getElementById("stocks").innerHTML;
    fetchData();
}

/*  Fetches user stocks, updating user stock data. */
function fetchData(){
    fetchUserStocks().then((stocks) => {
        stocks.forEach(stock => {
            stocksView[stock.ticker] = {
                "shares": stock.shares, 
                "position": stock.position
            };
            userStocks.push(stock.ticker);
        });
        updateView();

        fetchStocks(stocks, ({ticker, price}) => {
            stocksView[ticker]["price"] = price;
            updateView();
        });
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
        const stockReturn = computeStockReturn(stock.position, stock.shares, price);
        const stockValue = computeCurrentValue(stock.shares, price);
        const profitability = computeProfitability(stock.position, stockValue);
        table.innerHTML += `
            <tr>
                <td>${ticker}</td>
                <td>${stock.shares}</td> 
                <td>${formatNumber(stock.position)}</td>
                <td>${formatNumber(price)}</td>
                <td>${formatNumber(stockValue)}</td>
                <td>${formatNumber(stockReturn)}</td>
                <td>${formatNumber(profitability)}</td>
            </tr>
        `;
    });
};

/*  Updates total position with user stocks */
function updateTotal(){
    const cost = document.getElementById('cost');
    const pos = document.getElementById('position');
    var costSum = 0.00;
    var posSum = 0.00;
    userStocks.forEach(ticker => {
        const stock = stocksView[ticker];
        costSum += parseFloat(stock.position);

        const price = (stock.price || "0.00").toString();
        const stockValue = computeCurrentValue(stock.shares, price);
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

