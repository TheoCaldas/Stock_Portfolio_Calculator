import { validatePurchaseInput } from "../public/view/purchaseController.js";
import { describe, it, expect } from "vitest";

describe('validatePurchaseInput', () => {
    it('should return undefined if all entries are correct', () => {
        expect(validatePurchaseInput("PETR4.SA", "10", "1040157.96")).toBeUndefined();
    });
    //TICKER
    it('should return error if ticker is empty', () => {
        const errors = validatePurchaseInput("", "10", "1040157.96");
        expect(errors).toBeDefined();
        expect(errors.ticker).toBeTruthy();
        expect(errors.shares).toBeFalsy();
        expect(errors.pricePerShare).toBeFalsy();
    });
    //SHARES
    it('should return error if shares is empty', () => {
        const errors = validatePurchaseInput("PETR4.SA", "", "1040157.96");
        expect(errors).toBeDefined();
        expect(errors.ticker).toBeFalsy();
        expect(errors.shares).toBeTruthy();
        expect(errors.pricePerShare).toBeFalsy();
    });
    it('should return error if shares is not an integer', () => {
        const errors = validatePurchaseInput("PETR4.SA", "asefa1.1.24.1 sef ", "1040157.96");
        expect(errors).toBeDefined();
        expect(errors.ticker).toBeFalsy();
        expect(errors.shares).toBeTruthy();
        expect(errors.pricePerShare).toBeFalsy();
    });
    it('should return error if shares is not an integer', () => {
        const errors = validatePurchaseInput("PETR4.SA", "1.042", "1040157.96");
        expect(errors).toBeDefined();
        expect(errors.ticker).toBeFalsy();
        expect(errors.shares).toBeTruthy();
        expect(errors.pricePerShare).toBeFalsy();
    });
    it('should return error if shares is a negative number', () => {
        const errors = validatePurchaseInput("PETR4.SA", "-123", "1040157.96");
        expect(errors).toBeDefined();
        expect(errors.ticker).toBeFalsy();
        expect(errors.shares).toBeTruthy();
        expect(errors.pricePerShare).toBeFalsy();
    });
    //PRICE PER SHARE
    it('should return error if pricePerShare is empty', () => {
        const errors = validatePurchaseInput("PETR4.SA", "10", "");
        expect(errors).toBeDefined();
        expect(errors.ticker).toBeFalsy();
        expect(errors.shares).toBeFalsy();
        expect(errors.pricePerShare).toBeTruthy();
    });
    it('should return error if pricePerShare is not a decimal number', () => {
        const errors = validatePurchaseInput("PETR4.SA", "10", "124");
        expect(errors).toBeDefined();
        expect(errors.ticker).toBeFalsy();
        expect(errors.shares).toBeFalsy();
        expect(errors.pricePerShare).toBeTruthy();
    });
    it('should return error if pricePerShare is not a decimal number', () => {
        const errors = validatePurchaseInput("PETR4.SA", "10", "124.00412");
        expect(errors).toBeDefined();
        expect(errors.ticker).toBeFalsy();
        expect(errors.shares).toBeFalsy();
        expect(errors.pricePerShare).toBeTruthy();
    });
    it('should return error if pricePerShare is not a decimal number', () => {
        const errors = validatePurchaseInput("PETR4.SA", "10", "124.1");
        expect(errors).toBeDefined();
        expect(errors.ticker).toBeFalsy();
        expect(errors.shares).toBeFalsy();
        expect(errors.pricePerShare).toBeTruthy();
    });
    it('should return error if pricePerShare is not a decimal number', () => {
        const errors = validatePurchaseInput("PETR4.SA", "10", "124,0.10");
        expect(errors).toBeDefined();
        expect(errors.ticker).toBeFalsy();
        expect(errors.shares).toBeFalsy();
        expect(errors.pricePerShare).toBeTruthy();
    });
    it('should return error if pricePerShare is not a decimal number', () => {
        const errors = validatePurchaseInput("PETR4.SA", "10", "-1140.10");
        expect(errors).toBeDefined();
        expect(errors.ticker).toBeFalsy();
        expect(errors.shares).toBeFalsy();
        expect(errors.pricePerShare).toBeTruthy();
    });
});