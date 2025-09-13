import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z } from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const EXTRA_PEOPLE_CSV_PATH = path.join(__dirname, "../data/extra-people.csv");
const NEW_PEOPLE_CSV_PATH = path.join(__dirname, "../data/new_people.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]);
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

// Tests for the old version of the parser

test("parseCSV handles quoted numbers", async () => {
  const results = await parseCSV(EXTRA_PEOPLE_CSV_PATH)
  expect(results[1]).toEqual(["Alice", "23", "hello there!"]);
});

test("parseCSV handles commas in quotes", async () => {
  const results = await parseCSV(EXTRA_PEOPLE_CSV_PATH)
  expect(results[2]).toEqual(["Bob", "thirty", "veni, vidi, vici"]);
});

test("parseCSV handles quotes in quotes", async () => {
  const results = await parseCSV(EXTRA_PEOPLE_CSV_PATH)
  expect(results[3]).toEqual(["Charlie", "25", "hi everyone! i \"love you\" you!"]);
});

test("parseCSV handles empty fields", async () => {
  const results = await parseCSV(EXTRA_PEOPLE_CSV_PATH)
  expect(results[4]).toEqual(["Nim", "", ""]);
});

// New tests for the improved version of the parser

test("parseCSV works with a schema with all strings", async () => {
  const schema = z.tuple([z.string(), z.string()]);
  const results = await parseCSV(PEOPLE_CSV_PATH, schema);

  // All rows should successfully parse according to the schema
  for (const res of results) {
    expect(res.success).toBe(true);
  }

  // Check that Alice and Bob match expected values
  if (results[1].success) {
    expect(results[1].data).toEqual(["Alice", "23"]);
  }
  if (results[2].success) {
    expect(results[2].data).toEqual(["Bob", "thirty"]);
  }
});

test("parseCSV works with schema with age as number", async () => {
  const schema = z.tuple([z.string(), z.coerce.number()]);
  const results = await parseCSV(PEOPLE_CSV_PATH, schema);

  // Rows with valid ages should succeed, invalid should fail
  expect(results[1].success).toBe(true);
  expect(results[2].success).toBe(false); // Bob fails validation
  expect(results[3].success).toBe(true);
  expect(results[4].success).toBe(true);
});

test("parseCSV falls back to string[][] with undefined schema", async () => {
  const results = await parseCSV(NEW_PEOPLE_CSV_PATH);

  // The result should be a 2D array of strings
  expect(Array.isArray(results)).toBe(true);
  expect(Array.isArray(results[0])).toBe(true);

  expect(results[0]).toEqual(["name", "age"]); // header row
  expect(results[1]).toEqual(["Nim", ""]); // age is empty string
});