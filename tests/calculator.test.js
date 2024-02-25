import { requestStock } from "../public/calculator.js"
import { describe, it, expect, spyOn } from "vitest";

describe('resquestStock', () => {
    it('should return a JSON object if ticker is valid', async () => {
        expect(await requestStock("PETR4.SA")).toBeTruthy();
    });
    it('should return a JSON object if ticker is valid', async () => {
        expect(await requestStock("VALE3.SA")).toBeTruthy();
    });
    it('should throw 404 error if ticker is invalid', async () => {
        try { expect(await requestStock("asef asefsaeqf sa")).toBeFalsy(); }
        catch (error) { expect(error.message).toContain('404'); }
    });
    it('should throw 404 error if ticker is invalid', async () => {
        try { expect(await requestStock("123123.1244.24124")).toBeFalsy(); }
        catch (error) { expect(error.message).toContain('404'); }
    });
});