/*  Computes new stock value based on market price and user shares. 
    Returns the difference between the new value and the stock position. 
    Inputs and outputs are string values. */
export function computeStockReturn(position, shares, marketPrice){
    const _position = parseFloat(position);
    const _shares = parseFloat(shares);
    const _marketPrice = parseFloat(marketPrice);
    return plus(((_shares * _marketPrice) - _position).toFixed(2));
};
    
/*  Returns computed new stock value based on market price and user shares.  
    Inputs and outputs are string values. */
export function computeCurrentValue(shares, marketPrice){
    const _shares = parseFloat(shares);
    const _marketPrice = parseFloat(marketPrice);
    return (_shares * _marketPrice).toFixed(2);
};

/*  Returns computed profit percentage based on old and new stock values.  
    Inputs and outputs are string values. */
export function computeProfitability(position, stockValue){
    const _position = parseFloat(position);
    const _stockValue = parseFloat(stockValue);
    if (_position == 0 || _stockValue == 0) return "0,00";
    if (_position < _stockValue)
        return plus(((_stockValue / _position) * 1.0).toFixed(2)).concat("%");
    else
        return plus(((_position / _stockValue ) * -1.0).toFixed(2)).concat("%");
};

/*  Adds + sign if number is positive.  
    Inputs and outputs are string values. */
function plus(numberString){
    return (parseFloat(numberString) > 0.0) ? "+".concat(numberString) : numberString;
}


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