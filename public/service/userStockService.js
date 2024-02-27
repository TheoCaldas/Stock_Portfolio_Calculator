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

/*  Returns fetched user stock by ticker from the server-side.
    Catches http errors. */
export async function fetchUserStock(ticker){
    try {  
        const res = await fetch(`/user/stocks/${ticker}`, {method: "GET"});
        const data = await res.json();
        if (!res.ok) return console.error(data.error);
        return data;
    } catch (error) {
        // console.error("Error fetching stock:", error);
    }
};

/*  Posts purchase to the server-side.
    Returns if succeed.
    Catches http erros. */
export async function postPurchase(reqData) {
    try {  
        const res = await fetch("/user/stocks", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(reqData),
        });
        const resData = await res.json();
        if (!res.ok){
            console.error(resData.error);
            return false;
        }
        return true;
        
    } catch (error) {
        console.error("Error posting purchase:", error);
        return false;
    }
};

/*  Updates purchase to the server-side.
    Returns if succeed.
    Catches http erros. */
    export async function updatePurchase(reqData) {
        try {  
            const res = await fetch("/user/stocks", 
            {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(reqData),
            });
            const resData = await res.json();
            if (!res.ok){
                console.error(resData.error);
                return false;
            }
            return true;
        } catch (error) {
            console.error("Error updating purchase:", error);
            return false;
        }
    };

/*  Deletes all user stock data from the server-side.
    Catches http errors. */
export async function deleteUserStocks(){
    try {  
        const res = await fetch("/user/stocks", {method: "DELETE"});
        const data = await res.json();
        if (!res.ok) return console.error(data.error);
        return data;
    } catch (error) {
        console.error("Error deleting stocks:", error);
    }
};