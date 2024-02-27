/*  Fetches stock data from the server-side.
    For every stock object in array, a callback is used for passing the price data. 
    Catches http errors. */
export async function fetchPrices(stocks, callback){
    try {  
        await Promise.all(stocks.map(async (stock) => {
            const ticker = stock.ticker;
            const res = await fetch(`/stock/${ticker}`, {method: "GET"});
            const data = await res.json();
            if (!res.ok) return console.error(data.error);

            callback({"ticker": ticker, "price": data.regularMarketPrice});
        }));
    } catch (error) {
        console.error("Error fetching stocks:", error);
    }
};

/*  Fetches stock data from the server-side.
    Returns if ticker is valid. 
    Catches http errors. */
export async function tickerIsValid(ticker){
    try {  
        const res = await fetch(`/stock/${ticker}`, {method: "GET"});
        const data = await res.json();
        if (!res.ok) return false;
        return true;
    } catch (error) {
        console.error("Error fetching stock:", error);
        return false;
    }
};