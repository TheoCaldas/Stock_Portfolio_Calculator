import { fetchStocks } from '../../controller/homeController.js';

onload = () => {
    updateHomeUI();
}

/*  Fetches user stocks and updates view. */
function updateHomeUI(){
    fetchStocks().then((stocks) => {
        console.log(stocks);
        updateTable(stocks);
        updateTotal(stocks);
    });
}

/*  Updates table with stocks array */
function updateTable(stocks){
    const table = document.getElementById('stocks');
    stocks.forEach(stock => {
        table.innerHTML += `
            <tr>
                <td>${stock.ticker}</td>
                <td>${stock.shares}</td> 
                <td>${stock.position}</td>
            </tr>
        `;
    });
};

/*  Updates total position with stocks array */
function updateTotal(stocks){
    const pos = document.getElementById('total');
    var sum = 0.00;
    stocks.forEach(stock => {
        sum += parseFloat(stock.position);
    });
    const label = sum.toFixed(2).replace('.', ',');
    pos.innerHTML = `R$ ${label}`;
}

