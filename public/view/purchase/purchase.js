import { fetchUserStock, postPurchase, updatePurchase } from '../../service/userStockService.js';
import { tickerIsValid } from '../../service/stockService.js';
import { validatePurchaseInput, computePosition, formatNumber } from '../../utils.js';

onload = () => {
    document.getElementById('buy').onclick = buyStock;
    document.getElementById("tickerBtn").onclick = async () => {
        if (await checkTicker()){
            //should collapse only on first click
            document.getElementById("collapseControl").click();
            const bottom = document.getElementById("bottom");
            if (bottom) bottom.id = "bottomCollapsed";
        }
    };

    //reset feedbacks if any of this elements are on focus
    resetFeedbackOnFocus([
        document.getElementById("ticker"),
        document.getElementById("shares"),
        document.getElementById("price")
    ]);
}

/*  Gets purchase user input on the client-side.
    Checks if input is valid and sends it to the server. */
async function buyStock(){
    const tickerInput = document.getElementById("ticker");
    const sharesInput = document.getElementById("shares");
    const priceInput = document.getElementById("price");

    const ticker = tickerInput.value.toUpperCase();
    const shares = sharesInput.value;
    const pricePerShare = priceInput.value;

    const errors = validatePurchaseInput(ticker, shares, pricePerShare);
    if (errors == undefined){
        // proceed with purchase. 
        try{
            //check if ticker is valid
            await checkTicker()
            
            //compute final price
            const total = computePosition(shares, pricePerShare);
            if (confirm(`Total: R$ ${formatNumber(total)}`)){
                const data = {
                    "ticker": ticker,
                    "shares": shares,
                    "pricePerShare": pricePerShare
                };

                //check if user stock with ticker exists
                const exists = await fetchUserStock(ticker);
                if (exists != undefined){
                    //stock is already a user stock
                    const purchased = await updatePurchase(data);
                    if (purchased) window.location.href = '/home';
                }else{
                    //stock should be a new user stock
                    const purchased = await postPurchase(data);
                    if (purchased) window.location.href = '/home';
                }
            }
        } catch (error){
            console.error(error);
        }
    } else{
        if (errors.ticker) setValidElement(tickerInput, false);
        if (errors.shares) setValidElement(sharesInput, false);
        if (errors.pricePerShare) setValidElement(priceInput, false);
    }
};

function resetFeedbackOnFocus(elements){
    for (const element of elements){
        element.onfocus = () => {
            for (const element2 of elements){
                element2.classList.remove("is-invalid");
                element2.classList.remove("is-valid");
            }
        }
    }
}

async function checkTicker(){
    const tickerInput = document.getElementById("ticker");
    const ticker = tickerInput.value.toUpperCase();

    console.log(ticker)

    //check if ticker is valid
    if (! await tickerIsValid(ticker)){
        console.log("Invalid ticker!");
        setValidElement(tickerInput, false);
        return false;
    }
    setValidElement(tickerInput, true);
    return true;
};

function setValidElement(element, isValid){
    element.classList.remove("is-valid");
    element.classList.remove("is-invalid");
    if (isValid){
        element.classList.add("is-valid");
    }else{
        element.classList.add("is-invalid");
    }
}