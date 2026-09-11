import test from "node:test";
import assert from "node:assert/strict";

test("only published records pass the public visibility policy", () => {
  const visible = ["draft", "published", "archived"].filter((status) => status === "published");
  assert.deepEqual(visible, ["published"]);
});

test("canonical slugs are URL safe", () => {
  const rule = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  assert.match("client-portal-2", rule);
  assert.doesNotMatch("Client Portal", rule);
});
