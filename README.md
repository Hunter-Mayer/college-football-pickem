# Group Project Two: College Football Pickem

## User Story

```
As a sports fan interested in college football,

I want an interactive site to host a pickem' league,

so that my friends and I can compete with eachother for bragging rights.
```

## Description

This is a full stack college fantasy football app. The app uses the Model-View-Controller paradigm in its achitectural structure. The app utilizes express and sequelize on the back end and handlebars to create the front end interface. The purpose of the site is to provide users an escape from using spreadsheets to maintain their college fantasy football leagues. Instead of manually entering every users pick into a spreadsheet the users can all utilize this app which will keep track of picks and scores automatically. Future development will allow for groups to form unique leagues.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

The user can clone the code from the GitHub repo. Once the code is cloned and opened in a code editor the user should install all npm packages by running 
```
npm i
```
The user will also have to create a .env file in order to store their credentials for the connection. The user will have to input  DB_NAME, DB_USER, DB_PASSWORD, and SESSION_SECRET variables with their credentials as the values. The next step is to run the schema file with mysql. The user will enter their mysql shell and run
```
SOURCE db/schema.sql 
```
from the root of the project. The user can now exit the mysql shell. The user can seed the database running
```
npm run seed
```
To invoke the application the user can run 

```
npm start
```
If the user wants to run in a dev environment so the server refreshes after changes are made the user should run
```
npm run dev
```

## Usage

Once the user enters the site they can navigate the site using the navbar at the top. Before they can interact with most of the site they will need to either log in or sign up. This can be done by clicking on the log in button. Once on this screen the user can enter their email and password to login or create a new account.

Once logged in the user can view their weekly picks. Here the user can select the winner and assign point values to the ten games being played that week. Once the submit button is clicked their picks have been made for the week. If the user returns to the page they can edit their weekly picks.

![Screenshot](Insert Relative Path to Screenshot Here)

[College Pick Em](Insert URL to Site Here "Deployed Pick Em Site")

## Credits

- [chart.js](https://www.chartjs.org)
- [Sequelize](https://sequelize.org/)
- [Express-Handlebars](https://www.npmjs.com/package/express-handlebars)
- [Handlebars](https://handlebarsjs.com/)
- [MDN Web Docs](https://developer.mozilla.org/en-US/)

## License

N/A