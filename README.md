# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.
Through the tests in Task A, I realized that the parser has a couple of bugs that prevent it from meeting the CSV specifications.
First of all, whenever the parser encounters a comma, it automatically makes a new data field. This happens even when commas are enclosed in quotes, i.e. "veni, vidi, vici". The parser would split that into 3 different fields.
The parser also adds extra quotes around the quoted fields in the CSV, and does not handle extra quotes in a field properly. 
The parser always returns strings. Because of this, I believe that if the caller can provide a schema, it would be helpful so that the parser could validate the data and ensure all fields are consistent with their types, i.e. "thirty" in the age field.

- #### Step 2: Use an LLM to help expand your perspective.
The first time I prompted the LLM, it was less specific in addressing the issues in my parser and more focused on the general things a good parser would need. The second time, I added more details about this specific parser and the issues I ran into, and it was able to give me more improvements based on the specific issues I was facing rather than features it should have.

- #### Step 3: Propose enhancements in your project README file

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    Extensibility
    1. As a developer, I want the parser to support streaming so that I can process large files efficiently without loading them entirely into memory. (LLM)
    2. As a developer, I want to configure the delimiter (comma, semicolon, tab) so that the parser can handle CSV, TSV, or other delimited formats. (LLM)

    Functionality
    3. As a developer, I want to define expected data types for columns so that the parser validates and ensures that all fields are the consistent with the provided types by converting them if needed. (both LLM and me)
    4. As a developer, I want the parser to correctly handle quoted fields and extra quotes so that commas inside quotes and escaped quotes are parsed into the expected field, instead of splitting incorrectly. (me)

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 
    My initial ideas were relating to the bugs I ran into, that were identified by my tests. I noticed that the parser wasn't properly handling quoted special characters like commas or extra quotes. The LLM also suggested these but in a more general sense, as I just prompted it for a general scanner and not my specific implementation. As I prompted it more, it began suggesting more things that help the extensibility of the parser, for example configuring the delimiter so that it can handle other pieces of data. Something that resonated with me the most is how the LLM suggested many things that would help the developer in terms of usability and extensibility, which helped me realize that there is a lot more to consider with a program than just its function.
    
### Design Choices

- #### 1. Correctness
    - Quoted fields should preserve special characters within it, like commas or extra quotes.
    - Fields should be split only if the comma/delimiter is outside of the quotation
    - Whitespace should be handled correctly; spaces in quote fields must be preserved and unquoted spaces are trimmed

- #### 2. Random, On-Demand Generation
    This could help with testing edge cases because if it is randomly generated, it could generate cases that I might not have thought of or cases that are more complicated. 

- #### 3. Overall experience, Bugs encountered and resolved
    One thing that surprised me compared to the intro CS sequence was how open ended it was. I think that I was used to the structure in the intro courses so I was a little overwhelmed at first. I didn't necessarily run into bugs, but I had to fix my code a couple of times due to the grading specifications. 

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI): 
mmxian - We discussed how to stop the use of typecasting in the return statement because we had the same issue with both of our parsers.
Following our discussion, I prompted ChatGPT to build upon what we had discussed and asked if it had suggestions about how to restructure a parser without typecasting. It suggested to split the parser into two parts: one where the schema is provided and one where it wasn't.

### Estimated hours: 10
#### Link to GitHub Repo: https://github.com/cs0320-f25/typescript-csv-yeetthelin.git
