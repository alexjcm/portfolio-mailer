# My Portfolio Web service &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg) [![Publish docker image](https://github.com/alexjcm/portfolio-ws/actions/workflows/publish-docker-image.yml/badge.svg?branch=main)](https://github.com/alexjcm/portfolio-ws/actions/workflows/publish-docker-image.yml)

## Features and technologies used

- NodeJS 14
- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests. It is a backend framework for Node.js.
- [nodemailer](https://github.com/nodemailer/nodemailer) - Is a module for Node.js applications to allow easy as cake email sending
- SQLite database
- SQL database implementation with **[Sequelize v6](https://sequelize.org/docs/v6/)** ORM
- dotenv module for setting environment
- Implemented [sentry](https://sentry.io) error tracking and monitoring
- Production ready Dockerfile
- Linting with Eslint 8
- Format code with Prettier
- ES6+ features with babel (including es6 import/export feature)
- Transpile with Babel 7
- Including authentication system with rest api endpoints

## Api Documentation

Api documentation of this project was created with [swagger 3](https://swagger.io/).  
You can access the swagger configuration file from [this link](https://app.swaggerhub.com/apis/....).  
You can also discover the interactive documentation by going to `/api-docs` when you run the application.

## Database Selection

This project is compatible with sql-based databases. You can change default dialect (sqlite) in anytime.
To do this, firstly select your database from the table below.
Modify `dialect` property in `src/config/sequelize.js` and install required npm package(s) for this database.

For more info, visit [sequelize docs](https://sequelize.org/docs/v6/other-topics/dialect-specific-things/)

**Note:** The default and active database is sqlite.
If you want to use postgresql in your project, you don't need to make any changes.

| Database             | Dialect  | Required npm Package(s) |
| -------------------- | -------- | ----------------------- |
| MySQL                | mysql    | `yarn add mysql2`       |
| MariaDB              | mariadb  | `yarn add mariadb`      |
| PostgreSQL           | postgres | `yarn add pg pg-hstore` |
| SQLite               | sqlite   | `yarn add sqlite3`      |
| Microsoft SQL Server | mssql    | `yarn add tedious`      |

### Usage of sequelize-cli

With sequelize-cli package, you can manage model, migration and seed files.
You can find more information with [document](https://sequelize.org/docs/v6/other-topics/migrations/).

## Installation

1. Clone or download this repository:

```
git clone https://github.com/alexjcm/portfolio-ws.git
```

2.  Install npm packages with yarn install command.

```
npm install
```

3. Create **.env** file by copying .env.example file in root directory.

4. Modify .env file.

5. Finally, in the project directory, you can run: your app will run successfully with **npm run start:dev** command

Or `npm start`

Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

## Deployment with docker

Build image:

```bash
docker build -t alexjcm/portfolio-ws -f DockerfilePro .
```

Or

```bash
docker pull alexjcm/portfolio-ws
```

Start container:

```bash
docker run --restart always -d -p 5000:5000 --name portfolio-ws --env-file $HOME/secrets/.env alexjcm/portfolio-ws
```

Stop container:

```bash
docker stop portfolio-ws
```

## Conventional commits

To view the convention used for commit messages, [click here](https://gist.github.com/alexjcm/6cc0a0a1ed96c85675a9d92706e1099d)

# TODO

- Api documentation with swagger.
- Test cases written with jest.

### License

[MIT licensed](./LICENSE).
