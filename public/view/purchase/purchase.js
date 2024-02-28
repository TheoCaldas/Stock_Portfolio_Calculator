import { fetchUserStock, postPurchase, updatePurchase } from '../../service/userStockService.js';
import { tickerIsValid } from '../../service/stockService.js';
import { validatePurchaseInput, computePosition, formatNumber } from '../../utils.js';

var data;
onload = () => {
    //confirm
    document.getElementById('modalConfirm').onclick = completePurchase;

    //buy
    document.getElementById('buy').onclick = async () => {
        data = await buyStock();
        confirmData();
    }
    
    //search
    document.getElementById("tickerBtn").onclick = async () => {
        if (await checkTicker()) collapseBottom()
    };

    //reset feedbacks if any of this elements are on focus
    resetFeedbackOnFocus([
        document.getElementById("ticker"),
        document.getElementById("shares"),
        document.getElementById("price")
    ]);

    //indicate formatted price
    document.getElementById('price').oninput = (event) => {
        const format = formatNumber(parseFloat(event.target.value).toFixed(2));
        document.getElementById('priceInd').innerHTML = (format) ? "R$ " + format : ""; 
    }
}

/*  Checks purchase user input on the client-side. */
async function buyStock(){
    const tickerInput = document.getElementById("ticker");
    const sharesInput = document.getElementById("shares");
    const priceInput = document.getElementById("price");

    const ticker = tickerInput.value.toUpperCase();
    const shares = sharesInput.value;
    const pricePerShare = parseFloat(priceInput.value).toFixed(2);

    const errors = validatePurchaseInput(ticker, shares, pricePerShare);
    if (errors == undefined){
        // proceed with purchase. 
        try{
            //check if ticker is valid
            if (await checkTicker())
                return {
                    "ticker": ticker,
                    "shares": shares,
                    "pricePerShare": pricePerShare
                };
            
        } catch (error){
            console.error(error);
            return;
        }
    } else{
        if (errors.ticker) setValidElement(tickerInput, false);
        if (errors.shares) setValidElement(sharesInput, false);
        if (errors.pricePerShare) setValidElement(priceInput, false);
        return;
    }
};

/*  Sends purchase data to the server. */
async function completePurchase(){
    if (!data) return;
    //check if user stock with ticker exists
    const exists = await fetchUserStock(data.ticker);
    if (exists != undefined){
        //stock is already a user stock
        const purchased = await updatePurchase(data);
        if (purchased) window.location.href = '/home';
    }else{
        //stock should be a new user stock
        const purchased = await postPurchase(data);
        if (purchased) window.location.href = '/home';
    }
};

/*  Actives modal to confirm purchase data. */
function confirmData(){
    if (data){
        const total = computePosition(data.shares, data.pricePerShare);
        document.getElementById("modalControl").click();
        document.getElementById("modalBody").innerHTML = `
            Ticker: ${data.ticker}
            <br>Ações: ${data.shares}
            <br>Valor Total: <b> R$ ${formatNumber(total)} </b>
            <br>
        `
    }
}

/*  Collapse bottom part of page. */
function collapseBottom(){
    document.getElementById("collapseControl").click();
    //should collapse only on first click
    const bottom = document.getElementById("bottom");
    if (bottom) bottom.id = "bottomCollapsed";
}

/*  Set an event handler, if any of the elements in array are focused their feedback is reset. */
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

/*  Set ticker input feedback based on ticker validation call.
    Returns if valid.  */
async function checkTicker(){
    const tickerInput = document.getElementById("ticker");
    const ticker = tickerInput.value.toUpperCase();

    //check if ticker is valid
    if (! await tickerIsValid(ticker)){
        // console.log("Invalid ticker!");
        setValidElement(tickerInput, false);
        return false;
    }
    setValidElement(tickerInput, true);
    return true;
};

/*  Set feedback to element, valid or invalid.  */
function setValidElement(element, isValid){
    element.classList.remove("is-valid");
    element.classList.remove("is-invalid");
    if (isValid){
        element.classList.add("is-valid");
    }else{
        element.classList.add("is-invalid");
    }
}