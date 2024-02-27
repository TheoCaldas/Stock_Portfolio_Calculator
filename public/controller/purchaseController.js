/*  Validates user input format on the client-side.
    Returns undefined if all entries are in the correct format. 
    Returns a error object indexed with the corresponding format error. 

    ticker: must be a non-empty string.
    shares: must be a non-empty string representing a positive integer, such as '123'. 
    pricePerShare: must be a non-empty string representing a positive money value, such as '10.123,42'. */
export function validatePurchaseInput(ticker, shares, pricePerShare){
    var errors = {
        "ticker": false,
        "shares": false,
        "pricePerShare": false
    };

    if (ticker == '') errors.ticker = true;
    if (shares == '') errors.shares = true;
    if (pricePerShare == '') errors.pricePerShare = true;

    const sharesFormat = /^[1-9]\d*$/;
    const pricePerShareFormat = /^\d+\.\d{2}$/;
    if (!sharesFormat.test(shares)) errors.shares = true;
    if (!pricePerShareFormat.test(pricePerShare)) errors.pricePerShare = true;

    if (!errors.ticker && !errors.shares && !errors.pricePerShare) return;
    return errors;
};

/*  Posts purchase to the server-side.
    Catches http erros. */
export async function postPurchase(reqData) {
    try {  
        const res = await fetch("/buy", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(reqData),
        });
        const resData = await res.json();
        if (!res.ok) return console.error(resData.error);
        
        console.log(resData);
        //returns to home
        window.location.href = '/home';
        // const page = await fetch('/home', {method: "GET"});
    } catch (error) {
        console.error("Error posting purchase:", error);
    }
};