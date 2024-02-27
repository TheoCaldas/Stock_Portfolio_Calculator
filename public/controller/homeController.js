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