/*  A stock abstraction of the persisted user data. */
export class UserStock {
    constructor(ticker, shares, position) {
      this.ticker = ticker;
      this.shares = shares;
      this.position = position;
    };
};
  