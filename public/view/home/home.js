import { fetchStocks, fetchUserStocks } from '../../controller/homeController.js';

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
        table.innerHTML += `
            <tr>
                <td>${ticker}</td>
                <td>${stock.shares}</td> 
                <td>${stock.position}</td>
                <td>${stock.price || "0,00"}</td>
            </tr>
        `;
    });
};

/*  Updates total position with user stocks */
function updateTotal(){
    const pos = document.getElementById('total');
    var sum = 0.00;
    userStocks.forEach(ticker => {
        const stock = stocksView[ticker];
        sum += parseFloat(stock.position);
    });
    const label = sum.toFixed(2).replace('.', ',');
    pos.innerHTML = `R$ ${label}`;
}

