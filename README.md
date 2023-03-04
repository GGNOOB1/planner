# Api planner

The planner's API aims to help the client to organize his week and his tasks and at what times they happen, this will happen through user routes and events that will be requested through http GET, POST, PUT and DELETE methods.

[Deploy](https://api-planner.onrender.com)

## Info

<p align="center">
   <img src="http://img.shields.io/static/v1?label=Typescript&message=4.7.4&color=blue&style=for-the-badge&logo=typescript"/>
   <img src="http://img.shields.io/static/v1?label=sqlite&message=5.1.4&color=cyan&style=for-the-badge&logo=sqlite"/>
   <img src="http://img.shields.io/static/v1?label=NestJS&message=9.0.0&color=red&style=for-the-badge&logo=nestjs"/>
   <img src="http://img.shields.io/static/v1?label=STATUS&message=FINISHING&color=orange&style=for-the-badge"/>
</p>

## Running Locally

Clone the project

```bash
  git clone https://link-para-o-projeto
```

Enter the project directory

```bash
  cd my-project
```

Install the dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Installation

Install dependencies of api-planner with npm

```bash
$ npm install
```

## Environment variables

To run this project, you will need to add the following environment variables to your .env

`JWT_SECRET_KEY=<secret_key>`

You will need to replace the <host> and <password>

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Resources

- Node.JS v.18.12.1

- Dependencies:

  - @nestjs/common: ^9.0.0,
  - @nestjs/config: ^2.3.1,
  - @nestjs/core: ^9.0.0,
  - @nestjs/jwt: ^10.0.2,
  - @nestjs/passport: ^9.0.3,
  - @nestjs/platform-express: ^9.0.0,
  - @nestjs/typeorm: ^9.0.1,
  - bcrypt: ^5.1.0,
  - class-transformer: ^0.5.1,
  - class-validator: ^0.14.0,
  - joi: ^17.8.3,
  - lodash: ^4.17.21,
  - moment: ^2.29.4,
  - mongodb: ^3.7.3,
  - passport-jwt: ^4.0.1,
  - passport-local: ^1.0.0,
  - reflect-metadata: ^0.1.13,
  - rxjs: ^7.8.0,
  - sqlite3: ^5.1.4,
  - typeorm: ^0.3.12

- Development dependencies:
  - dotenv v16.0.,
  - @nestjs/cli: ^9.0.0,
  - @nestjs/schematics: ^9.0.0,
  - @nestjs/swagger: ^6.2.1,
  - @nestjs/testing: ^9.0.0,
  - @types/express: ^4.17.13,
  - @types/jest: 29.2.4,
  - @types/node: 18.11.18,
  - @types/passport-local: ^1.0.35,
  - @types/supertest: ^2.0.11,
  - @typescript-eslint/eslint-plugin: ^5.0.0,
  - @typescript-eslint/parser: ^5.0.0,
  - eslint: ^8.0.1,
  - eslint-config-prettier: ^8.3.0,
  - eslint-plugin-prettier: ^4.0.0,
  - jest: 29.3.1,
  - prettier: ^2.3.2,
  - source-map-support: ^0.5.20,
  - supertest: ^6.1.3,
  - ts-jest: 29.0.3,
  - ts-loader: ^9.2.3,
  - ts-node: ^10.0.0,
  - tsconfig-paths: 4.1.1,
  - typescript: ^4.7.4

## Requirements

[Node.js](https://nodejs.org/en/)

[Sqlite](https://www.sqlite.org/index.html)

[Typescript](https://www.typescriptlang.org/)

## Swagger

Detailed documentation of each api route

To access the documentation access the route:

- /swagger

obs: Run Postman locally for more efficiency

## Routes

Some routes have authentication, so it will be necessary to put the geraldo token when logging into the bearer token in the header

1. events
   - POST /api/v1/events
   - GET /api/v1/events
   - DELETE /api/v1/events/:id
   - GET /api/v1/events/:id
   - GET /api/v1/events?dayOfTheWeek=**\***?limt=?offset=
   - PUT /api/v1/events/:id
   - PUT /api/v1/events/:id/location
   - DELETE /api/v1/events?dayOfTheWeek=**\***
2. users
   - POST /api/v1/users/signUp
   - POST /api/v1/users/signIn
   - POST /api/v1/users/updatePassword
   - DELETE /api/v1/users/:id
   - PUT /api/v1/users/:id

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

Copyright :copyright: 2023 - 3° Projeto Compass
