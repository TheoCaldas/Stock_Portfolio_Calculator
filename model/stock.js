/*  A stock abstraction of the response from Yahoo Finance API. */
export class Stock {
    constructor(ticker, currency, regularMarketPrice, regularMarketTime) {
      this.ticker = ticker;
      this.currency = currency;
      this.regularMarketPrice = regularMarketPrice;
      this.regularMarketTime = regularMarketTime;
    };
};
  