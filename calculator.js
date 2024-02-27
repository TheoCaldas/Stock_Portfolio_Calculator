import { Stock } from './model/stock.js'

/*  Requests a stock by ticker on the server-side. Uses Yahoo Finance API.
    Returns json object if succeeds. 
    Throws HTTP Error if fails. */
export async function requestStock(ticker){
    const baseURL = 'https://query1.finance.yahoo.com/v8/finance/chart/';
    const req = baseURL + ticker

    const res = await fetch(req);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    
    const data = await res.json();
    return data;
};

/*  Parses json object into Stock model object on the server-side. 
    Returns Stock object. 
    Throws error if json is not in the expected format. */
export function parseStock(data){
    try{
        const body = data.chart.result[0].meta;
        const stock = 
        new Stock(
            body.symbol, 
            body.currency, 
            body.regularMarketPrice,
            body.regularMarketTime);
        return stock; 
    }
    catch (error){
        throw new Error('Error with JSON format');
    }
};