import { validatePurchaseInput } from './purchaseController.js';

onload = () => {
    const button = document.getElementById('buy');
    button.onclick = buyStock;
}

/*  Gets purchase user input on the client-side.
    Checks if input is valid and sends it to the server. */
function buyStock(){
    const ticker = document.getElementById("ticker").value;
    const shares = document.getElementById("shares").value;
    const pricePerShare = document.getElementById("price").value;

    const errors = validatePurchaseInput(ticker, shares, pricePerShare);
    if (errors == undefined){
        // proceed with purchase. 
        console.log("BUY");
    } else{
        if (errors.ticker) console.log("Ticker should not be empty!");
        if (errors.shares) console.log("Shares should be a positive number!");
        if (errors.pricePerShare) console.log("Price per share should be a positive decimal number!");
    }
};