import assert from "node:assert/strict";
import test from "node:test";
import { editorialDate } from "../src/utils/editorialDate.mjs";

test("editorial dates are opt-in and format calendar dates in UTC", () => {
  assert.equal(editorialDate(undefined), null);
  assert.deepEqual(editorialDate("2026-10-04"), {
    date: "2026-10-04",
    formattedDate: "October 4, 2026",
  });
  assert.equal(editorialDate("2024-02-29").date, "2024-02-29");
});

test("invalid or ambiguous editorial dates fail instead of emitting metadata", () => {
  for (const value of [
    null,
    "",
    "10/04/2026",
    "2026-02-29",
    "2026-13-01",
    2026,
  ]) {
    assert.throws(() => editorialDate(value), /editorial_update/);
  }
});
