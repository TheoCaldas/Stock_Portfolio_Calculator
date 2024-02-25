export function foo(a){
    return a > 0;
};


export async function requestStock(ticker){
    const baseURL = 'https://query1.finance.yahoo.com/v8/finance/chart/';
    const req = baseURL + ticker

    const res = await fetch(req);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    
    const data = await res.json();
    return data;
};