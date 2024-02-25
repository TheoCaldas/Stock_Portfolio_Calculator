import { Stock } from '../model/stock.js'

export async function requestStock(ticker){
    const baseURL = 'https://query1.finance.yahoo.com/v8/finance/chart/';
    const req = baseURL + ticker

    const res = await fetch(req);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    
    const data = await res.json();
    return data;
};

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
}