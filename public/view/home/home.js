import { fetchStocks } from '../../controller/homeController.js';

onload = () => {
    updateTable();
}

function updateTable(){
    const table = document.getElementById('stocks');
    fetchStocks().then((stocks) => {
        console.log(stocks);
        stocks.forEach(stock => {
            table.innerHTML += `
                <tr>
                    <td>${stock.ticker}</td>
                    <td>${stock.shares}</td> 
                    <td>${stock.position}</td>
                </tr>
            `;
        });
    });
}

