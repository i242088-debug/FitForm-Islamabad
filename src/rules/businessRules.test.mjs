import test from "node:test";
import assert from "node:assert/strict";
import { validateQuantity } from "./businessRules.mjs";

test("allows a normal booking quantity", () => {
  assert.deepEqual(validateQuantity(2, 8), { valid: true, message: "" });
});

test("allows exactly the per-class booking limit", () => {
  assert.deepEqual(validateQuantity(4, 4), { valid: true, message: "" });
});

test("rejects a quantity above the per-class booking limit", () => {
  const result = validateQuantity(5, 8);
  assert.equal(result.valid, false);
  assert.match(result.message, /no more than 4/);
});

test("rejects a quantity above remaining capacity", () => {
  assert.equal(validateQuantity(3, 2).valid, false);
});