## simple instruction for using the program

- first of all you need to install the packages of the program
`npm install`
- you need to create database by postgres for making migrations on it in the command line
  - `psql -U <user>`
  -entering the password for database
  - `create database <database name>;` for the original database
  - `create database <database name_test>` for making second database for testing
  -`\c <database>` for connecting to database
-for bulding the project you can write the next command:
   - `npm run build`
-for testing the project you can write the next command:
   - `npm run test`
   -it will make a lot of commands by the script of testing:
    - ` "test": "set ENV=test && db-migrate --env test reset && db-migrate --env test up && jasmine-ts && db-migrate --env test reset"
   - it will create testing database and making migrations to this database and testing the models'
   - methods by `jasmine` the testing will make before building the project to the type script files

## Technolgies 
- postgres
- Typescript
-express
-javascript
-jasmine

