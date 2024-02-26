import { validatePurchaseInput } from './purchaseController.js';

onload = () => {
    const button = document.getElementById('buy');
    button.onclick = buyStock;
}

/*  Gets purchase user input on the client-side.
    Checks if input is valid and sends it to the server. */
async function buyStock(){
    const ticker = document.getElementById("ticker").value;
    const shares = document.getElementById("shares").value;
    const pricePerShare = document.getElementById("price").value;

    const errors = validatePurchaseInput(ticker, shares, pricePerShare);
    if (errors == undefined){
        // proceed with purchase. 
        const data = {
            "ticker": ticker,
            "shares": shares,
            "pricePerShare": pricePerShare
        }
        await postPurchase(data);
    } else{
        if (errors.ticker) console.log("Ticker should not be empty!");
        if (errors.shares) console.log("Shares should be a positive number!");
        if (errors.pricePerShare) console.log("Price per share should be a positive decimal number!");
    }
};

/*  Posts purchase to the server-side.
    Catches http erros. */
async function postPurchase(reqData) {
    try {  
      const res = await fetch("/buy", 
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(reqData),
      });
      const resData = await res.json();
      if (!res.ok) console.error(resData.error);
      else console.log(resData);
    } catch (error) {
      console.error("Error posting purchase:", error);
    }
  }