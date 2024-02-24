import { foo } from "../public/calculator.js"
import { describe, it, expect } from "vitest";

describe('foo', () => {
    it('should return false if negative', () => {
        expect(foo(-4)).toBe(false);
    });
    it('should return true if positive', () => {
        expect(foo(4)).toBe(true);
    });
    it('should return false if equals zero', () => {
        expect(foo(0)).toBe(false);
    })
});