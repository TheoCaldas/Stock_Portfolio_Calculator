import { calculateCurrentValue, calculateStockReturn, calculateProfitability, fetchStocks, fetchUserStocks } from '../../controller/homeController.js';

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
        const stockReturn = calculateStockReturn(stock.position, stock.shares, price);
        const stockValue = calculateCurrentValue(stock.shares, price);
        const profitability = calculateProfitability(stock.position, stockValue);
        table.innerHTML += `
            <tr>
                <td>${ticker}</td>
                <td>${stock.shares}</td> 
                <td>${stock.position.replace('.', ',')}</td>
                <td>${price.replace('.', ',')}</td>
                <td>${stockValue.replace('.', ',')}</td>
                <td>${stockReturn.replace('.', ',')}</td>
                <td>${profitability.replace('.', ',')}</td>
            </tr>
        `;
    });
};

/*  Updates total position with user stocks */
function updateTotal(){
    const pos = document.getElementById('total');
    const newPos = document.getElementById('newTotal');
    var sumPos = 0.00;
    var sumNewPos = 0.00;
    userStocks.forEach(ticker => {
        const stock = stocksView[ticker];
        sumPos += parseFloat(stock.position);

        const price = (stock.price || "0.00").toString();
        const stockValue = calculateCurrentValue(stock.shares, price);
        sumNewPos += parseFloat(stockValue);
    });
    const label = sumPos.toFixed(2).replace('.', ',');
    pos.innerHTML = `R$ ${label}`;
    
    const label2 = sumNewPos.toFixed(2).replace('.', ',');
    const prof = calculateProfitability(sumPos, sumNewPos);
    if (prof !== NaN)
        newPos.innerHTML = `R$ ${label2} (${prof})`;
    else
        newPos.innerHTML = `R$ ${label2}`;
};

