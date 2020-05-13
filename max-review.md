# General suggestions

## PM2

https://pm2.keymetrics.io/docs/usage/cluster-mode/

Start the app under PM2 in cluster mode to gain maximum performance out of the production CPU.

You can also set up a recovery strategy, if your app is down after an unhandled exception.

## Prettier

Make your code consistent in terms of style. Choose AirBnB or Standard style.

## Migrations

Control your DB structure and data over time, from the code (migration files).

## Seeds for development

DB should be filled with test and ready-to-use data using 1 command.

Ideal scenario, when a new developer is gonna contribute to your project:

* clone the repo
* start a local DB (Docker/native)
* fill the DB with the seed data
* start server
* start contributing