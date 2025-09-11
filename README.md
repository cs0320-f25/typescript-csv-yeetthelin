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
    

### Design Choices

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
#### Total estimated time it took to complete project:
#### Link to GitHub Repo: https://github.com/cs0320-f25/typescript-csv-yeetthelin.git
