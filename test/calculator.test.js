import { requestStock, parseStock } from "../calculator.js";
import { describe, it, expect } from "vitest";
import { readFileSync } from 'fs';

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

describe('parseStock', () => {
    it('should return Stock object if JSON is in the expected format', () => {
        try {
            const jsonFormat = readFileSync(filePath, 'utf8');
            const data = jsonFormat.json();
            expect(parseStock(data).toBeTruthy());
        } catch (error) {};
    });
    it('should throw error if JSON is not in the expected format', () => {
        try { expect(parseStock({})).toBeFalsy(); }
        catch (error) { expect(error.message).toContain('JSON'); }
    });
});