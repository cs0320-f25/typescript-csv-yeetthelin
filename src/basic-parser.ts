import * as fs from "fs";
import * as readline from "readline";
import { ZodType, ZodSafeParseResult } from "zod";


/**
 * Parses a CSV file into an array of rows. Each row is either a string array (if no schema is provided), or
 * a ZodSafeParseResult (if a schema is provided).
 * 
 * @param path The path to the file being loaded.
 * @returns a "promise" to produce a 2-d array of cell values
 */

export async function parseCSV(path: string): Promise<string[][]>;
export async function parseCSV<T>(
  path: string,
  schema: ZodType<T>
): Promise<ZodSafeParseResult<T>[]>;

export async function parseCSV<T>(path: string, schema?: ZodType<T>): Promise<string[][] | ZodSafeParseResult<T>[]> {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // handle different line endings
  });
  
  // If a schema is provided, validate each row
  if (schema) {
    const result: ZodSafeParseResult<T>[] = [];
    for await (const line of rl) {
      const values = line.split(",").map((v) => v.trim());
      result.push(schema.safeParse(values));
    }
    return result;
    
  // If no schema is provided, just return string[][]
  } else {
    const result: string[][] = [];
    for await (const line of rl) {
      const values = line.split(",").map((v) => v.trim());
      result.push(values);
    }
    return result;
  }
}