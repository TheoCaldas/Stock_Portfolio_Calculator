/*  Returns fetched user stock data from the server-side.
    Catches http errors. */
export async function fetchUserStocks(){
    try {  
        const res = await fetch("/user/stocks", {method: "GET"});
        const data = await res.json();
        if (!res.ok) return console.error(data.error);

        return data;
    } catch (error) {
        console.error("Error fetching stocks:", error);
    }
};

/*  Returns fetched stock data from the server-side.
    Catches http errors. */
export async function fetchStocks(stocks, callback){
    try {  
        await Promise.all(stocks.map(async (stock) => {
            const ticker = stock.ticker;
            const res = await fetch(`/stock/${ticker}`, {method: "GET"});
            const data = await res.json();
            if (!res.ok) return console.error(data.error);

            callback({"ticker": ticker, "price": data.regularMarketPrice});
        }));
        
        // return prices;
    } catch (error) {
        console.error("Error fetching stocks:", error);
    }
};

/*  Computes new stock value based on market price and user shares. 
    Returns the difference between the new value and the stock position. 
    Inputs and outputs are string values. */
    export function calculateStockReturn(position, shares, marketPrice){
        const _position = parseFloat(position);
        const _shares = parseFloat(shares);
        const _marketPrice = parseFloat(marketPrice);
        return plus(((_shares * _marketPrice) - _position).toFixed(2));
    };
    
    /*  Returns computed new stock value based on market price and user shares.  
        Inputs and outputs are string values. */
    export function calculateCurrentValue(shares, marketPrice){
        const _shares = parseFloat(shares);
        const _marketPrice = parseFloat(marketPrice);
        return (_shares * _marketPrice).toFixed(2);
    };
    
    /*  Returns computed profit percentage based on old and new stock values.  
        Inputs and outputs are string values. */
    export function calculateProfitability(position, stockValue){
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