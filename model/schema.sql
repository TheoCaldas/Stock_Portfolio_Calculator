CREATE DATABASE stockcalculator;
USE stockcalculator;

CREATE TABLE portfolio (
    ticker VARCHAR(10) PRIMARY KEY,
    shares integer NOT NULL,
    cost DECIMAL(15, 2) NOT NULL
);
