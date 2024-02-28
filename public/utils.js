/*  Computes position value based on market price and user shares. 
    Returns the difference between computed position and cost. 
    Inputs and outputs are string values. */
export function computeProfit(cost, shares, marketPrice){
    const _cost = parseFloat(cost);
    const _shares = parseFloat(shares);
    const _marketPrice = parseFloat(marketPrice);
    return plus(((_shares * _marketPrice) - _cost).toFixed(2));
};
    
/*  Returns computed position value based on market price and user shares.  
    Inputs and outputs are string values. */
export function computePosition(shares, marketPrice){
    const _shares = parseFloat(shares);
    const _marketPrice = parseFloat(marketPrice);
    return (_shares * _marketPrice).toFixed(2);
};

/*  Returns computed profit percentage based on cost and position values.  
    Inputs and outputs are string values. */
export function computeProfitability(cost, position){
    const _cost = parseFloat(cost);
    const _position = parseFloat(position);
    if (_cost == 0 || _position == 0) return "0.00";
    if (_cost < _position)
        return plus(((_position / _cost) * 1.0).toFixed(2)).concat("%");
    else
        return plus(((_cost / _position) * -1.0).toFixed(2)).concat("%");
};

/*  Adds + sign if number is positive.  
    Inputs and outputs are string values. */
function plus(numberString){
    return (parseFloat(numberString) > 0.0) ? "+".concat(numberString) : numberString;
};

/*  Formats decimal number as in '1.000.000,00'.
    Inputs and outputs are string values. */
export function formatNumber(number) {
    const [integerPart, decimalPart] = number.split('.');
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const formattedNumber = formattedIntegerPart + ',' + decimalPart;
    return formattedNumber;
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

/*  Returns if current time is between 9:30(am) and 18:30(pm). */
export function isTradingPeriod(){
    const now = new Date();
    const startTime = new Date().setHours(9, 30, 0, 0);
    const endTime = new Date().setHours(18, 30, 0, 0);
    return now >= startTime && now <= endTime;
}