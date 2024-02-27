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
        console.log(resData);
        return true;
        
    } catch (error) {
        console.error("Error posting purchase:", error);
        return false;
    }
};