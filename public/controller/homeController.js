/*  Returns fetched user stock data from the server-side.
    Catches http errors. */
export async function fetchStocks(){
    try {  
        const res = await fetch("/stocks", {method: "GET"});
        const resData = await res.json();
        if (!res.ok) return console.error(resData.error);

        return resData;
    } catch (error) {
        console.error("Error fetching stocks:", error);
    }
};