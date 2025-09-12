import * as fs from "fs";
import * as readline from "readline";
import { ZodType } from "zod";


/**
 * This is a JSDoc comment. Similar to JavaDoc, it documents a public-facing
 * function for others to use. Most modern editors will show the comment when 
 * mousing over this function name. Try it in run-parser.ts!
 * 
 * File I/O in TypeScript is "asynchronous", meaning that we can't just
 * read the file and return its contents. You'll learn more about this 
 * in class. For now, just leave the "async" and "await" where they are. 
 * You shouldn't need to alter them.
 * 
 * @param path The path to the file being loaded.
 * @returns a "promise" to produce a 2-d array of cell values
 */
export async function parseCSV<T>(path: string, schema?: ZodType<T>): Promise<string[][] | T[]> {
  // This initial block of code reads from a file in Node.js. The "rl"
  // value can be iterated over in a "for" loop. 
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // handle different line endings
  });
  
  if (schema) {
    const result: T[] = [];
    for await (const line of rl) {
      const values = line.split(",").map((v) => v.trim());
      const parsed = schema.safeParse(values);
      if (parsed.success) {
        result.push(parsed.data);
      } else {
        console.warn("Row failed validation:", values);
      }
    }
    return result;
  } else {
    const result: string[][] = [];
    for await (const line of rl) {
      const values = line.split(",").map((v) => v.trim());
      result.push(values);
    }
    return result;
  }
}